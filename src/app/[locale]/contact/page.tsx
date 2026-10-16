import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactSection } from "@/features/contanct/contactSection";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return { title: t("title") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contactPage");

  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} />
      <ContactSection />
    </>
  );
}