export function linesToArray(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string") return [];
  return value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function csvToArray(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string") return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function arrayToLines(value: unknown): string {
  return Array.isArray(value) ? value.filter((v) => typeof v === "string").join("\n") : "";
}

export function arrayToCsv(value: unknown): string {
  return Array.isArray(value) ? value.filter((v) => typeof v === "string").join(", ") : "";
}

export function parseSubProjects(value: FormDataEntryValue | null): { name: string; tech: string }[] {
  if (typeof value !== "string") return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, tech = ""] = line.split("|");
      return { name: name.trim(), tech: tech.trim() };
    });
}

export function parseJsonStringArray(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string" || value.trim() === "") return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function subProjectsToLines(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .filter(
      (v): v is { name: string; tech: string } =>
        typeof v === "object" && v !== null && typeof (v as { name?: unknown }).name === "string",
    )
    .map((p) => `${p.name} | ${p.tech}`)
    .join("\n");
}
