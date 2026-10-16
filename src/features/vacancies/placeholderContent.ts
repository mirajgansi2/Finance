import type { LocalizedText } from "@/lib/localized";

export type Vacancy = {
  id: string;
  title: LocalizedText;
  department: LocalizedText;
  location: LocalizedText;
  type: "fullTime" | "partTime";
  deadline: string; // ISO date: YYYY-MM-DD. Open until the end of this day.
};

const department: LocalizedText = {
  en: "Department (placeholder)",
  ne: "विभाग (नमूना)",
};
const location: LocalizedText = {
  en: "Location to be provided",
  ne: "स्थान उपलब्ध गराइनेछ",
};

/** PLACEHOLDER data. The second vacancy is past its deadline on purpose, to show the Closed state. */
export const vacancies: Vacancy[] = [
  {
    id: "v1",
    title: { en: "Placeholder vacancy 1", ne: "नमूना रिक्त पद १" },
    department,
    location,
    type: "fullTime",
    deadline: "2026-11-30",
  },
  {
    id: "v2",
    title: { en: "Placeholder vacancy 2", ne: "नमूना रिक्त पद २" },
    department,
    location,
    type: "partTime",
    deadline: "2026-09-30",
  },
];