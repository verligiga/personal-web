import { prisma } from "@/lib/prisma";
import { SkillsManager } from "@/components/organisms/skills-manager";

export default async function AdminSkillsPage() {
  const categories = await prisma.skillCategory.findMany({
    orderBy: { order: "asc" },
    include: { skills: { orderBy: { order: "asc" } } },
  });

  return (
    <div>
      <h1 className="mb-8 font-mono text-2xl text-foreground">Skills</h1>
      <SkillsManager categories={categories} />
    </div>
  );
}
