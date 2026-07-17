"use client";

import { useState } from "react";
import { uploadCV, deleteCV } from "@/lib/actions/cv";
import { Button } from "@/components/atoms/button";

type CVData = { id: string; fileName: string; fileUrl: string; fileSize: number };

export function CVUploadForm({ currentCV }: { currentCV: CVData | null }) {
  const [cv, setCv] = useState(currentCV);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Captured before the `await` - React nulls out `e.currentTarget` once
    // the synchronous part of the handler finishes, so using `e.currentTarget`
    // again after an await throws "Cannot read properties of null".
    const form = e.currentTarget;
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(form);
      const result = await uploadCV(formData);
      setCv(result.cv);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this CV?")) return;

    setIsLoading(true);
    setError(null);

    try {
      await deleteCV();
      setCv(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-4">
        <div className="border-2 border-dashed border-border p-6">
          <input
            type="file"
            name="file"
            accept=".pdf"
            required
            className="block w-full"
            disabled={isLoading}
          />
          <p className="mt-2 text-sm text-muted-foreground">
            PDF only, max 10MB
          </p>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Uploading..." : "Upload CV"}
        </Button>
      </form>

      {cv && (
        <div className="border border-border p-4 space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Current CV</p>
            <p className="font-mono text-sm">{cv.fileName}</p>
            <p className="text-2xs text-muted-foreground">
              {(cv.fileSize / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <div className="flex gap-2">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- /api/cv is a download endpoint, not a page */}
            <a
              href="/api/cv"
              className="border border-primary px-4 py-2 font-mono text-2xs tracking-widest text-primary hover:bg-primary/5"
            >
              DOWNLOAD
            </a>
            <Button
              type="button"
              variant="outline"
              onClick={handleDelete}
              disabled={isLoading}
              className="cursor-pointer border-destructive text-destructive hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
