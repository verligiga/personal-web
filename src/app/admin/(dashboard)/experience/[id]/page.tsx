import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateExperience } from "@/lib/actions/experience";
import { ExperienceForm } from "@/components/organisms/experience-form";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = await prisma.experience.findUnique({ where: { id } });
  if (!experience) notFound();

  const action = updateExperience.bind(null, id);

  return (
    <div>
      <h1 className="mb-8 font-mono text-2xl text-foreground">Edit experience</h1>
      <ExperienceForm experience={experience} action={action} />
    </div>
  );
}
