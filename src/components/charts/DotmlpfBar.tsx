"use client";

import { DOMAIN_COLORS } from "@/lib/constants/dotmlpf";

const DOMAIN_LABELS: Record<string, string> = {
  doctrine: "Doctrine",
  organization: "Organization",
  training: "Training",
  materiel: "Materiel",
  leadership_education: "Leadership & Education",
  personnel: "Personnel",
  facilities: "Facilities",
  policy: "Policy",
};

interface DotmlpfBarProps {
  domainCounts: Record<string, number>;
  onDomainClick?: (domain: string) => void;
}

export function DotmlpfBar({ domainCounts, onDomainClick }: DotmlpfBarProps) {
  const domains = Object.entries(DOMAIN_LABELS)
    .map(([id, label]) => ({
      id,
      label,
      count: domainCounts[id] ?? 0,
      color: DOMAIN_COLORS[id] ?? "#605E5C",
    }))
    .sort((a, b) => b.count - a.count);

  const maxCount = Math.max(...domains.map((d) => d.count), 1);

  return (
    <div className="space-y-2">
      {domains.map((domain) => (
        <button
          key={domain.id}
          onClick={() => onDomainClick?.(domain.id)}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-1.5 text-left transition-colors
            ${onDomainClick ? "hover:bg-surface cursor-pointer" : "cursor-default"}`}
        >
          <span className="w-28 text-xs font-medium text-text-secondary truncate">
            {domain.label}
          </span>
          <div className="flex-1 h-5 rounded bg-border/30 overflow-hidden">
            <div
              className="h-5 rounded transition-all duration-500"
              style={{
                width: `${Math.max((domain.count / maxCount) * 100, domain.count > 0 ? 5 : 0)}%`,
                backgroundColor: domain.color,
              }}
            />
          </div>
          <span className="w-6 text-right text-xs font-semibold text-text">
            {domain.count}
          </span>
        </button>
      ))}
    </div>
  );
}
