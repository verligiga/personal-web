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
