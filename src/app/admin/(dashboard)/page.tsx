import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/molecules/stat-card";

export default async function AdminDashboardPage() {
  const [experienceCount, projectCount, skillCount, educationCount, orgCount] =
    await Promise.all([
      prisma.experience.count(),
      prisma.project.count(),
      prisma.skill.count(),
      prisma.education.count(),
      prisma.organizationRole.count(),
    ]);

  const cards = [
    { href: "/admin/experience", label: "Experience", count: experienceCount },
    { href: "/admin/projects", label: "Projects", count: projectCount },
    { href: "/admin/skills", label: "Skills", count: skillCount },
    { href: "/admin/education", label: "Education", count: educationCount },
    { href: "/admin/organization", label: "Organization", count: orgCount },
  ];

  return (
    <div>
      <h1 className="mb-8 font-mono text-2xl text-foreground">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <StatCard key={card.href} href={card.href} label={card.label} count={card.count} />
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/admin/profile"
          className="font-mono text-2xs tracking-widest text-primary transition-colors hover:underline"
        >
          EDIT PROFILE →
        </Link>
      </div>
    </div>
  );
}
