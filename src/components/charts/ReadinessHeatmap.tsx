"use client";

import { useState } from "react";

interface ReadinessCell {
  orgId: string;
  taskId: string;
  rating: string | null; // T, T_minus, P, P_minus, U, or null
  date: string | null;
  eventCount: number;
}

interface ReadinessHeatmapProps {
  orgs: { id: string; name: string; uic: string }[];
  tasks: { id: string; title: string }[];
  cells: ReadinessCell[];
  onCellClick?: (orgId: string, taskId: string) => void;
}

const ratingColors: Record<string, string> = {
  T: "bg-status-trained text-white",
  T_minus: "bg-status-trained/70 text-white",
  P: "bg-status-practiced text-navy",
  P_minus: "bg-status-practiced/70 text-navy",
  U: "bg-status-untrained text-white",
};

const ratingLabels: Record<string, string> = {
  T: "T",
  T_minus: "T-",
  P: "P",
  P_minus: "P-",
  U: "U",
};

function computeSummary(
  cells: ReadinessCell[],
  tasks: { id: string }[]
): { trained: number; practiced: number; untrained: number; noData: number } {
  let trained = 0;
  let practiced = 0;
  let untrained = 0;
  let noData = 0;

  // Count unique org+task combos by their latest rating
  const seen = new Set<string>();
  for (const cell of cells) {
    const key = `${cell.orgId}:${cell.taskId}`;
    if (seen.has(key)) continue;
    seen.add(key);

    if (!cell.rating) {
      noData++;
    } else if (cell.rating === "T" || cell.rating === "T_minus") {
      trained++;
    } else if (cell.rating === "P" || cell.rating === "P_minus") {
      practiced++;
    } else {
      untrained++;
    }
  }

  // Count cells with no data at all (not in the cells array)
  const totalPossible =
    new Set(cells.map((c) => c.orgId)).size * tasks.length;
  noData += totalPossible - seen.size;

  return { trained, practiced, untrained, noData };
}

export function ReadinessHeatmap({
  orgs,
  tasks,
  cells,
  onCellClick,
}: ReadinessHeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  // Build lookup: orgId:taskId -> cell
  const cellMap = new Map<string, ReadinessCell>();
  for (const cell of cells) {
    const key = `${cell.orgId}:${cell.taskId}`;
    // Keep the most recent (cells should be pre-sorted by date desc)
    if (!cellMap.has(key)) {
      cellMap.set(key, cell);
    }
  }

  const summary = computeSummary(cells, tasks);
  const totalCells = summary.trained + summary.practiced + summary.untrained + summary.noData;
  const tpPercent =
    totalCells > 0
      ? Math.round(
          ((summary.trained + summary.practiced) / totalCells) * 100
        )
      : 0;

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-status-trained" />
          <span className="text-text-secondary">
            Trained: <span className="font-medium text-text">{summary.trained}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-status-practiced" />
          <span className="text-text-secondary">
            Practiced: <span className="font-medium text-text">{summary.practiced}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-status-untrained" />
          <span className="text-text-secondary">
            Untrained: <span className="font-medium text-text">{summary.untrained}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-border" />
          <span className="text-text-secondary">
            Not Evaluated: <span className="font-medium text-text">{summary.noData}</span>
          </span>
        </div>
        <div className="ml-auto font-medium text-navy">
          {tpPercent}% T/P Overall
        </div>
      </div>

      {/* Heatmap table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-navy text-white">
              <th className="sticky left-0 z-10 bg-navy px-4 py-3 text-left font-medium">
                Unit
              </th>
              {tasks.map((task) => (
                <th
                  key={task.id}
                  className="min-w-[80px] px-3 py-3 text-center font-medium"
                  title={task.title}
                >
                  <div className="truncate max-w-[100px]">{task.id}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orgs.map((org, orgIdx) => (
              <tr
                key={org.id}
                className={orgIdx % 2 === 0 ? "bg-surface-card" : "bg-surface"}
              >
                <td className={`sticky left-0 z-10 px-4 py-2 font-medium text-text whitespace-nowrap
                    ${orgIdx % 2 === 0 ? "bg-surface-card" : "bg-surface"}`}>
                  <div className="truncate max-w-[200px]" title={org.name}>
                    {org.name}
                  </div>
                  <div className="text-[10px] text-text-tertiary">{org.uic}</div>
                </td>
                {tasks.map((task) => {
                  const key = `${org.id}:${task.id}`;
                  const cell = cellMap.get(key);
                  const rating = cell?.rating ?? null;
                  const isHovered = hoveredCell === key;

                  return (
                    <td
                      key={key}
                      className="px-1 py-1 text-center"
                      onMouseEnter={() => setHoveredCell(key)}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <button
                        onClick={() => onCellClick?.(org.id, task.id)}
                        className={`inline-flex h-10 w-full min-w-[48px] items-center justify-center
                          rounded-md text-xs font-bold transition-all
                          ${
                            rating
                              ? ratingColors[rating]
                              : "bg-border/50 text-text-tertiary"
                          }
                          ${isHovered ? "ring-2 ring-fluent ring-offset-1" : ""}
                          ${onCellClick ? "cursor-pointer" : "cursor-default"}`}
                        title={
                          rating
                            ? `${ratingLabels[rating]} — ${cell?.date ?? "Unknown date"} (${cell?.eventCount ?? 0} event${(cell?.eventCount ?? 0) !== 1 ? "s" : ""})`
                            : "Not evaluated"
                        }
                      >
                        {rating ? ratingLabels[rating] : "—"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
