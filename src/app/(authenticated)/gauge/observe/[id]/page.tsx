"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  BEHAVIORAL_INDICATORS,
  PILLAR_LABELS,
  PILLAR_COLORS,
  getSubDimensions,
  getIndicatorsForEchelon,
  type BehavioralIndicator,
} from "@/lib/data/indicators-seed";
import { useObservations, type CreateObservationData } from "@/hooks/useObservations";
import type { ObservationRatings } from "@/lib/utils/word-picture";
import { Save, Send, ChevronDown, ChevronUp } from "lucide-react";

const PILLARS = ["character", "competence", "connection", "constitutional"] as const;

const RATING_OPTIONS = [
  { value: 0, label: "Not Observed", short: "N/O", color: "bg-text-tertiary/20 text-text-secondary" },
  { value: 1, label: "Clear Need", short: "1", color: "bg-status-untrained text-white" },
  { value: 2, label: "Below Standard", short: "2", color: "bg-status-untrained/60 text-white" },
  { value: 3, label: "Meets Standard", short: "3", color: "bg-status-practiced text-navy" },
  { value: 4, label: "Above Standard", short: "4", color: "bg-status-trained/70 text-white" },
  { value: 5, label: "Clear Strength", short: "5", color: "bg-status-trained text-white" },
];

const DRAFT_KEY = "gauge-observation-draft";

interface SessionParams {
  subjectId: string;
  orgId: string;
  echelon: string;
  context: string;
  date: string;
  subjectName: string;
  subjectPosition: string;
}

