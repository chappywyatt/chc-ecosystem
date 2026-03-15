"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonTable } from "@/components/ui/Skeleton";
import { Table, type Column } from "@/components/ui/Table";
import { useObservations, type Observation } from "@/hooks/useObservations";
import { useOrganization } from "@/hooks/useOrganization";
import { PILLAR_LABELS } from "@/lib/data/indicators-seed";
import type { WordPicture, WordPictureItem } from "@/lib/utils/word-picture";
import { Eye, Plus } from "lucide-react";

function pillarAvgDisplay(obs: Observation): string {
  const r = obs.ratings ?? {};
  const vals = Object.values(r)
    .map((e) => (e as { rating: number }).rating)
    .filter((v) => v > 0);
  if (vals.length === 0) return "—";
  return (vals.reduce((s, v) => s + v, 0) / vals.length).toFixed(1);
}

const columns: Column<Observation>[] = [
  {
    key: "observation_date",
    header: "Date",
    sortable: true,
    render: (row) => new Date(row.observation_date).toLocaleDateString(),
    className: "whitespace-nowrap",
  },
  {
    key: "subject",
    header: "Subject",
    render: (row) =>
      row.subject
        ? `${row.subject.rank} ${row.subject.last_name}, ${row.subject.first_name}`
        : "—",
  },
  {
    key: "echelon_setting",
    header: "Echelon",
    render: (row) => (
      <span className="capitalize">{row.echelon_setting}</span>
    ),
  },
  {
    key: "context",
    header: "Context",
    render: (row) => (
      <span className="text-text-secondary">{row.context || "—"}</span>
    ),
  },
  {
    key: "avg",
    header: "Avg Score",
    render: (row) => (
      <span className="font-semibold text-navy">{pillarAvgDisplay(row)}</span>
    ),
    className: "text-center",
  },
];

export default function ObservationHistoryPage() {
  return (
    <Suspense fallback={<><Breadcrumbs /><PageHeader title="Observation History" /><SkeletonTable rows={6} /></>}>
      <ObservationHistoryContent />
    </Suspense>
  );
}

function ObservationHistoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchObservations, fetchObservation, loading } = useObservations();
  const { fetchAllOrgs } = useOrganization();
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Detail modal
  const [selectedObs, setSelectedObs] = useState<Observation | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const orgs = await fetchAllOrgs();
      const orgIds = orgs.map((o) => o.id);
      if (orgIds.length > 0) {
        const obs = await fetchObservations({ orgIds });
        if (!cancelled) setObservations(obs);
      }
      if (!cancelled) setLoaded(true);
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Open detail from URL param
  useEffect(() => {
    const obsId = searchParams.get("obs");
    if (obsId && loaded) {
      const found = observations.find((o) => o.id === obsId);
      if (found) setSelectedObs(found);
    }
  }, [searchParams, loaded, observations]);

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title="Observation History"
        subtitle="All behavioral observations"
        actions={
          <Button onClick={() => router.push("/gauge/observe")}>
            <Plus size={16} />
            New Observation
          </Button>
        }
      />

      {!loaded ? (
        <SkeletonTable rows={6} />
      ) : observations.length === 0 ? (
        <EmptyState
          icon={<Eye size={40} />}
          title="No observations recorded"
          description="Behavioral observations will appear here once recorded through the Gauge observation tool."
          actionLabel="Start Observing"
          onAction={() => router.push("/gauge/observe")}
        />
      ) : (
        <Table<Observation>
          columns={columns}
          data={observations}
          keyField="id"
          onRowClick={(row) => setSelectedObs(row)}
        />
      )}

      {/* Observation Detail Modal */}
      <Modal
        open={!!selectedObs}
        onClose={() => setSelectedObs(null)}
        title="Observation Detail"
        cancelLabel="Close"
      >
        {selectedObs && <ObservationDetail obs={selectedObs} />}
      </Modal>
    </>
  );
}

function ObservationDetail({ obs }: { obs: Observation }) {
  const wp = obs.word_picture as unknown as WordPicture | null;

  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
      {/* Subject info */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-xs text-text-tertiary">Subject</div>
          <div className="text-sm font-medium text-text">
            {obs.subject
              ? `${obs.subject.rank} ${obs.subject.last_name}, ${obs.subject.first_name}`
              : "—"}
          </div>
        </div>
        <div>
          <div className="text-xs text-text-tertiary">Date</div>
          <div className="text-sm font-medium text-text">
            {new Date(obs.observation_date).toLocaleDateString()}
          </div>
        </div>
        <div>
          <div className="text-xs text-text-tertiary">Echelon</div>
          <div className="text-sm font-medium text-text capitalize">
            {obs.echelon_setting}
          </div>
        </div>
        <div>
          <div className="text-xs text-text-tertiary">Context</div>
          <div className="text-sm font-medium text-text">
            {obs.context || "—"}
          </div>
        </div>
      </div>

      {/* Pillar Averages */}
      {wp?.pillar_averages && Object.keys(wp.pillar_averages).length > 0 && (
        <div>
          <div className="text-xs text-text-tertiary mb-2">Pillar Averages</div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(wp.pillar_averages).map(([pillar, avg]) => (
              <div
                key={pillar}
                className="flex items-center justify-between rounded-lg bg-surface px-3 py-2"
              >
                <span className="text-xs font-medium text-text">
                  {PILLAR_LABELS[pillar as keyof typeof PILLAR_LABELS] ?? pillar}
                </span>
                <span className="text-sm font-bold text-navy">
                  {(avg as number).toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths */}
      {wp?.strengths && wp.strengths.length > 0 && (
        <div>
          <div className="text-xs text-text-tertiary mb-1">Key Strengths</div>
          {wp.strengths.map((s: WordPictureItem) => (
            <div key={s.indicator_id} className="flex items-start gap-2 rounded-lg bg-status-trained/5 px-3 py-2 mb-1">
              <Badge color="green">{s.rating}/5</Badge>
              <span className="text-xs text-text">{s.behavior_text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Development Needs */}
      {wp?.development_needs && wp.development_needs.length > 0 && (
        <div>
          <div className="text-xs text-text-tertiary mb-1">Development Needs</div>
          {wp.development_needs.map((n: WordPictureItem) => (
            <div key={n.indicator_id} className="flex items-start gap-2 rounded-lg bg-status-untrained/5 px-3 py-2 mb-1">
              <Badge color="red">{n.rating}/5</Badge>
              <span className="text-xs text-text">{n.behavior_text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Summary Narrative */}
      {wp?.summary_narrative && (
        <div>
          <div className="text-xs text-text-tertiary mb-1">Word Picture</div>
          <div className="rounded-lg bg-surface px-3 py-3 text-sm text-text leading-relaxed">
            {wp.summary_narrative}
          </div>
        </div>
      )}

      {/* Overall Notes */}
      {obs.overall_notes && (
        <div>
          <div className="text-xs text-text-tertiary mb-1">Observer Notes</div>
          <div className="text-sm text-text whitespace-pre-line">
            {obs.overall_notes}
          </div>
        </div>
      )}
    </div>
  );
}
