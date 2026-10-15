import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

const serviceKeys = ["savings", "loans", "other"] as const;

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");

  return (
    <>
      <section className="hero">
        <div className="container-page hero__inner">
          <h1 className="heading-xl">{t("hero.title")}</h1>
          <p className="hero__lead">{t("hero.subtitle")}</p>
          <div className="hero__actions">
            <Link href="/services" className="btn btn-primary">
              {t("hero.primaryCta")}
            </Link>
            <Link href="/contact" className="btn btn-light">
              {t("hero.secondaryCta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="services-heading">
        <div className="container-page">
          <h2 id="services-heading" className="heading-lg">
            {t("services.title")}
          </h2>
          <p className="text-lead" style={{ marginTop: "0.5rem" }}>
            {t("services.intro")}
          </p>

          <div className="card-grid" style={{ marginTop: "2rem" }}>
            {serviceKeys.map((key) => (
              <article key={key} className="card">
                <h3 className="heading-md">{t(`services.items.${key}.title`)}</h3>
                <p style={{ marginTop: "0.5rem", color: "var(--color-muted)" }}>
                  {t(`services.items.${key}.description`)}
                </p>
              </article>
            ))}
          </div>

          <p className="notice-banner" role="note" style={{ marginTop: "2rem" }}>
            {tCommon("placeholderNotice")}
          </p>
        </div>
      </section>
    </>
  );
}