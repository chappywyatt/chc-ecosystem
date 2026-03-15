"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Wizard, type WizardStep } from "@/components/ui/Wizard";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { useOrganization, type Organization } from "@/hooks/useOrganization";
import { usePersonnel, type Person } from "@/hooks/usePersonnel";
import { useTasks, type Task } from "@/hooks/useTasks";
import { useTrainingEvents, type CreateTrainingEventData } from "@/hooks/useTrainingEvents";

const contextOptions: SelectOption[] = [
  { value: "garrison", label: "Garrison" },
  { value: "stx", label: "STX (Situational Training Exercise)" },
  { value: "ftx", label: "FTX (Field Training Exercise)" },
  { value: "cpx", label: "CPX (Command Post Exercise)" },
  { value: "ctc", label: "CTC (Combat Training Center)" },
  { value: "wfx", label: "WFX (Warfighter Exercise)" },
  { value: "deployment", label: "Deployment" },
  { value: "home_station", label: "Home Station Training" },
  { value: "ltp", label: "LTP (Live Training Platform)" },
  { value: "mfgi", label: "MFGI" },
];

const ratingOptions: SelectOption[] = [
  { value: "T", label: "T — Trained" },
  { value: "T_minus", label: "T- — Trained Minus" },
  { value: "P", label: "P — Practiced" },
  { value: "P_minus", label: "P- — Practiced Minus" },
  { value: "U", label: "U — Untrained" },
];

type TrainingRating = "T" | "T_minus" | "P" | "P_minus" | "U";

