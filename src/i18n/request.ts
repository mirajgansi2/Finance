import { hasLocale, type AbstractIntlMessages } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

// Explicit imports (no template-string paths), so the bundler can always resolve every file.
// Add a new messages file here when you add a new language or feature file.
const messageLoaders: Record<Locale, () => Promise<AbstractIntlMessages>> = {
  en: async () => ({
    ...(await import("../messages/en.json")).default,
    ...(await import("../messages/pages/en.json")).default,
  }),
  ne: async () => ({
    ...(await import("../messages/ne.json")).default,
    ...(await import("../messages/pages/ne.json")).default,
  }),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await messageLoaders[locale](),
    onError(error) {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
    },
    // A missing key renders visibly as "namespace.key" instead of blank text.
    getMessageFallback({ namespace, key }) {
      return [namespace, key].filter(Boolean).join(".");
    },
  };
});