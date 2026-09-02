import { useState } from "react";
import {
  BrainCircuit, Target, Sparkles, ChevronRight, AlertCircle,
  CheckCircle, TrendingUp, ClipboardCheck, BookOpen, Bot,
  ArrowRight, Zap, BarChart2, Route, Search,
  UserRound, Wrench, Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimeNavBar } from "@/components/ui/anime-navbar";

const skillNavItems = [
  { name: "Technical", icon: BrainCircuit },
  { name: "Soft Skills", icon: UserRound },
  { name: "Tools", icon: Wrench },
  { name: "Industry", icon: Building2 },
];
import { FunnelChart } from "@/components/ui/funnel-chart";
import type { Page } from "@/App";

// ── Types ──────────────────────────────────────────────────────────
interface Skill {
  name: string;
  level: number;
}

type SkillCategory = "Technical" | "Soft Skills" | "Tools" | "Industry";

// ── Data ───────────────────────────────────────────────────────────
const skillData: Record<SkillCategory, Skill[]> = {
  Technical: [
    { name: "Python",           level: 86 },
    { name: "SQL",              level: 81 },
    { name: "Machine Learning", level: 74 },
    { name: "React",            level: 68 },
    { name: "PyTorch",          level: 42 },
    { name: "Docker",           level: 35 },
  ],
  "Soft Skills": [
    { name: "Teamwork",         level: 85 },
    { name: "Problem Solving",  level: 82 },
    { name: "Communication",    level: 78 },
    { name: "Time Management",  level: 71 },
    { name: "Leadership",       level: 55 },
  ],
  Tools: [
    { name: "VS Code",          level: 90 },
    { name: "Git",              level: 88 },
    { name: "Jupyter",          level: 79 },
    { name: "AWS",              level: 38 },
    { name: "Kubernetes",       level: 22 },
  ],
  Industry: [
    { name: "ML Applications",  level: 72 },
    { name: "AI Ethics",        level: 65 },
    { name: "Data Pipelines",   level: 61 },
    { name: "Model Deployment", level: 38 },
  ],
};

const skillGaps = [
  {
    name: "PyTorch",
    current: 42,
    required: 70,
    impact: 12,
    reason: "Required for deep learning roles at top AI companies.",
  },
  {
    name: "Docker",
    current: 35,
    required: 65,
    impact: 8,
    reason: "Essential for deploying ML models in production environments.",
  },
  {
    name: "AWS",
    current: 38,
    required: 60,
    impact: 6,
    reason: "Cloud deployment is expected in most AI/ML engineering roles.",
  },
];

const assessmentCategories = [
  { icon: BrainCircuit, label: "Technical Skills" },
  { icon: BarChart2,    label: "Aptitude" },
  { icon: Zap,          label: "Problem Solving" },
  { icon: Bot,          label: "Communication" },
  { icon: Target,       label: "Industry Readiness" },
];

// ── Funnel palette — chaining colours for smooth gradient flow ─────
const FUNNEL_CHAIN = [
  "#8b5cf6", "#7c3aed", "#6366f1", "#4f46e5",
  "#3b82f6", "#2563eb", "#06b6d4", "#0891b2",
];

function skillFunnelData(skills: Skill[]) {
  return [...skills]
    .sort((a, b) => b.level - a.level)
    .map((skill, i) => ({
      label: skill.name,
      value: skill.level,
      displayValue: `${skill.level}%`,
      gradient: [
        { offset: "0%",   color: FUNNEL_CHAIN[i] ?? "#8b5cf6" },
        { offset: "100%", color: FUNNEL_CHAIN[i + 1] ?? "#06b6d4" },
      ],
    }));
}

function getStatus(level: number): { label: string; color: string } {
  if (level >= 80) return { label: "Strong",           color: "text-violet-400" };
  if (level >= 60) return { label: "Developing",       color: "text-violet-400" };
  return              { label: "Needs Improvement", color: "text-white/40" };
}

// ── Sub-components ─────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest mb-3">
      {children}
    </p>
  );
}

function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-white/8 bg-black/50 backdrop-blur-sm p-5", className)}>
      {children}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────
