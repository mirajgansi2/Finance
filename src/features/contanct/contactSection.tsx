import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { ContactForm } from "./contactForm";
import { ContactMap } from "./contactMap";


export function ContactSection() {
  const t = useTranslations("contact");
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`;

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container-page">
        <div className="contact-panel">
          <h2 id="contact-heading" className="heading-lg">
            {t("title")}
          </h2>
          <p className="text-lead" style={{ marginTop: "0.5rem" }}>
            {t("intro")}
          </p>

          <div className="contact-grid">
            <div>
              <h3 className="heading-md">{t("findUs")}</h3>
              <ContactMap />
              <ul className="contact-details">
                <li>
                  <MapPin size={20} aria-hidden="true" />
                  <span>{t("address")}</span>
                </li>
                <li>
                  <Clock size={20} aria-hidden="true" />
                  <span>{t("hours")}</span>
                </li>
                <li>
                  <Phone size={20} aria-hidden="true" />
                  <span>
                    {t("phoneLabel")}:{" "}
                    <a href={phoneHref}>{siteConfig.contact.phone}</a>
                  </span>
                </li>
                <li>
                  <Mail size={20} aria-hidden="true" />
                  <span>
                    {t("emailLabel")}:{" "}
                    <a href={`mailto:${siteConfig.contact.email}`}>
                      {siteConfig.contact.email}
                    </a>
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="heading-md">{t("formTitle")}</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}