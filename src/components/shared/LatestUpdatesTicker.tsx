"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";

export type TickerItem = { id: string; text: string; href: string };

type Props = {
  label: string;
  items: TickerItem[];
  dateLabel: string;
  dateIso: string;
  dateText: string;
  pauseLabel: string;
  playLabel: string;
};

export function LatestUpdatesTicker({
  label,
  items,

}: Props) {
  const [paused, setPaused] = useState(false);

  if (items.length === 0) return null;

  // The list is rendered twice so the loop is seamless.
  // The copy is hidden from assistive tech and removed from the tab order.
  const renderList = (isCopy: boolean) => (
    <ul className="ticker__list" aria-hidden={isCopy ? true : undefined}>
      {items.map((item) => (
        <li key={item.id} className="ticker__item">
          <Link
            href={item.href}
            className="ticker__link"
            tabIndex={isCopy ? -1 : undefined}
          >
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="ticker" aria-labelledby="ticker-heading">
      <h2 id="ticker-heading" className="ticker__label">
        {label}
      </h2>

      <div className="ticker__viewport">
        <div className={`ticker__track${paused ? " is-paused" : ""}`}>
          {renderList(false)}
          {renderList(true)}
        </div>
      </div>

      
    </section>
  );
}