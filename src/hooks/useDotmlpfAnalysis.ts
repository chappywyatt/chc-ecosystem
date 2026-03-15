"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface DotmlpfAnalysis {
  id: string;
  gap_id: string;
  domain: string;
  current_state: string;
  desired_state: string;
  gap_assessment: string;
  recommended_action: string | null;
  data_source: string | null;
  confidence_level: string | null;
  analyst_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateAnalysisData {
  gap_id: string;
  domain: string;
  current_state: string;
  desired_state: string;
  gap_assessment: string;
  recommended_action?: string;
  data_source?: string;
  confidence_level?: string;
}

export function useDotmlpfAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchAnalyses = useCallback(
    async (gapId: string): Promise<DotmlpfAnalysis[]> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("dotmlpf_analyses")
        .select("*")
        .eq("gap_id", gapId)
        .order("domain");
      setLoading(false);
      if (err) { setError(err.message); return []; }
      return (data ?? []) as DotmlpfAnalysis[];
    },
    [supabase]
  );

  const createAnalysis = useCallback(
    async (analysisData: CreateAnalysisData): Promise<DotmlpfAnalysis | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("dotmlpf_analyses")
        .insert(analysisData)
        .select()
        .single();
      setLoading(false);
      if (err) { setError(err.message); return null; }
      return data as DotmlpfAnalysis;
    },
    [supabase]
  );

  const updateAnalysis = useCallback(
    async (id: string, updates: Partial<CreateAnalysisData>): Promise<DotmlpfAnalysis | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("dotmlpf_analyses")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      setLoading(false);
      if (err) { setError(err.message); return null; }
      return data as DotmlpfAnalysis;
    },
    [supabase]
  );

  return { fetchAnalyses, createAnalysis, updateAnalysis, loading, error };
}
