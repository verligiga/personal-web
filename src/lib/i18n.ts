/**
 * Picks the Indonesian value for CMS content when viewing the `id` locale
 * and it's been filled in, falling back to the English value otherwise -
 * fields default to English until manually translated in the admin. Treats
 * an empty array the same as "not translated yet" (Json bullet fields parse
 * to `[]` rather than `null` when the ID textarea is left blank).
 */
export function localized<T>(locale: string, en: T, id: T | null | undefined): T {
  if (locale !== "id" || id == null) return en;
  if (Array.isArray(id) && id.length === 0) return en;
  return id;
}
