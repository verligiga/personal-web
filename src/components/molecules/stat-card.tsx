import Link from "next/link";
import { Panel } from "@/components/molecules/panel";

export function StatCard({ href, label, count }: { href: string; label: string; count: number }) {
  return (
    <Link href={href}>
      <Panel hoverable>
        <p className="font-mono text-2xs tracking-widest text-muted-foreground">
          {label.toUpperCase()}
        </p>
        <p className="mt-2 font-mono text-3xl text-foreground">{count}</p>
      </Panel>
    </Link>
  );
}
