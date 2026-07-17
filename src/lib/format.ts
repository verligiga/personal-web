const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatMonth(date: Date) {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function formatPeriod(startDate: Date, endDate: Date | null) {
  const start = formatMonth(startDate);
  const end = endDate ? formatMonth(endDate) : "Now";
  return `${start} - ${end}`;
}

export function toDateInputValue(date: Date | null | undefined): string {
  if (!date) return "";
  return date.toISOString().slice(0, 10);
}

export function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

export type SubProject = { name: string; tech: string };

export function asSubProjects(value: unknown): SubProject[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (v): v is SubProject =>
      typeof v === "object" &&
      v !== null &&
      typeof (v as SubProject).name === "string" &&
      typeof (v as SubProject).tech === "string",
  );
}
