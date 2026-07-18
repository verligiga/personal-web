import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { prisma } from "@/lib/prisma";

const plexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Content is served from Postgres via the admin CMS, so every route renders
// on request rather than being statically prerendered at build time.
export const dynamic = "force-dynamic";

const title = "Gregorius Verli Giga Winarno - Fullstack JavaScript Developer";
const description =
  "Portofolio of Gregorius Verli Giga Winarno, a fullstack JavaScript developer specializing in React, Next.js and Node.js.";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await prisma.profile.findFirst();
  const images = profile?.avatarUrl ? [{ url: profile.avatarUrl }] : undefined;

  return {
    title,
    description,
    openGraph: { title, description, images, type: "website" },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="ambient-glow flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" themes={["light", "dark"]}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
