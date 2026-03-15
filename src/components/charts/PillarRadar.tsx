"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface PillarRadarProps {
  /** Array of quality scores: { quality, score, fullMark } */
  data: { quality: string; score: number; fullMark: number }[];
  /** Optional comparison data (e.g., previous observation) */
  comparisonData?: { quality: string; score: number; fullMark: number }[];
  /** Label for primary data */
  label?: string;
  /** Label for comparison data */
  comparisonLabel?: string;
  height?: number;
}

export function PillarRadar({
  data,
  comparisonData,
  label = "Current",
  comparisonLabel = "Previous",
  height = 400,
}: PillarRadarProps) {
  // Merge data and comparison data for the chart
  const merged = data.map((d) => {
    const comp = comparisonData?.find((c) => c.quality === d.quality);
    return {
      quality: d.quality,
      [label]: d.score,
      ...(comp ? { [comparisonLabel]: comp.score } : {}),
      fullMark: d.fullMark,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={merged} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="#EDEBE9" />
        <PolarAngleAxis
          dataKey="quality"
          tick={{ fontSize: 11, fill: "#605E5C" }}
          tickLine={false}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 5]}
          tick={{ fontSize: 10, fill: "#A19F9D" }}
          tickCount={6}
        />
        <Radar
          name={label}
          dataKey={label}
          stroke="#0078D4"
          fill="#0078D4"
          fillOpacity={0.2}
          strokeWidth={2}
          dot={{ r: 3, fill: "#0078D4" }}
        />
        {comparisonData && (
          <Radar
            name={comparisonLabel}
            dataKey={comparisonLabel}
            stroke="#C09A36"
            fill="#C09A36"
            fillOpacity={0.1}
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 3, fill: "#C09A36" }}
          />
        )}
        <Tooltip
          contentStyle={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #EDEBE9",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: "12px", color: "#605E5C" }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

/**
 * Build radar data from pillar sub-dimension averages.
 * Expects a ratings map of indicator_id -> {rating: 1-5}
 */
export function buildRadarData(
  ratings: Record<string, { rating: number }>,
  indicators: {
    id: string;
    pillar: string;
    sub_dimension: string;
  }[]
): { quality: string; score: number; fullMark: number }[] {
  // Group by sub_dimension
  const groups = new Map<string, number[]>();

  for (const ind of indicators) {
    const entry = ratings[ind.id];
    if (!entry || entry.rating === 0) continue;

    if (!groups.has(ind.sub_dimension)) {
      groups.set(ind.sub_dimension, []);
    }
    groups.get(ind.sub_dimension)!.push(entry.rating);
  }

  // Build data points maintaining order from the indicators array
  const seen = new Set<string>();
  const result: { quality: string; score: number; fullMark: number }[] = [];

  for (const ind of indicators) {
    if (seen.has(ind.sub_dimension)) continue;
    seen.add(ind.sub_dimension);

    const scores = groups.get(ind.sub_dimension) ?? [];
    const avg =
      scores.length > 0
        ? Math.round((scores.reduce((s, v) => s + v, 0) / scores.length) * 100) / 100
        : 0;

    result.push({
      quality: ind.sub_dimension,
      score: avg,
      fullMark: 5,
    });
  }

  return result;
}
