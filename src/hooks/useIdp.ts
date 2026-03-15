"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface IdpGoal {
  what: string;
  why: string;
  how: string;
  when: string;
  support: string;
  status?: string;
}

export interface IdpRecord {
  id: string;
  personnel_id: string;
  supervisor_id: string;
  created_date: string;
  professional_goals: IdpGoal[];
  personal_goals: IdpGoal[];
  strengths_to_maximize: string[];
  needs_to_mitigate: string[];
  reflection_notes: Record<string, string>;
  followup_1_date: string | null;
  followup_1_notes: string | null;
  followup_1_completed: boolean;
  followup_2_date: string | null;
  followup_2_notes: string | null;
  followup_2_completed: boolean;
  status: string;
  source_compass_id: string | null;
  source_observation_ids: string[];
  created_by: string | null;
  created_at: string;
  updated_at: string;
  // joined
  person?: { id: string; rank: string; last_name: string; first_name: string };
  supervisor?: { id: string; rank: string; last_name: string; first_name: string };
}

export interface CreateIdpData {
  personnel_id: string;
  supervisor_id: string;
  professional_goals?: IdpGoal[];
  personal_goals?: IdpGoal[];
  strengths_to_maximize?: string[];
  needs_to_mitigate?: string[];
  reflection_notes?: Record<string, string>;
  followup_1_date?: string;
  followup_2_date?: string;
  source_compass_id?: string;
  source_observation_ids?: string[];
}

const SELECT_FIELDS = `*,
  person:personnel!idp_records_personnel_id_fkey(id, rank, last_name, first_name),
  supervisor:personnel!idp_records_supervisor_id_fkey(id, rank, last_name, first_name)`;

export function useIdp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchIdps = useCallback(
    async (personnelId: string): Promise<IdpRecord[]> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("idp_records")
        .select(SELECT_FIELDS)
        .eq("personnel_id", personnelId)
        .order("created_date", { ascending: false });
      setLoading(false);
      if (err) { setError(err.message); return []; }
      return (data ?? []) as IdpRecord[];
    },
    [supabase]
  );

  const fetchIdp = useCallback(
    async (id: string): Promise<IdpRecord | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("idp_records")
        .select(SELECT_FIELDS)
        .eq("id", id)
        .single();
      setLoading(false);
      if (err) { setError(err.message); return null; }
      return data as IdpRecord;
    },
    [supabase]
  );

  const createIdp = useCallback(
    async (idpData: CreateIdpData): Promise<IdpRecord | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("idp_records")
        .insert({
          ...idpData,
          professional_goals: idpData.professional_goals ?? [],
          personal_goals: idpData.personal_goals ?? [],
          strengths_to_maximize: idpData.strengths_to_maximize ?? [],
          needs_to_mitigate: idpData.needs_to_mitigate ?? [],
          reflection_notes: idpData.reflection_notes ?? {},
          status: "draft",
        })
        .select()
        .single();
      setLoading(false);
      if (err) { setError(err.message); return null; }
      return data as IdpRecord;
    },
    [supabase]
  );

  const updateIdp = useCallback(
    async (id: string, updates: Partial<CreateIdpData> & {
      status?: string;
      followup_1_notes?: string;
      followup_1_completed?: boolean;
      followup_2_notes?: string;
      followup_2_completed?: boolean;
    }): Promise<IdpRecord | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("idp_records")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      setLoading(false);
      if (err) { setError(err.message); return null; }
      return data as IdpRecord;
    },
    [supabase]
  );

  return { fetchIdps, fetchIdp, createIdp, updateIdp, loading, error };
}
