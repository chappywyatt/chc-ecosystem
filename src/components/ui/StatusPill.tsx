type TrainingStatus = "T" | "T_minus" | "P" | "P_minus" | "U";

type GapStatus =
  | "identified"
  | "under_analysis"
  | "documented"
  | "submitted"
  | "in_progress"
  | "resolved"
  | "deferred";

interface StatusPillProps {
  status: TrainingStatus | GapStatus;
  className?: string;
}

const trainingLabels: Record<TrainingStatus, string> = {
  T: "Trained",
  T_minus: "Trained-",
  P: "Practiced",
  P_minus: "Practiced-",
  U: "Untrained",
};

const trainingStyles: Record<TrainingStatus, string> = {
  T: "bg-status-trained text-white",
  T_minus: "bg-status-trained/70 text-white",
  P: "bg-status-practiced text-navy",
  P_minus: "bg-status-practiced/70 text-navy",
  U: "bg-status-untrained text-white",
};

const gapLabels: Record<GapStatus, string> = {
  identified: "Identified",
  under_analysis: "Under Analysis",
  documented: "Documented",
  submitted: "Submitted",
  in_progress: "In Progress",
  resolved: "Resolved",
  deferred: "Deferred",
};

const gapStyles: Record<GapStatus, string> = {
  identified: "bg-status-untrained/15 text-status-untrained",
  under_analysis: "bg-status-practiced/20 text-navy",
  documented: "bg-fluent-light text-fluent",
  submitted: "bg-pillar-constitutional/10 text-pillar-constitutional",
  in_progress: "bg-fluent text-white",
  resolved: "bg-status-trained/15 text-pillar-character",
  deferred: "bg-text-tertiary/15 text-text-secondary",
};

function StatusPill({ status, className = "" }: StatusPillProps) {
  const isTraining = status in trainingLabels;
  const label = isTraining
    ? trainingLabels[status as TrainingStatus]
    : gapLabels[status as GapStatus];
  const style = isTraining
    ? trainingStyles[status as TrainingStatus]
    : gapStyles[status as GapStatus];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
        ${style} ${className}`}
    >
      {label}
    </span>
  );
}

export { StatusPill, type TrainingStatus, type GapStatus };
