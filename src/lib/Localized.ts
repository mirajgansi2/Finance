import type { Locale } from "@/i18n/routing";

/** Bilingual content field. Nepali is optional; English is the fallback. */
export type LocalizedText = { en: string } & Partial<Record<Locale, string>>;

export function localized(field: LocalizedText, locale: string): string {
  return field[locale as Locale] || field.en;
}