export default function NewTrainingEventPage() {
  const router = useRouter();
  const { fetchAllOrgs } = useOrganization();
  const { fetchPersonnelForOrgs, displayName } = usePersonnel();
  const { fetchTasks } = useTasks();
  const { createEvent, loading: submitting, error: submitError } = useTrainingEvents();

  // Data
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [personnel, setPersonnel] = useState<Person[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Form state
  const [selectedOrgId, setSelectedOrgId] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [taskSearch, setTaskSearch] = useState("");
  const [context, setContext] = useState("garrison");
  const [selectedAttendees, setSelectedAttendees] = useState<Set<string>>(new Set());
  const [rating, setRating] = useState("");
  const [evaluatorId, setEvaluatorId] = useState("");
  const [externalEvaluator, setExternalEvaluator] = useState("");
  const [location, setLocation] = useState("");
  const [lessonsLearned, setLessonsLearned] = useState("");

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load initial data
  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [orgsData, tasksData] = await Promise.all([
        fetchAllOrgs(),
        fetchTasks(),
      ]);
      if (cancelled) return;
      setOrgs(orgsData);
      setTasks(tasksData);
      setDataLoaded(true);
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load personnel when org changes
  useEffect(() => {
    if (!selectedOrgId) {
      setPersonnel([]);
      return;
    }
    let cancelled = false;
    async function load() {
      const people = await fetchPersonnelForOrgs([selectedOrgId]);
      if (!cancelled) {
        setPersonnel(people);
        setSelectedAttendees(new Set());
      }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrgId]);

  const orgOptions: SelectOption[] = useMemo(
    () => orgs.map((o) => ({ value: o.id, label: `${o.name} (${o.uic})` })),
    [orgs]
  );

  const filteredTasks = useMemo(() => {
    if (!taskSearch) return tasks;
    const q = taskSearch.toLowerCase();
    return tasks.filter(
      (t) =>
        t.id.toLowerCase().includes(q) || t.title.toLowerCase().includes(q)
    );
  }, [tasks, taskSearch]);

  const selectedTask = tasks.find((t) => t.id === selectedTaskId);

  const toggleAttendee = (id: string) => {
    setSelectedAttendees((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAllAttendees = () => {
    setSelectedAttendees(new Set(personnel.map((p) => p.id)));
  };

  const clearAllAttendees = () => {
    setSelectedAttendees(new Set());
  };

  const handleSubmit = async () => {
    const data: CreateTrainingEventData = {
      org_id: selectedOrgId,
      task_id: selectedTaskId,
      date,
      context,
      location: location || undefined,
      rating: rating || undefined,
      evaluator_id: evaluatorId || undefined,
      external_evaluator: externalEvaluator || undefined,
      attendee_ids: Array.from(selectedAttendees),
      lessons_learned: lessonsLearned || undefined,
    };

    const result = await createEvent(data);
    if (result) {
      router.push(`/training/events/${result.id}`);
    }
  };

  if (!dataLoaded) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="Log Training Event" />
        <Card>
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>
        </Card>
      </>
    );
  }

  const steps: WizardStep[] = [
    // Step 1: Unit and Date
    {
      title: "Unit and Date",
      description: "Select the unit that conducted this training and the date.",
      validate: () => {
        const errs: Record<string, string> = {};
        if (!selectedOrgId) errs.org = "Please select a unit";
        if (!date) errs.date = "Please enter a date";
        setErrors(errs);
        return Object.keys(errs).length === 0;
      },
      content: (
        <div className="space-y-4">
          <Select
            label="Unit"
            options={orgOptions}
            value={selectedOrgId}
            onChange={(e) => setSelectedOrgId(e.target.value)}
            placeholder="Select the training unit..."
            required
            error={errors.org}
          />
          <Input
            label="Training Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            error={errors.date}
          />
        </div>
      ),
    },
    // Step 2: Task and Context
    {
      title: "Task and Context",
      description: "Which task was trained and in what environment?",
      validate: () => {
        const errs: Record<string, string> = {};
        if (!selectedTaskId) errs.task = "Please select a task";
        if (!context) errs.context = "Please select a training context";
        setErrors(errs);
        return Object.keys(errs).length === 0;
      },
      content: (
        <div className="space-y-4">
          <Input
            label="Search Tasks"
            value={taskSearch}
            onChange={(e) => setTaskSearch(e.target.value)}
            placeholder="Type to search by task ID or title..."
            helperText={`${filteredTasks.length} tasks available`}
          />
          <div className="max-h-64 overflow-y-auto rounded-lg border border-border">
            {filteredTasks.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-text-tertiary">
                No tasks found. Try a different search term.
              </div>
            ) : (
              filteredTasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left
                    transition-colors last:border-b-0
                    ${selectedTaskId === task.id
                      ? "bg-fluent-light"
                      : "hover:bg-surface"
                    }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-text-tertiary">
                        {task.id}
                      </span>
                      {!task.has_teo && (
                        <Badge color="red">No T&EO</Badge>
                      )}
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-text truncate">
                      {task.title}
                    </div>
                    <div className="mt-0.5 text-xs text-text-tertiary capitalize">
                      {task.echelon} · {task.task_type.replace(/_/g, " ")}
                    </div>
                  </div>
                  {selectedTaskId === task.id && (
                    <span className="text-fluent font-bold text-lg">✓</span>
                  )}
                </button>
              ))
            )}
          </div>
          {errors.task && (
            <p className="text-sm text-status-untrained">{errors.task}</p>
          )}

          <Select
            label="Training Context"
            options={contextOptions}
            value={context}
            onChange={(e) => setContext(e.target.value)}
            required
            error={errors.context}
          />
        </div>
      ),
    },
    // Step 3: Attendees
    {
      title: "Attendees",
      description: selectedOrgId
        ? "Select the personnel who participated in this training event."
        : "Select a unit in Step 1 to see available personnel.",
      content: (
        <div className="space-y-3">
          {personnel.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-border px-6 py-12 text-center text-sm text-text-secondary">
              {selectedOrgId
                ? "No personnel found for this unit. You can still proceed without selecting attendees."
                : "Select a unit in Step 1 to load personnel."}
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={selectAllAttendees}
                >
                  Select All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllAttendees}
                >
                  Clear All
                </Button>
                <span className="ml-auto text-sm text-text-tertiary">
                  {selectedAttendees.size} of {personnel.length} selected
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto rounded-lg border border-border">
                {personnel.map((person) => (
                  <label
                    key={person.id}
                    className={`flex cursor-pointer items-center gap-3 border-b border-border px-4 py-3
                      last:border-b-0 transition-colors
                      ${selectedAttendees.has(person.id) ? "bg-fluent-light/30" : "hover:bg-surface"}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAttendees.has(person.id)}
                      onChange={() => toggleAttendee(person.id)}
                      className="h-5 w-5 rounded border-border text-fluent
                        focus:ring-2 focus:ring-fluent-light"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-text">
                        {displayName(person)}
                      </div>
                      <div className="text-xs text-text-tertiary">
                        {person.position_title} · {person.mos}
                      </div>
                    </div>
                    <Badge
                      color={person.duty_status === "present" ? "green" : "gray"}
                    >
                      {person.duty_status.replace(/_/g, " ")}
                    </Badge>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
      ),
    },
    // Step 4: Assessment
    {
      title: "Assessment",
      description: "Rate the training proficiency and provide evaluator details.",
      validate: () => {
        const errs: Record<string, string> = {};
        if (!rating) errs.rating = "Please select a proficiency rating";
        setErrors(errs);
        return Object.keys(errs).length === 0;
      },
      content: (
        <div className="space-y-4">
          {/* Rating selection as large buttons */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">
              Proficiency Rating <span className="text-status-untrained">*</span>
            </label>
            <div className="grid grid-cols-5 gap-2">
              {ratingOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setRating(opt.value)}
                  className={`flex h-16 flex-col items-center justify-center rounded-lg border-2
                    text-sm font-medium transition-all
                    ${
                      rating === opt.value
                        ? "border-fluent bg-fluent-light text-fluent"
                        : "border-border bg-white text-text-secondary hover:border-fluent/30"
                    }`}
                >
                  <span className="text-lg font-bold">
                    {opt.value === "T_minus" ? "T-" : opt.value === "P_minus" ? "P-" : opt.value}
                  </span>
                  <span className="text-[10px]">
                    {opt.label.split("—")[1]?.trim() ?? ""}
                  </span>
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="mt-1 text-sm text-status-untrained">{errors.rating}</p>
            )}
          </div>

          <Select
            label="Internal Evaluator"
            options={[
              { value: "", label: "Select evaluator (optional)" },
              ...personnel.map((p) => ({
                value: p.id,
                label: displayName(p),
              })),
            ]}
            value={evaluatorId}
            onChange={(e) => setEvaluatorId(e.target.value)}
          />

          <Input
            label="External Evaluator"
            value={externalEvaluator}
            onChange={(e) => setExternalEvaluator(e.target.value)}
            placeholder="Name and unit of external evaluator (if applicable)"
            helperText="For CTC O/C-T or external observers"
          />

          <Input
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Training location"
          />

          <div>
            <label
              htmlFor="lessons"
              className="mb-1.5 block text-sm font-medium text-text"
            >
              Lessons Learned
            </label>
            <textarea
              id="lessons"
              value={lessonsLearned}
              onChange={(e) => setLessonsLearned(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text
                placeholder:text-text-tertiary
                focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
              placeholder="Key takeaways, sustainments, and improvements..."
            />
          </div>
        </div>
      ),
    },
    // Step 5: Review
    {
      title: "Review and Submit",
      description: "Verify all information before submitting.",
      content: (
        <div className="space-y-4">
          {submitError && (
            <div className="rounded-lg bg-status-untrained/10 px-4 py-3 text-sm text-status-untrained">
              Failed to save: {submitError}. Please try again.
            </div>
          )}

          <div className="rounded-lg border border-border bg-surface p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="text-xs text-text-tertiary">Unit</div>
                <div className="text-sm font-medium text-text">
                  {orgs.find((o) => o.id === selectedOrgId)?.name ?? "—"}
                </div>
              </div>
              <div>
                <div className="text-xs text-text-tertiary">Date</div>
                <div className="text-sm font-medium text-text">
                  {date ? new Date(date + "T00:00:00").toLocaleDateString() : "—"}
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-xs text-text-tertiary">Task</div>
                <div className="text-sm font-medium text-text">
                  {selectedTask
                    ? `${selectedTask.id} — ${selectedTask.title}`
                    : "—"}
                </div>
              </div>
              <div>
                <div className="text-xs text-text-tertiary">Context</div>
                <div className="text-sm font-medium text-text capitalize">
                  {context.replace(/_/g, " ")}
                </div>
              </div>
              <div>
                <div className="text-xs text-text-tertiary">Rating</div>
                <div className="mt-0.5">
                  {rating ? (
                    <StatusPill status={rating as TrainingRating} />
                  ) : (
                    <span className="text-sm text-text-tertiary">—</span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs text-text-tertiary">Attendees</div>
                <div className="text-sm font-medium text-text">
                  {selectedAttendees.size} personnel
                </div>
              </div>
              {location && (
                <div>
                  <div className="text-xs text-text-tertiary">Location</div>
                  <div className="text-sm font-medium text-text">{location}</div>
                </div>
              )}
              {lessonsLearned && (
                <div className="sm:col-span-2">
                  <div className="text-xs text-text-tertiary">Lessons Learned</div>
                  <div className="mt-0.5 text-sm text-text whitespace-pre-line">
                    {lessonsLearned}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Breadcrumbs />
      <PageHeader title="Log Training Event" subtitle="Record a training event and proficiency assessment" />
      <Card className="max-w-2xl">
        <Wizard
          steps={steps}
          onComplete={handleSubmit}
          onCancel={() => router.push("/training/events")}
          completeLabel="Submit Event"
          loading={submitting}
        />
      </Card>
    </>
  );
}
