"use client";

interface PipelineStage {
  status: string;
  label: string;
  count: number;
  color: string;
}

const STAGES: { status: string; label: string; color: string }[] = [
  { status: "identified", label: "Identified", color: "#D13438" },
  { status: "under_analysis", label: "Analyzing", color: "#FFB900" },
  { status: "documented", label: "Documented", color: "#0078D4" },
  { status: "submitted", label: "Submitted", color: "#4A148C" },
  { status: "in_progress", label: "In Progress", color: "#106EBE" },
  { status: "resolved", label: "Resolved", color: "#107C10" },
];

interface GapPipelineProps {
  statusCounts: Record<string, number>;
  onStageClick?: (status: string) => void;
}

export function GapPipeline({ statusCounts, onStageClick }: GapPipelineProps) {
  const stages: PipelineStage[] = STAGES.map((s) => ({
    ...s,
    count: statusCounts[s.status] ?? 0,
  }));

  const maxCount = Math.max(...stages.map((s) => s.count), 1);

  return (
    <div className="space-y-2">
      {stages.map((stage) => (
        <button
          key={stage.status}
          onClick={() => onStageClick?.(stage.status)}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors
            ${onStageClick ? "hover:bg-surface cursor-pointer" : "cursor-default"}`}
        >
          <span className="w-24 text-xs font-medium text-text-secondary truncate">
            {stage.label}
          </span>
          <div className="flex-1 h-6 rounded-full bg-border/50 overflow-hidden">
            <div
              className="h-6 rounded-full flex items-center px-2 transition-all duration-500"
              style={{
                width: `${Math.max((stage.count / maxCount) * 100, stage.count > 0 ? 8 : 0)}%`,
                backgroundColor: stage.color,
              }}
            >
              {stage.count > 0 && (
                <span className="text-xs font-bold text-white">{stage.count}</span>
              )}
            </div>
          </div>
          <span className="w-8 text-right text-sm font-semibold text-text">
            {stage.count}
          </span>
        </button>
      ))}
    </div>
  );
}
