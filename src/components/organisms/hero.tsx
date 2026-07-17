import Link from "next/link";
import Image from "next/image";
import type { Profile } from "@/generated/prisma/client";
import { FigureLabel } from "@/components/atoms/figure-label";
import { Reveal } from "@/components/atoms/reveal";
import { CVDownloadButton } from "@/components/atoms/cv-download-button";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="flex min-h-[70vh] flex-col justify-center py-20">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        {profile.avatarUrl && (
          <Reveal>
            <div className="relative h-64 w-48 shrink-0 overflow-hidden rounded-lg sm:h-80 sm:w-60 lg:h-96 lg:w-72">
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                fill
                unoptimized
                className="object-cover scale-100 brightness-110 dark:brightness-100 grayscale transition-all duration-500 ease-in-out will-change-[filter,transform,opacity] hover:grayscale-0 hover:brightness-125 dark:hover:brightness-110 hover:scale-105"
                priority
              />
            </div>
          </Reveal>
        )}

        <div className="min-w-0 flex-1">
          <Reveal>
            <FigureLabel fig="00" className="mb-6 block">
              {profile.role.toUpperCase()}
            </FigureLabel>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-mono text-[10vw] font-medium leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {profile.name}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-foreground">
              {profile.summary}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/experience"
                className="border border-primary px-6 py-3 font-mono text-2xs tracking-widest text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
              >
                VIEW EXPERIENCE
              </Link>
              <CVDownloadButton />
              <Link
                href="/contact"
                className="border border-dashed border-border px-6 py-3 font-mono text-2xs tracking-widest text-foreground transition-all duration-200 hover:border-primary"
              >
                GET IN TOUCH
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
