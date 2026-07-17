import type { OrganizationRole } from "@/generated/prisma/client";
import { arrayToLines } from "@/lib/actions/parse";
import { FormField } from "@/components/molecules/form-field";
import { LocalizedTextareaField } from "@/components/molecules/localized-textarea-field";
import { Button } from "@/components/atoms/button";

export function OrganizationForm({
  organizationRole,
  action,
}: {
  organizationRole?: OrganizationRole;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="flex max-w-xl flex-col gap-5">
      <FormField label="Role" name="role" defaultValue={organizationRole?.role} />
      <FormField label="Organization" name="org" defaultValue={organizationRole?.org} />
      <FormField label="Period" name="period" defaultValue={organizationRole?.period} />

      <LocalizedTextareaField
        label="Bullets (one per line)"
        nameEn="bullets"
        nameId="bulletsId"
        defaultValueEn={arrayToLines(organizationRole?.bullets)}
        defaultValueId={arrayToLines(organizationRole?.bulletsId)}
        rows={5}
      />

      <FormField
        label="Order"
        name="order"
        type="number"
        defaultValue={String(organizationRole?.order ?? 0)}
      />

      <Button type="submit" className="mt-2 w-fit font-mono text-2xs tracking-widest">
        SAVE
      </Button>
    </form>
  );
}
