"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SKILLS, SKILL_CATEGORIES } from "@/lib/data/skill-definitions";
import { Zap } from "lucide-react";

const categoryColors: Record<string, "navy" | "gold" | "fluent"> = {
  "RS Planning & Operations": "navy",
  "Leader Development & Counseling": "gold",
  "Analysis & Advisement": "fluent",
};

export default function CommandPlatformPage() {
  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title="Integrated Command Platform"
        subtitle="12 AI-powered tools for RS planning, leader development, and analysis"
      />

      {SKILL_CATEGORIES.map((category) => {
        const skills = SKILLS.filter((s) => s.category === category);
        return (
          <div key={category} className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <Badge color={categoryColors[category] ?? "gray"}>{category}</Badge>
              <span className="text-xs text-text-tertiary">{skills.length} tools</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {skills.map((skill) => (
                <Link key={skill.id} href={`/command/${skill.id}`}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-2xl mb-2">{skill.icon}</div>
                    <h3 className="text-sm font-semibold text-navy mb-1">{skill.name}</h3>
                    <p className="text-xs text-text-secondary mb-3 leading-relaxed">{skill.description}</p>
                    <Button variant="ghost" size="sm" className="w-full">
                      <Zap size={12} /> Launch
                    </Button>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
