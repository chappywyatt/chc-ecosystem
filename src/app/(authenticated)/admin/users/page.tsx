"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Users } from "lucide-react";

const ROLES = [
  { role: "admin", label: "Administrator", description: "Full access to all data and settings", color: "red" as const },
  { role: "supervisory_ch", label: "Supervisory Chaplain", description: "Read/write for own org and subordinate orgs", color: "navy" as const },
  { role: "unit_ch", label: "Unit Chaplain", description: "Read/write for own organization", color: "fluent" as const },
  { role: "ras", label: "Religious Affairs Specialist", description: "Read/write for own organization", color: "gold" as const },
  { role: "commander", label: "Commander", description: "Read access for own organization", color: "green" as const },
  { role: "oct", label: "OC/T", description: "Read/write observations for assigned units", color: "orange" as const },
  { role: "respondent", label: "Respondent", description: "Write-only for Compass assessments", color: "purple" as const },
  { role: "viewer", label: "Viewer", description: "Read-only access", color: "gray" as const },
];

export default function UsersPage() {
  return (
    <>
      <Breadcrumbs />
      <PageHeader title="User Management" subtitle="User accounts and role assignments" />

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <Users size={20} className="text-fluent mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-navy">Role-Based Access Control</h3>
            <p className="text-xs text-text-secondary mt-1">
              Users are assigned roles that control their access to data and features.
              In demo mode, all users have admin-level access.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {ROLES.map((r) => (
          <Card key={r.role}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge color={r.color}>{r.role}</Badge>
                </div>
                <h3 className="text-sm font-semibold text-navy">{r.label}</h3>
                <p className="text-xs text-text-secondary mt-0.5">{r.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
