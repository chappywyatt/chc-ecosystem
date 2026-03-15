"use client";

import { useCallback, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { generateWordPicture, type ObservationRatings } from "@/lib/utils/word-picture";

export interface Observation {
  id: string;
  subject_id: string;
  observer_id: string;
  org_id: string;
  observation_date: string;
  context: string | null;
  echelon_setting: string;
  training_event_id: string | null;
  ratings: ObservationRatings;
  word_picture: Record<string, unknown> | null;
  overall_notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  // joined fields
  subject?: { id: string; rank: string; last_name: string; first_name: string; position_title: string };
  observer?: { id: string; rank: string; last_name: string; first_name: string };
  organization?: { id: string; name: string; uic: string };
}

export interface ObservationFilters {
  subjectId?: string;
  observerId?: string;
  orgIds?: string[];
  dateFrom?: string;
  dateTo?: string;
  echelon?: string;
}

export interface CreateObservationData {
  subject_id: string;
  observer_id: string;
  org_id: string;
  observation_date: string;
  context?: string;
  echelon_setting: string;
  training_event_id?: string;
  ratings: ObservationRatings;
  overall_notes?: string;
}

const SELECT_FIELDS = `*,
  subject:personnel!behavioral_observations_subject_id_fkey(id, rank, last_name, first_name, position_title),
  observer:personnel!behavioral_observations_observer_id_fkey(id, rank, last_name, first_name),
  organization:organizations(id, name, uic)`;

export function useObservations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchObservations = useCallback(
    async (filters?: ObservationFilters): Promise<Observation[]> => {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("behavioral_observations")
        .select(SELECT_FIELDS)
        .order("observation_date", { ascending: false });

      if (filters?.subjectId) {
        query = query.eq("subject_id", filters.subjectId);
      }
      if (filters?.observerId) {
        query = query.eq("observer_id", filters.observerId);
      }
      if (filters?.orgIds?.length) {
        query = query.in("org_id", filters.orgIds);
      }
      if (filters?.dateFrom) {
        query = query.gte("observation_date", filters.dateFrom);
      }
      if (filters?.dateTo) {
        query = query.lte("observation_date", filters.dateTo);
      }
      if (filters?.echelon) {
        query = query.eq("echelon_setting", filters.echelon);
      }

      const { data, error: err } = await query;
      setLoading(false);
      if (err) {
        setError(err.message);
        return [];
      }
      return (data ?? []) as Observation[];
    },
    [supabase]
  );

  const fetchObservation = useCallback(
    async (id: string): Promise<Observation | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("behavioral_observations")
        .select(SELECT_FIELDS)
        .eq("id", id)
        .single();
      setLoading(false);
      if (err) {
        setError(err.message);
        return null;
      }
      return data as Observation;
    },
    [supabase]
  );

  const createObservation = useCallback(
    async (obsData: CreateObservationData): Promise<Observation | null> => {
      setLoading(true);
      setError(null);

      // Auto-generate word picture
      const wordPicture = generateWordPicture(obsData.ratings);

      const { data, error: err } = await supabase
        .from("behavioral_observations")
        .insert({
          ...obsData,
          word_picture: wordPicture as unknown as Record<string, unknown>,
        })
        .select()
        .single();

      setLoading(false);
      if (err) {
        setError(err.message);
        return null;
      }
      return data as Observation;
    },
    [supabase]
  );

  return { fetchObservations, fetchObservation, createObservation, loading, error };
}

/**
 * Hook for real-time observation updates.
 * Subscribe to new observations for a set of org IDs.
 */
export function useObservationRealtime(
  orgIds: string[],
  onInsert: (obs: Observation) => void
) {
  const supabase = createClient();

  useEffect(() => {
    if (orgIds.length === 0) return;

    const channel = supabase
      .channel("observations-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "behavioral_observations",
        },
        (payload) => {
          const newObs = payload.new as Observation;
          if (orgIds.includes(newObs.org_id)) {
            onInsert(newObs);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, orgIds, onInsert]);
}
