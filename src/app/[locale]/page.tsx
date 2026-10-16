import {
  HandCoins,
  Landmark,
  LayoutGrid,
  PiggyBank,
  Users,
} from "lucide-react";
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { LatestUpdatesTicker } from "@/components/shared/LatestUpdatesTicker";
import { StatCard } from "@/components/shared/StatCard";
import { latestUpdates } from "@/features/home/placeholderContent";
import { Link } from "@/i18n/navigation";
import { localized } from "@/lib/localized";
import { ContactSection } from "@/features/contanct/contactSection";


type Props = { params: Promise<{ locale: string }> };

const services = [
  { key: "savings", Icon: PiggyBank, color: "var(--color-forest-700)" },
  { key: "loans", Icon: HandCoins, color: "var(--color-navy-700)" },
  { key: "other", Icon: LayoutGrid, color: "#b45309" },
] as const;

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const format = await getFormatter();

  // Newest first; the date pill shows when the newest update was added.
  const updates = [...latestUpdates].sort((a, b) =>
    b.addedOn.localeCompare(a.addedOn),
  );
  const newest = updates[0];
  const tickerItems = updates.map((update) => ({
    id: update.id,
    text: localized(update.title, locale),
    href: update.href,
  }));
  // UTC avoids off-by-one-day shifts for date-only values.
  const newestDateText = newest
    ? format.dateTime(new Date(newest.addedOn), {
        dateStyle: "medium",
        timeZone: "UTC",
      })
    : "";

  // SAMPLE amounts only. Replace with verified data from the backend later.
  const money = (amount: number) =>
    `${t("stats.currencyPrefix")} ${format.number(amount, { maximumFractionDigits: 0 })}`;

  return (
    <>
      <section className="hero">
        <div className="container-page hero__inner">
          <h1 className="heading-xl">{t("hero.title")}</h1>
          <p className="hero__lead">{t("hero.subtitle")}</p>
          <div className="hero__actions">
            <Link href="/services" className="btn btn-brand">
              {t("hero.primaryCta")}
            </Link>
            <Link href="/contact" className="btn btn-light">
              {t("hero.secondaryCta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container-page">
          {newest && (
            <LatestUpdatesTicker
              label={t("latest.label")}
              items={tickerItems}
              dateLabel={t("latest.dateLabel")}
              dateIso={newest.addedOn}
              dateText={newestDateText}
              pauseLabel={t("latest.pause")}
              playLabel={t("latest.play")}
            />
          )}

          <div className="message-grid">
            <article className="message-card message-card--chairman">
              <h2 className="message-card__title heading-lg">
                {t("chairman.title")}
              </h2>
              <div className="chairman-body">
                {/* Replace this placeholder with next/image once a real, consented photo is supplied. */}
                <div className="person__photo" aria-hidden="true">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8H4z" />
                  </svg>
                </div>
                <div>
                  <p>{t("chairman.body")}</p>
                  <p className="person__name">{t("chairman.name")}</p>
                  <p className="person__role">{t("chairman.role")}</p>
                </div>
              </div>
            </article>

            <article className="message-card message-card--welcome">
              <h2 className="message-card__title heading-lg">
                {t("welcome.title")}
              </h2>
              <p className="card__text">{t("welcome.body")}</p>
              <div style={{ marginTop: "auto" }}>
                <Link href="/about" className="btn btn-secondary">
                  {t("welcome.cta")}
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="stats-heading">
        <div className="container-page">
          <h2 id="stats-heading" className="heading-lg">
            {t("stats.title")}
          </h2>
          <div className="stats-grid" style={{ marginTop: "1.25rem" }}>
            <StatCard
              icon={<HandCoins />}
              label={t("stats.shareCapital")}
              value={money(1000000)}
              iconColor="var(--color-forest-700)"
            />
            <StatCard
              icon={<PiggyBank />}
              label={t("stats.savings")}
              value={money(2000000)}
              iconColor="var(--color-navy-700)"
            />
            <StatCard
              icon={<Landmark />}
              label={t("stats.loans")}
              value={money(1500000)}
              iconColor="#b45309"
            />
            <StatCard
              icon={<Users />}
              label={t("stats.members")}
              value={format.number(1000, { useGrouping: true })}
              iconColor="#0f766e"
            />
          </div>
          <p className="notice-banner" role="note" style={{ marginTop: "1rem" }}>
            {t("stats.placeholderNote")}
          </p>
        </div>
      </section>

      <section
        className="section section-alt"
        aria-labelledby="services-heading"
      >
        <div className="container-page">
          <h2 id="services-heading" className="heading-lg">
            {t("services.title")}
          </h2>
          <p className="text-lead" style={{ marginTop: "0.5rem" }}>
            {t("services.intro")}
          </p>

         <div className="card-grid" style={{ marginTop: "2rem" }}>
            {services.map(({ key, Icon, color }) => (
              <StatCard
                key={key}
                variant="feature"
                icon={<Icon />}
                iconColor={color}
                label={t(`services.items.${key}.title`)}
                value={t(`services.items.${key}.description`)}
              />
            ))}
          </div>

          <p className="notice-banner" role="note" style={{ marginTop: "2rem" }}>
            {tCommon("placeholderNotice")}
          </p>
        </div>
      </section>

      <ContactSection />
    </>
  );
}