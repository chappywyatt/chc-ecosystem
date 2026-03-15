"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface Organization {
  id: string;
  uic: string;
  name: string;
  echelon: string;
  parent_org_id: string | null;
  compo: string;
  installation: string | null;
  higher_hq: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  children?: Organization[];
}

export function useOrganization() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchOrg = useCallback(
    async (id: string): Promise<Organization | null> => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("organizations")
        .select("*")
        .eq("id", id)
        .single();
      setLoading(false);
      if (err) {
        setError(err.message);
        return null;
      }
      return data as Organization;
    },
    [supabase]
  );

  const fetchOrgTree = useCallback(
    async (rootOrgId?: string): Promise<Organization[]> => {
      setLoading(true);
      setError(null);

      const { data, error: err } = await supabase
        .from("organizations")
        .select("*")
        .eq("is_active", true)
        .order("echelon")
        .order("name");

      setLoading(false);
      if (err) {
        setError(err.message);
        return [];
      }

      const orgs = (data ?? []) as Organization[];

      if (!rootOrgId) return orgs;

      // Build tree from flat list
      const orgMap = new Map<string, Organization>();
      orgs.forEach((o) => orgMap.set(o.id, { ...o, children: [] }));

      const collectChildren = (parentId: string): Organization[] => {
        const result: Organization[] = [];
        for (const o of orgMap.values()) {
          if (o.parent_org_id === parentId) {
            o.children = collectChildren(o.id);
            result.push(o);
          }
        }
        return result.sort((a, b) => a.name.localeCompare(b.name));
      };

      const root = orgMap.get(rootOrgId);
      if (!root) return [];
      root.children = collectChildren(rootOrgId);
      return [root];
    },
    [supabase]
  );

  const fetchAllOrgs = useCallback(async (): Promise<Organization[]> => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("organizations")
      .select("*")
      .eq("is_active", true)
      .order("name");
    setLoading(false);
    if (err) {
      setError(err.message);
      return [];
    }
    return (data ?? []) as Organization[];
  }, [supabase]);

  // Flatten an org tree into a list (useful for dropdowns)
  const flattenOrgTree = useCallback(
    (tree: Organization[], depth = 0): (Organization & { depth: number })[] => {
      const result: (Organization & { depth: number })[] = [];
      for (const org of tree) {
        result.push({ ...org, depth });
        if (org.children?.length) {
          result.push(...flattenOrgTree(org.children, depth + 1));
        }
      }
      return result;
    },
    []
  );

  return { fetchOrg, fetchOrgTree, fetchAllOrgs, flattenOrgTree, loading, error };
}
