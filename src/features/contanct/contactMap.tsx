import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

export function ContactMap() {
  const t = useTranslations("contact");
  const embedUrl = siteConfig.map.embedUrl;

  if (!embedUrl) {
    return (
      <div className="map-placeholder" role="note">
        <div>
          <MapPin size={32} aria-hidden="true" />
          <p>{t("mapPlaceholder")}</p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      className="map-frame"
      src={embedUrl}
      title={t("mapTitle")}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}