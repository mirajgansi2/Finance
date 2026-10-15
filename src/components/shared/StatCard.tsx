import type { CSSProperties, ReactNode } from "react";

type Props = {
  /** Any element, e.g. one of the icons from ./icons */
  icon: ReactNode;
  label: string;
  /** Already formatted, e.g. "Rs. 1,000,000" */
  value: ReactNode;
  /** Any CSS color: "#b45309", "var(--color-navy-700)", "rebeccapurple"... */
  iconColor?: string;
  className?: string;
};

export function StatCard({ icon, label, value, iconColor, className = "" }: Props) {
  const style = iconColor
    ? ({ "--stat-color": iconColor } as CSSProperties)
    : undefined;

  return (
    <div className={`stat-card ${className}`.trim()} style={style}>
      <div className="stat-card__icon" aria-hidden="true">
        {icon}
      </div>
      <div className="stat-card__text">
        <p className="stat-card__label">{label}</p>
        <p className="stat-card__value">{value}</p>
      </div>
    </div>
  );
}