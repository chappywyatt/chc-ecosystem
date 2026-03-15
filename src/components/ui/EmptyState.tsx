import type { ReactNode } from "react";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-surface-card px-6 py-16 text-center">
      {icon && (
        <div className="mb-4 text-text-tertiary">{icon}</div>
      )}
      <h3 className="mb-1 text-lg font-semibold text-navy">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-text-secondary">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}

export { EmptyState };
