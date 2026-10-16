import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "required").max(60, "tooLong"),
  lastName: z.string().trim().min(1, "required").max(60, "tooLong"),
  email: z
    .string()
    .trim()
    .min(1, "required")
    .max(254, "tooLong")
    .email("invalidEmail"),
  phone: z
    .string()
    .trim()
    .refine((value) => value === "" || /^\+?[\d\s-]{7,15}$/.test(value), "invalidPhone"),
  message: z.string().trim().min(10, "messageTooShort").max(2000, "tooLong"),
  // Honeypot: real visitors never see or fill this. The backend rejects submissions where it has a value.
  website: z.string(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;