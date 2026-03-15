"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonTable } from "@/components/ui/Skeleton";
import { Table, type Column } from "@/components/ui/Table";
import { useOrganization, type Organization } from "@/hooks/useOrganization";
import { usePersonnel, type Person } from "@/hooks/usePersonnel";
import { Users } from "lucide-react";

const mosOptions: SelectOption[] = [
  { value: "", label: "All MOS" },
  { value: "56A", label: "56A — Chaplain" },
  { value: "56M", label: "56M — Religious Affairs Specialist" },
  { value: "56D", label: "56D — Religious Affairs NCO" },
  { value: "56X", label: "56X — Other" },
];

const statusOptions: SelectOption[] = [
  { value: "", label: "All Statuses" },
  { value: "present", label: "Present for Duty" },
  { value: "tdy", label: "TDY" },
  { value: "deployed", label: "Deployed" },
  { value: "leave", label: "On Leave" },
  { value: "attached", label: "Attached" },
  { value: "rear_d", label: "Rear Detachment" },
];

const statusBadgeColors: Record<string, "green" | "gold" | "fluent" | "gray" | "orange"> = {
  present: "green",
  tdy: "gold",
  deployed: "fluent",
  leave: "gray",
  attached: "orange",
  rear_d: "gray",
};

const columns: Column<Person>[] = [
  {
    key: "rank",
    header: "Rank",
    sortable: true,
    className: "whitespace-nowrap",
  },
  {
    key: "last_name",
    header: "Name",
    sortable: true,
    render: (row) => `${row.last_name}, ${row.first_name}`,
  },
  {
    key: "mos",
    header: "MOS",
    sortable: true,
    render: (row) => <Badge color={row.mos === "56A" ? "navy" : "gold"}>{row.mos}</Badge>,
  },
  {
    key: "position_title",
    header: "Position",
    render: (row) => <span className="text-text-secondary">{row.position_title}</span>,
  },
  {
    key: "organization",
    header: "Unit",
    render: (row) => <span className="text-text-secondary">{row.organization?.name ?? "—"}</span>,
  },
  {
    key: "duty_status",
    header: "Status",
    sortable: true,
    render: (row) => (
      <Badge color={statusBadgeColors[row.duty_status] ?? "gray"}>
        {row.duty_status.replace(/_/g, " ")}
      </Badge>
    ),
  },
];

export default function PersonnelPage() {
  const router = useRouter();
  const { fetchAllOrgs } = useOrganization();
  const { fetchPersonnelForOrgs } = usePersonnel();

  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [personnel, setPersonnel] = useState<Person[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [filterOrg, setFilterOrg] = useState("");
  const [filterMos, setFilterMos] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const orgsData = await fetchAllOrgs();
      if (cancelled) return;
      setOrgs(orgsData);
      const people = await fetchPersonnelForOrgs(orgsData.map((o) => o.id));
      if (!cancelled) { setPersonnel(people); setLoaded(true); }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orgOptions: SelectOption[] = useMemo(
    () => [{ value: "", label: "All Units" }, ...orgs.map((o) => ({ value: o.id, label: o.name }))],
    [orgs]
  );

  const filtered = useMemo(() => {
    let result = personnel;
    if (filterOrg) result = result.filter((p) => p.org_id === filterOrg);
    if (filterMos) result = result.filter((p) => p.mos === filterMos);
    if (filterStatus) result = result.filter((p) => p.duty_status === filterStatus);
    return result;
  }, [personnel, filterOrg, filterMos, filterStatus]);

  return (
    <>
      <Breadcrumbs />
      <PageHeader title="Personnel" subtitle="Chaplain Corps personnel roster" />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Select label="Unit" options={orgOptions} value={filterOrg} onChange={(e) => setFilterOrg(e.target.value)} />
        <Select label="MOS" options={mosOptions} value={filterMos} onChange={(e) => setFilterMos(e.target.value)} />
        <Select label="Duty Status" options={statusOptions} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} />
      </div>

      {!loaded ? (
        <SkeletonTable rows={8} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Users size={40} />}
          title="No personnel found"
          description={personnel.length === 0 ? "No personnel have been added yet." : "No personnel match your filters."}
        />
      ) : (
        <Table<Person>
          columns={columns}
          data={filtered}
          keyField="id"
          onRowClick={(row) => router.push(`/personnel/${row.id}`)}
        />
      )}
    </>
  );
}
