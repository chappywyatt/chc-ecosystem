"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface Task {
  id: string;
  title: string;
  echelon: string;
  task_type: string;
  conditions: string | null;
  standards: string | null;
  performance_steps: unknown[];
  doctrinal_source: string[];
  bft_capability_mapping: string[];
  pillar_mapping: string[];
  has_teo: boolean;
  teo_gap_notes: string | null;
  is_active: boolean;
}

export function useTasks() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchTasks = useCallback(
    async (filters?: {
      echelon?: string;
      taskType?: string;
      search?: string;
    }): Promise<Task[]> => {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("tasks_master")
        .select("*")
        .eq("is_active", true)
        .order("id");

      if (filters?.echelon) {
        query = query.eq("echelon", filters.echelon);
      }
      if (filters?.taskType) {
        query = query.eq("task_type", filters.taskType);
      }
      if (filters?.search) {
        query = query.or(
          `id.ilike.%${filters.search}%,title.ilike.%${filters.search}%`
        );
      }

      const { data, error: err } = await query;
      setLoading(false);
      if (err) {
        setError(err.message);
        return [];
      }
      return (data ?? []) as Task[];
    },
    [supabase]
  );

  const fetchTask = useCallback(
    async (id: string): Promise<Task | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("tasks_master")
        .select("*")
        .eq("id", id)
        .single();
      setLoading(false);
      if (err) {
        setError(err.message);
        return null;
      }
      return data as Task;
    },
    [supabase]
  );

  const fetchTasksWithGaps = useCallback(async (): Promise<Task[]> => {
    const tasks = await fetchTasks();
    return tasks.filter((t) => !t.has_teo || !!t.teo_gap_notes);
  }, [fetchTasks]);

  return { fetchTasks, fetchTask, fetchTasksWithGaps, loading, error };
}
