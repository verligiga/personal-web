import type { Experience } from "@/generated/prisma/client";
import { arrayToLines } from "@/lib/actions/parse";
import { toDateInputValue } from "@/lib/format";
import { FormField, FieldLabel } from "@/components/molecules/form-field";
import { LocalizedTextareaField } from "@/components/molecules/localized-textarea-field";
import { Select } from "@/components/atoms/select";
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
      <LocalizedTextareaField
        label="Role"
        nameEn="role"
        nameId="roleId"
        defaultValueEn={experience?.role}
        defaultValueId={experience?.roleId}
        rows={1}
      />

      <FormField label="Company" name="company" defaultValue={experience?.company} />

      <FormField
        label="Company URL (optional)"
        name="companyUrl"
        defaultValue={experience?.companyUrl ?? ""}
        required={false}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Location (optional)"
          name="location"
          defaultValue={experience?.location ?? ""}
          required={false}
        />
        <FieldLabel label="Work type (optional)">
          <Select name="workType" defaultValue={experience?.workType ?? ""}>
            <option value="">Not specified</option>
            <option value="On-site">On-site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </Select>
        </FieldLabel>
      </div>

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

      <LocalizedTextareaField
        label="Bullets (one per line)"
        nameEn="bullets"
        nameId="bulletsId"
        defaultValueEn={arrayToLines(experience?.bullets)}
        defaultValueId={arrayToLines(experience?.bulletsId)}
        rows={5}
      />

      <p className="font-mono text-2xs text-muted-foreground">
        Tech stack is derived from linked projects, and related projects are linked from each
        project&apos;s own edit page, not here.
      </p>

      <Button type="submit" className="mt-2 w-fit font-mono text-2xs tracking-widest">
        SAVE
      </Button>
    </form>
  );
}
