"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface CompassCycle {
  id: string;
  subject_id: string;
  initiated_by: string;
  assessment_period: string;
  status: string;
  opens_at: string;
  closes_at: string | null;
  min_respondents_per_role: number;
  created_at: string;
  updated_at: string;
  subject?: { id: string; rank: string; last_name: string; first_name: string; position_title: string };
  initiator?: { id: string; rank: string; last_name: string; first_name: string };
}

export interface CompassResponse {
  id: string;
  cycle_id: string;
  respondent_role: string;
  respondent_token: string;
  ratings: Record<string, number>;
  comments: Record<string, string>;
  submitted_at: string | null;
  is_complete: boolean;
}

export interface AggregatedResult {
  quality_key: string;
  role: string;
  avg_rating: number;
  respondent_count: number;
}

export interface CycleFilters {
  subjectId?: string;
  status?: string;
  period?: string;
}

export function useCompass() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchCycles = useCallback(
    async (filters?: CycleFilters): Promise<CompassCycle[]> => {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("compass_cycles")
        .select(
          `*, subject:personnel!compass_cycles_subject_id_fkey(id, rank, last_name, first_name, position_title),
           initiator:personnel!compass_cycles_initiated_by_fkey(id, rank, last_name, first_name)`
        )
        .order("created_at", { ascending: false });

      if (filters?.subjectId) query = query.eq("subject_id", filters.subjectId);
      if (filters?.status) query = query.eq("status", filters.status);
      if (filters?.period) query = query.eq("assessment_period", filters.period);

      const { data, error: err } = await query;
      setLoading(false);
      if (err) { setError(err.message); return []; }
      return (data ?? []) as CompassCycle[];
    },
    [supabase]
  );

  const fetchCycle = useCallback(
    async (id: string): Promise<CompassCycle | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("compass_cycles")
        .select(
          `*, subject:personnel!compass_cycles_subject_id_fkey(id, rank, last_name, first_name, position_title),
           initiator:personnel!compass_cycles_initiated_by_fkey(id, rank, last_name, first_name)`
        )
        .eq("id", id)
        .single();
      setLoading(false);
      if (err) { setError(err.message); return null; }
      return data as CompassCycle;
    },
    [supabase]
  );

  const createCycle = useCallback(
    async (
      subjectId: string,
      initiatedBy: string,
      period: string,
      closesAt?: string
    ): Promise<CompassCycle | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("compass_cycles")
        .insert({
          subject_id: subjectId,
          initiated_by: initiatedBy,
          assessment_period: period,
          status: "open",
          closes_at: closesAt || null,
        })
        .select()
        .single();
      setLoading(false);
      if (err) { setError(err.message); return null; }
      return data as CompassCycle;
    },
    [supabase]
  );

  const generateResponseLinks = useCallback(
    async (
      cycleId: string,
      roles: string[]
    ): Promise<CompassResponse[]> => {
      setLoading(true);
      setError(null);

      const records = roles.map((role) => ({
        cycle_id: cycleId,
        respondent_role: role,
        respondent_token: crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "").slice(0, 32),
        ratings: {},
        comments: {},
      }));

      const { data, error: err } = await supabase
        .from("compass_responses")
        .insert(records)
        .select();

      setLoading(false);
      if (err) { setError(err.message); return []; }
      return (data ?? []) as CompassResponse[];
    },
    [supabase]
  );

  const fetchResponsesByToken = useCallback(
    async (token: string): Promise<CompassResponse | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("compass_responses")
        .select("*")
        .eq("respondent_token", token)
        .single();
      setLoading(false);
      if (err) { setError(err.message); return null; }
      return data as CompassResponse;
    },
    [supabase]
  );

  const submitResponse = useCallback(
    async (
      token: string,
      ratings: Record<string, number>,
      comments: Record<string, string>
    ): Promise<boolean> => {
      setLoading(true);
      setError(null);
      const { error: err } = await supabase
        .from("compass_responses")
        .update({
          ratings,
          comments,
          is_complete: true,
          submitted_at: new Date().toISOString(),
        })
        .eq("respondent_token", token);
      setLoading(false);
      if (err) { setError(err.message); return false; }
      return true;
    },
    [supabase]
  );

  const fetchResponsesForCycle = useCallback(
    async (cycleId: string): Promise<CompassResponse[]> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("compass_responses")
        .select("*")
        .eq("cycle_id", cycleId);
      setLoading(false);
      if (err) { setError(err.message); return []; }
      return (data ?? []) as CompassResponse[];
    },
    [supabase]
  );

  const getAggregatedResults = useCallback(
    (
      responses: CompassResponse[],
      minPerRole: number
    ): { byQuality: AggregatedResult[]; meetsThreshold: Record<string, boolean> } => {
      const completed = responses.filter((r) => r.is_complete);

      // Group by role
      const roleGroups = new Map<string, CompassResponse[]>();
      for (const r of completed) {
        if (!roleGroups.has(r.respondent_role)) roleGroups.set(r.respondent_role, []);
        roleGroups.get(r.respondent_role)!.push(r);
      }

      const meetsThreshold: Record<string, boolean> = {};
      for (const [role, group] of roleGroups) {
        meetsThreshold[role] = group.length >= minPerRole;
      }

      // Aggregate by quality × role
      const results: AggregatedResult[] = [];
      for (const [role, group] of roleGroups) {
        if (!meetsThreshold[role] && role !== "self") continue;

        const qualityScores = new Map<string, number[]>();
        for (const resp of group) {
          for (const [qKey, rating] of Object.entries(resp.ratings)) {
            if (!qualityScores.has(qKey)) qualityScores.set(qKey, []);
            qualityScores.get(qKey)!.push(rating as number);
          }
        }

        for (const [qKey, scores] of qualityScores) {
          results.push({
            quality_key: qKey,
            role,
            avg_rating: Math.round((scores.reduce((s, v) => s + v, 0) / scores.length) * 100) / 100,
            respondent_count: scores.length,
          });
        }
      }

      return { byQuality: results, meetsThreshold };
    },
    []
  );

  return {
    fetchCycles,
    fetchCycle,
    createCycle,
    generateResponseLinks,
    fetchResponsesByToken,
    submitResponse,
    fetchResponsesForCycle,
    getAggregatedResults,
    loading,
    error,
  };
}
