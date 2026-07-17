import { createProject } from "@/lib/actions/projects";
import { ProjectForm } from "@/components/organisms/project-form";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="mb-8 font-mono text-2xl text-foreground">New project</h1>
      <ProjectForm action={createProject} />
    </div>
  );
}
