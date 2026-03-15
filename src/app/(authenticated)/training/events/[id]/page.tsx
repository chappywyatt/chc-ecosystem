"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { Badge } from "@/components/ui/Badge";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { useTrainingEvents, type TrainingEvent } from "@/hooks/useTrainingEvents";
import { usePersonnel, type Person } from "@/hooks/usePersonnel";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  FileText,
  Award,
} from "lucide-react";

export default function TrainingEventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;
  const { fetchEvent, loading } = useTrainingEvents();
  const { fetchPersonnelForOrgs, displayName } = usePersonnel();

  const [event, setEvent] = useState<TrainingEvent | null>(null);
  const [attendees, setAttendees] = useState<Person[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const ev = await fetchEvent(eventId);
      if (cancelled) return;
      setEvent(ev);

      if (ev?.attendee_ids?.length && ev.org_id) {
        const people = await fetchPersonnelForOrgs([ev.org_id]);
        if (!cancelled) {
          setAttendees(
            people.filter((p) => ev.attendee_ids.includes(p.id))
          );
        }
      }
      setLoaded(true);
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  if (!loaded || loading) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="Training Event" />
        <div className="space-y-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="Training Event" />
        <Card>
          <div className="text-center py-12">
            <p className="text-text-secondary mb-4">Event not found.</p>
            <Link href="/training/events">
              <Button variant="secondary">
                <ArrowLeft size={16} />
                Back to Events
              </Button>
            </Link>
          </div>
        </Card>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title={event.task?.title ?? event.task_id}
        subtitle={`Task ${event.task_id}`}
        actions={
          <Button variant="secondary" onClick={() => router.back()}>
            <ArrowLeft size={16} />
            Back
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main info */}
        <div className="space-y-6 lg:col-span-2">
          <Card padding={false}>
            <CardHeader
              title="Event Details"
              accent="navy"
            />
            <div className="grid gap-6 p-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Calendar size={18} className="mt-0.5 text-text-tertiary" />
                <div>
                  <div className="text-xs text-text-tertiary">Date</div>
                  <div className="text-sm font-medium text-text">
                    {new Date(event.date).toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award size={18} className="mt-0.5 text-text-tertiary" />
                <div>
                  <div className="text-xs text-text-tertiary">Rating</div>
                  <div className="mt-0.5">
                    {event.rating ? (
                      <StatusPill
                        status={event.rating as "T" | "T_minus" | "P" | "P_minus" | "U"}
                      />
                    ) : (
                      <span className="text-sm text-text-tertiary">Not rated</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-text-tertiary" />
                <div>
                  <div className="text-xs text-text-tertiary">Location</div>
                  <div className="text-sm font-medium text-text">
                    {event.location || "Not specified"}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText size={18} className="mt-0.5 text-text-tertiary" />
                <div>
                  <div className="text-xs text-text-tertiary">Context</div>
                  <div className="text-sm font-medium text-text capitalize">
                    {event.context.replace(/_/g, " ")}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="text-xs text-text-tertiary mb-1">Unit</div>
                <div className="text-sm font-medium text-text">
                  {event.organization?.name ?? "—"}
                  {event.organization?.uic && (
                    <span className="ml-2 text-text-tertiary">
                      ({event.organization.uic})
                    </span>
                  )}
                </div>
              </div>

              {event.evaluator && (
                <div className="sm:col-span-2">
                  <div className="text-xs text-text-tertiary mb-1">Evaluator</div>
                  <div className="text-sm font-medium text-text">
                    {event.evaluator.rank} {event.evaluator.last_name},{" "}
                    {event.evaluator.first_name}
                  </div>
                </div>
              )}

              {event.external_evaluator && (
                <div className="sm:col-span-2">
                  <div className="text-xs text-text-tertiary mb-1">
                    External Evaluator
                  </div>
                  <div className="text-sm font-medium text-text">
                    {event.external_evaluator}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Lessons Learned */}
          {event.lessons_learned && (
            <Card padding={false}>
              <CardHeader title="Lessons Learned" />
              <div className="p-6">
                <p className="text-sm text-text whitespace-pre-line">
                  {event.lessons_learned}
                </p>
              </div>
            </Card>
          )}

          {/* Task Info */}
          {event.task && (
            <Card padding={false}>
              <CardHeader title="Task Information" />
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge color="navy">
                    {event.task.echelon}
                  </Badge>
                  <Badge color="fluent">
                    {event.task.task_type.replace(/_/g, " ")}
                  </Badge>
                </div>
                <div className="text-sm font-medium text-navy">
                  {event.task.id}
                </div>
                <div className="mt-0.5 text-sm text-text">
                  {event.task.title}
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar: Attendees */}
        <div>
          <Card padding={false}>
            <CardHeader
              title="Attendees"
              subtitle={`${attendees.length} personnel`}
            />
            {attendees.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <Users size={32} className="mx-auto mb-2 text-text-tertiary" />
                <p className="text-sm text-text-secondary">
                  No attendees recorded
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {attendees.map((person) => (
                  <div key={person.id} className="px-4 py-3">
                    <div className="text-sm font-medium text-text">
                      {displayName(person)}
                    </div>
                    <div className="text-xs text-text-tertiary">
                      {person.position_title} · {person.mos}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Metadata */}
          <Card className="mt-4">
            <div className="space-y-2 text-xs text-text-tertiary">
              <div>
                Created:{" "}
                {new Date(event.created_at).toLocaleString()}
              </div>
              <div>
                Updated:{" "}
                {new Date(event.updated_at).toLocaleString()}
              </div>
              <div className="font-mono truncate">
                ID: {event.id}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
