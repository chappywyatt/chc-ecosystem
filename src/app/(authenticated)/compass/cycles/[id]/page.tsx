"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { PillarRadar } from "@/components/charts/PillarRadar";
import { COMPASS_QUALITIES } from "@/lib/data/compass-qualities";
import { PILLAR_LABELS, PILLAR_COLORS } from "@/lib/data/indicators-seed";
import {
  useCompass,
  type CompassCycle,
  type CompassResponse,
  type AggregatedResult,
} from "@/hooks/useCompass";
import { ArrowLeft, Users, Lock } from "lucide-react";

const ROLE_LABELS: Record<string, string> = {
  self: "Self",
  subordinate: "Subordinate",
  peer: "Peer",
  superior: "Superior",
  commander: "Commander",
};

const pillarBadgeColors: Record<string, "green" | "fluent" | "orange"> = {
  character: "green",
  competence: "fluent",
  connection: "orange",
};

export default function CycleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const cycleId = params.id as string;
  const {
    fetchCycle,
    fetchResponsesForCycle,
    getAggregatedResults,
  } = useCompass();

  const [cycle, setCycle] = useState<CompassCycle | null>(null);
  const [responses, setResponses] = useState<CompassResponse[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [c, r] = await Promise.all([
        fetchCycle(cycleId),
        fetchResponsesForCycle(cycleId),
      ]);
      if (!cancelled) {
        setCycle(c);
        setResponses(r);
        setLoaded(true);
      }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycleId]);

  const { byQuality, meetsThreshold } = useMemo(() => {
    if (!cycle) return { byQuality: [], meetsThreshold: {} };
    return getAggregatedResults(responses, cycle.min_respondents_per_role);
  }, [responses, cycle, getAggregatedResults]);

  // Group responses by role for status display
  const roleStatus = useMemo(() => {
    const groups = new Map<string, { total: number; completed: number }>();
    for (const r of responses) {
      if (!groups.has(r.respondent_role))
        groups.set(r.respondent_role, { total: 0, completed: 0 });
      const g = groups.get(r.respondent_role)!;
      g.total++;
      if (r.is_complete) g.completed++;
    }
    return groups;
  }, [responses]);

  // Build radar data from aggregated results (all roles combined excluding self)
  const radarData = useMemo(() => {
    const othersResults = byQuality.filter((r) => r.role !== "self");
    return COMPASS_QUALITIES.map((q) => {
      const matches = othersResults.filter((r) => r.quality_key === q.id);
      const avg = matches.length > 0
        ? matches.reduce((s, r) => s + r.avg_rating, 0) / matches.length
        : 0;
      return { quality: q.name, score: avg, fullMark: 5 };
    });
  }, [byQuality]);

  const selfRadarData = useMemo(() => {
    const selfResults = byQuality.filter((r) => r.role === "self");
    if (selfResults.length === 0) return undefined;
    return COMPASS_QUALITIES.map((q) => {
      const match = selfResults.find((r) => r.quality_key === q.id);
      return { quality: q.name, score: match?.avg_rating ?? 0, fullMark: 5 };
    });
  }, [byQuality]);

  const hasAnyResults = byQuality.length > 0;

  if (!loaded) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="Assessment Cycle" />
        <div className="space-y-4"><SkeletonCard /><SkeletonCard /></div>
      </>
    );
  }

  if (!cycle) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="Assessment Cycle" />
        <Card>
          <div className="py-12 text-center">
            <p className="text-text-secondary mb-4">Cycle not found.</p>
            <Button variant="secondary" onClick={() => router.push("/compass")}>
              <ArrowLeft size={16} /> Back
            </Button>
          </div>
        </Card>
      </>
    );
  }

  const subjectName = cycle.subject
    ? `${cycle.subject.rank} ${cycle.subject.last_name}, ${cycle.subject.first_name}`
    : "Unknown";

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title={subjectName}
        subtitle={`C³ Compass Assessment — ${cycle.assessment_period}`}
        actions={
          <Button variant="secondary" onClick={() => router.back()}>
            <ArrowLeft size={16} /> Back
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Response collection status */}
          <Card padding={false}>
            <CardHeader title="Response Status" accent="navy" />
            <div className="p-6">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from(roleStatus.entries()).map(([role, status]) => {
                  const threshold = cycle.min_respondents_per_role;
                  const meets = role === "self" || status.completed >= threshold;
                  return (
                    <div
                      key={role}
                      className={`rounded-lg border p-3 ${meets ? "border-status-trained/30 bg-status-trained/5" : "border-border"}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-text">{ROLE_LABELS[role] ?? role}</span>
                        {meets ? (
                          <Badge color="green">Ready</Badge>
                        ) : (
                          <Badge color="gray">Waiting</Badge>
                        )}
                      </div>
                      <div className="text-xs text-text-tertiary">
                        {status.completed} of {status.total} submitted
                        {role !== "self" && ` (min ${threshold})`}
                      </div>
                      <div className="mt-1.5 h-1.5 rounded-full bg-border">
                        <div
                          className="h-1.5 rounded-full bg-fluent transition-all"
                          style={{ width: `${Math.min((status.completed / status.total) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Results */}
          {hasAnyResults ? (
            <>
              <Card padding={false}>
                <CardHeader title="Quality Profile" accent="fluent" />
                <div className="p-4">
                  <PillarRadar
                    data={radarData}
                    comparisonData={selfRadarData}
                    label="Others"
                    comparisonLabel="Self"
                  />
                </div>
              </Card>

              <Card padding={false}>
                <CardHeader title="Quality Breakdown" />
                <div className="divide-y divide-border">
                  {COMPASS_QUALITIES.map((q) => {
                    const othersData = byQuality.filter(
                      (r) => r.quality_key === q.id && r.role !== "self"
                    );
                    const selfData = byQuality.find(
                      (r) => r.quality_key === q.id && r.role === "self"
                    );
                    const othersAvg =
                      othersData.length > 0
                        ? othersData.reduce((s, r) => s + r.avg_rating, 0) / othersData.length
                        : null;
                    const totalRespondents = othersData.reduce(
                      (s, r) => s + r.respondent_count,
                      0
                    );

                    return (
                      <div key={q.id} className="flex items-center gap-4 px-6 py-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-text">{q.name}</span>
                            <Badge color={pillarBadgeColors[q.pillar] ?? "gray"}>
                              {PILLAR_LABELS[q.pillar]}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          {selfData && (
                            <div className="text-center">
                              <div className="font-semibold text-gold">{selfData.avg_rating.toFixed(1)}</div>
                              <div className="text-[10px] text-text-tertiary">Self</div>
                            </div>
                          )}
                          {othersAvg !== null ? (
                            <div className="text-center">
                              <div className="font-semibold text-navy">{othersAvg.toFixed(1)}</div>
                              <div className="text-[10px] text-text-tertiary">
                                Others ({totalRespondents})
                              </div>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Lock size={14} className="mx-auto text-text-tertiary" />
                              <div className="text-[10px] text-text-tertiary">Pending</div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </>
          ) : (
            <Card>
              <div className="py-12 text-center">
                <Users size={40} className="mx-auto mb-3 text-text-tertiary" />
                <h3 className="text-lg font-semibold text-navy mb-1">Waiting for Responses</h3>
                <p className="text-sm text-text-secondary max-w-md mx-auto">
                  Results will appear here once respondents begin submitting their assessments.
                  At least {cycle.min_respondents_per_role} respondents per role category are needed
                  before aggregated results are displayed.
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <h3 className="text-sm font-semibold text-navy mb-3">Cycle Info</h3>
            <div className="space-y-2 text-sm">
              <div><span className="text-text-tertiary">Period:</span> <span className="text-text">{cycle.assessment_period}</span></div>
              <div><span className="text-text-tertiary">Status:</span> <Badge color="fluent">{cycle.status}</Badge></div>
              <div><span className="text-text-tertiary">Min per role:</span> <span className="text-text">{cycle.min_respondents_per_role}</span></div>
              {cycle.closes_at && (
                <div><span className="text-text-tertiary">Closes:</span> <span className="text-text">{new Date(cycle.closes_at).toLocaleDateString()}</span></div>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-navy mb-3">Anonymity</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Individual responses are never displayed. Only aggregated averages are shown,
              and only when the minimum threshold of {cycle.min_respondents_per_role} respondents
              per role category has been met.
            </p>
          </Card>

          {hasAnyResults && (
            <Button
              className="w-full"
              onClick={() => {
                if (cycle.subject) {
                  router.push(`/personnel/${cycle.subject.id}/idp`);
                }
              }}
            >
              Generate IDP from Results
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
