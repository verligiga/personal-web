import type { Skill, SkillCategory } from "@/generated/prisma/client";
import {
  createSkill,
  createSkillCategory,
  deleteSkill,
  deleteSkillCategory,
} from "@/lib/actions/skills";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { Panel } from "@/components/molecules/panel";

type CategoryWithSkills = SkillCategory & { skills: Skill[] };

export function SkillsManager({ categories }: { categories: CategoryWithSkills[] }) {
  return (
    <div>
      <div className="flex flex-col gap-8">
        {categories.map((cat) => (
          <Panel key={cat.id}>
            <div className="flex items-center justify-between">
              <h2 className="font-mono text-sm tracking-widest text-foreground">
                {cat.label.toUpperCase()}
              </h2>
              <form action={deleteSkillCategory.bind(null, cat.id)}>
                <button className="font-mono text-2xs text-destructive transition-colors hover:underline">
                  DELETE CATEGORY
                </button>
              </form>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <li
                  key={skill.id}
                  className="flex items-center gap-2 border border-dashed border-border px-2.5 py-1 font-mono text-2xs text-foreground"
                >
                  {skill.name}
                  <form action={deleteSkill.bind(null, skill.id)}>
                    <button className="text-destructive" aria-label={`Remove ${skill.name}`}>
                      ×
                    </button>
                  </form>
                </li>
              ))}
            </ul>

            <form action={createSkill.bind(null, cat.id)} className="mt-4 flex max-w-xs gap-2">
              <Input name="name" placeholder="New skill" required className="h-9" />
              <Button type="submit" size="sm" variant="outline" className="font-mono text-xs">
                ADD
              </Button>
            </form>
          </Panel>
        ))}
      </div>

      <div className="mt-10">
        <p className="mb-3 font-mono text-2xs tracking-widest text-muted-foreground">
          {"// NEW CATEGORY"}
        </p>
        <form action={createSkillCategory} className="flex max-w-xs gap-2">
          <Input name="label" placeholder="e.g. DevOps" required className="h-9" />
          <Button type="submit" size="sm" className="font-mono text-xs tracking-widest">
            ADD
          </Button>
        </form>
      </div>
    </div>
  );
}
