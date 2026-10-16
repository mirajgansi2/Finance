"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { submitContact } from "./api";
import { contactSchema, type ContactFormValues } from "./schema";

type Status = null | "success" | "rateLimited" | "validation" | "unavailable";

const defaultValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

const inputFields = [
  { name: "firstName", labelKey: "firstName", type: "text", autoComplete: "given-name", required: true },
  { name: "lastName", labelKey: "lastName", type: "text", autoComplete: "family-name", required: true },
  { name: "email", labelKey: "email", type: "email", autoComplete: "email", required: true },
  { name: "phone", labelKey: "phone", type: "tel", autoComplete: "tel", required: false },
] as const;

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="field-error">
      {message}
    </p>
  ) : null;
}

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus(null);
    const result = await submitContact(values, locale);
    if (result.ok) {
      reset();
      setStatus("success");
    } else {
      setStatus(result.reason);
    }
  });

  const errorText = (key?: string) => (key ? t(`errors.${key}`) : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="contact-form">
      <div className="form-grid">
        {inputFields.map((field) => {
          const error = errors[field.name]?.message;
          const id = `cf-${field.name}`;
          return (
            <div key={field.name} className="field">
              <label htmlFor={id} className="field-label">
                {t(`form.${field.labelKey}`)}
                {field.required ? (
                  <span aria-hidden="true"> *</span>
                ) : (
                  <span className="field-hint"> ({t("form.optional")})</span>
                )}
              </label>
              <input
                id={id}
                type={field.type}
                autoComplete={field.autoComplete}
                className="field-input"
                aria-required={field.required}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                {...register(field.name)}
              />
              <FieldError id={`${id}-error`} message={errorText(error)} />
            </div>
          );
        })}

        <div className="field form-grid__full">
          <label htmlFor="cf-message" className="field-label">
            {t("form.message")}
            <span aria-hidden="true"> *</span>
          </label>
          <textarea
            id="cf-message"
            rows={5}
            className="field-input"
            aria-required="true"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "cf-message-error" : undefined}
            {...register("message")}
          />
          <FieldError
            id="cf-message-error"
            message={errorText(errors.message?.message)}
          />
        </div>

        {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
        <div className="hp-field" aria-hidden="true">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        <div className="form-grid__full">
          <button
            type="submit"
                    className="btn btn-brand btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("form.sending") : t("form.submit")}
          </button>
        </div>
      </div>

      <div role="status" aria-live="polite">
        {status && (
          <p
            className={`form-status ${
              status === "success" ? "form-status--success" : "form-status--error"
            }`}
          >
            {t(`status.${status}`)}
          </p>
        )}
      </div>
    </form>
  );
}