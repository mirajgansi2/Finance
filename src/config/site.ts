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
} as const;