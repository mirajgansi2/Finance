import type { Metadata } from "next";
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { PageHeader } from "@/components/layout/PageHeader";
import { newsItems } from "@/features/news/placeholderContent";
import { localized } from "@/lib/localized";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return { title: t("title") };
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("news");
  const tCommon = await getTranslations("common");
  const format = await getFormatter();

  // Newest first
  const items = [...newsItems].sort((a, b) =>
    b.publishedOn.localeCompare(a.publishedOn),
  );

  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} />

      <section className="section">
        <div className="container-page page-stack">
          {items.length === 0 ? (
            <p className="notice-banner" role="status">
              {t("empty")}
            </p>
          ) : (
            items.map((item) => (
              <article key={item.id} className="card">
                <p className="meta-line">
                  <span className="tag">{t(`categories.${item.category}`)}</span>
                  <span>
                    {t("published")}:{" "}
                    <time dateTime={item.publishedOn}>
                      {format.dateTime(new Date(item.publishedOn), {
                        dateStyle: "medium",
                        timeZone: "UTC",
                      })}
                    </time>
                  </span>
                </p>
                <h2 className="heading-md" style={{ marginTop: "0.75rem" }}>
                  {localized(item.title, locale)}
                </h2>
                <p className="card__text">{localized(item.summary, locale)}</p>
              </article>
            ))
          )}

          <p className="notice-banner" role="note">
            {tCommon("placeholderNotice")}
          </p>
        </div>
      </section>
    </>
  );
}