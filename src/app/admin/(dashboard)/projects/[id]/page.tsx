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
  const [project, experiences] = await Promise.all([
    prisma.project.findUnique({ where: { id } }),
    prisma.experience.findMany({
      orderBy: { order: "asc" },
      select: { id: true, role: true, company: true },
    }),
  ]);
  if (!project) notFound();

  const action = updateProject.bind(null, id);

  return (
    <div>
      <h1 className="mb-8 font-mono text-2xl text-foreground">Edit project</h1>
      <ProjectForm project={project} experiences={experiences} action={action} />
    </div>
  );
}
