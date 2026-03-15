"use client";

import { useState, useMemo } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TRADITIONS, DISCIPLINES, CATEGORIES, BRANCHES, type Discipline } from "@/lib/data/spiritready-data";
import { ArrowLeft, Search, BookOpen, Heart } from "lucide-react";

const categoryIcons: Record<string, string> = {
  "Prayer": "🙏",
  "Meditation/Contemplation": "🧘",
  "Study/Reflection": "📖",
  "Fasting/Abstinence": "🌿",
  "Worship/Liturgy": "⛪",
  "Service/Mission": "🤝",
  "Community/Fellowship": "👥",
  "Confession/Accountability": "🔑",
  "Simplicity/Stewardship": "🌱",
  "Celebration/Gratitude": "🎉",
};

export default function SpiritReadyPage() {
  const [selectedTraditionId, setSelectedTraditionId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedDiscipline, setExpandedDiscipline] = useState<string | null>(null);

  const selectedTradition = TRADITIONS.find((t) => t.id === selectedTraditionId);
  const traditionDisciplines = selectedTraditionId ? (DISCIPLINES[selectedTraditionId] ?? []) : [];

  // Search across all traditions
  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    const results: { tradition: typeof TRADITIONS[0]; discipline: Discipline }[] = [];
    for (const tradition of TRADITIONS) {
      const discs = DISCIPLINES[tradition.id] ?? [];
      for (const disc of discs) {
        if (
          disc.name.toLowerCase().includes(q) ||
          disc.description.toLowerCase().includes(q) ||
          tradition.name.toLowerCase().includes(q)
        ) {
          results.push({ tradition, discipline: disc });
        }
      }
    }
    return results.slice(0, 30);
  }, [searchQuery]);

  // Categories for selected tradition
  const traditionCategories = useMemo(() => {
    const cats = new Set(traditionDisciplines.map((d) => d.category));
    return CATEGORIES.filter((c) => cats.has(c));
  }, [traditionDisciplines]);

  const filteredDisciplines = useMemo(() => {
    if (activeCategory) {
      return traditionDisciplines.filter((d) => d.category === activeCategory);
    }
    return traditionDisciplines;
  }, [traditionDisciplines, activeCategory]);

  // Total disciplines count
  const totalDisciplines = Object.values(DISCIPLINES).reduce((sum, arr) => sum + arr.length, 0);

  // ── Tradition browser view ───────────────────────────────
  if (!selectedTraditionId) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader
          title="SpiritReady"
          subtitle="Spiritual disciplines reference for 36 faith traditions"
        />

        {/* Stats */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-text-secondary">
          <Badge color="navy">{TRADITIONS.length} faith traditions</Badge>
          <Badge color="gold">{totalDisciplines}+ spiritual disciplines</Badge>
          <Badge color="fluent">{CATEGORIES.length} categories</Badge>
        </div>

        {/* Search */}
        <div className="mb-6 max-w-md">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-lg border border-border bg-white pl-10 pr-3 text-sm text-text
                placeholder:text-text-tertiary focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
              placeholder="Search traditions and disciplines..."
            />
          </div>
        </div>

        {/* Search results */}
        {searchQuery.length >= 2 && (
          <div className="mb-8">
            <h3 className="mb-3 text-sm font-semibold text-navy">
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
            </h3>
            {searchResults.length === 0 ? (
              <p className="text-sm text-text-tertiary">No disciplines match your search.</p>
            ) : (
              <div className="space-y-2">
                {searchResults.map((r, i) => (
                  <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => { setSelectedTraditionId(r.tradition.id); setSearchQuery(""); }}>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: r.tradition.color }} />
                      <div>
                        <div className="text-sm font-medium text-text">{r.discipline.name}</div>
                        <div className="text-xs text-text-tertiary">{r.tradition.name} · {r.discipline.category}</div>
                        <div className="mt-1 text-xs text-text-secondary line-clamp-2">{r.discipline.description}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tradition grid by branch */}
        {BRANCHES.map((branch) => {
          const branchTraditions = TRADITIONS.filter((t) => t.branch === branch);
          if (branchTraditions.length === 0) return null;
          return (
            <div key={branch} className="mb-8">
              <h3 className="mb-3 text-sm font-semibold text-text-secondary uppercase tracking-wide">
                {branch}
              </h3>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {branchTraditions.map((tradition) => {
                  const discCount = (DISCIPLINES[tradition.id] ?? []).length;
                  return (
                    <button
                      key={tradition.id}
                      onClick={() => setSelectedTraditionId(tradition.id)}
                      className="flex items-center gap-3 rounded-lg border-2 border-border bg-surface-card p-4 text-left
                        transition-all hover:border-fluent/30 hover:shadow-md"
                    >
                      <div
                        className="h-10 w-10 shrink-0 rounded-lg"
                        style={{ backgroundColor: tradition.color + "20", borderLeft: `4px solid ${tradition.color}` }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-text truncate">{tradition.name}</div>
                        <div className="text-xs text-text-tertiary">{discCount} disciplines</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </>
    );
  }

  // ── Discipline browser view ──────────────────────────────
  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title={selectedTradition!.name}
        subtitle={`${selectedTradition!.branch} · ${traditionDisciplines.length} spiritual disciplines`}
        actions={
          <Button variant="secondary" onClick={() => { setSelectedTraditionId(null); setActiveCategory(null); }}>
            <ArrowLeft size={16} /> All Traditions
          </Button>
        }
      />

      {/* Tradition color bar */}
      <div className="mb-6 h-1 w-full rounded-full" style={{ backgroundColor: selectedTradition!.color }} />

      {/* Category tabs */}
      <div className="mb-6 flex gap-1 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors
            ${!activeCategory ? "bg-fluent text-white" : "bg-surface text-text-secondary hover:bg-border"}`}
        >
          All ({traditionDisciplines.length})
        </button>
        {traditionCategories.map((cat) => {
          const count = traditionDisciplines.filter((d) => d.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors
                ${activeCategory === cat ? "bg-fluent text-white" : "bg-surface text-text-secondary hover:bg-border"}`}
            >
              {categoryIcons[cat] ?? "📌"} {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Disciplines */}
      <div className="space-y-3">
        {filteredDisciplines.map((disc, idx) => {
          const key = `${disc.category}-${disc.name}-${idx}`;
          const isExpanded = expandedDiscipline === key;
          return (
            <Card
              key={key}
              padding={false}
              className="overflow-hidden"
            >
              <button
                onClick={() => setExpandedDiscipline(isExpanded ? null : key)}
                className="flex w-full items-start gap-3 p-4 text-left hover:bg-surface transition-colors"
              >
                <span className="mt-0.5 text-lg">{categoryIcons[disc.category] ?? "📌"}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-navy">{disc.name}</span>
                    <Badge color="gray">{disc.category}</Badge>
                  </div>
                  <p className={`mt-1 text-sm text-text-secondary leading-relaxed
                    ${!isExpanded ? "line-clamp-2" : ""}`}>
                    {disc.description}
                  </p>
                </div>
              </button>
              {isExpanded && (
                <div className="border-t border-border bg-surface px-4 py-3">
                  <div className="flex items-start gap-2">
                    <BookOpen size={14} className="mt-0.5 shrink-0 text-fluent" />
                    <div>
                      <div className="text-xs font-semibold text-navy mb-1">Practice Guidance</div>
                      <p className="text-sm text-text leading-relaxed">{disc.practice_guidance}</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </>
  );
}
