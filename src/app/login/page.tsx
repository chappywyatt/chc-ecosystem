"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isRegister) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }
      setError(null);
      setIsRegister(false);
      setLoading(false);
      alert("Check your email to confirm your account.");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  const handleDemoMode = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-white text-lg font-bold">
              C
            </div>
            <h1 className="text-2xl font-semibold text-navy">
              CHC Digital Ecosystem
            </h1>
          </div>
          <p className="text-text-secondary">
            Chaplain Corps integrated readiness and development tools
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border border-border bg-surface-card p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-navy">
            {isRegister ? "Create Account" : "Sign In"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-text"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 w-full rounded-lg border border-border bg-white px-3 text-text
                  focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
                placeholder="you@army.mil"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-text"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-11 w-full rounded-lg border border-border bg-white px-3 text-text
                  focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
                placeholder="Minimum 6 characters"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-status-untrained/10 px-4 py-3 text-sm text-status-untrained">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-11 w-full rounded-lg bg-fluent font-medium text-white
                hover:bg-fluent-hover focus:ring-2 focus:ring-fluent-light focus:outline-none
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Please wait..."
                : isRegister
                  ? "Create Account"
                  : "Sign In"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError(null);
              }}
              className="text-sm text-fluent hover:underline"
            >
              {isRegister
                ? "Already have an account? Sign in"
                : "Need an account? Register"}
            </button>
          </div>
        </div>

        {/* Demo Mode Button */}
        {isDemoMode && (
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm text-text-tertiary">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <button
              onClick={handleDemoMode}
              className="h-12 w-full rounded-lg border-2 border-gold bg-gold/5 font-medium text-navy
                hover:bg-gold/15 focus:ring-2 focus:ring-gold-light focus:outline-none"
            >
              Enter Demo Mode
            </button>
            <p className="mt-2 text-center text-xs text-text-tertiary">
              Explore with sample data — no account needed
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
