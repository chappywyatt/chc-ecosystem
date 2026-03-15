"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface CapabilityGap {
  id: string;
  title: string;
  description: string;
  operational_impact: string;
  doctrinal_references: string[];
  source_type: string;
  source_ids: string[];
  source_description: string | null;
  dotmlpf_domains: string[];
  severity: string;
  affected_echelons: string[];
  affected_compos: string[];
  proposed_solution: string | null;
  solution_pathway: string;
  status: string;
  assigned_to: string | null;
  resolution_notes: string | null;
  resolved_date: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  assignee?: { id: string; rank: string; last_name: string; first_name: string };
}

export interface GapFilters {
  status?: string;
  severity?: string;
  domain?: string;
  pathway?: string;
}

export interface GapStats {
  total: number;
  bySeverity: Record<string, number>;
  byStatus: Record<string, number>;
  byDomain: Record<string, number>;
  byPathway: Record<string, number>;
}

export interface CreateGapData {
  title: string;
  description: string;
  operational_impact: string;
  doctrinal_references?: string[];
  source_type: string;
  source_ids?: string[];
  source_description?: string;
  dotmlpf_domains?: string[];
  severity: string;
  affected_echelons?: string[];
  affected_compos?: string[];
  proposed_solution?: string;
  solution_pathway?: string;
}

export function useCapabilityGaps() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchGaps = useCallback(
    async (filters?: GapFilters): Promise<CapabilityGap[]> => {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("capability_gaps")
        .select("*, assignee:personnel!capability_gaps_assigned_to_fkey(id, rank, last_name, first_name)")
        .order("created_at", { ascending: false });

      if (filters?.status) query = query.eq("status", filters.status);
      if (filters?.severity) query = query.eq("severity", filters.severity);
      if (filters?.pathway) query = query.eq("solution_pathway", filters.pathway);
      if (filters?.domain) query = query.contains("dotmlpf_domains", [filters.domain]);

      const { data, error: err } = await query;
      setLoading(false);
      if (err) { setError(err.message); return []; }
      return (data ?? []) as CapabilityGap[];
    },
    [supabase]
  );

  const fetchGap = useCallback(
    async (id: string): Promise<CapabilityGap | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("capability_gaps")
        .select("*, assignee:personnel!capability_gaps_assigned_to_fkey(id, rank, last_name, first_name)")
        .eq("id", id)
        .single();
      setLoading(false);
      if (err) { setError(err.message); return null; }
      return data as CapabilityGap;
    },
    [supabase]
  );

  const createGap = useCallback(
    async (gapData: CreateGapData): Promise<CapabilityGap | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("capability_gaps")
        .insert({
          ...gapData,
          status: "identified",
          solution_pathway: gapData.solution_pathway || "pending_analysis",
        })
        .select()
        .single();
      setLoading(false);
      if (err) { setError(err.message); return null; }
      return data as CapabilityGap;
    },
    [supabase]
  );

  const updateGap = useCallback(
    async (id: string, updates: Partial<CapabilityGap>): Promise<CapabilityGap | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("capability_gaps")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      setLoading(false);
      if (err) { setError(err.message); return null; }
      return data as CapabilityGap;
    },
    [supabase]
  );

  const fetchGapStats = useCallback(
    async (): Promise<GapStats> => {
      const gaps = await fetchGaps();
      const stats: GapStats = {
        total: gaps.length,
        bySeverity: {},
        byStatus: {},
        byDomain: {},
        byPathway: {},
      };
      for (const g of gaps) {
        stats.bySeverity[g.severity] = (stats.bySeverity[g.severity] ?? 0) + 1;
        stats.byStatus[g.status] = (stats.byStatus[g.status] ?? 0) + 1;
        stats.byPathway[g.solution_pathway] = (stats.byPathway[g.solution_pathway] ?? 0) + 1;
        for (const d of g.dotmlpf_domains) {
          stats.byDomain[d] = (stats.byDomain[d] ?? 0) + 1;
        }
      }
      return stats;
    },
    [fetchGaps]
  );

  return { fetchGaps, fetchGap, createGap, updateGap, fetchGapStats, loading, error };
}
