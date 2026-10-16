import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/PageHeader";

type Props = { params: Promise<{ locale: string }> };

const serviceKeys = ["savings", "loans", "other"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title") };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("services");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} />

      <section className="section">
        <div className="container-page page-stack">
          {serviceKeys.map((key) => (
            <article key={key} id={key} className="card">
              <h2 className="heading-md">{t(`items.${key}.title`)}</h2>
              <p className="card__text">{t(`items.${key}.description`)}</p>
              <dl className="detail-list">
                <dt>{t("eligibility")}</dt>
                <dd>{t("pending")}</dd>
                <dt>{t("documents")}</dt>
                <dd>{t("pending")}</dd>
                <dt>{t("howToApply")}</dt>
                <dd>{t("pending")}</dd>
              </dl>
            </article>
          ))}

          <p className="notice-banner" role="note">
            {t("ratesDisclaimer")}
          </p>
          <p className="notice-banner" role="note">
            {tCommon("placeholderNotice")}
          </p>
        </div>
      </section>
    </>
  );
}