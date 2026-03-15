"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { COMPASS_QUALITIES } from "@/lib/data/compass-qualities";
import { PILLAR_LABELS, PILLAR_COLORS } from "@/lib/data/indicators-seed";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

const RATING_OPTIONS = [
  { value: 1, label: "Strongly Disagree", color: "bg-status-untrained text-white" },
  { value: 2, label: "Disagree", color: "bg-status-untrained/60 text-white" },
  { value: 3, label: "Neutral", color: "bg-status-practiced text-navy" },
  { value: 4, label: "Agree", color: "bg-status-trained/70 text-white" },
  { value: 5, label: "Strongly Agree", color: "bg-status-trained text-white" },
];

const pillarBadgeColors: Record<string, "green" | "fluent" | "orange" | "purple"> = {
  character: "green",
  competence: "fluent",
  connection: "orange",
};

type PageState = "loading" | "active" | "submitted" | "already_submitted" | "invalid";

export default function CompassRespondPage() {
  const params = useParams();
  const token = params.token as string;
  const supabase = createClient();

  const [state, setState] = useState<PageState>("loading");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [respondentRole, setRespondentRole] = useState("");

  useEffect(() => {
    async function checkToken() {
      const { data, error } = await supabase
        .from("compass_responses")
        .select("*")
        .eq("respondent_token", token)
        .single();

      if (error || !data) {
        setState("invalid");
        return;
      }
      if (data.is_complete) {
        setState("already_submitted");
        return;
      }
      setRespondentRole(data.respondent_role);
      setState("active");
    }
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const quality = COMPASS_QUALITIES[currentIndex];
  const totalQualities = COMPASS_QUALITIES.length;
  const ratedCount = Object.keys(ratings).length;
  const allRated = ratedCount === totalQualities;
  const progress = Math.round((ratedCount / totalQualities) * 100);

  const handleRate = (qualityId: string, value: number) => {
    setRatings((prev) => ({ ...prev, [qualityId]: value }));
  };

  const handleComment = (qualityId: string, text: string) => {
    setComments((prev) => ({ ...prev, [qualityId]: text }));
  };

  const handleNext = () => {
    if (currentIndex < totalQualities - 1) setCurrentIndex(currentIndex + 1);
  };
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const { error } = await supabase
      .from("compass_responses")
      .update({
        ratings,
        comments,
        is_complete: true,
        submitted_at: new Date().toISOString(),
      })
      .eq("respondent_token", token);

    if (error) {
      alert("Failed to submit. Please try again.");
      setSubmitting(false);
      return;
    }
    setState("submitted");
  };

  // ── Render states ────────────────────────────────────────
  if (state === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="text-center">
          <div className="mb-3 h-8 w-8 mx-auto animate-spin rounded-full border-4 border-border border-t-fluent" />
          <p className="text-text-secondary">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (state === "invalid") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4">
        <div className="max-w-md rounded-xl border border-border bg-surface-card p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-navy mb-2">Invalid Link</h1>
          <p className="text-text-secondary">
            This assessment link is not valid or has expired. Please contact the person who sent you this link.
          </p>
        </div>
      </div>
    );
  }

  if (state === "already_submitted") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4">
        <div className="max-w-md rounded-xl border border-border bg-surface-card p-8 text-center shadow-sm">
          <div className="mb-4 text-4xl">✓</div>
          <h1 className="text-xl font-semibold text-navy mb-2">Already Submitted</h1>
          <p className="text-text-secondary">
            You have already completed this assessment. Your responses have been recorded anonymously. Thank you for your feedback.
          </p>
        </div>
      </div>
    );
  }

  if (state === "submitted") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4">
        <div className="max-w-md rounded-xl border border-border bg-surface-card p-8 text-center shadow-sm">
          <div className="mb-4 text-4xl text-status-trained">✓</div>
          <h1 className="text-xl font-semibold text-navy mb-2">Thank You</h1>
          <p className="text-text-secondary">
            Your C³ Compass assessment has been submitted anonymously. Your feedback will help develop and support chaplain leaders. You may close this page.
          </p>
        </div>
      </div>
    );
  }

  // ── Active assessment ────────────────────────────────────
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-surface-card px-4 py-3 shadow-sm">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-semibold text-navy">C³ Compass Assessment</h1>
            <Badge color="gray">{respondentRole}</Badge>
          </div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-text-secondary">
              {ratedCount} of {totalQualities} qualities rated
            </span>
            <span className="font-medium text-navy">{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-border">
            <div
              className="h-2 rounded-full bg-fluent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Quality dots navigation */}
          <div className="mt-2 flex gap-1 justify-center flex-wrap">
            {COMPASS_QUALITIES.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-3 w-3 rounded-full transition-all
                  ${idx === currentIndex ? "ring-2 ring-fluent ring-offset-1 scale-125" : ""}
                  ${ratings[q.id] ? "opacity-100" : "opacity-40"}`}
                style={{ backgroundColor: PILLAR_COLORS[q.pillar] }}
                title={q.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quality card */}
      <div className="mx-auto max-w-lg px-4 py-6">
        <div className="rounded-xl border border-border bg-surface-card p-6 shadow-sm">
          {/* Pillar + domain badge */}
          <div className="mb-3 flex items-center gap-2">
            <Badge color={pillarBadgeColors[quality.pillar] ?? "gray"}>
              {PILLAR_LABELS[quality.pillar]}
            </Badge>
            <Badge color={quality.domain === "ministry" ? "green" : "navy"}>
              {quality.domain === "ministry" ? "Ministry" : "Military"}
            </Badge>
          </div>

          <h2 className="text-xl font-semibold text-navy mb-2">{quality.name}</h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-6">
            {quality.description}
          </p>

          {/* Rating buttons */}
          <div className="space-y-2 mb-6">
            {RATING_OPTIONS.map((opt) => {
              const selected = ratings[quality.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleRate(quality.id, opt.value)}
                  className={`flex h-14 w-full items-center gap-4 rounded-xl border-2 px-4 text-left
                    transition-all
                    ${selected
                      ? `${opt.color} border-transparent shadow-md scale-[1.02]`
                      : "border-border bg-white text-text hover:border-fluent/30"
                    }`}
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full
                    text-sm font-bold
                    ${selected ? "bg-white/30 text-current" : "bg-surface text-text-secondary"}`}>
                    {opt.value}
                  </span>
                  <span className="text-sm font-medium">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Comment */}
          <div>
            <label className="mb-1 block text-xs text-text-tertiary">
              Comment (optional)
            </label>
            <textarea
              value={comments[quality.id] ?? ""}
              onChange={(e) => handleComment(quality.id, e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text
                placeholder:text-text-tertiary
                focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
              placeholder="Optional feedback on this quality..."
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-4 flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            ← Previous
          </Button>

          <span className="text-sm text-text-tertiary">
            {currentIndex + 1} / {totalQualities}
          </span>

          {currentIndex < totalQualities - 1 ? (
            <Button onClick={handleNext}>
              Next →
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!allRated || submitting}
              loading={submitting}
            >
              Submit
            </Button>
          )}
        </div>

        {currentIndex === totalQualities - 1 && !allRated && (
          <p className="mt-3 text-center text-xs text-status-untrained">
            Please rate all {totalQualities} qualities before submitting.
            {totalQualities - ratedCount} remaining.
          </p>
        )}

        <p className="mt-6 text-center text-xs text-text-tertiary">
          Your responses are anonymous. Individual ratings are never displayed — only aggregated averages across all respondents.
        </p>
      </div>
    </div>
  );
}
