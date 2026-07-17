import { createOrganizationRole } from "@/lib/actions/organization";
import { OrganizationForm } from "@/components/organisms/organization-form";

export default function NewOrganizationRolePage() {
  return (
    <div>
      <h1 className="mb-8 font-mono text-2xl text-foreground">New organization role</h1>
      <OrganizationForm action={createOrganizationRole} />
    </div>
  );
}