export default function SkillsPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState<SkillCategory>("Technical");
  const [showAssessment, setShowAssessment] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  const tabs: SkillCategory[] = ["Technical", "Soft Skills", "Tools", "Industry"];

  const activeSkillsFunnel = skillFunnelData(skillData[activeTab]);

  const overviewFunnelData = [
    { label: "Soft Skills", value: 74, displayValue: "74%", gradient: [{ offset: "0%", color: "#8b5cf6" }, { offset: "100%", color: "#7c3aed" }] },
    { label: "Technical",   value: 67, displayValue: "67%", gradient: [{ offset: "0%", color: "#6366f1" }, { offset: "100%", color: "#4f46e5" }] },
    { label: "Tools",       value: 63, displayValue: "63%", gradient: [{ offset: "0%", color: "#4f46e5" }, { offset: "100%", color: "#3b82f6" }] },
    { label: "Industry",    value: 59, displayValue: "59%", gradient: [{ offset: "0%", color: "#f97316" }, { offset: "100%", color: "#dc2626" }] },
  ];

  return (
    <div className="relative h-full flex flex-col bg-black text-white overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-violet-900/10 rounded-full blur-3xl" />
      </div>

      {/* ── Header ────────────────────────────────────────────── */}
      <div className="relative shrink-0 px-4 pt-4 sm:px-8 sm:pt-8 pb-6 border-b border-white/8 pl-16 sm:pl-16">
        <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest mb-2">
          KickSkill / Skills
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Skills</h1>
            <p className="text-xs sm:text-sm text-neutral-500">
              Understand your strengths. Identify your gaps. Build what matters.
            </p>
          </div>
          <button
            onClick={() => setShowAssessment(true)}
            className="shrink-0 flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl border border-violet-500/30 bg-violet-600/15 text-xs sm:text-sm text-violet-300 hover:bg-violet-600/25 hover:border-violet-500/50 transition-colors cursor-pointer"
          >
            <ClipboardCheck className="w-4 h-4" />
            Take Skill Assessment
          </button>
        </div>
      </div>

      {/* ── Scrollable body ───────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="px-4 sm:px-8 py-4 sm:py-6 space-y-6 w-full">

          {/* ── Row 1: Career target + Skill overview ─────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Career target */}
            <GlassCard>
              <SectionLabel>Target Career</SectionLabel>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xl font-bold text-white leading-tight">AI / ML Engineer</p>
                  <p className="text-xs text-neutral-500 mt-1">Career Readiness</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-3xl font-bold text-violet-300">78%</span>
                  </div>
                  {/* Single-segment funnel as readiness indicator */}
                  <div className="mt-3 w-48">
                    <FunnelChart
                      data={[{
                        label: "Readiness",
                        value: 78,
                        displayValue: "",
                        gradient: [{ offset: "0%", color: "#8b5cf6" }, { offset: "100%", color: "#6d28d9" }],
                      }]}
                      orientation="horizontal"
                      layers={4}
                      showLabels={false}
                      showValues={false}
                      showPercentage={false}
                      gap={0}
                      grid={false}
                      style={{ height: "28px", aspectRatio: "auto" }}
                    />
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-violet-900/30 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-violet-400" />
                </div>
              </div>
              <button
                onClick={() => setShowGoalModal(true)}
                className="mt-4 flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
                Change Goal
              </button>
            </GlassCard>

          </div>

          {/* ── Skill categories ──────────────────────────────── */}
          <GlassCard className="p-0 overflow-hidden">
            {/* Tab bar */}
            <div className="py-4">
              <AnimeNavBar
                items={skillNavItems}
                activeTab={activeTab}
                onTabChange={(name) => setActiveTab(name as SkillCategory)}
              />
            </div>

            {/* Funnel chart for active tab */}
            <div className="px-5 pt-5 pb-2">
              <FunnelChart
                data={activeSkillsFunnel}
                orientation="horizontal"
                layers={4}
                showLabels={false}
                showValues={false}
                showPercentage={false}
                gap={3}
                grid={false}
                style={{ height: "140px", aspectRatio: "auto" }}
              />
            </div>

            {/* Legend grid */}
            <div className="px-5 pb-4 mt-1 grid grid-cols-2 gap-x-6 gap-y-2">
              {activeSkillsFunnel.map((skill) => {
                const status = getStatus(skill.value);
                return (
                  <div key={skill.label} className="flex items-center gap-2.5">
                    <div
                      className="w-2.5 h-2.5 rounded-sm shrink-0"
                      style={{ background: skill.gradient[0].color }}
                    />
                    <span className="text-xs text-neutral-300 flex-1">{skill.label}</span>
                    <span className="text-xs font-semibold text-white">{skill.displayValue}</span>
                    <span className={cn("text-[10px] w-28 text-right shrink-0", status.color)}>{status.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Category summary */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-white/8 bg-white/2">
              <p className="text-xs text-neutral-600">
                {skillData[activeTab].filter(s => s.level >= 80).length} strong ·{" "}
                {skillData[activeTab].filter(s => s.level >= 60 && s.level < 80).length} developing ·{" "}
                {skillData[activeTab].filter(s => s.level < 60).length} need improvement
              </p>
              <button className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors cursor-pointer flex items-center gap-1">
                Add skill <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </GlassCard>

          {/* ── Row 3: Skill gaps + AI Analysis ───────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Skill gaps */}
            <div className="space-y-3">
              <div>
                <SectionLabel>Skill Gaps</SectionLabel>
                <p className="text-xs text-neutral-500 -mt-2 mb-3">
                  Skills to improve to unlock more opportunities.
                </p>
              </div>
              {skillGaps.map((gap) => (
                <GlassCard key={gap.name} className="p-4 hover:border-white/15 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{gap.name}</p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">{gap.reason}</p>
                    </div>
                    <span className="shrink-0 flex items-center gap-1 text-[11px] font-semibold text-violet-300 bg-violet-900/20 border border-violet-500/20 px-2 py-0.5 rounded-full">
                      <TrendingUp className="w-3 h-3" />
                      +{gap.impact} opps
                    </span>
                  </div>

                  {/* Gap funnel: Required (wider) → Current (narrower) */}
                  <div className="mb-3">
                    <FunnelChart
                      data={[
                        {
                          label: "Required",
                          value: gap.required,
                          displayValue: `${gap.required}%`,
                          gradient: [{ offset: "0%", color: "#8b5cf6" }, { offset: "100%", color: "#6d28d9" }],
                        },
                        {
                          label: "Current",
                          value: gap.current,
                          displayValue: `${gap.current}%`,
                          gradient: [{ offset: "0%", color: "#f97316" }, { offset: "100%", color: "#dc2626" }],
                        },
                      ]}
                      orientation="horizontal"
                      layers={3}
                      showLabels={true}
                      showValues={true}
                      showPercentage={false}
                      gap={3}
                      grid={false}
                      style={{ height: "86px", aspectRatio: "auto" }}
                    />
                  </div>

                  <button className="w-full py-2 rounded-xl border border-white/8 bg-white/4 text-xs text-neutral-300 hover:text-white hover:border-white/15 transition-colors cursor-pointer flex items-center justify-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Learn {gap.name}
                  </button>
                </GlassCard>
              ))}
            </div>

            {/* AI Analysis + Assessment stacked */}
            <div className="space-y-4">
              {/* KickSkill AI Analysis */}
              <GlassCard className="border-violet-500/12 bg-violet-950/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg bg-violet-900/50 border border-violet-500/25 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  </div>
                  <SectionLabel>KickSkill Analysis</SectionLabel>
                </div>
                <div className="space-y-3 text-xs text-neutral-400 leading-relaxed">
                  <p>
                    Your strongest area is <span className="text-white font-medium">Python and data manipulation</span>.
                    You are above the median for SQL and problem solving, which gives you a solid foundation.
                  </p>
                  <p>
                    Your biggest opportunity gap is <span className="text-white/55 font-medium">machine learning deployment</span>.
                    Roles requiring PyTorch and Docker represent 12 of your 19 unmatched opportunities.
                  </p>
                  <p>
                    Improving <span className="text-violet-300 font-medium">PyTorch and Docker</span> to a working level could
                    raise your career readiness from 78% to an estimated 91% and unlock significantly more AI/ML internships.
                  </p>
                </div>
                <button className="mt-4 w-full py-2.5 rounded-xl border border-violet-500/25 bg-violet-600/15 text-xs text-violet-300 hover:bg-violet-600/25 transition-colors cursor-pointer flex items-center justify-center gap-1.5">
                  <Route className="w-3.5 h-3.5" />
                  Build My Learning Plan
                </button>
              </GlassCard>

              {/* Skill Assessment card */}
              <GlassCard>
                <div className="flex items-center gap-2 mb-1">
                  <ClipboardCheck className="w-4 h-4 text-neutral-400" />
                  <SectionLabel>Skill Assessment</SectionLabel>
                </div>
                <p className="text-xs text-neutral-500 mb-4">
                  Take an adaptive assessment to keep your skill profile accurate and up to date.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {assessmentCategories.map(({ icon: Icon, label }) => (
                    <span key={label} className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-neutral-400">
                      <Icon className="w-3 h-3" />
                      {label}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAssessment(true)}
                    className="flex-1 py-2 rounded-xl border border-violet-500/25 bg-violet-600/15 text-xs text-violet-300 hover:bg-violet-600/25 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Start Assessment
                  </button>
                  <button className="flex-1 py-2 rounded-xl border border-white/8 bg-white/5 text-xs text-neutral-300 hover:text-white hover:border-white/15 transition-colors cursor-pointer">
                    View Previous
                  </button>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* ── Skill impact on opportunities ─────────────────── */}
          <GlassCard>
            <SectionLabel>How Your Skills Affect Your Opportunities</SectionLabel>
            <p className="text-xs text-neutral-500 mb-4">
              Improving your highest-priority skills could make you eligible for significantly more opportunities.
            </p>

            {/* Impact funnel: Current → After Improvement (expanding = growth) */}
            <FunnelChart
              data={[
                {
                  label: "Current Profile",
                  value: 78,
                  displayValue: "78%",
                  gradient: [{ offset: "0%", color: "#6366f1" }, { offset: "100%", color: "#4f46e5" }],
                },
                {
                  label: "After Improvement",
                  value: 91,
                  displayValue: "91%",
                  gradient: [{ offset: "0%", color: "#8b5cf6" }, { offset: "100%", color: "#7c3aed" }],
                },
              ]}
              orientation="horizontal"
              layers={4}
              showLabels={true}
              showValues={true}
              showPercentage={false}
              gap={3}
              grid={false}
              style={{ height: "120px", aspectRatio: "auto" }}
            />

            {/* Stats row */}
            <div className="flex items-center gap-4 mt-4 mb-5">
              <div className="flex-1 rounded-xl border border-white/8 bg-white/3 px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest mb-1">Current</p>
                  <p className="text-lg font-bold text-violet-300">78%</p>
                  <p className="text-[11px] text-neutral-600 mt-0.5">8 of 27 opportunities</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-violet-900/30 border border-violet-500/20 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-violet-400" />
                </div>
              </div>
              <div className="flex-1 rounded-xl border border-violet-500/20 bg-violet-900/10 px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-violet-600/80 uppercase tracking-widest mb-1">After Improvement</p>
                  <p className="text-lg font-bold text-violet-300">91%</p>
                  <p className="text-[11px] text-violet-400/60 mt-0.5">+26 additional opportunities</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-violet-900/30 border border-violet-500/20 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate("opportunities")}
              className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-neutral-300 hover:text-white hover:border-white/20 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              View Recommended Opportunities
              <ChevronRight className="w-4 h-4" />
            </button>
          </GlassCard>


          <div className="h-4" />
        </div>
      </div>

      {/* ── Assessment Modal ───────────────────────────────────── */}
      {showAssessment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowAssessment(false)}
        >
          <div
            className="w-full max-w-md bg-black/95 border border-white/10 rounded-2xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-semibold text-white">Skill Assessment</h2>
                <p className="text-xs text-neutral-500 mt-0.5">Select a category to begin</p>
              </div>
              <button
                onClick={() => setShowAssessment(false)}
                className="p-1.5 text-neutral-500 hover:text-white transition-colors cursor-pointer"
              >
                <AlertCircle className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {assessmentCategories.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/4 hover:border-white/15 hover:bg-white/8 text-sm text-neutral-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <Icon className="w-4 h-4 text-violet-400 shrink-0" />
                  {label}
                  <ChevronRight className="w-4 h-4 text-neutral-600 ml-auto" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Change Goal Modal ──────────────────────────────────── */}
      {showGoalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowGoalModal(false)}
        >
          <div
            className="w-full max-w-sm bg-black/95 border border-white/10 rounded-2xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-sm font-semibold text-white mb-1">Change Career Goal</h2>
            <p className="text-xs text-neutral-500 mb-4">Select your target career path</p>
            <div className="space-y-2">
              {["AI / ML Engineer", "Frontend Engineer", "Data Scientist", "Product Manager", "DevOps Engineer"].map((goal) => (
                <button
                  key={goal}
                  onClick={() => setShowGoalModal(false)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm transition-colors cursor-pointer",
                    goal === "AI / ML Engineer"
                      ? "border-violet-500/30 bg-violet-900/15 text-violet-300"
                      : "border-white/8 bg-white/4 text-neutral-300 hover:border-white/15 hover:text-white"
                  )}
                >
                  {goal}
                  {goal === "AI / ML Engineer" && <CheckCircle className="w-4 h-4 text-violet-400" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
