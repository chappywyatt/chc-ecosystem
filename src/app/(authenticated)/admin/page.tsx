"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useOrganization } from "@/hooks/useOrganization";
import { Shield, Building, Users, Database, ArrowRight } from "lucide-react";

export default function AdminPage() {
  const { fetchAllOrgs } = useOrganization();
  const [orgCount, setOrgCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);

  useEffect(() => {
    fetchAllOrgs().then((orgs) => { setOrgCount(orgs.length); setLoaded(true); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  const handleSeedDemo = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      setSeedResult(data.message || (data.error ? `Error: ${data.error}` : "Done"));
    } catch {
      setSeedResult("Failed to seed demo data.");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <>
      <Breadcrumbs />
      <PageHeader title="Administration" subtitle="System management and configuration" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <Link href="/admin/orgs">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <div className="flex items-start justify-between mb-2">
              <Building size={20} className="text-fluent" />
              <ArrowRight size={14} className="text-text-tertiary" />
            </div>
            <h3 className="text-sm font-semibold text-navy">Organizations</h3>
            <p className="text-xs text-text-secondary mt-1">Manage unit hierarchy and UIC assignments</p>
            <div className="mt-3 text-2xl font-semibold text-navy">{loaded ? orgCount : "—"}</div>
          </Card>
        </Link>

        <Link href="/admin/users">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <div className="flex items-start justify-between mb-2">
              <Users size={20} className="text-fluent" />
              <ArrowRight size={14} className="text-text-tertiary" />
            </div>
            <h3 className="text-sm font-semibold text-navy">User Management</h3>
            <p className="text-xs text-text-secondary mt-1">Manage user accounts and role assignments</p>
          </Card>
        </Link>

        <Card>
          <Shield size={20} className="text-gold mb-2" />
          <h3 className="text-sm font-semibold text-navy">System Info</h3>
          <div className="mt-2 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-text-secondary">Version</span>
              <span className="text-text">{process.env.NEXT_PUBLIC_APP_VERSION ?? "1.0.0"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Demo Mode</span>
              <Badge color={isDemoMode ? "gold" : "gray"}>{isDemoMode ? "ON" : "OFF"}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Organizations</span>
              <span className="text-text">{loaded ? orgCount : "—"}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Seed Demo Data */}
      {isDemoMode && (
        <Card className="border-l-4 border-l-gold">
          <div className="flex items-start gap-3">
            <Database size={20} className="text-gold mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-navy">Seed Demo Data</h3>
              <p className="text-xs text-text-secondary mt-1">
                Load the 1st Cavalry Division demo dataset with organizations, personnel, training events, observations, gaps, and IDPs.
              </p>
              {seedResult && (
                <div className={`mt-2 rounded px-3 py-2 text-xs ${seedResult.startsWith("Error") ? "bg-status-untrained/10 text-status-untrained" : "bg-status-trained/10 text-pillar-character"}`}>
                  {seedResult}
                </div>
              )}
              <Button className="mt-3" size="sm" onClick={handleSeedDemo} loading={seeding}>
                <Database size={14} /> Seed Demo Data
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
