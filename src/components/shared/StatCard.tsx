import type { CSSProperties, ReactNode } from "react";

type Props = {
  /** Any element, e.g. an icon from lucide-react */
  icon: ReactNode;
  label: string;
  /** Already formatted, e.g. "Rs. 1,000,000", or a description for the "feature" variant */
  value: ReactNode;
  /** Any CSS color: "#b45309", "var(--color-navy-700)", "rebeccapurple"... */
  iconColor?: string;
  /** "stat": small label above a big value. "feature": bold title above a short description. */
  variant?: "stat" | "feature";
  className?: string;
};

export function StatCard({
  icon,
  label,
  value,
  iconColor,
  variant = "stat",
  className = "",
}: Props) {
  const style = iconColor
    ? ({ "--stat-color": iconColor } as CSSProperties)
    : undefined;

  const classes = [
    "stat-card",
    variant === "feature" ? "stat-card--feature" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style}>
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