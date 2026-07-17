import Link from "next/link";
import { FigureLabel } from "@/components/atoms/figure-label";
import { Button } from "@/components/atoms/button";
import { ThemeToggle } from "@/components/molecules/theme-toggle";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/organization", label: "Organization" },
];

export function AdminSidebar({
  email,
  logout,
}: {
  email?: string | null;
  logout: (formData: FormData) => void;
}) {
  return (
    <aside className="hidden w-48 shrink-0 flex-col gap-6 md:flex">
      <div>
        <FigureLabel fig="A1">CMS</FigureLabel>
        <p className="mt-1 truncate font-mono text-2xs text-muted-foreground">{email}</p>
      </div>

      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="border border-dashed border-transparent px-2 py-1.5 font-mono text-2xs tracking-widest text-muted-foreground transition-colors duration-200 hover:border-border hover:text-foreground"
          >
            {link.label.toUpperCase()}
          </Link>
        ))}
      </nav>

      <ThemeToggle />

      <form action={logout}>
        <Button variant="outline" size="sm" type="submit" className="font-mono text-2xs tracking-widest">
          LOG OUT
        </Button>
      </form>
    </aside>
  );
}
