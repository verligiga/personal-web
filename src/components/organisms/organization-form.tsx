import type { OrganizationRole } from "@/generated/prisma/client";
import { arrayToLines } from "@/lib/actions/parse";
import { FormField, FieldLabel } from "@/components/molecules/form-field";
import { Textarea } from "@/components/atoms/textarea";
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

      <FieldLabel label="Bullets (one per line)">
        <Textarea name="bullets" rows={5} defaultValue={arrayToLines(organizationRole?.bullets)} />
      </FieldLabel>

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
