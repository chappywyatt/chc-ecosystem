"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select, type SelectOption } from "@/components/ui/Select";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { useCapabilityGaps, type CapabilityGap } from "@/hooks/useCapabilityGaps";
import { FileText, Download, Loader2 } from "lucide-react";

interface ReportType {
  id: string;
  title: string;
  description: string;
  requiredInput: string;
  endpoint: string;
  icon: string;
}

const REPORTS: ReportType[] = [
  {
    id: "dcr",
    title: "DOTMLPF-P Change Recommendation (DCR)",
    description: "Generate a formatted DCR from a gap with completed DOTMLPF-P analysis. Follows ACIDS Process Guide template.",
    requiredInput: "Gap with at least D+O+T domains analyzed",
    endpoint: "/api/generate/dcr-draft",
    icon: "📋",
  },
  {
    id: "training",
    title: "Training Gap Summary",
    description: "Aggregated T/P/U data across all tasks with trend analysis and recommended training priorities.",
    requiredInput: "Training event data",
    endpoint: "/api/generate/training-plan",
    icon: "📊",
  },
  {
    id: "word-picture",
    title: "Comprehensive Word Picture",
    description: "Detailed behavioral word picture narrative from Gauge observation data, suitable for evaluation support.",
    requiredInput: "Observation data for subject",
    endpoint: "/api/generate/word-picture",
    icon: "📝",
  },
  {
    id: "briefing",
    title: "Gap Status Briefing",
    description: "Slide-ready summary of all active gaps with severity distribution, domain distribution, and status pipeline.",
    requiredInput: "Active capability gaps",
    endpoint: "",
    icon: "📈",
  },
];

export default function ReportsPage() {
  return (
    <Suspense fallback={<><Breadcrumbs /><PageHeader title="Report Generation" /><SkeletonCard /></>}>
      <ReportsContent />
    </Suspense>
  );
}

function ReportsContent() {
  const searchParams = useSearchParams();
  const prefilledGapId = searchParams.get("gapId");

  const { fetchGaps } = useCapabilityGaps();
  const [gaps, setGaps] = useState<CapabilityGap[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [selectedGapId, setSelectedGapId] = useState(prefilledGapId ?? "");
  const [generating, setGenerating] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [generatedTitle, setGeneratedTitle] = useState("");
  const [genError, setGenError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const data = await fetchGaps();
      if (!cancelled) { setGaps(data); setLoaded(true); }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gapOptions: SelectOption[] = [
    { value: "", label: "Select a gap..." },
    ...gaps.map((g) => ({ value: g.id, label: `${g.title} (${g.severity})` })),
  ];

  const handleGenerate = async (report: ReportType) => {
    if (!report.endpoint) {
      setGeneratedTitle(report.title);
      setGeneratedContent("This report type is not yet connected to an AI generation endpoint. The briefing format will be available in a future update.");
      return;
    }

    setGenerating(report.id);
    setGenError(null);
    setGeneratedContent(null);

    try {
      const body: Record<string, string> = {};
      if (report.id === "dcr" && selectedGapId) body.gapId = selectedGapId;

      const res = await fetch(report.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Generation failed" }));
        throw new Error(err.error || "Generation failed");
      }

      const data = await res.json();
      setGeneratedTitle(report.title);
      setGeneratedContent(data.content || data.text || JSON.stringify(data, null, 2));
    } catch (err) {
      setGenError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(null);
    }
  };

  const copyToClipboard = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
    }
  };

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title="Report Generation"
        subtitle="AI-assisted document generation from ecosystem data"
      />

      {/* Gap selector for DCR */}
      <div className="mb-6 max-w-md">
        <Select
          label="Select Gap (for DCR generation)"
          options={gapOptions}
          value={selectedGapId}
          onChange={(e) => setSelectedGapId(e.target.value)}
        />
      </div>

      {/* Report cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        {REPORTS.map((report) => (
          <Card key={report.id} padding={false}>
            <div className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">{report.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-navy">{report.title}</h3>
                  <p className="mt-1 text-xs text-text-secondary">{report.description}</p>
                </div>
              </div>
              <div className="mb-3 rounded bg-surface px-3 py-1.5 text-xs text-text-tertiary">
                Required: {report.requiredInput}
              </div>
              <Button
                onClick={() => handleGenerate(report)}
                loading={generating === report.id}
                disabled={!!generating}
                size="sm"
              >
                <FileText size={14} />
                Generate
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Error */}
      {genError && (
        <div className="mb-6 rounded-lg bg-status-untrained/10 px-4 py-3 text-sm text-status-untrained">
          {genError}
        </div>
      )}

      {/* Generated content */}
      {generatedContent && (
        <Card padding={false}>
          <CardHeader
            title={generatedTitle}
            accent="fluent"
            action={
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  <Download size={14} /> Copy
                </Button>
              </div>
            }
          />
          <div className="p-6">
            <pre className="whitespace-pre-wrap text-sm text-text leading-relaxed font-sans">
              {generatedContent}
            </pre>
          </div>
        </Card>
      )}
    </>
  );
}
