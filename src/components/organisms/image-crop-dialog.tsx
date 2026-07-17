"use client";

import { useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { getCroppedImageBlob } from "@/lib/crop-image";
import { Button } from "@/components/atoms/button";
import { CornerTicks } from "@/components/atoms/corner-ticks";
import { FigureLabel } from "@/components/atoms/figure-label";

export function ImageCropDialog({
  file,
  aspect,
  onCancel,
  onConfirm,
}: {
  file: File;
  aspect: number;
  onCancel: () => void;
  onConfirm: (blob: Blob) => void;
}) {
  // Created and revoked together inside one effect (rather than a useMemo +
  // separate cleanup) so the pairing survives React StrictMode's dev-mode
  // double-invoke of effects - otherwise the simulated unmount revokes the
  // URL a render produced via useMemo but never recreates it, leaving the
  // <img> pointed at a dead blob: URL.
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  useEffect(() => {
    const url = URL.createObjectURL(file);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above
    setImageSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleConfirm() {
    if (!croppedArea || !imageSrc) return;
    setIsProcessing(true);
    const blob = await getCroppedImageBlob(imageSrc, croppedArea, file.type || "image/jpeg");
    setIsProcessing(false);
    onConfirm(blob);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-6 backdrop-blur-sm">
      <div className="relative w-full max-w-lg border border-dashed border-border bg-(--panel-surface) p-6">
        <CornerTicks />

        <FigureLabel fig="U0" className="mb-1 block">
          CROP IMAGE
        </FigureLabel>
        <h2 className="mb-6 font-mono text-lg text-foreground">Adjust framing</h2>

        <div className="relative h-72 w-full overflow-hidden border border-dashed border-border">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, areaPixels) => setCroppedArea(areaPixels)}
            />
          )}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="font-mono text-2xs tracking-widest text-muted-foreground">ZOOM</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="h-1 w-full accent-primary"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" size="sm" onClick={onCancel}>
            CANCEL
          </Button>
          <Button type="button" size="sm" onClick={handleConfirm} disabled={isProcessing}>
            {isProcessing ? "PROCESSING…" : "USE CROP"}
          </Button>
        </div>
      </div>
    </div>
  );
}
