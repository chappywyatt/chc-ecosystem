"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { useOrganization, type Organization } from "@/hooks/useOrganization";
import { usePersonnel, type Person } from "@/hooks/usePersonnel";
import { Eye } from "lucide-react";

const echelonOptions: SelectOption[] = [
  { value: "battalion", label: "Battalion" },
  { value: "brigade", label: "Brigade" },
  { value: "division", label: "Division" },
  { value: "corps", label: "Corps" },
];

export default function StartObservationPage() {
  const router = useRouter();
  const { fetchAllOrgs } = useOrganization();
  const { fetchPersonnelForOrgs, displayName } = usePersonnel();

  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [personnel, setPersonnel] = useState<Person[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [selectedOrgId, setSelectedOrgId] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [echelon, setEchelon] = useState("battalion");
  const [context, setContext] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const orgsData = await fetchAllOrgs();
      if (!cancelled) {
        setOrgs(orgsData);
        setDataLoaded(true);
      }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load personnel when org changes
  useEffect(() => {
    if (!selectedOrgId) {
      setPersonnel([]);
      return;
    }
    let cancelled = false;
    async function load() {
      const people = await fetchPersonnelForOrgs([selectedOrgId]);
      if (!cancelled) {
        setPersonnel(people);
        setSelectedSubjectId("");
      }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrgId]);

  const orgOptions: SelectOption[] = useMemo(
    () => orgs.map((o) => ({ value: o.id, label: `${o.name} (${o.uic})` })),
    [orgs]
  );

  const selectedPerson = personnel.find((p) => p.id === selectedSubjectId);

  const handleBegin = () => {
    const errs: Record<string, string> = {};
    if (!selectedSubjectId) errs.subject = "Please select a subject to observe";
    if (!echelon) errs.echelon = "Please select an echelon setting";
    if (!date) errs.date = "Please enter a date";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Store session params in sessionStorage for the active observation page
    const session = {
      subjectId: selectedSubjectId,
      orgId: selectedOrgId,
      echelon,
      context,
      date,
      subjectName: selectedPerson ? displayName(selectedPerson) : "",
      subjectPosition: selectedPerson?.position_title ?? "",
    };
    sessionStorage.setItem("gauge-session", JSON.stringify(session));
    router.push(`/gauge/observe/active`);
  };

  if (!dataLoaded) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="Start Observation" />
        <Card>
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-11 w-full mb-3" />
          <Skeleton className="h-11 w-full" />
        </Card>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title="Start Observation"
        subtitle="Select the chaplain or RAS to observe and the observation context"
      />

      <Card className="max-w-2xl">
        <div className="space-y-5">
          <Select
            label="Unit"
            options={orgOptions}
            value={selectedOrgId}
            onChange={(e) => setSelectedOrgId(e.target.value)}
            placeholder="Select the unit..."
            required
          />

          {/* Subject selection — large cards for easy mobile tapping */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">
              Subject <span className="text-status-untrained">*</span>
            </label>
            {!selectedOrgId ? (
              <div className="rounded-lg border-2 border-dashed border-border px-4 py-8 text-center text-sm text-text-tertiary">
                Select a unit above to see available personnel
              </div>
            ) : personnel.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed border-border px-4 py-8 text-center text-sm text-text-tertiary">
                No personnel found for this unit
              </div>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                {personnel.map((person) => (
                  <button
                    key={person.id}
                    type="button"
                    onClick={() => setSelectedSubjectId(person.id)}
                    className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all
                      ${
                        selectedSubjectId === person.id
                          ? "border-fluent bg-fluent-light/30"
                          : "border-border hover:border-fluent/30 hover:bg-surface"
                      }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                      {person.rank.slice(0, 3)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-text truncate">
                        {displayName(person)}
                      </div>
                      <div className="text-xs text-text-tertiary truncate">
                        {person.position_title}
                      </div>
                    </div>
                    <Badge color={person.mos === "56A" ? "navy" : "gold"}>
                      {person.mos}
                    </Badge>
                  </button>
                ))}
              </div>
            )}
            {errors.subject && (
              <p className="mt-1 text-sm text-status-untrained">{errors.subject}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Echelon Setting"
              options={echelonOptions}
              value={echelon}
              onChange={(e) => setEchelon(e.target.value)}
              required
              error={errors.echelon}
            />
            <Input
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              error={errors.date}
            />
          </div>

          <Input
            label="Context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g., WFX 26-04, Garrison observation, CTC rotation"
            helperText="Describe the setting where behaviors are being observed"
          />

          <div className="flex justify-end pt-4 border-t border-border">
            <Button onClick={handleBegin} size="lg">
              <Eye size={18} />
              Begin Observation
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
