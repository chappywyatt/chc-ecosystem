"use client";

import { useEffect, useState, useMemo } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { PillarRadar, buildRadarData } from "@/components/charts/PillarRadar";
import {
  BEHAVIORAL_INDICATORS,
  PILLAR_LABELS,
  PILLAR_COLORS,
} from "@/lib/data/indicators-seed";
import { useObservations, type Observation } from "@/hooks/useObservations";
import { useOrganization } from "@/hooks/useOrganization";
import { usePersonnel, type Person } from "@/hooks/usePersonnel";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function GaugeTrendsPage() {
  const { fetchObservations } = useObservations();
  const { fetchAllOrgs } = useOrganization();
  const { fetchPersonnelForOrgs, displayName } = usePersonnel();

  const [observations, setObservations] = useState<Observation[]>([]);
  const [personnel, setPersonnel] = useState<Person[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const orgs = await fetchAllOrgs();
      const orgIds = orgs.map((o) => o.id);
      if (orgIds.length > 0) {
        const [obs, people] = await Promise.all([
          fetchObservations({ orgIds }),
          fetchPersonnelForOrgs(orgIds),
        ]);
        if (!cancelled) {
          setObservations(obs);
          setPersonnel(people);
        }
      }
      if (!cancelled) setLoaded(true);
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Personnel options (only those with observations)
  const subjectIds = useMemo(
    () => new Set(observations.map((o) => o.subject_id)),
    [observations]
  );
  const subjectOptions: SelectOption[] = useMemo(
    () => [
      { value: "", label: "Select a subject..." },
      ...personnel
        .filter((p) => subjectIds.has(p.id))
        .map((p) => ({ value: p.id, label: displayName(p) })),
    ],
    [personnel, subjectIds, displayName]
  );

  // Filter observations for selected subject
  const subjectObs = useMemo(
    () =>
      selectedSubjectId
        ? observations
            .filter((o) => o.subject_id === selectedSubjectId)
            .sort(
              (a, b) =>
                new Date(a.observation_date).getTime() -
                new Date(b.observation_date).getTime()
            )
        : [],
    [observations, selectedSubjectId]
  );

  // Build radar data for most recent observation
  const latestObs = subjectObs.length > 0 ? subjectObs[subjectObs.length - 1] : null;
  const previousObs = subjectObs.length > 1 ? subjectObs[subjectObs.length - 2] : null;

  const radarData = useMemo(() => {
    if (!latestObs) return [];
    return buildRadarData(
      latestObs.ratings as Record<string, { rating: number }>,
      BEHAVIORAL_INDICATORS
    );
  }, [latestObs]);

  const comparisonRadarData = useMemo(() => {
    if (!previousObs) return undefined;
    return buildRadarData(
      previousObs.ratings as Record<string, { rating: number }>,
      BEHAVIORAL_INDICATORS
    );
  }, [previousObs]);

  // Build line chart data for pillar averages over time
  const trendData = useMemo(() => {
    return subjectObs.map((obs) => {
      const pillarAvgs: Record<string, number> = {};
      for (const pillar of Object.keys(PILLAR_LABELS)) {
        const pillarInds = BEHAVIORAL_INDICATORS.filter((i) => i.pillar === pillar);
        const scores = pillarInds
          .map((i) => (obs.ratings[i.id] as { rating: number } | undefined)?.rating ?? 0)
          .filter((v) => v > 0);
        pillarAvgs[pillar] =
          scores.length > 0
            ? Math.round((scores.reduce((s, v) => s + v, 0) / scores.length) * 100) / 100
            : 0;
      }
      return {
        date: new Date(obs.observation_date).toLocaleDateString(undefined, {
          month: "short",
          year: "2-digit",
        }),
        ...pillarAvgs,
      };
    });
  }, [subjectObs]);

  // Delta comparison
  const deltas = useMemo(() => {
    if (!latestObs || !previousObs) return null;
    const result: Record<string, number> = {};
    for (const pillar of Object.keys(PILLAR_LABELS)) {
      const getAvg = (obs: Observation) => {
        const inds = BEHAVIORAL_INDICATORS.filter((i) => i.pillar === pillar);
        const scores = inds
          .map((i) => (obs.ratings[i.id] as { rating: number } | undefined)?.rating ?? 0)
          .filter((v) => v > 0);
        return scores.length > 0
          ? scores.reduce((s, v) => s + v, 0) / scores.length
          : 0;
      };
      result[pillar] = Math.round((getAvg(latestObs) - getAvg(previousObs)) * 100) / 100;
    }
    return result;
  }, [latestObs, previousObs]);

  if (!loaded) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="Behavioral Trends" />
        <SkeletonCard />
      </>
    );
  }

  if (observations.length === 0) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="Behavioral Trends" />
        <EmptyState
          icon={<TrendingUp size={40} />}
          title="No observation data yet"
          description="Trend analysis requires at least one behavioral observation. Start observing to build trend data."
        />
      </>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title="Behavioral Trends"
        subtitle="Track behavioral development over time across the four pillars"
      />

      <div className="mb-6 max-w-md">
        <Select
          label="Select Subject"
          options={subjectOptions}
          value={selectedSubjectId}
          onChange={(e) => setSelectedSubjectId(e.target.value)}
        />
      </div>

      {!selectedSubjectId ? (
        <Card>
          <div className="py-12 text-center text-text-secondary">
            Select a subject above to view their behavioral trend data.
          </div>
        </Card>
      ) : subjectObs.length === 0 ? (
        <EmptyState
          icon={<TrendingUp size={40} />}
          title="No observations for this subject"
          description="This individual has no recorded observations yet."
        />
      ) : (
        <div className="space-y-6">
          {/* Delta indicators */}
          {deltas && (
            <div className="grid gap-3 sm:grid-cols-4">
              {Object.entries(PILLAR_LABELS).map(([pillar, label]) => {
                const delta = deltas[pillar] ?? 0;
                return (
                  <Card key={pillar}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-text-tertiary">{label}</div>
                        <div className="mt-1 flex items-center gap-1.5">
                          {delta > 0 ? (
                            <TrendingUp size={16} className="text-status-trained" />
                          ) : delta < 0 ? (
                            <TrendingDown size={16} className="text-status-untrained" />
                          ) : (
                            <Minus size={16} className="text-text-tertiary" />
                          )}
                          <span
                            className={`text-lg font-bold ${
                              delta > 0
                                ? "text-status-trained"
                                : delta < 0
                                  ? "text-status-untrained"
                                  : "text-text-tertiary"
                            }`}
                          >
                            {delta > 0 ? "+" : ""}
                            {delta.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div
                        className="h-8 w-1 rounded-full"
                        style={{ backgroundColor: PILLAR_COLORS[pillar as keyof typeof PILLAR_COLORS] }}
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Radar chart */}
          <Card padding={false}>
            <CardHeader
              title="Quality Profile"
              subtitle={
                previousObs
                  ? "Current observation vs. previous"
                  : "Most recent observation"
              }
              accent="fluent"
            />
            <div className="p-4">
              {radarData.length > 0 ? (
                <PillarRadar
                  data={radarData}
                  comparisonData={comparisonRadarData}
                  label="Current"
                  comparisonLabel="Previous"
                />
              ) : (
                <div className="py-12 text-center text-text-secondary">
                  Not enough rated behaviors to display the radar chart.
                </div>
              )}
            </div>
          </Card>

          {/* Line chart: pillar trends over time */}
          {subjectObs.length >= 2 && (
            <Card padding={false}>
              <CardHeader
                title="Pillar Trends Over Time"
                subtitle={`${subjectObs.length} observations`}
                accent="navy"
              />
              <div className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EDEBE9" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #EDEBE9",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line
                      type="monotone"
                      dataKey="character"
                      name="Character"
                      stroke={PILLAR_COLORS.character}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="competence"
                      name="Competence"
                      stroke={PILLAR_COLORS.competence}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="connection"
                      name="Connection"
                      stroke={PILLAR_COLORS.connection}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="constitutional"
                      name="Constitutional"
                      stroke={PILLAR_COLORS.constitutional}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          {subjectObs.length < 2 && (
            <Card>
              <div className="py-8 text-center text-sm text-text-secondary">
                Record at least 2 observations to see pillar trend lines over time.
              </div>
            </Card>
          )}
        </div>
      )}
    </>
  );
}