export default function ActiveObservationPage() {
  const router = useRouter();
  const { createObservation, loading: submitting, error: submitError } = useObservations();

  const [session, setSession] = useState<SessionParams | null>(null);
  const [activePillar, setActivePillar] = useState<(typeof PILLARS)[number]>("character");
  const [ratings, setRatings] = useState<ObservationRatings>({});
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());
  const [overallNotes, setOverallNotes] = useState("");
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  // Load session params and draft
  useEffect(() => {
    const sessionData = sessionStorage.getItem("gauge-session");
    if (sessionData) {
      setSession(JSON.parse(sessionData));
    }
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (parsed.ratings) setRatings(parsed.ratings);
        if (parsed.overallNotes) setOverallNotes(parsed.overallNotes);
      } catch { /* ignore */ }
    }
  }, []);

  // Filter indicators for echelon
  const echelonIndicators = useMemo(
    () => (session ? getIndicatorsForEchelon(session.echelon) : BEHAVIORAL_INDICATORS),
    [session]
  );

  // Compute progress
  const totalIndicators = echelonIndicators.length;
  const ratedCount = Object.values(ratings).filter((r) => r.rating > 0).length;
  const progress = totalIndicators > 0 ? Math.round((ratedCount / totalIndicators) * 100) : 0;

  // Pillar counts
  const pillarCounts = useMemo(() => {
    const counts: Record<string, { total: number; rated: number }> = {};
    for (const pillar of PILLARS) {
      const inds = echelonIndicators.filter((i) => i.pillar === pillar);
      const rated = inds.filter((i) => ratings[i.id]?.rating > 0).length;
      counts[pillar] = { total: inds.length, rated };
    }
    return counts;
  }, [echelonIndicators, ratings]);

  const setRating = useCallback((indicatorId: string, value: number) => {
    setRatings((prev) => ({
      ...prev,
      [indicatorId]: { ...prev[indicatorId], rating: value },
    }));
  }, []);

  const setNotes = useCallback((indicatorId: string, notes: string) => {
    setRatings((prev) => ({
      ...prev,
      [indicatorId]: { ...prev[indicatorId], rating: prev[indicatorId]?.rating ?? 0, notes },
    }));
  }, []);

  const toggleNotes = useCallback((indicatorId: string) => {
    setExpandedNotes((prev) => {
      const next = new Set(prev);
      if (next.has(indicatorId)) next.delete(indicatorId);
      else next.add(indicatorId);
      return next;
    });
  }, []);

  // Save draft to localStorage
  const saveDraft = useCallback(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ ratings, overallNotes }));
  }, [ratings, overallNotes]);

  // Auto-save draft on rating change
  useEffect(() => {
    if (Object.keys(ratings).length > 0) {
      const timeout = setTimeout(saveDraft, 1000);
      return () => clearTimeout(timeout);
    }
  }, [ratings, saveDraft]);

  const handleSubmit = async () => {
    if (!session) return;

    const data: CreateObservationData = {
      subject_id: session.subjectId,
      observer_id: session.subjectId, // In demo mode, same person — real mode from auth
      org_id: session.orgId,
      observation_date: session.date,
      context: session.context || undefined,
      echelon_setting: session.echelon,
      ratings,
      overall_notes: overallNotes || undefined,
    };

    const result = await createObservation(data);
    if (result) {
      localStorage.removeItem(DRAFT_KEY);
      sessionStorage.removeItem("gauge-session");
      router.push("/gauge/history");
    }
    setShowSubmitConfirm(false);
  };

  const handleDiscard = () => {
    localStorage.removeItem(DRAFT_KEY);
    sessionStorage.removeItem("gauge-session");
    router.push("/gauge");
  };

  if (!session) {
    return (
      <>
        <Breadcrumbs />
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <p className="mb-4 text-text-secondary">No active observation session.</p>
          <Button onClick={() => router.push("/gauge/observe")}>Start New Observation</Button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Sticky header */}
      <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 bg-surface-card border-b border-border px-4 sm:px-6 lg:px-8 py-3 shadow-sm">
        {/* Subject info + progress */}
        <div className="flex items-center justify-between mb-3">
          <div className="min-w-0">
            <h1 className="text-lg font-semibold text-navy truncate">
              {session.subjectName}
            </h1>
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <span>{session.subjectPosition}</span>
              <span>·</span>
              <span className="capitalize">{session.echelon}</span>
              {session.context && (
                <>
                  <span>·</span>
                  <span>{session.context}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="secondary" size="sm" onClick={saveDraft}>
              <Save size={14} />
              <span className="hidden sm:inline">Save Draft</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowDiscardConfirm(true)}>
              Cancel
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-text-secondary">
              {ratedCount} of {totalIndicators} behaviors rated
            </span>
            <span className="font-medium text-navy">{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-border">
            <div
              className="h-2 rounded-full bg-fluent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Pillar tabs */}
        <div className="flex gap-1 overflow-x-auto -mb-px">
          {PILLARS.map((pillar) => {
            const active = activePillar === pillar;
            const count = pillarCounts[pillar];
            return (
              <button
                key={pillar}
                onClick={() => setActivePillar(pillar)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors
                  ${active
                    ? "bg-surface-card border border-b-0 border-border text-navy -mb-px"
                    : "text-text-secondary hover:text-text hover:bg-surface"
                  }`}
                style={active ? { borderTopColor: PILLAR_COLORS[pillar], borderTopWidth: "3px" } : {}}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: PILLAR_COLORS[pillar] }}
                />
                <span className="hidden sm:inline">
                  {PILLAR_LABELS[pillar]}
                </span>
                <span className="sm:hidden">
                  {pillar === "constitutional" ? "Const." : PILLAR_LABELS[pillar]}
                </span>
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold
                  ${count.rated === count.total && count.total > 0
                    ? "bg-status-trained/20 text-pillar-character"
                    : count.rated > 0
                      ? "bg-fluent-light text-fluent"
                      : "bg-border text-text-tertiary"
                  }`}>
                  {count.rated}/{count.total}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Behavior groups */}
      <div className="mt-4 space-y-6">
        {getSubDimensions(activePillar)
          .filter((group) =>
            group.indicators.some((ind) => echelonIndicators.includes(ind))
          )
          .map((group) => (
            <div
              key={`${group.name}-${group.domain}`}
              className="rounded-lg border border-border bg-surface-card overflow-hidden"
            >
              {/* Group header */}
              <div
                className="flex items-center gap-3 px-4 py-3 border-b border-border"
                style={{ borderLeftWidth: "4px", borderLeftColor: PILLAR_COLORS[activePillar] }}
              >
                <h3 className="text-base font-semibold text-navy">{group.name}</h3>
                <Badge color={group.domain === "ministry" ? "green" : "navy"}>
                  {group.domain === "ministry" ? "Ministry" : "Military"}
                </Badge>
              </div>

              {/* Behaviors */}
              <div className="divide-y divide-border">
                {group.indicators
                  .filter((ind) => echelonIndicators.includes(ind))
                  .map((indicator) => (
                    <BehaviorRow
                      key={indicator.id}
                      indicator={indicator}
                      currentRating={ratings[indicator.id]?.rating ?? -1}
                      notes={ratings[indicator.id]?.notes ?? ""}
                      notesExpanded={expandedNotes.has(indicator.id)}
                      echelon={session.echelon}
                      onRate={setRating}
                      onNotesChange={setNotes}
                      onToggleNotes={toggleNotes}
                    />
                  ))}
              </div>
            </div>
          ))}

        {/* Overall notes */}
        <div className="rounded-lg border border-border bg-surface-card p-4">
          <label className="mb-2 block text-sm font-medium text-navy">
            Overall Observation Notes
          </label>
          <textarea
            value={overallNotes}
            onChange={(e) => setOverallNotes(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text
              placeholder:text-text-tertiary
              focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
            placeholder="Additional context, environmental factors, or general notes about this observation..."
          />
        </div>

        {/* Submit area */}
        <div className="rounded-lg border-2 border-fluent bg-fluent-light/20 p-6 text-center">
          <p className="mb-4 text-sm text-text-secondary">
            {ratedCount === 0
              ? "Rate at least one behavior before submitting."
              : `${ratedCount} behaviors rated. A word picture will be auto-generated on submission.`}
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="secondary" size="lg" onClick={saveDraft}>
              <Save size={16} />
              Save Draft
            </Button>
            <Button
              size="lg"
              onClick={() => setShowSubmitConfirm(true)}
              disabled={ratedCount === 0}
            >
              <Send size={16} />
              Submit Observation
            </Button>
          </div>
          {submitError && (
            <p className="mt-3 text-sm text-status-untrained">
              Failed to submit: {submitError}. Please try again.
            </p>
          )}
        </div>
      </div>

      {/* Submit confirmation */}
      <Modal
        open={showSubmitConfirm}
        onClose={() => setShowSubmitConfirm(false)}
        title="Submit Observation?"
        confirmLabel="Submit"
        onConfirm={handleSubmit}
        loading={submitting}
      >
        <p>
          This will save the observation for{" "}
          <strong>{session.subjectName}</strong> with {ratedCount} rated
          behaviors and auto-generate a word picture summary.
        </p>
        <p className="mt-2">This action cannot be undone.</p>
      </Modal>

      {/* Discard confirmation */}
      <Modal
        open={showDiscardConfirm}
        onClose={() => setShowDiscardConfirm(false)}
        title="Discard Observation?"
        confirmLabel="Discard"
        variant="danger"
        onConfirm={handleDiscard}
      >
        <p>
          This will discard all unsaved ratings. Your draft will be deleted.
        </p>
      </Modal>
    </>
  );
}

// ── Individual Behavior Row Component ────────────────────────

interface BehaviorRowProps {
  indicator: BehavioralIndicator;
  currentRating: number;
  notes: string;
  notesExpanded: boolean;
  echelon: string;
  onRate: (id: string, value: number) => void;
  onNotesChange: (id: string, notes: string) => void;
  onToggleNotes: (id: string) => void;
}

function BehaviorRow({
  indicator,
  currentRating,
  notes,
  notesExpanded,
  echelon,
  onRate,
  onNotesChange,
  onToggleNotes,
}: BehaviorRowProps) {
  const aboveMinimum = indicator.echelon_minimum !== "battalion" &&
    indicator.echelon_minimum !== echelon;

  return (
    <div className="px-4 py-4">
      {/* Behavior text + metadata */}
      <div className="mb-3">
        <div className="flex items-start gap-2">
          <span className="shrink-0 font-mono text-[10px] text-text-tertiary mt-0.5">
            {indicator.id}
          </span>
          <Badge
            color={indicator.indicator_type === "R" ? "red" : "gold"}
          >
            {indicator.indicator_type === "R" ? "Required" : "Expected"}
          </Badge>
          {aboveMinimum && (
            <Badge color="purple">
              {indicator.echelon_minimum}+
            </Badge>
          )}
        </div>
        <p className="mt-1.5 text-sm text-text leading-relaxed">
          {indicator.behavior_text}
        </p>
      </div>

      {/* Rating buttons — large touch targets */}
      <div className="flex flex-wrap gap-1.5">
        {RATING_OPTIONS.map((opt) => {
          const isSelected = currentRating === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onRate(indicator.id, opt.value)}
              title={opt.label}
              className={`flex h-11 min-w-[48px] items-center justify-center rounded-lg px-3
                text-sm font-bold transition-all border-2
                ${isSelected
                  ? `${opt.color} border-transparent ring-2 ring-offset-1 ring-navy/30 scale-105`
                  : "border-border bg-white text-text-secondary hover:border-fluent/30"
                }`}
            >
              <span className="sm:hidden">{opt.short}</span>
              <span className="hidden sm:inline">{opt.value === 0 ? "N/O" : `${opt.short} — ${opt.label}`}</span>
            </button>
          );
        })}
      </div>

      {/* Notes toggle */}
      <button
        onClick={() => onToggleNotes(indicator.id)}
        className="mt-2 flex items-center gap-1 text-xs text-fluent hover:underline"
      >
        {notesExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        {notes ? "Edit notes" : "Add notes"}
      </button>

      {notesExpanded && (
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(indicator.id, e.target.value)}
          rows={2}
          className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text
            placeholder:text-text-tertiary
            focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
          placeholder="Specific observations, examples, context..."
        />
      )}
    </div>
  );
}
