/**
 * Central, easily replaceable site identity.
 * All values here are PLACEHOLDERS until the institution supplies verified details.
 */
export const siteConfig = {
  name: "Demo",
  contact: {
    // example.com is a reserved domain, so this can never reach a real mailbox.
    email: "info@example.com",
    phone: "+977-00-0000000",
  },
  map: {
    // Paste the "src" URL from Google Maps > Share > Embed a map ONLY after
    // the institution confirms its exact location. While null, a placeholder shows.
    embedUrl: null as string | null,
  },
} as const;