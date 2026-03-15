"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Wizard, type WizardStep } from "@/components/ui/Wizard";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { useOrganization } from "@/hooks/useOrganization";
import { usePersonnel, type Person } from "@/hooks/usePersonnel";
import { useCompass, type CompassResponse } from "@/hooks/useCompass";
import { Copy, Check } from "lucide-react";

const ROLES = ["self", "subordinate", "peer", "superior", "commander"] as const;
const ROLE_LABELS: Record<string, string> = {
  self: "Self-Assessment",
  subordinate: "Subordinate",
  peer: "Peer",
  superior: "Superior",
  commander: "Commander/Rater",
};

export default function NewCompassCyclePage() {
  const router = useRouter();
  const { fetchAllOrgs } = useOrganization();
  const { fetchPersonnelForOrgs, displayName } = usePersonnel();
  const { createCycle, generateResponseLinks, loading: submitting, error: submitError } = useCompass();

  const [orgs, setOrgs] = useState<{ id: string; name: string; uic: string }[]>([]);
  const [personnel, setPersonnel] = useState<Person[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [selectedOrgId, setSelectedOrgId] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [period, setPeriod] = useState("");
  const [closesAt, setClosesAt] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set(ROLES));
  const [linksPerRole, setLinksPerRole] = useState<Record<string, number>>({
    self: 1, subordinate: 3, peer: 3, superior: 2, commander: 1,
  });

  // Generated links after submission
  const [generatedLinks, setGeneratedLinks] = useState<CompassResponse[]>([]);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const orgsData = await fetchAllOrgs();
      if (cancelled) return;
      setOrgs(orgsData);
      if (orgsData.length > 0) {
        const people = await fetchPersonnelForOrgs(orgsData.map((o) => o.id));
        if (!cancelled) setPersonnel(people);
      }
      if (!cancelled) setDataLoaded(true);
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orgOptions = useMemo(
    () => orgs.map((o) => ({ value: o.id, label: `${o.name} (${o.uic})` })),
    [orgs]
  );

  const filteredPersonnel = useMemo(
    () => selectedOrgId ? personnel.filter((p) => p.org_id === selectedOrgId) : personnel,
    [personnel, selectedOrgId]
  );

  const selectedPerson = personnel.find((p) => p.id === selectedSubjectId);

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) => {
      const next = new Set(prev);
      if (next.has(role)) next.delete(role);
      else next.add(role);
      return next;
    });
  };

  const handleCreate = async () => {
    if (!selectedSubjectId || !period) return;
    // Use subject as initiator in demo mode
    const cycle = await createCycle(selectedSubjectId, selectedSubjectId, period, closesAt || undefined);
    if (!cycle) return;

    // Generate links for selected roles
    const allRoles: string[] = [];
    for (const role of selectedRoles) {
      const count = linksPerRole[role] ?? 1;
      for (let i = 0; i < count; i++) allRoles.push(role);
    }

    const links = await generateResponseLinks(cycle.id, allRoles);
    setGeneratedLinks(links);
  };

  const copyLink = (token: string) => {
    const url = `${window.location.origin}/compass/respond/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  if (!dataLoaded) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="Initiate Assessment" />
        <Card><Skeleton className="h-6 w-48 mb-4" /><Skeleton className="h-11 w-full" /></Card>
      </>
    );
  }

  // If links are generated, show the distribution view
  if (generatedLinks.length > 0) {
    const byRole = new Map<string, CompassResponse[]>();
    for (const link of generatedLinks) {
      if (!byRole.has(link.respondent_role)) byRole.set(link.respondent_role, []);
      byRole.get(link.respondent_role)!.push(link);
    }

    return (
      <>
        <Breadcrumbs />
        <PageHeader
          title="Assessment Created"
          subtitle={`${selectedPerson ? displayName(selectedPerson) : "Subject"} — ${period}`}
        />
        <Card className="max-w-2xl">
          <div className="mb-4 rounded-lg bg-status-trained/10 px-4 py-3 text-sm text-pillar-character">
            Assessment cycle created successfully. Distribute the links below to respondents.
          </div>

          <div className="space-y-4">
            {Array.from(byRole.entries()).map(([role, links]) => (
              <div key={role}>
                <h3 className="mb-2 text-sm font-semibold text-navy">
                  {ROLE_LABELS[role] ?? role} ({links.length} link{links.length !== 1 ? "s" : ""})
                </h3>
                <div className="space-y-1">
                  {links.map((link, idx) => (
                    <div
                      key={link.id}
                      className="flex items-center gap-2 rounded-lg border border-border px-3 py-2"
                    >
                      <span className="flex-1 truncate text-xs font-mono text-text-secondary">
                        {window.location.origin}/compass/respond/{link.respondent_token.slice(0, 16)}...
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyLink(link.respondent_token)}
                      >
                        {copiedToken === link.respondent_token ? (
                          <><Check size={14} /> Copied</>
                        ) : (
                          <><Copy size={14} /> Copy</>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={() => router.push("/compass")}>
              Done
            </Button>
          </div>
        </Card>
      </>
    );
  }

  const steps: WizardStep[] = [
    {
      title: "Select Subject",
      description: "Who will be assessed?",
      validate: () => {
        const errs: Record<string, string> = {};
        if (!selectedSubjectId) errs.subject = "Please select a subject";
        setErrors(errs);
        return Object.keys(errs).length === 0;
      },
      content: (
        <div className="space-y-4">
          <Select
            label="Filter by Unit"
            options={[{ value: "", label: "All Units" }, ...orgOptions]}
            value={selectedOrgId}
            onChange={(e) => setSelectedOrgId(e.target.value)}
          />
          <div className="max-h-64 overflow-y-auto rounded-lg border border-border">
            {filteredPersonnel.length === 0 ? (
              <div className="p-8 text-center text-sm text-text-tertiary">No personnel found</div>
            ) : (
              filteredPersonnel.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedSubjectId(p.id)}
                  className={`flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left last:border-b-0
                    ${selectedSubjectId === p.id ? "bg-fluent-light" : "hover:bg-surface"}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text">{displayName(p)}</div>
                    <div className="text-xs text-text-tertiary">{p.position_title}</div>
                  </div>
                  <Badge color={p.mos === "56A" ? "navy" : "gold"}>{p.mos}</Badge>
                </button>
              ))
            )}
          </div>
          {errors.subject && <p className="text-sm text-status-untrained">{errors.subject}</p>}
        </div>
      ),
    },
    {
      title: "Assessment Period",
      description: "Set the assessment window.",
      validate: () => {
        const errs: Record<string, string> = {};
        if (!period) errs.period = "Please enter an assessment period";
        setErrors(errs);
        return Object.keys(errs).length === 0;
      },
      content: (
        <div className="space-y-4">
          <Input
            label="Assessment Period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            placeholder="e.g., FY26-Q2"
            required
            error={errors.period}
            helperText="Use fiscal year and quarter format"
          />
          <Input
            label="Close Date"
            type="date"
            value={closesAt}
            onChange={(e) => setClosesAt(e.target.value)}
            helperText="When should this cycle stop accepting responses?"
          />
        </div>
      ),
    },
    {
      title: "Respondent Roles",
      description: "Select which roles should provide feedback and how many links to generate.",
      content: (
        <div className="space-y-3">
          {ROLES.map((role) => (
            <div
              key={role}
              className={`flex items-center justify-between rounded-lg border-2 px-4 py-3
                ${selectedRoles.has(role) ? "border-fluent bg-fluent-light/20" : "border-border"}`}
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedRoles.has(role)}
                  onChange={() => toggleRole(role)}
                  className="h-5 w-5 rounded border-border text-fluent"
                />
                <span className="text-sm font-medium text-text">
                  {ROLE_LABELS[role]}
                </span>
              </label>
              {selectedRoles.has(role) && (
                <div className="flex items-center gap-2">
                  <label className="text-xs text-text-tertiary">Links:</label>
                  <select
                    value={linksPerRole[role] ?? 1}
                    onChange={(e) =>
                      setLinksPerRole((prev) => ({ ...prev, [role]: parseInt(e.target.value) }))
                    }
                    className="h-8 rounded border border-border bg-white px-2 text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Review",
      description: "Confirm the assessment cycle details.",
      content: (
        <div className="space-y-3">
          {submitError && (
            <div className="rounded-lg bg-status-untrained/10 px-4 py-3 text-sm text-status-untrained">
              {submitError}
            </div>
          )}
          <div className="rounded-lg border border-border bg-surface p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <div className="text-xs text-text-tertiary">Subject</div>
                <div className="text-sm font-medium text-text">
                  {selectedPerson ? displayName(selectedPerson) : "—"}
                </div>
              </div>
              <div>
                <div className="text-xs text-text-tertiary">Period</div>
                <div className="text-sm font-medium text-text">{period || "—"}</div>
              </div>
              <div>
                <div className="text-xs text-text-tertiary">Close Date</div>
                <div className="text-sm font-medium text-text">
                  {closesAt ? new Date(closesAt + "T00:00:00").toLocaleDateString() : "No deadline"}
                </div>
              </div>
              <div>
                <div className="text-xs text-text-tertiary">Total Links</div>
                <div className="text-sm font-medium text-text">
                  {Array.from(selectedRoles).reduce((sum, r) => sum + (linksPerRole[r] ?? 1), 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Breadcrumbs />
      <PageHeader title="Initiate Assessment" subtitle="Create a new C³ Compass 360° assessment cycle" />
      <Card className="max-w-2xl">
        <Wizard
          steps={steps}
          onComplete={handleCreate}
          onCancel={() => router.push("/compass")}
          completeLabel="Create & Generate Links"
          loading={submitting}
        />
      </Card>
    </>
  );
}
