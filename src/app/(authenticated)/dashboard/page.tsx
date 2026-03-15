"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useOrganization } from "@/hooks/useOrganization";
import { useTrainingEvents } from "@/hooks/useTrainingEvents";
import { useObservations } from "@/hooks/useObservations";
import { useCapabilityGaps } from "@/hooks/useCapabilityGaps";
import {
  ClipboardCheck,
  Eye,
  Compass,
  Users,
  BarChart3,
  Terminal,
  Plus,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const { profile } = useAuth();
  const { fetchAllOrgs } = useOrganization();
  const { fetchEvents } = useTrainingEvents();
  const { fetchObservations } = useObservations();
  const { fetchGaps } = useCapabilityGaps();

  const [loaded, setLoaded] = useState(false);
  const [stats, setStats] = useState({
    trainingEvents: 0,
    trainingThisMonth: 0,
    tpPercent: 0,
    observations: 0,
    obsThisQuarter: 0,
    personnel: 0,
    activeGaps: 0,
    criticalGaps: 0,
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const orgs = await fetchAllOrgs();
      const orgIds = orgs.map((o) => o.id);

      let trainingEvents = 0, trainingThisMonth = 0, tpPercent = 0;
      let observations = 0, obsThisQuarter = 0;
      let activeGaps = 0, criticalGaps = 0;

      if (orgIds.length > 0) {
        const [events, obs] = await Promise.all([
          fetchEvents(orgIds),
          fetchObservations({ orgIds }),
        ]);
        trainingEvents = events.length;
        const now = new Date();
        const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
        trainingThisMonth = events.filter((e) => e.date.startsWith(thisMonth)).length;
        const rated = events.filter((e) => e.rating);
        const tp = rated.filter((e) => e.rating === "T" || e.rating === "T_minus" || e.rating === "P" || e.rating === "P_minus").length;
        tpPercent = rated.length > 0 ? Math.round((tp / rated.length) * 100) : 0;

        observations = obs.length;
        const qStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
        obsThisQuarter = obs.filter((o) => new Date(o.observation_date) >= qStart).length;
      }

      const gaps = await fetchGaps();
      activeGaps = gaps.filter((g) => g.status !== "resolved" && g.status !== "deferred").length;
      criticalGaps = gaps.filter((g) => g.severity === "critical").length;

      if (!cancelled) {
        setStats({
          trainingEvents,
          trainingThisMonth,
          tpPercent,
          observations,
          obsThisQuarter,
          personnel: 0, // Will show org count for now
          activeGaps,
          criticalGaps,
        });
        setLoaded(true);
      }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loaded) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="Dashboard" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <PageHeader title="Dashboard" subtitle="CHC Digital Ecosystem" />

      {/* Welcome */}
      <Card className="mb-6 border-l-4 border-l-navy">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-navy">
              Welcome{profile?.display_name ? `, ${profile.display_name}` : ""}
            </h2>
            <p className="text-sm text-text-secondary">
              {profile?.role ? `Role: ${profile.role.replace(/_/g, " ")}` : ""}
              {profile?.is_demo && " · Demo Mode"}
            </p>
          </div>
          {profile?.is_demo && (
            <Badge color="gold">Demo</Badge>
          )}
        </div>
      </Card>

      {/* LOE Summary Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* LOE 1: Training */}
        <Link href="/training">
          <Card className="hover:shadow-md transition-shadow h-full">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <ClipboardCheck size={18} className="text-fluent" />
                <span className="text-xs font-semibold text-text-secondary uppercase">LOE 1 — Training</span>
              </div>
              <ArrowRight size={14} className="text-text-tertiary" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-2xl font-semibold text-navy">{stats.trainingEvents}</div>
                <div className="text-xs text-text-tertiary">Events total</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-navy">{stats.tpPercent}%</div>
                <div className="text-xs text-text-tertiary">T/P rate</div>
              </div>
            </div>
          </Card>
        </Link>

        {/* LOE 1/2: Gauge */}
        <Link href="/gauge">
          <Card className="hover:shadow-md transition-shadow h-full">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Eye size={18} className="text-pillar-character" />
                <span className="text-xs font-semibold text-text-secondary uppercase">LOE 1/2 — Gauge</span>
              </div>
              <ArrowRight size={14} className="text-text-tertiary" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-2xl font-semibold text-navy">{stats.observations}</div>
                <div className="text-xs text-text-tertiary">Observations</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-navy">{stats.obsThisQuarter}</div>
                <div className="text-xs text-text-tertiary">This quarter</div>
              </div>
            </div>
          </Card>
        </Link>

        {/* LOE 2: Compass */}
        <Link href="/compass">
          <Card className="hover:shadow-md transition-shadow h-full">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-pillar-competence" />
                <span className="text-xs font-semibold text-text-secondary uppercase">LOE 2 — Compass</span>
              </div>
              <ArrowRight size={14} className="text-text-tertiary" />
            </div>
            <div className="text-2xl font-semibold text-navy">360°</div>
            <div className="text-xs text-text-tertiary">Assessment cycles</div>
          </Card>
        </Link>

        {/* LOE 2: Personnel */}
        <Link href="/personnel">
          <Card className="hover:shadow-md transition-shadow h-full">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-pillar-connection" />
                <span className="text-xs font-semibold text-text-secondary uppercase">LOE 2 — Personnel</span>
              </div>
              <ArrowRight size={14} className="text-text-tertiary" />
            </div>
            <div className="text-2xl font-semibold text-navy">—</div>
            <div className="text-xs text-text-tertiary">Assigned personnel</div>
          </Card>
        </Link>

        {/* LOE 4: Command */}
        <Link href="/command">
          <Card className="hover:shadow-md transition-shadow h-full">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-gold" />
                <span className="text-xs font-semibold text-text-secondary uppercase">LOE 4 — Command</span>
              </div>
              <ArrowRight size={14} className="text-text-tertiary" />
            </div>
            <div className="text-2xl font-semibold text-navy">12</div>
            <div className="text-xs text-text-tertiary">AI-powered tools</div>
          </Card>
        </Link>

        {/* LOE 5: CAM */}
        <Link href="/cam">
          <Card className="hover:shadow-md transition-shadow h-full">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 size={18} className="text-pillar-constitutional" />
                <span className="text-xs font-semibold text-text-secondary uppercase">LOE 5 — CAM</span>
              </div>
              <ArrowRight size={14} className="text-text-tertiary" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-2xl font-semibold text-navy">{stats.activeGaps}</div>
                <div className="text-xs text-text-tertiary">Active gaps</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-status-untrained">{stats.criticalGaps}</div>
                <div className="text-xs text-text-tertiary">Critical</div>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-sm font-semibold text-navy mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Link href="/training/events/new"><Button size="sm"><Plus size={14} /> Log Training</Button></Link>
          <Link href="/gauge/observe"><Button size="sm" variant="secondary"><Eye size={14} /> New Observation</Button></Link>
          <Link href="/compass/cycles/new"><Button size="sm" variant="secondary"><Compass size={14} /> Start Assessment</Button></Link>
          <Link href="/cam/gaps/new"><Button size="sm" variant="secondary"><BarChart3 size={14} /> Report Gap</Button></Link>
          <Link href="/command"><Button size="sm" variant="secondary"><Terminal size={14} /> AI Tools</Button></Link>
        </div>
      </Card>
    </>
  );
}
