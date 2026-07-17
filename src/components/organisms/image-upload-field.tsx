"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { uploadImage } from "@/lib/actions/upload";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { ImageCropDialog } from "@/components/organisms/image-crop-dialog";
import { MediaPickerDialog } from "@/components/organisms/media-picker-dialog";

export function ImageUploadField({
  name,
  label,
  defaultValue,
  aspect = 1,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  aspect?: number;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setPendingFile(file);
  }

  function handleCropCancel() {
    setPendingFile(null);
    setInputKey((k) => k + 1);
  }

  function handleCropConfirm(blob: Blob) {
    setPendingFile(null);
    setInputKey((k) => k + 1);

    const croppedFile = new File([blob], pendingFile?.name ?? "image.jpg", {
      type: blob.type,
    });

    const formData = new FormData();
    formData.set("file", croppedFile);

    startTransition(async () => {
      const result = await uploadImage(formData);
      if (!result.url) {
        setError(result.error ?? "Upload failed.");
        return;
      }
      setUrl(result.url);
    });
  }

  function handlePickExisting(pickedUrl: string) {
    setError(null);
    setUrl(pickedUrl);
    setPickerOpen(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={`${name}-file`} className="font-mono text-2xs tracking-widest text-muted-foreground">
        {label.toUpperCase()}
      </Label>

      <div className="flex flex-wrap items-center gap-3">
        <input type="hidden" name={name} value={url} />
        <Input
          key={inputKey}
          id={`${name}-file`}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="max-w-xs"
        />
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="font-mono text-2xs tracking-widest text-primary transition-colors hover:underline"
        >
          CHOOSE EXISTING
        </button>
      </div>

      {isPending && <p className="font-mono text-2xs text-muted-foreground">UPLOADING…</p>}
      {error && <p className="font-mono text-2xs text-destructive">{error}</p>}
      {url && !isPending && (
        <div
          className="relative w-40 max-w-full overflow-hidden border border-dashed border-border transition-opacity duration-300"
          style={{ aspectRatio: aspect }}
        >
          <Image src={url} alt="" fill className="object-cover" unoptimized />
        </div>
      )}

      {pendingFile && (
        <ImageCropDialog
          file={pendingFile}
          aspect={aspect}
          onCancel={handleCropCancel}
          onConfirm={handleCropConfirm}
        />
      )}

      {pickerOpen && (
        <MediaPickerDialog onSelect={handlePickExisting} onClose={() => setPickerOpen(false)} />
      )}
    </div>
  );
}
