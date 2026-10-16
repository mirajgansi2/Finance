import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/PageHeader";

type Props = { params: Promise<{ locale: string }> };

const valueKeys = ["trust", "transparency", "community"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} />

      <section className="section">
        <div className="container-page page-stack">
          <div className="card-grid card-grid--2">
            <article className="card">
              <h2 className="heading-md">{t("mission.title")}</h2>
              <p className="card__text">{t("mission.body")}</p>
            </article>
            <article className="card">
              <h2 className="heading-md">{t("vision.title")}</h2>
              <p className="card__text">{t("vision.body")}</p>
            </article>
          </div>

          <div>
            <h2 className="heading-lg">{t("values.title")}</h2>
            <div className="card-grid" style={{ marginTop: "1.25rem" }}>
              {valueKeys.map((key) => (
                <article key={key} className="card">
                  <h3 className="heading-md">{t(`values.items.${key}.title`)}</h3>
                  <p className="card__text">{t(`values.items.${key}.body`)}</p>
                </article>
              ))}
            </div>
          </div>

          <article className="card">
            <h2 className="heading-md">{t("history.title")}</h2>
            <p className="card__text">{t("history.body")}</p>
          </article>

          <article className="card">
            <h2 className="heading-md">{t("leadership.title")}</h2>
            <p className="card__text">{t("leadership.body")}</p>
          </article>

          <p className="notice-banner" role="note">
            {tCommon("placeholderNotice")}
          </p>
        </div>
      </section>
    </>
  );
}