import type { Education } from "@/generated/prisma/client";
import { FormField } from "@/components/molecules/form-field";
import { LocalizedTextareaField } from "@/components/molecules/localized-textarea-field";
import { Button } from "@/components/atoms/button";

export function EducationForm({
  education,
  action,
}: {
  education?: Education;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="flex max-w-xl flex-col gap-5">
      <FormField label="School" name="school" defaultValue={education?.school} />

      <LocalizedTextareaField
        label="Program"
        nameEn="program"
        nameId="programId"
        defaultValueEn={education?.program}
        defaultValueId={education?.programId}
        rows={1}
      />

      <FormField label="Period" name="period" defaultValue={education?.period} />

      <LocalizedTextareaField
        label="Note (optional)"
        nameEn="note"
        nameId="noteId"
        defaultValueEn={education?.note}
        defaultValueId={education?.noteId}
        rows={2}
      />

      <FormField label="Order" name="order" type="number" defaultValue={String(education?.order ?? 0)} />

      <Button type="submit" className="mt-2 w-fit font-mono text-2xs tracking-widest">
        SAVE
      </Button>
    </form>
  );
}
