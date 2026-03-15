/**
 * Word Picture Generator
 *
 * Analyzes behavioral observation ratings to produce a structured summary
 * suitable for CHAP-T.A.L.K.S. counseling sessions, evaluation support,
 * and IDP development.
 */

import {
  BEHAVIORAL_INDICATORS,
  PILLAR_LABELS,
  type BehavioralIndicator,
} from "@/lib/data/indicators-seed";

export interface RatingEntry {
  rating: number; // 0=not observed, 1-5
  notes?: string;
}

export type ObservationRatings = Record<string, RatingEntry>;

export interface WordPicture {
  strengths: WordPictureItem[];
  development_needs: WordPictureItem[];
  pillar_averages: Record<string, number>;
  summary_narrative: string;
}

export interface WordPictureItem {
  indicator_id: string;
  behavior_text: string;
  pillar: string;
  sub_dimension: string;
  rating: number;
  notes?: string;
}

const RATING_LABELS: Record<number, string> = {
  1: "Clear Need",
  2: "Below Standard",
  3: "Meets Standard",
  4: "Above Standard",
  5: "Clear Strength",
};

/**
 * Generate a word picture from observation ratings.
 *
 * @param ratings  - Object mapping indicator IDs to {rating, notes}
 * @returns WordPicture with strengths, needs, pillar averages, and narrative
 */
export function generateWordPicture(ratings: ObservationRatings): WordPicture {
  // Build indicator lookup
  const indicatorMap = new Map<string, BehavioralIndicator>();
  for (const ind of BEHAVIORAL_INDICATORS) {
    indicatorMap.set(ind.id, ind);
  }

  // Collect rated items (excluding "not observed")
  const ratedItems: {
    indicator: BehavioralIndicator;
    rating: number;
    notes?: string;
  }[] = [];

  for (const [id, entry] of Object.entries(ratings)) {
    if (entry.rating > 0) {
      const indicator = indicatorMap.get(id);
      if (indicator) {
        ratedItems.push({ indicator, rating: entry.rating, notes: entry.notes });
      }
    }
  }

  // Sort by rating desc for strengths, asc for needs
  const sorted = [...ratedItems].sort((a, b) => b.rating - a.rating);

  // Top 3 strengths (rating >= 4)
  const strengths: WordPictureItem[] = sorted
    .filter((item) => item.rating >= 4)
    .slice(0, 3)
    .map((item) => ({
      indicator_id: item.indicator.id,
      behavior_text: item.indicator.behavior_text,
      pillar: item.indicator.pillar,
      sub_dimension: item.indicator.sub_dimension,
      rating: item.rating,
      notes: item.notes,
    }));

  // Top 3 development needs (rating <= 2, sorted ascending)
  const needs: WordPictureItem[] = [...ratedItems]
    .filter((item) => item.rating <= 2)
    .sort((a, b) => a.rating - b.rating)
    .slice(0, 3)
    .map((item) => ({
      indicator_id: item.indicator.id,
      behavior_text: item.indicator.behavior_text,
      pillar: item.indicator.pillar,
      sub_dimension: item.indicator.sub_dimension,
      rating: item.rating,
      notes: item.notes,
    }));

  // Compute pillar averages
  const pillarSums: Record<string, { sum: number; count: number }> = {};
  for (const item of ratedItems) {
    const p = item.indicator.pillar;
    if (!pillarSums[p]) pillarSums[p] = { sum: 0, count: 0 };
    pillarSums[p].sum += item.rating;
    pillarSums[p].count++;
  }

  const pillar_averages: Record<string, number> = {};
  for (const [pillar, data] of Object.entries(pillarSums)) {
    pillar_averages[pillar] =
      data.count > 0 ? Math.round((data.sum / data.count) * 100) / 100 : 0;
  }

  // Generate narrative
  const summary_narrative = buildNarrative(
    strengths,
    needs,
    pillar_averages,
    ratedItems.length
  );

  return { strengths, development_needs: needs, pillar_averages, summary_narrative };
}

function buildNarrative(
  strengths: WordPictureItem[],
  needs: WordPictureItem[],
  pillarAvgs: Record<string, number>,
  totalRated: number
): string {
  if (totalRated === 0) {
    return "No behaviors were observed during this observation period.";
  }

  const parts: string[] = [];

  // Overall summary
  const avgAll =
    Object.values(pillarAvgs).reduce((s, v) => s + v, 0) /
    Math.max(Object.values(pillarAvgs).length, 1);

  if (avgAll >= 4) {
    parts.push(
      "This individual demonstrates consistently strong performance across observed behaviors."
    );
  } else if (avgAll >= 3) {
    parts.push(
      "This individual meets the standard in most observed behaviors with some areas of strength."
    );
  } else if (avgAll >= 2) {
    parts.push(
      "This individual shows emerging capability with several areas requiring focused development."
    );
  } else {
    parts.push(
      "This individual needs significant development across multiple observed behaviors."
    );
  }

  // Pillar summary
  const pillarSummaries: string[] = [];
  for (const [pillar, avg] of Object.entries(pillarAvgs)) {
    const label = PILLAR_LABELS[pillar as keyof typeof PILLAR_LABELS] ?? pillar;
    if (avg >= 4) {
      pillarSummaries.push(`${label} is a clear area of strength (${avg.toFixed(1)}/5)`);
    } else if (avg < 2.5) {
      pillarSummaries.push(`${label} requires focused attention (${avg.toFixed(1)}/5)`);
    }
  }
  if (pillarSummaries.length > 0) {
    parts.push(pillarSummaries.join(". ") + ".");
  }

  // Strengths
  if (strengths.length > 0) {
    const strengthTexts = strengths.map(
      (s) =>
        `${s.sub_dimension} (${RATING_LABELS[s.rating]})`
    );
    parts.push(
      `Key strengths: ${strengthTexts.join(", ")}.`
    );
  }

  // Development needs
  if (needs.length > 0) {
    const needTexts = needs.map(
      (n) =>
        `${n.sub_dimension} (${RATING_LABELS[n.rating]})`
    );
    parts.push(
      `Areas for development: ${needTexts.join(", ")}.`
    );
  }

  // Recommendation
  if (needs.length > 0) {
    parts.push(
      "Recommend incorporating these development areas into the individual's IDP and next counseling session."
    );
  }

  return parts.join(" ");
}
