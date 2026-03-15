"use client";

import { useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonTable } from "@/components/ui/Skeleton";
import { Table, type Column } from "@/components/ui/Table";
import { useOrganization, type Organization } from "@/hooks/useOrganization";
import { Building } from "lucide-react";

const columns: Column<Organization>[] = [
  { key: "uic", header: "UIC", sortable: true, render: (r) => <span className="font-mono text-xs">{r.uic}</span> },
  { key: "name", header: "Name", sortable: true, render: (r) => <span className="text-sm font-medium text-text">{r.name}</span> },
  { key: "echelon", header: "Echelon", sortable: true, render: (r) => <Badge color="navy">{r.echelon}</Badge> },
  { key: "compo", header: "Component", render: (r) => <Badge color="fluent">{r.compo.toUpperCase()}</Badge> },
  { key: "installation", header: "Installation", render: (r) => <span className="text-sm text-text-secondary">{r.installation || "—"}</span> },
  { key: "is_active", header: "Status", render: (r) => <Badge color={r.is_active ? "green" : "gray"}>{r.is_active ? "Active" : "Inactive"}</Badge> },
];

export default function OrgsPage() {
  const { fetchAllOrgs } = useOrganization();
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchAllOrgs().then((data) => { setOrgs(data); setLoaded(true); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumbs />
      <PageHeader title="Organizations" subtitle="Unit hierarchy and UIC management" />
      {!loaded ? <SkeletonTable rows={6} /> :
        orgs.length === 0 ? (
          <EmptyState icon={<Building size={40} />} title="No organizations" description="Seed demo data from the Admin page to load the 1st Cavalry Division structure." />
        ) : (
          <Table<Organization> columns={columns} data={orgs} keyField="id" />
        )
      }
    </>
  );
}
