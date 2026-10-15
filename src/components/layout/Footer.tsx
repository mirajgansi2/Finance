import { useFormatter, useTranslations } from "next-intl";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { Brand } from "./Brand";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const format = useFormatter();

  // Locale-aware: renders Devanagari digits in Nepali.
  const year = format.number(new Date().getFullYear(), { useGrouping: false });
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`;

  return (
    <footer className="site-footer on-dark">
      <div className="container-page">
        <div className="site-footer__grid">
          <div>
            <Brand />
            <p style={{ marginTop: "0.75rem", maxWidth: "26rem" }}>
              {t("description", { name: siteConfig.name })}
            </p>
          </div>

          <nav aria-label={t("quickLinks")}>
            <h2>{t("quickLinks")}</h2>
            <ul className="site-footer__list">
              {mainNav.map((item) => (
                <li key={item.key}>
                  <Link href={item.href}>{tNav(item.key)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2>{t("contactTitle")}</h2>
            <ul className="site-footer__list">
              <li>{t("address")}</li>
              <li>
                {t("phone")}:{" "}
                <a href={phoneHref}>{siteConfig.contact.phone}</a>
              </li>
              <li>
                {t("email")}:{" "}
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>{t("rights", { year, name: siteConfig.name })}</p>
          <ul
            className="site-footer__list"
            style={{ gridAutoFlow: "column", gap: "1.5rem" }}
          >
            <li>
              <Link href="/privacy">{t("privacy")}</Link>
            </li>
            <li>
              <Link href="/terms">{t("terms")}</Link>
            </li>
          </ul>
        </div>
        <p className="notice-banner" role="note" style={{ marginBottom: "1.5rem" }}>
          {tCommon("placeholderNotice")}
        </p>
      </div>
    </footer>
  );
}