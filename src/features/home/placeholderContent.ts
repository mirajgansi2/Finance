import { LocalizedText } from "@/lib/localized";

export type LatestUpdate = {
  id: string;
  addedOn: string; // ISO date: YYYY-MM-DD
  href: string;
  title: LocalizedText;
};

/**
 * PLACEHOLDER data. Replace with API data (published notices) in the backend phase.
 */
export const latestUpdates: LatestUpdate[] = [
  {
    id: "u1",
    addedOn: "2026-10-15",
    href: "/news",
    title: {
      en: "Placeholder: latest notice headline appears here",
      ne: "नमूना: पछिल्लो सूचनाको शीर्षक यहाँ देखिनेछ",
    },
  },
  {
    id: "u2",
    addedOn: "2026-10-10",
    href: "/news",
    title: {
      en: "Placeholder: the second update scrolls after the first",
      ne: "नमूना: दोस्रो अपडेट पहिलोपछि घुम्नेछ",
    },
  },
  {
    id: "u3",
    addedOn: "2026-10-05",
    href: "/news",
    title: {
      en: "Placeholder: real notices will come from the admin area",
      ne: "नमूना: वास्तविक सूचना प्रशासन क्षेत्रबाट आउनेछ",
    },
  },
];