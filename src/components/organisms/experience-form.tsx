import type { Experience } from "@/generated/prisma/client";
import { arrayToCsv, arrayToLines, subProjectsToLines } from "@/lib/actions/parse";
import { toDateInputValue } from "@/lib/format";
import { FormField, FieldLabel } from "@/components/molecules/form-field";
import { Textarea } from "@/components/atoms/textarea";
import { Button } from "@/components/atoms/button";

export function ExperienceForm({
  experience,
  action,
}: {
  experience?: Experience;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Role" name="role" defaultValue={experience?.role} />
        <FormField label="Company" name="company" defaultValue={experience?.company} />
      </div>

      <FormField
        label="Company URL (optional)"
        name="companyUrl"
        defaultValue={experience?.companyUrl ?? ""}
        required={false}
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <FormField
          label="Start date"
          name="startDate"
          type="date"
          defaultValue={toDateInputValue(experience?.startDate)}
        />
        <FormField
          label="End date (blank = current)"
          name="endDate"
          type="date"
          defaultValue={toDateInputValue(experience?.endDate)}
          required={false}
        />
        <FormField
          label="Order"
          name="order"
          type="number"
          defaultValue={String(experience?.order ?? 0)}
        />
      </div>

      <FieldLabel label="Bullets (one per line)">
        <Textarea name="bullets" rows={5} defaultValue={arrayToLines(experience?.bullets)} />
      </FieldLabel>

      <FieldLabel label="Tech stack (comma separated)">
        <Textarea name="techStack" rows={2} defaultValue={arrayToCsv(experience?.techStack)} />
      </FieldLabel>

      <FieldLabel label="Sub-projects (optional — one per line, format: Name | Tech, Tech2)">
        <Textarea
          name="subProjects"
          rows={4}
          defaultValue={subProjectsToLines(experience?.subProjects)}
        />
      </FieldLabel>

      <Button type="submit" className="mt-2 w-fit font-mono text-2xs tracking-widest">
        SAVE
      </Button>
    </form>
  );
}
