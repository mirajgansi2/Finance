import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

export function Brand() {
  return (
    <Link href="/" className="brand">
      <span className="brand-mark" aria-hidden="true">
        {siteConfig.name.charAt(0)}
      </span>
      <span>{siteConfig.name}</span>
    </Link>
  );
}