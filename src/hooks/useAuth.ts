"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export type UserRole =
  | "admin"
  | "supervisory_ch"
  | "unit_ch"
  | "ras"
  | "commander"
  | "oct"
  | "respondent"
  | "viewer";

export interface UserProfile {
  id: string;
  personnel_id: string | null;
  org_id: string | null;
  role: UserRole;
  display_name: string | null;
  is_demo: boolean;
}

const DEMO_PROFILE: UserProfile = {
  id: "demo-user",
  personnel_id: null,
  org_id: null,
  role: "admin",
  display_name: "Demo User",
  is_demo: true,
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  const supabase = createClient();

  const fetchProfile = useCallback(
    async (userId: string) => {
      const { data } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();
      if (data) {
        setProfile(data as UserProfile);
      }
    },
    [supabase]
  );

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (authUser) {
        setUser(authUser);
        await fetchProfile(authUser.id);
      } else if (isDemoMode) {
        setProfile(DEMO_PROFILE);
      }
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      } else {
        setUser(null);
        if (isDemoMode) {
          setProfile(DEMO_PROFILE);
        } else {
          setProfile(null);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, isDemoMode, fetchProfile]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(isDemoMode ? DEMO_PROFILE : null);
  };

  return {
    user,
    profile,
    role: profile?.role ?? null,
    isDemo: profile?.is_demo ?? isDemoMode,
    isAuthenticated: !!user || isDemoMode,
    loading,
    signOut,
  };
}
