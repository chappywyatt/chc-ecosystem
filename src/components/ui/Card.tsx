import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
  onClick?: () => void;
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  accent?: "navy" | "gold" | "fluent";
  action?: ReactNode;
}

const accentStyles = {
  navy: "border-t-4 border-t-navy",
  gold: "border-t-4 border-t-gold",
  fluent: "border-t-4 border-t-fluent",
};

function CardHeader({ title, subtitle, accent, action }: CardHeaderProps) {
  return (
    <div
      className={`flex items-start justify-between border-b border-border px-6 py-4
        ${accent ? accentStyles[accent] : ""}`}
    >
      <div>
        <h3 className="text-lg font-semibold text-navy">{title}</h3>
        {subtitle && (
          <p className="mt-0.5 text-sm text-text-secondary">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

function Card({ children, className = "", padding = true, onClick }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface-card shadow-sm
        ${padding ? "p-6" : ""}
        ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
    >
      {children}
    </div>
  );
}

export { Card, CardHeader };
