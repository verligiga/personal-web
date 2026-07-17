import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function NavLink({
  href,
  label,
  active,
  onClick,
  className,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "font-mono text-2xs tracking-widest transition-colors duration-200",
        active ? "text-primary" : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      [ {label.toUpperCase()} ]
    </Link>
  );
}
