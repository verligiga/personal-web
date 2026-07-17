"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { uploadImage } from "@/lib/actions/upload";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { MediaPickerDialog } from "@/components/organisms/media-picker-dialog";

type Shot = { id: string; url: string };

export function GalleryField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string[];
}) {
  const [shots, setShots] = useState<Shot[]>(() =>
    (defaultValue ?? []).map((url) => ({ id: crypto.randomUUID(), url })),
  );
  const [error, setError] = useState<string | null>(null);
  const [isUploading, startUpload] = useTransition();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [inputKey, setInputKey] = useState(0);
  const dragIndex = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setError(null);
    setInputKey((k) => k + 1);

    startUpload(async () => {
      for (const file of files) {
        const formData = new FormData();
        formData.set("file", file);
        const result = await uploadImage(formData);
        if (!result.url) {
          setError(result.error ?? "Upload failed.");
          continue;
        }
        setShots((prev) => [...prev, { id: crypto.randomUUID(), url: result.url }]);
      }
    });
  }

  function handleRemove(id: string) {
    setShots((prev) => prev.filter((s) => s.id !== id));
  }

  function handlePickExisting(url: string) {
    setShots((prev) => [...prev, { id: crypto.randomUUID(), url }]);
    setPickerOpen(false);
  }

  function handleDrop(index: number) {
    const from = dragIndex.current;
    dragIndex.current = null;
    setDragOverIndex(null);
    if (from === null || from === index) return;

    setShots((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(index, 0, moved);
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <Label className="font-mono text-2xs tracking-widest text-muted-foreground">
        {label.toUpperCase()}
      </Label>
      <input type="hidden" name={name} value={JSON.stringify(shots.map((s) => s.url))} />

      <div className="flex flex-wrap items-center gap-3">
        <Input
          key={inputKey}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesChange}
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

      {isUploading && <p className="font-mono text-2xs text-muted-foreground">UPLOADING…</p>}
      {error && <p className="font-mono text-2xs text-destructive">{error}</p>}

      {shots.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {shots.map((shot, i) => (
            <div
              key={shot.id}
              draggable
              onDragStart={() => {
                dragIndex.current = i;
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverIndex(i);
              }}
              onDragLeave={() => setDragOverIndex((prev) => (prev === i ? null : prev))}
              onDrop={() => handleDrop(i)}
              onDragEnd={() => {
                dragIndex.current = null;
                setDragOverIndex(null);
              }}
              className={`group relative aspect-square cursor-move overflow-hidden border border-dashed transition-colors duration-150 ${
                dragOverIndex === i ? "border-primary" : "border-border"
              }`}
            >
              <Image
                src={shot.url}
                alt=""
                fill
                sizes="(min-width: 640px) 25vw, 33vw"
                className="object-cover"
                unoptimized
              />
              <span className="pointer-events-none absolute bottom-1 left-1 border border-dashed border-border bg-background/80 px-1.5 py-0.5 font-mono text-2xs text-muted-foreground">
                {i + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(shot.id)}
                className="absolute top-1 right-1 border border-dashed border-border bg-background/80 px-1.5 py-0.5 font-mono text-2xs text-destructive opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                aria-label={`Remove screenshot ${i + 1}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {pickerOpen && (
        <MediaPickerDialog onSelect={handlePickExisting} onClose={() => setPickerOpen(false)} />
      )}
    </div>
  );
}
