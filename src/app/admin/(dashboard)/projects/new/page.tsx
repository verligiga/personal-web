import { prisma } from "@/lib/prisma";
import { createProject } from "@/lib/actions/projects";
import { ProjectForm } from "@/components/organisms/project-form";

export default async function NewProjectPage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { order: "asc" },
    select: { id: true, role: true, company: true },
  });

  return (
    <div>
      <h1 className="mb-8 font-mono text-2xl text-foreground">New project</h1>
      <ProjectForm experiences={experiences} action={createProject} />
    </div>
  );
}
