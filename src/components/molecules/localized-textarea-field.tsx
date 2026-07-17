"use client";

import { useState } from "react";
import { Textarea } from "@/components/atoms/textarea";
import { Label } from "@/components/atoms/label";
import { cn } from "@/lib/utils";

/**
 * EN/ID tab switcher for a translatable prose field. Both textareas stay
 * mounted at all times (visibility toggled via `hidden`, not conditional
 * rendering) so both values are present in FormData on submit regardless of
 * which tab was last viewed. The Indonesian field defaults to the English
 * value until it's been translated.
 */
export function LocalizedTextareaField({
  label,
  nameEn,
  nameId,
  defaultValueEn,
  defaultValueId,
  rows = 4,
}: {
  label: string;
  nameEn: string;
  nameId: string;
  defaultValueEn?: string | null;
  defaultValueId?: string | null;
  rows?: number;
}) {
  const [tab, setTab] = useState<"en" | "id">("en");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label className="font-mono text-2xs tracking-widest text-muted-foreground">
          {label.toUpperCase()}
        </Label>
        <div className="flex gap-1">
          {(["en", "id"] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setTab(lang)}
              className={cn(
                "border border-dashed px-2 py-0.5 font-mono text-2xs tracking-widest transition-colors",
                tab === lang
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <Textarea
        name={nameEn}
        rows={rows}
        defaultValue={defaultValueEn ?? undefined}
        className={tab === "en" ? "" : "hidden"}
      />
      <Textarea
        name={nameId}
        rows={rows}
        defaultValue={(defaultValueId || defaultValueEn) ?? undefined}
        className={tab === "id" ? "" : "hidden"}
      />
    </div>
  );
}
