"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardCheck,
  Eye,
  Compass,
  Users,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

const primaryTabs = [
  { label: "Home", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
  { label: "Training", href: "/training", icon: <ClipboardCheck size={20} /> },
  { label: "Gauge", href: "/gauge", icon: <Eye size={20} /> },
  { label: "Compass", href: "/compass", icon: <Compass size={20} /> },
  { label: "More", href: "#more", icon: <MoreHorizontal size={20} /> },
];

const moreTabs = [
  { label: "Personnel", href: "/personnel" },
  { label: "SpiritReady", href: "/spiritready" },
  { label: "Command", href: "/command" },
  { label: "CAM", href: "/cam" },
  { label: "Admin", href: "/admin" },
];

export function MobileNav() {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);

  const isActive = (href: string) =>
    href !== "#more" &&
    (pathname === href || pathname.startsWith(href + "/"));

  return (
    <>
      {/* More menu overlay */}
      {showMore && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setShowMore(false)}>
          <div className="absolute inset-0 bg-navy/30" />
          <div className="absolute bottom-16 left-0 right-0 rounded-t-xl border-t border-border bg-surface-card p-4">
            <div className="mb-2 text-xs font-medium text-text-tertiary uppercase">
              More Tools
            </div>
            {moreTabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => setShowMore(false)}
                className={`block rounded-lg px-4 py-3 text-sm font-medium
                  ${isActive(tab.href) ? "bg-fluent-light text-fluent" : "text-text hover:bg-surface"}`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface-card lg:hidden">
        <div className="flex">
          {primaryTabs.map((tab) => {
            const active = isActive(tab.href);
            const isMoreBtn = tab.href === "#more";

            if (isMoreBtn) {
              return (
                <button
                  key="more"
                  onClick={() => setShowMore(!showMore)}
                  className={`flex h-16 flex-1 flex-col items-center justify-center gap-0.5
                    ${showMore ? "text-fluent" : "text-text-tertiary"}`}
                >
                  {tab.icon}
                  <span className="text-[10px] font-medium">{tab.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex h-16 flex-1 flex-col items-center justify-center gap-0.5
                  ${active ? "text-fluent" : "text-text-tertiary hover:text-text"}`}
              >
                {tab.icon}
                <span className="text-[10px] font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
