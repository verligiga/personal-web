"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { deleteMedia, listMedia, type MediaItem } from "@/lib/actions/media";
import { CornerTicks } from "@/components/atoms/corner-ticks";
import { FigureLabel } from "@/components/atoms/figure-label";

export function MediaPickerDialog({
  onSelect,
  onClose,
}: {
  onSelect: (url: string) => void;
  onClose: () => void;
}) {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, startLoading] = useTransition();
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);

  useEffect(() => {
    startLoading(async () => {
      try {
        setItems(await listMedia());
      } catch {
        setError("Could not load media library.");
      }
    });
  }, []);

  function handleDelete(item: MediaItem) {
    const message =
      item.usedBy.length > 0
        ? `This file is currently used by ${item.usedBy.join(", ")}. Deleting it will break that image on the live site. Delete anyway?`
        : "Delete this file permanently? This cannot be undone.";
    if (!confirm(message)) return;

    setDeletingUrl(item.url);
    startLoading(async () => {
      await deleteMedia(item.url);
      setItems((prev) => prev?.filter((i) => i.url !== item.url) ?? null);
      setDeletingUrl(null);
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-6 backdrop-blur-sm">
      <div className="relative flex max-h-[80vh] w-full max-w-2xl flex-col border border-dashed border-border bg-(--panel-surface) p-6">
        <CornerTicks />

        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <FigureLabel fig="U1" className="mb-1 block">
              MEDIA LIBRARY
            </FigureLabel>
            <h2 className="font-mono text-lg text-foreground">Choose existing file</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-2xs tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            CLOSE
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {isLoading && !items && (
            <p className="font-mono text-2xs text-muted-foreground">LOADING…</p>
          )}
          {error && <p className="font-mono text-2xs text-destructive">{error}</p>}
          {items && items.length === 0 && (
            <p className="font-mono text-2xs text-muted-foreground">No files uploaded yet.</p>
          )}

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {items?.map((item) => (
              <div
                key={item.url}
                className="group relative aspect-square overflow-hidden border border-dashed border-border"
              >
                <button
                  type="button"
                  onClick={() => onSelect(item.url)}
                  className="absolute inset-0"
                  aria-label={`Use ${item.pathname}`}
                >
                  <Image
                    src={item.url}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 25vw, 33vw"
                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                    unoptimized
                  />
                </button>

                {item.usedBy.length > 0 && (
                  <span
                    title={item.usedBy.join(", ")}
                    className="pointer-events-none absolute bottom-1 left-1 border border-dashed border-primary bg-background/80 px-1.5 py-0.5 font-mono text-2xs tracking-widest text-primary"
                  >
                    IN USE
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  disabled={deletingUrl === item.url}
                  className="absolute top-1 right-1 border border-dashed border-border bg-background/80 px-1.5 py-0.5 font-mono text-2xs text-destructive opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-label={`Delete ${item.pathname}`}
                >
                  {deletingUrl === item.url ? "…" : "×"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
