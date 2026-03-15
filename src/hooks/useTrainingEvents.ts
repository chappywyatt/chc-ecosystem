"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface TrainingEvent {
  id: string;
  org_id: string;
  task_id: string;
  date: string;
  location: string | null;
  context: string;
  rating: string | null;
  evaluator_id: string | null;
  external_evaluator: string | null;
  attendee_ids: string[];
  products: unknown[];
  lessons_learned: string | null;
  qualifiers: Record<string, unknown>;
  metl_linked: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  // joined fields
  task?: { id: string; title: string; echelon: string; task_type: string };
  organization?: { id: string; name: string; uic: string };
  evaluator?: { id: string; rank: string; last_name: string; first_name: string };
}

export interface TrainingEventFilters {
  dateFrom?: string;
  dateTo?: string;
  taskId?: string;
  rating?: string;
  context?: string;
}

export interface CreateTrainingEventData {
  org_id: string;
  task_id: string;
  date: string;
  location?: string;
  context: string;
  rating?: string;
  evaluator_id?: string;
  external_evaluator?: string;
  attendee_ids?: string[];
  lessons_learned?: string;
  qualifiers?: Record<string, unknown>;
}

export function useTrainingEvents() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchEvents = useCallback(
    async (
      orgIds: string[],
      filters?: TrainingEventFilters
    ): Promise<TrainingEvent[]> => {
      if (orgIds.length === 0) return [];
      setLoading(true);
      setError(null);

      let query = supabase
        .from("training_events")
        .select(
          `*, task:tasks_master(id, title, echelon, task_type),
           organization:organizations(id, name, uic),
           evaluator:personnel!training_events_evaluator_id_fkey(id, rank, last_name, first_name)`
        )
        .in("org_id", orgIds)
        .order("date", { ascending: false });

      if (filters?.dateFrom) {
        query = query.gte("date", filters.dateFrom);
      }
      if (filters?.dateTo) {
        query = query.lte("date", filters.dateTo);
      }
      if (filters?.taskId) {
        query = query.eq("task_id", filters.taskId);
      }
      if (filters?.rating) {
        query = query.eq("rating", filters.rating);
      }
      if (filters?.context) {
        query = query.eq("context", filters.context);
      }

      const { data, error: err } = await query;
      setLoading(false);
      if (err) {
        setError(err.message);
        return [];
      }
      return (data ?? []) as TrainingEvent[];
    },
    [supabase]
  );

  const fetchEvent = useCallback(
    async (id: string): Promise<TrainingEvent | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("training_events")
        .select(
          `*, task:tasks_master(id, title, echelon, task_type),
           organization:organizations(id, name, uic),
           evaluator:personnel!training_events_evaluator_id_fkey(id, rank, last_name, first_name)`
        )
        .eq("id", id)
        .single();
      setLoading(false);
      if (err) {
        setError(err.message);
        return null;
      }
      return data as TrainingEvent;
    },
    [supabase]
  );

  const createEvent = useCallback(
    async (
      eventData: CreateTrainingEventData
    ): Promise<TrainingEvent | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("training_events")
        .insert(eventData)
        .select()
        .single();
      setLoading(false);
      if (err) {
        setError(err.message);
        return null;
      }
      return data as TrainingEvent;
    },
    [supabase]
  );

  const updateEvent = useCallback(
    async (
      id: string,
      eventData: Partial<CreateTrainingEventData>
    ): Promise<TrainingEvent | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("training_events")
        .update(eventData)
        .eq("id", id)
        .select()
        .single();
      setLoading(false);
      if (err) {
        setError(err.message);
        return null;
      }
      return data as TrainingEvent;
    },
    [supabase]
  );

  return { fetchEvents, fetchEvent, createEvent, updateEvent, loading, error };
}
