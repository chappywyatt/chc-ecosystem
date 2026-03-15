"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface Person {
  id: string;
  org_id: string;
  rank: string;
  last_name: string;
  first_name: string;
  mos: string;
  position_title: string;
  duty_status: string;
  user_id: string | null;
  email: string | null;
  phone: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // joined fields
  organization?: { id: string; name: string; uic: string };
}

export function usePersonnel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchPersonnel = useCallback(
    async (orgId: string): Promise<Person[]> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("personnel")
        .select("*, organization:organizations(id, name, uic)")
        .eq("org_id", orgId)
        .eq("is_active", true)
        .order("rank")
        .order("last_name");
      setLoading(false);
      if (err) {
        setError(err.message);
        return [];
      }
      return (data ?? []) as Person[];
    },
    [supabase]
  );

  const fetchPersonnelForOrgs = useCallback(
    async (orgIds: string[]): Promise<Person[]> => {
      if (orgIds.length === 0) return [];
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("personnel")
        .select("*, organization:organizations(id, name, uic)")
        .in("org_id", orgIds)
        .eq("is_active", true)
        .order("rank")
        .order("last_name");
      setLoading(false);
      if (err) {
        setError(err.message);
        return [];
      }
      return (data ?? []) as Person[];
    },
    [supabase]
  );

  const fetchPerson = useCallback(
    async (id: string): Promise<Person | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("personnel")
        .select("*, organization:organizations(id, name, uic)")
        .eq("id", id)
        .single();
      setLoading(false);
      if (err) {
        setError(err.message);
        return null;
      }
      return data as Person;
    },
    [supabase]
  );

  const displayName = (p: Person) => `${p.rank} ${p.last_name}, ${p.first_name}`;

  return { fetchPersonnel, fetchPersonnelForOrgs, fetchPerson, displayName, loading, error };
}
