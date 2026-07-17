import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProject } from "@/lib/actions/projects";
import { ProjectForm } from "@/components/organisms/project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  const action = updateProject.bind(null, id);

  return (
    <div>
      <h1 className="mb-8 font-mono text-2xl text-foreground">Edit project</h1>
      <ProjectForm project={project} action={action} />
    </div>
  );
}
