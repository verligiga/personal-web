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

export function parseJsonStringArray(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string" || value.trim() === "") return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}
