"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

// Language names are shown in their own language and are intentionally not translated.
const languageNames: Record<Locale, string> = {
  en: "English",
  ne: "नेपाली",
};

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchTo(locale: Locale) {
    if (locale === currentLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  }

  return (
    <div
      role="group"
      aria-label={t("label")}
      aria-busy={isPending}
      className="lang-switch"
    >
      {routing.locales.map((locale) => (
        <button
          key={locale}
          type="button"
          lang={locale}
          aria-pressed={locale === currentLocale}
          onClick={() => switchTo(locale)}
          className="lang-switch__btn"
        >
          {languageNames[locale]}
        </button>
      ))}
    </div>
  );
}