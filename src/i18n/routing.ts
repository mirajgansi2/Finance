import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ne"],
  defaultLocale: "en",
  // The URL prefix (/en, /ne) is the single source of truth for language.
  // Disabling detection means first-time visitors always start in English.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];