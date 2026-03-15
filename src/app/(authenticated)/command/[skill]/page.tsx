"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getSkillById, SAMPLE_RESPONSES } from "@/lib/data/skill-definitions";
import { ArrowLeft, Send, Copy, Check, Zap } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function SkillPage() {
  const params = useParams();
  const router = useRouter();
  const skillId = params.skill as string;
  const skill = getSkillById(skillId);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  if (!skill) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="Skill Not Found" />
        <Card>
          <div className="py-12 text-center">
            <p className="text-text-secondary mb-4">This AI skill does not exist.</p>
            <Button variant="secondary" onClick={() => router.push("/command")}><ArrowLeft size={16} /> Back</Button>
          </div>
        </Card>
      </>
    );
  }

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate/skill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId: skill.id, userMessage: text }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content || data.text || "No response generated." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Failed to generate response. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyMessage = (idx: number, content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title={skill.name}
        subtitle={skill.description}
        actions={
          <Button variant="secondary" onClick={() => router.push("/command")}>
            <ArrowLeft size={16} /> All Tools
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Chat area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Quick prompts */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-gold" />
              <span className="text-xs font-semibold text-text-secondary uppercase">Quick Prompts</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skill.quickPrompts.map((qp, i) => (
                <Button
                  key={i}
                  variant="secondary"
                  size="sm"
                  onClick={() => sendMessage(qp.prompt)}
                  disabled={loading}
                >
                  {qp.label}
                </Button>
              ))}
            </div>
          </Card>

          {/* Messages */}
          {messages.length === 0 ? (
            <Card>
              <div className="py-12 text-center">
                <div className="text-4xl mb-3">{skill.icon}</div>
                <h3 className="text-lg font-semibold text-navy mb-2">{skill.name}</h3>
                <p className="text-sm text-text-secondary max-w-md mx-auto">
                  Use the quick prompts above or type your own question below.
                  This tool injects your organization&apos;s ecosystem data into AI-powered responses.
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {messages.map((msg, idx) => (
                <Card
                  key={idx}
                  className={msg.role === "user" ? "border-l-4 border-l-fluent" : "border-l-4 border-l-gold"}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge color={msg.role === "user" ? "fluent" : "gold"}>
                      {msg.role === "user" ? "You" : skill.name}
                    </Badge>
                    {msg.role === "assistant" && (
                      <Button variant="ghost" size="sm" onClick={() => copyMessage(idx, msg.content)}>
                        {copied === idx ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                      </Button>
                    )}
                  </div>
                  <pre className="whitespace-pre-wrap text-sm text-text leading-relaxed font-sans">
                    {msg.content}
                  </pre>
                </Card>
              ))}
              {loading && (
                <Card className="border-l-4 border-l-gold">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-fluent" />
                    Generating response...
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder="Type your question..."
              disabled={loading}
              className="flex-1 h-12 rounded-lg border border-border bg-white px-4 text-sm text-text
                placeholder:text-text-tertiary focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
            />
            <Button onClick={() => sendMessage(input)} disabled={loading || !input.trim()} size="lg">
              <Send size={16} />
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <h3 className="text-sm font-semibold text-navy mb-2">About This Tool</h3>
            <p className="text-xs text-text-secondary leading-relaxed">{skill.description}</p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-navy mb-2">Data Sources</h3>
            {skill.dataRequirements.length === 0 ? (
              <p className="text-xs text-text-tertiary">No ecosystem data required</p>
            ) : (
              <div className="flex flex-wrap gap-1">
                {skill.dataRequirements.map((d) => (
                  <Badge key={d} color="navy">{d.replace(/_/g, " ")}</Badge>
                ))}
              </div>
            )}
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-navy mb-2">Category</h3>
            <Badge color="gold">{skill.category}</Badge>
          </Card>
        </div>
      </div>
    </>
  );
}
