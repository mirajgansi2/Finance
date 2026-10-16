import type { ContactFormValues } from "./schema";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: "rateLimited" | "validation" | "unavailable" };

export async function submitContact(
  values: ContactFormValues,
  locale: string,
): Promise<SubmitResult> {
  try {
    const response = await fetch(`${API_BASE}/api/v1/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, locale }),
    });

    if (response.ok) return { ok: true };
    if (response.status === 429) return { ok: false, reason: "rateLimited" };
    if (response.status === 400 || response.status === 422) {
      return { ok: false, reason: "validation" };
    }
    return { ok: false, reason: "unavailable" };
  } catch {
    // Network error or backend not running
    return { ok: false, reason: "unavailable" };
  }
}