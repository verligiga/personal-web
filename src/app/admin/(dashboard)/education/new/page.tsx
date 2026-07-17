import { createEducation } from "@/lib/actions/education";
import { EducationForm } from "@/components/organisms/education-form";

export default function NewEducationPage() {
  return (
    <div>
      <h1 className="mb-8 font-mono text-2xl text-foreground">New education</h1>
      <EducationForm action={createEducation} />
    </div>
  );
}
