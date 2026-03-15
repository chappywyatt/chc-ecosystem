"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardCheck,
  Eye,
  Compass,
  Users,
  Heart,
  Terminal,
  BarChart3,
  Shield,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  section?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
  { label: "Training", href: "/training", icon: <ClipboardCheck size={20} />, section: "LOE 1" },
  { label: "Gauge", href: "/gauge", icon: <Eye size={20} />, section: "LOE 1" },
  { label: "Compass", href: "/compass", icon: <Compass size={20} />, section: "LOE 2" },
  { label: "Personnel", href: "/personnel", icon: <Users size={20} />, section: "LOE 2" },
  { label: "SpiritReady", href: "/spiritready", icon: <Heart size={20} />, section: "LOE 3" },
  { label: "Command", href: "/command", icon: <Terminal size={20} />, section: "LOE 4" },
  { label: "CAM", href: "/cam", icon: <BarChart3 size={20} />, section: "LOE 5" },
  { label: "Admin", href: "/admin", icon: <Shield size={20} /> },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside
      className={`fixed left-0 top-0 z-30 hidden h-screen flex-col border-r border-border bg-surface-card
        transition-[width] duration-200 lg:flex
        ${collapsed ? "w-16" : "w-60"}`}
    >
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-border px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-navy text-sm font-bold text-white">
          C
        </div>
        {!collapsed && (
          <span className="ml-2.5 text-sm font-semibold text-navy truncate">
            CHC Ecosystem
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`mx-2 mb-0.5 flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium
                transition-colors
                ${
                  active
                    ? "bg-fluent-light text-fluent"
                    : "text-text-secondary hover:bg-surface hover:text-text"
                }
                ${collapsed ? "justify-center px-0" : ""}`}
            >
              <span className="shrink-0">{item.icon}</span>
              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}
              {!collapsed && item.section && (
                <span className="ml-auto text-[10px] text-text-tertiary">
                  {item.section}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3">
        {!collapsed && profile && (
          <div className="mb-2 truncate px-2 text-xs text-text-tertiary">
            {profile.display_name || "User"}
            {profile.is_demo && " (Demo)"}
          </div>
        )}
        <div className="flex items-center gap-1">
          <button
            onClick={signOut}
            title="Sign out"
            className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg text-sm
              text-text-secondary hover:bg-surface hover:text-text"
          >
            <LogOut size={16} />
            {!collapsed && <span>Sign Out</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
              text-text-tertiary hover:bg-surface hover:text-text"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>
    </aside>
  );
}
