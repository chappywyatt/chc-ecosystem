type BadgeColor =
  | "navy"
  | "fluent"
  | "gold"
  | "green"
  | "red"
  | "orange"
  | "purple"
  | "gray";

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  className?: string;
}

const colorStyles: Record<BadgeColor, string> = {
  navy: "bg-navy/10 text-navy",
  fluent: "bg-fluent-light text-fluent",
  gold: "bg-gold/15 text-gold",
  green: "bg-pillar-character/10 text-pillar-character",
  red: "bg-status-untrained/10 text-status-untrained",
  orange: "bg-pillar-connection/10 text-pillar-connection",
  purple: "bg-pillar-constitutional/10 text-pillar-constitutional",
  gray: "bg-text-tertiary/15 text-text-secondary",
};

function Badge({ children, color = "gray", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
        ${colorStyles[color]} ${className}`}
    >
      {children}
    </span>
  );
}

export { Badge, type BadgeColor };
