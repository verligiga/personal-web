import type { Education } from "@/generated/prisma/client";
import { FormField, FieldLabel } from "@/components/molecules/form-field";
import { Textarea } from "@/components/atoms/textarea";
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
      <FormField label="Program" name="program" defaultValue={education?.program} />
      <FormField label="Period" name="period" defaultValue={education?.period} />

      <FieldLabel label="Note (optional)">
        <Textarea name="note" rows={2} defaultValue={education?.note ?? ""} />
      </FieldLabel>

      <FormField label="Order" name="order" type="number" defaultValue={String(education?.order ?? 0)} />

      <Button type="submit" className="mt-2 w-fit font-mono text-2xs tracking-widest">
        SAVE
      </Button>
    </form>
  );
}
