interface SkeletonProps {
  className?: string;
}

function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-border ${className}`}
      aria-hidden="true"
    />
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-border bg-surface-card p-6">
      <Skeleton className="mb-4 h-5 w-1/3" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-lg border border-border">
      <div className="bg-navy px-4 py-3">
        <Skeleton className="h-4 w-full !bg-navy-light" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={`border-t border-border px-4 py-3 ${
            i % 2 === 0 ? "bg-surface-card" : "bg-surface"
          }`}
        >
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonTable };
