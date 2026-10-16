import type { LocalizedText } from "@/lib/localized";

export type NewsItem = {
  id: string;
  category: "news" | "notice" | "announcement";
  publishedOn: string; // ISO date: YYYY-MM-DD
  title: LocalizedText;
  summary: LocalizedText;
};

/** PLACEHOLDER data. Replaced by published notices from the backend later. */
export const newsItems: NewsItem[] = [
  {
    id: "n1",
    category: "notice",
    publishedOn: "2026-10-15",
    title: {
      en: "Placeholder notice title",
      ne: "नमूना सूचनाको शीर्षक",
    },
    summary: {
      en: "Placeholder: a short summary of the notice will appear here.",
      ne: "नमूना: सूचनाको छोटो सारांश यहाँ देखिनेछ।",
    },
  },
  {
    id: "n2",
    category: "news",
    publishedOn: "2026-10-10",
    title: {
      en: "Placeholder news headline",
      ne: "नमूना समाचारको शीर्षक",
    },
    summary: {
      en: "Placeholder: a short summary of the news item will appear here.",
      ne: "नमूना: समाचारको छोटो सारांश यहाँ देखिनेछ।",
    },
  },
  {
    id: "n3",
    category: "announcement",
    publishedOn: "2026-10-05",
    title: {
      en: "Placeholder announcement",
      ne: "नमूना घोषणा",
    },
    summary: {
      en: "Placeholder: details of the announcement will appear here.",
      ne: "नमूना: घोषणाको विवरण यहाँ देखिनेछ।",
    },
  },
];