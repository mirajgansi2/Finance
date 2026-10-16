import type { Metadata } from "next";
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { PageHeader } from "@/components/layout/PageHeader";
import { vacancies } from "@/features/vacancies/placeholderContent";
import { localized } from "@/lib/localized";

type Props = { params: Promise<{ locale: string }> };

// Re-check open/closed status every hour.
export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "careers" });
  return { title: t("title") };
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("careers");
  const tCommon = await getTranslations("common");
  const format = await getFormatter();

  // A vacancy is open until the end of its deadline day (simplified: compared in UTC).
  const today = new Date().toISOString().slice(0, 10);
  const items = vacancies
    .map((vacancy) => ({ ...vacancy, isOpen: vacancy.deadline >= today }))
    .sort((a, b) =>
      a.isOpen === b.isOpen
        ? a.deadline.localeCompare(b.deadline)
        : a.isOpen
          ? -1
          : 1,
    );

  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} />

      <section className="section">
        <div className="container-page page-stack">
          <h2 className="heading-lg">{t("openPositions")}</h2>

          {items.length === 0 ? (
            <p className="notice-banner" role="status">
              {t("empty")}
            </p>
          ) : (
            items.map((vacancy) => (
              <article key={vacancy.id} className="card">
                <div className="vacancy-head">
                  <h3 className="heading-md">
                    {localized(vacancy.title, locale)}
                  </h3>
                  <span
                    className={`tag ${vacancy.isOpen ? "tag--open" : "tag--closed"}`}
                  >
                    {vacancy.isOpen ? t("status.open") : t("status.closed")}
                  </span>
                </div>
                <dl className="detail-list">
                  <dt>{t("department")}</dt>
                  <dd>{localized(vacancy.department, locale)}</dd>
                  <dt>{t("type")}</dt>
                  <dd>{t(`types.${vacancy.type}`)}</dd>
                  <dt>{t("location")}</dt>
                  <dd>{localized(vacancy.location, locale)}</dd>
                  <dt>{t("deadline")}</dt>
                  <dd>
                    <time dateTime={vacancy.deadline}>
                      {format.dateTime(new Date(vacancy.deadline), {
                        dateStyle: "medium",
                        timeZone: "UTC",
                      })}
                    </time>
                  </dd>
                </dl>
              </article>
            ))
          )}

          <p className="notice-banner" role="note">
            {t("applyNote")}
          </p>
          <p className="notice-banner" role="note">
            {tCommon("placeholderNotice")}
          </p>
        </div>
      </section>
    </>
  );
}