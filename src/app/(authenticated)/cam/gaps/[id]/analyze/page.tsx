"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select, type SelectOption } from "@/components/ui/Select";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { useCapabilityGaps, type CapabilityGap } from "@/hooks/useCapabilityGaps";
import { useDotmlpfAnalysis, type DotmlpfAnalysis, type CreateAnalysisData } from "@/hooks/useDotmlpfAnalysis";
import { DOTMLPF_DOMAINS, DOMAIN_COLORS, type DotmlpfDomain } from "@/lib/constants/dotmlpf";
import { ArrowLeft, Save, Check, FileText, Info } from "lucide-react";

const confidenceOptions: SelectOption[] = [
  { value: "", label: "Select confidence..." },
  { value: "high", label: "High — Strong evidence" },
  { value: "medium", label: "Medium — Moderate evidence" },
  { value: "low", label: "Low — Limited evidence" },
];

export default function DotmlpfWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const gapId = params.id as string;

  const { fetchGap } = useCapabilityGaps();
  const { fetchAnalyses, createAnalysis, updateAnalysis, loading: saving, error: saveError } = useDotmlpfAnalysis();

  const [gap, setGap] = useState<CapabilityGap | null>(null);
  const [analyses, setAnalyses] = useState<DotmlpfAnalysis[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeDomain, setActiveDomain] = useState<string>("");

  // Form state for current domain
  const [currentState, setCurrentState] = useState("");
  const [desiredState, setDesiredState] = useState("");
  const [gapAssessment, setGapAssessment] = useState("");
  const [recommendedAction, setRecommendedAction] = useState("");
  const [dataSource, setDataSource] = useState("");
  const [confidence, setConfidence] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [g, a] = await Promise.all([fetchGap(gapId), fetchAnalyses(gapId)]);
      if (!cancelled) {
        setGap(g);
        setAnalyses(a);
        if (g && g.dotmlpf_domains.length > 0) setActiveDomain(g.dotmlpf_domains[0]);
        setLoaded(true);
      }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gapId]);

  // Load form state when domain tab changes
  useEffect(() => {
    if (!activeDomain) return;
    const existing = analyses.find((a) => a.domain === activeDomain);
    if (existing) {
      setCurrentState(existing.current_state);
      setDesiredState(existing.desired_state);
      setGapAssessment(existing.gap_assessment);
      setRecommendedAction(existing.recommended_action ?? "");
      setDataSource(existing.data_source ?? "");
      setConfidence(existing.confidence_level ?? "");
    } else {
      setCurrentState("");
      setDesiredState("");
      setGapAssessment("");
      setRecommendedAction("");
      setDataSource("");
      setConfidence("");
    }
    setSaved(false);
  }, [activeDomain, analyses]);

  const handleSave = useCallback(async () => {
    if (!currentState.trim() || !desiredState.trim() || !gapAssessment.trim()) return;

    const existing = analyses.find((a) => a.domain === activeDomain);
    const data = {
      current_state: currentState,
      desired_state: desiredState,
      gap_assessment: gapAssessment,
      recommended_action: recommendedAction || undefined,
      data_source: dataSource || undefined,
      confidence_level: confidence || undefined,
    };

    let result: DotmlpfAnalysis | null;
    if (existing) {
      result = await updateAnalysis(existing.id, data);
    } else {
      result = await createAnalysis({ ...data, gap_id: gapId, domain: activeDomain } as CreateAnalysisData);
    }

    if (result) {
      setAnalyses((prev) => {
        const filtered = prev.filter((a) => a.domain !== activeDomain);
        return [...filtered, result!];
      });
      setSaved(true);
    }
  }, [activeDomain, currentState, desiredState, gapAssessment, recommendedAction, dataSource, confidence, analyses, gapId, createAnalysis, updateAnalysis]);

  if (!loaded) return <><Breadcrumbs /><PageHeader title="DOTMLPF-P Analysis" /><SkeletonCard /></>;

  if (!gap) return (
    <><Breadcrumbs /><PageHeader title="DOTMLPF-P Analysis" /><Card><div className="py-12 text-center text-text-secondary">Gap not found.</div></Card></>
  );

  const domains = gap.dotmlpf_domains
    .map((id) => DOTMLPF_DOMAINS.find((d) => d.id === id))
    .filter(Boolean) as DotmlpfDomain[];
  const analyzedSet = new Set(analyses.map((a) => a.domain));
  const activeDef = DOTMLPF_DOMAINS.find((d) => d.id === activeDomain);
  const allAnalyzed = domains.every((d) => analyzedSet.has(d.id));
  const coreAnalyzed = ["doctrine", "organization", "training"].every((d) => analyzedSet.has(d));

  const nextDomain = () => {
    const idx = domains.findIndex((d) => d.id === activeDomain);
    if (idx < domains.length - 1) setActiveDomain(domains[idx + 1].id);
  };

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title={`DOTMLPF-P Analysis: ${gap.title}`}
        subtitle={`${analyzedSet.size} of ${domains.length} domains analyzed`}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => router.push(`/cam/gaps/${gapId}`)}><ArrowLeft size={16} /> Back to Gap</Button>
            {coreAnalyzed && (
              <Link href={`/cam/reports?gapId=${gapId}`}><Button><FileText size={16} /> Generate DCR</Button></Link>
            )}
          </div>
        }
      />

      {/* Domain tabs */}
      <div className="mb-6 flex gap-1 overflow-x-auto">
        {domains.map((domain) => {
          const isActive = activeDomain === domain.id;
          const isAnalyzed = analyzedSet.has(domain.id);
          return (
            <button
              key={domain.id}
              onClick={() => setActiveDomain(domain.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors
                ${isActive
                  ? "bg-surface-card border border-b-0 border-border text-navy"
                  : "text-text-secondary hover:text-text hover:bg-surface"
                }`}
              style={isActive ? { borderTopColor: DOMAIN_COLORS[domain.id], borderTopWidth: "3px" } : {}}
            >
              {domain.shortName}
              {isAnalyzed ? (
                <Check size={14} className="text-status-trained" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-border" />
              )}
            </button>
          );
        })}
      </div>

      {activeDef && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <h2 className="text-lg font-semibold text-navy mb-1">{activeDef.name}</h2>
              <p className="text-sm text-text-secondary mb-4">{activeDef.description}</p>

              {saveError && <div className="mb-4 rounded-lg bg-status-untrained/10 px-4 py-3 text-sm text-status-untrained">{saveError}</div>}
              {saved && <div className="mb-4 rounded-lg bg-status-trained/10 px-4 py-3 text-sm text-pillar-character">Analysis saved successfully.</div>}

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text">Current State <span className="text-status-untrained">*</span></label>
                  <textarea value={currentState} onChange={(e) => { setCurrentState(e.target.value); setSaved(false); }} rows={3}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
                    placeholder={`Describe the current state of ${activeDef.name.toLowerCase()} for this capability...`} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text">Desired State <span className="text-status-untrained">*</span></label>
                  <textarea value={desiredState} onChange={(e) => { setDesiredState(e.target.value); setSaved(false); }} rows={3}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
                    placeholder={`What should ${activeDef.name.toLowerCase()} look like to close this gap?`} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text">Gap Assessment <span className="text-status-untrained">*</span></label>
                  <textarea value={gapAssessment} onChange={(e) => { setGapAssessment(e.target.value); setSaved(false); }} rows={3}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
                    placeholder={`What is the specific ${activeDef.name.toLowerCase()} gap?`} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text">Recommended Action</label>
                  <textarea value={recommendedAction} onChange={(e) => { setRecommendedAction(e.target.value); setSaved(false); }} rows={3}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
                    placeholder={`What ${activeDef.name.toLowerCase()} change would close this gap?`} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text">Data Source</label>
                    <input value={dataSource} onChange={(e) => { setDataSource(e.target.value); setSaved(false); }}
                      className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm text-text focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
                      placeholder="Which ecosystem tool provided evidence?" />
                  </div>
                  <Select label="Confidence Level" options={confidenceOptions} value={confidence}
                    onChange={(e) => { setConfidence(e.target.value); setSaved(false); }} />
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <Button onClick={handleSave} loading={saving} disabled={!currentState.trim() || !desiredState.trim() || !gapAssessment.trim()}>
                    <Save size={16} /> Save {activeDef.shortName} Analysis
                  </Button>
                  {domains.findIndex((d) => d.id === activeDomain) < domains.length - 1 && (
                    <Button variant="secondary" onClick={nextDomain}>Next Domain →</Button>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar: ecosystem data + analysis questions */}
          <div className="space-y-4">
            <Card>
              <div className="flex items-center gap-2 mb-2">
                <Info size={14} className="text-fluent" />
                <h3 className="text-sm font-semibold text-navy">Ecosystem Data</h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {activeDef.ecosystemDataSource}
              </p>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-navy mb-2">Analysis Questions</h3>
              <ul className="space-y-2">
                {activeDef.analysisQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-fluent" />
                    {q}
                  </li>
                ))}
              </ul>
            </Card>

            {allAnalyzed && (
              <div className="rounded-lg border-2 border-status-trained bg-status-trained/5 p-4 text-center">
                <Check size={24} className="mx-auto mb-2 text-status-trained" />
                <p className="text-sm font-medium text-text">All domains analyzed</p>
                <Link href={`/cam/reports?gapId=${gapId}`}>
                  <Button className="mt-3 w-full"><FileText size={16} /> Generate DCR Draft</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
