import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateEducation } from "@/lib/actions/education";
import { EducationForm } from "@/components/organisms/education-form";

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const education = await prisma.education.findUnique({ where: { id } });
  if (!education) notFound();

  const action = updateEducation.bind(null, id);

  return (
    <div>
      <h1 className="mb-8 font-mono text-2xl text-foreground">Edit education</h1>
      <EducationForm education={education} action={action} />
    </div>
  );
}
