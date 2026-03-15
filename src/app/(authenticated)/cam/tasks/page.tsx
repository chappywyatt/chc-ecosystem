"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select, type SelectOption } from "@/components/ui/Select";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { useTasks, type Task } from "@/hooks/useTasks";
import { BookOpen, AlertTriangle, Flag } from "lucide-react";

const echelonOptions: SelectOption[] = [
  { value: "", label: "All Echelons" },
  { value: "company", label: "Company" },
  { value: "battalion", label: "Battalion" },
  { value: "brigade", label: "Brigade" },
  { value: "division", label: "Division" },
  { value: "corps", label: "Corps" },
  { value: "theater", label: "Theater" },
];

const typeOptions: SelectOption[] = [
  { value: "", label: "All Types" },
  { value: "collective", label: "Collective" },
  { value: "individual_56a", label: "Individual (56A)" },
  { value: "individual_56m", label: "Individual (56M)" },
];

const teoOptions: SelectOption[] = [
  { value: "", label: "All T&EO Status" },
  { value: "true", label: "Has T&EO" },
  { value: "false", label: "No T&EO (Gap)" },
];

const pillarBadgeColors: Record<string, "green" | "fluent" | "orange" | "purple"> = {
  character: "green",
  competence: "fluent",
  connection: "orange",
  constitutional: "purple",
};

export default function TaskLibraryPage() {
  const router = useRouter();
  const { fetchTasks } = useTasks();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [search, setSearch] = useState("");
  const [filterEchelon, setFilterEchelon] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterTeo, setFilterTeo] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const data = await fetchTasks();
      if (!cancelled) { setTasks(data); setLoaded(true); }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    let result = tasks;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.id.toLowerCase().includes(q) || t.title.toLowerCase().includes(q));
    }
    if (filterEchelon) result = result.filter((t) => t.echelon === filterEchelon);
    if (filterType) result = result.filter((t) => t.task_type === filterType);
    if (filterTeo === "true") result = result.filter((t) => t.has_teo);
    if (filterTeo === "false") result = result.filter((t) => !t.has_teo);
    return result;
  }, [tasks, search, filterEchelon, filterType, filterTeo]);

  const gapCount = tasks.filter((t) => !t.has_teo).length;

  if (!loaded) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="Task Analysis Engine" />
        <div className="grid gap-4 sm:grid-cols-2">{Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}</div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title="Task Analysis Engine"
        subtitle={`${tasks.length} tasks in the CHC task library${gapCount > 0 ? ` · ${gapCount} T&EO gap${gapCount !== 1 ? "s" : ""} identified` : ""}`}
      />

      {/* Filters */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Input
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by task ID or title..."
          />
        </div>
        <Select label="Echelon" options={echelonOptions} value={filterEchelon} onChange={(e) => setFilterEchelon(e.target.value)} />
        <Select label="Type" options={typeOptions} value={filterType} onChange={(e) => setFilterType(e.target.value)} />
        <Select label="T&EO Status" options={teoOptions} value={filterTeo} onChange={(e) => setFilterTeo(e.target.value)} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<BookOpen size={40} />}
          title="No tasks found"
          description={tasks.length === 0 ? "The task library is empty. Seed data needs to be loaded." : "No tasks match your filters."}
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((task) => (
            <Card
              key={task.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push(`/cam/tasks/${task.id}`)}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="font-mono text-xs text-text-tertiary">{task.id}</span>
                {!task.has_teo && (
                  <Badge color="red">
                    <AlertTriangle size={10} className="mr-1" />
                    No T&EO
                  </Badge>
                )}
              </div>
              <h3 className="text-sm font-semibold text-navy mb-2 leading-snug">{task.title}</h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <Badge color="navy">{task.echelon}</Badge>
                <Badge color="fluent">{task.task_type.replace(/_/g, " ")}</Badge>
              </div>
              {task.pillar_mapping.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {task.pillar_mapping.map((p) => (
                    <Badge key={p} color={pillarBadgeColors[p] ?? "gray"}>{p}</Badge>
                  ))}
                </div>
              )}
              <div className="mt-3 flex justify-end">
                <Link
                  href={`/cam/gaps/new?taskId=${task.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button variant="ghost" size="sm">
                    <Flag size={12} /> Flag Gap
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
