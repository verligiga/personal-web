import { createExperience } from "@/lib/actions/experience";
import { ExperienceForm } from "@/components/organisms/experience-form";

export default function NewExperiencePage() {
  return (
    <div>
      <h1 className="mb-8 font-mono text-2xl text-foreground">New experience</h1>
      <ExperienceForm action={createExperience} />
    </div>
  );
}
