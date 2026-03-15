"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const labelMap: Record<string, string> = {
  dashboard: "Dashboard",
  training: "Training",
  events: "Events",
  readiness: "Readiness",
  metl: "METL",
  gauge: "Gauge",
  observe: "Observe",
  history: "History",
  trends: "Trends",
  compass: "Compass",
  cycles: "Cycles",
  respond: "Respond",
  personnel: "Personnel",
  eval: "Evaluation",
  idp: "IDP",
  development: "Development",
  spiritready: "SpiritReady",
  command: "Command",
  cam: "CAM",
  tasks: "Tasks",
  gaps: "Gaps",
  analysis: "Analysis",
  reports: "Reports",
  analyze: "DOTMLPF-P Analysis",
  admin: "Admin",
  users: "Users",
  orgs: "Organizations",
  audit: "Audit Log",
  login: "Sign In",
  new: "New",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) return null;

  const crumbs = segments.map((seg, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(seg);
    const label = isUuid ? "Detail" : labelMap[seg] || seg;
    const isLast = idx === segments.length - 1;

    return { href, label, isLast };
  });

  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1 text-sm">
      <Link href="/dashboard" className="text-text-tertiary hover:text-fluent">
        Home
      </Link>
      {crumbs.map((crumb) => (
        <span key={crumb.href} className="flex items-center gap-1">
          <ChevronRight size={14} className="text-text-tertiary" />
          {crumb.isLast ? (
            <span className="font-medium text-text">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="text-text-tertiary hover:text-fluent">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
