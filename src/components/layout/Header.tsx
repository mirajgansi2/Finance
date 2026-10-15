"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { mainNav } from "@/config/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { Brand } from "./Brand";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu after navigating.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const links = mainNav.map((item) => (
    <li key={item.key}>
      <Link
        href={item.href}
        className="nav-link"
        aria-current={isActive(item.href) ? "page" : undefined}
      >
        {t(item.key)}
      </Link>
    </li>
  ));

  return (
    <header className="site-header">
      <div className="container-page site-header__bar">
        <Brand />

        <nav aria-label={t("primary")} className="site-nav-desktop">
          <ul className="nav-list">{links}</ul>
        </nav>

        <div className="site-header__actions">
          <LanguageSwitcher />
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">
              {menuOpen ? t("menuClose") : t("menuOpen")}
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="mobile-panel">
          <nav aria-label={t("primary")} className="container-page">
            <ul className="nav-list">{links}</ul>
          </nav>
        </div>
      )}
    </header>
  );
}