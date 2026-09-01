import { useState, useEffect, useRef } from "react";
import {
  Bot,
  Search,
  BrainCircuit,
  BadgeCheck,
  BarChart3,
  FileText,
  Send,
  Eye,
  RefreshCw,
  Target,
  Pause,
  Play,
  Settings,
  AlertTriangle,
  BookOpen,
  TrendingUp,
  ChevronRight,
  Circle,
  CheckCircle2,
  Activity,
  Zap,
  Shield,
  Clock,
  CalendarDays,
  IndianRupee,
  MapPin,
  ArrowRight,
  Sparkles,
  Route,
  ShieldCheck,
  X,
} from "lucide-react";
import type { Page } from "../App";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

// ─── Types ────────────────────────────────────────────────────────────────────

type ActivityCategory = "opportunity" | "application" | "skill" | "learning" | "profile";

interface ActivityItem {
  id: number;
  time: string;
  date: "today" | "yesterday";
  category: ActivityCategory;
  title: string;
  subtitle: string;
  detail: string;
  role?: string;
  company?: string;
  match?: number;
  matchingSkills?: string[];
  gapSkills?: string[];
  whyReasons?: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const activityItems: ActivityItem[] = [
  {
    id: 1, time: "10:42 AM", date: "today", category: "opportunity",
    title: "Opportunity discovered",
    subtitle: "AI/ML Intern · Nexus AI Labs",
    detail: "Found a new opening matching your profile above 85% threshold.",
    role: "AI/ML Intern", company: "Nexus AI Labs", match: 91,
    whyReasons: [
      "Match score 91% exceeds your 85% threshold",
      "Location Bangalore / Remote matches your preferences",
      "Stipend ₹20,000 exceeds your ₹15,000 minimum",
      "Role category AI / ML is in your preferred list",
    ],
    matchingSkills: ["Python", "Machine Learning", "SQL", "FastAPI", "NumPy"],
    gapSkills: ["PyTorch", "Docker"],
  },
  {
    id: 2, time: "10:43 AM", date: "today", category: "opportunity",
    title: "Job requirements analyzed",
    subtitle: "AI/ML Intern · Nexus AI Labs",
    detail: "Extracted 8 required skills. Mapped against your Skill Passport.",
    role: "AI/ML Intern", company: "Nexus AI Labs",
    whyReasons: ["Parsed job description to extract skill requirements", "Identified required vs preferred skills"],
    matchingSkills: ["Python", "Machine Learning", "SQL", "FastAPI", "NumPy"],
    gapSkills: ["PyTorch", "Docker"],
  },
  {
    id: 3, time: "10:43 AM", date: "today", category: "skill",
    title: "Skill Passport compared",
    subtitle: "Strong match — 5 of 7 skills verified",
    detail: "Your verified credentials cover the core role requirements.",
    matchingSkills: ["Python 86%", "Machine Learning 74%", "SQL 81%"],
    gapSkills: ["PyTorch 42% / req 70%", "Docker 35% / req 60%"],
    whyReasons: ["Compared all 12 verified skills against role requirements", "Calculated weighted match score based on skill importance"],
  },
  {
    id: 4, time: "10:44 AM", date: "today", category: "application",
    title: "Match threshold passed",
    subtitle: "91% — above your 85% minimum",
    detail: "Proceeding to application preparation per your agent rules.",
    role: "AI/ML Intern", company: "Nexus AI Labs", match: 91,
    whyReasons: ["91% > 85% threshold", "All other rules satisfied", "Application authorised by your AUTO-APPLY settings"],
  },
  {
    id: 5, time: "10:44 AM", date: "today", category: "application",
    title: "Resume tailored",
    subtitle: "Resume_v4_AI_ML_Focus.pdf prepared",
    detail: "Highlighted Python, ML, and SQL experience aligned to role requirements.",
    role: "AI/ML Intern", company: "Nexus AI Labs",
    whyReasons: ["Reordered skills section to lead with Python and ML", "Added project descriptions relevant to AI/ML role", "No skills fabricated — only reorganised verified information"],
  },
  {
    id: 6, time: "10:45 AM", date: "today", category: "application",
    title: "Application submitted",
    subtitle: "AI/ML Intern · Nexus AI Labs",
    detail: "Application submitted via authorised integration. Tracker updated.",
    role: "AI/ML Intern", company: "Nexus AI Labs", match: 91,
    whyReasons: ["All pre-submission checks passed", "Submitted via authorised company portal integration", "Duplicate check confirmed — no prior application to this role"],
  },
  {
    id: 7, time: "10:46 AM", date: "today", category: "application",
    title: "Application tracker updated",
    subtitle: "Status: Application Submitted",
    detail: "Added to your Applications page. Monitoring for status changes.",
    role: "AI/ML Intern", company: "Nexus AI Labs",
    whyReasons: ["Created application record with full document trail", "Monitoring for recruiter activity on submitted application"],
  },
  {
    id: 8, time: "09:47 AM", date: "today", category: "skill",
    title: "Skill gap identified",
    subtitle: "Docker — 35% vs required 60%",
    detail: "Docker appears as a required skill in 7 of your target role categories.",
    gapSkills: ["Docker", "AWS", "Kubernetes"],
    whyReasons: ["Aggregated skill requirements across 127 analyzed opportunities", "Docker appears in 7 rejected applications as the most common gap"],
  },
  {
    id: 9, time: "09:48 AM", date: "today", category: "learning",
    title: "Learning recommendation generated",
    subtitle: "Docker Fundamentals course matched",
    detail: "Suggested course added to your Learning page under Recommended for You.",
    whyReasons: ["Docker gap is present in 7 of your target roles", "Completing Docker Fundamentals would close 60% of the gap based on course outcomes"],
  },
  {
    id: 10, time: "09:31 AM", date: "today", category: "opportunity",
    title: "Opportunity scan completed",
    subtitle: "42 opportunities analyzed across 6 platforms",
    detail: "Found 8 strong matches above 80%. 3 qualify for AUTO-APPLY.",
    whyReasons: ["Searched across 6 connected job platforms", "Filtered by your preferred roles, location, and stipend minimums"],
  },
  {
    id: 11, time: "04:15 PM", date: "yesterday", category: "application",
    title: "Application submitted",
    subtitle: "Backend Engineering Intern · DataStream Inc",
    detail: "87% match. Submitted via authorised integration.",
    role: "Backend Engineering Intern", company: "DataStream Inc", match: 87,
    whyReasons: ["87% > 85% threshold", "Role is Backend which is in your preferred list", "Location Hyderabad / Remote matches preferences"],
  },
  {
    id: 12, time: "02:30 PM", date: "yesterday", category: "profile",
    title: "Career goal reviewed",
    subtitle: "AI / ML Engineer · Priority: High",
    detail: "Preferences re-synced after your profile update.",
    whyReasons: ["Profile updated with new career goal", "Re-indexed opportunity matching criteria", "Updated role preference weights for AI/ML vs Software Engineering"],
  },
  {
    id: 13, time: "11:15 AM", date: "yesterday", category: "opportunity",
    title: "Opportunity discovered",
    subtitle: "Data Science Intern · Analytiq",
    detail: "88% match. Shortlisted — recruiter has viewed your resume.",
    role: "Data Science Intern", company: "Analytiq", match: 88,
    matchingSkills: ["Python", "SQL", "Pandas", "NumPy"],
    gapSkills: ["TensorFlow"],
    whyReasons: ["88% > 85% threshold", "Data Science aligns with your AI/ML career goal", "Company in Pune / Remote matches location preference"],
  },
];

const CATEGORY_ICONS: Record<ActivityCategory, React.ReactNode> = {
  opportunity: <Search className="w-3.5 h-3.5" />,
  application: <Send className="w-3.5 h-3.5" />,
  skill: <BrainCircuit className="w-3.5 h-3.5" />,
  learning: <BookOpen className="w-3.5 h-3.5" />,
  profile: <BadgeCheck className="w-3.5 h-3.5" />,
};

const CATEGORY_COLORS: Record<ActivityCategory, { bg: string; border: string; text: string }> = {
  opportunity: { bg: "bg-violet-500/12",   border: "border-violet-500/20",  text: "text-violet-400/80" },
  application: { bg: "bg-violet-500/10",   border: "border-violet-500/18",  text: "text-violet-400/70" },
  skill:       { bg: "bg-white/5",         border: "border-white/8",        text: "text-white/45"      },
  learning:    { bg: "bg-white/4",         border: "border-white/6",        text: "text-white/40"      },
  profile:     { bg: "bg-white/5",         border: "border-white/8",        text: "text-white/40"      },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function CardWrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white/[0.03] border border-white/8 rounded-2xl ${className}`}>{children}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-3">{children}</p>;
}

// ─── Animated pulse dot ───────────────────────────────────────────────────────

function PulseDot({ active = true }: { active?: boolean }) {
  return (
    <span className="relative flex w-2 h-2">
      {active && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-50" />}
      <span className={`relative inline-flex rounded-full w-2 h-2 ${active ? "bg-violet-400" : "bg-white/20"}`} />
    </span>
  );
}

// ─── Activity detail panel ────────────────────────────────────────────────────

function ActivityDetail({ item, onClose, onNavigate }: { item: ActivityItem; onClose: () => void; onNavigate: (p: Page) => void }) {
  const c = CATEGORY_COLORS[item.category];
  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      <div className="flex-1 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-[460px] h-full bg-black/80 border-l border-white/8 overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-black/80 border-b border-white/6 px-6 py-4 flex items-start gap-3">
          <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${c.bg} ${c.border} ${c.text}`}>
            {CATEGORY_ICONS[item.category]}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-white/90 leading-none mb-0.5">{item.title}</h2>
            <p className="text-xs text-white/40">{item.subtitle}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/6 transition-colors cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Time */}
          <div className="flex items-center gap-2 text-[11px] text-white/28">
            <Clock className="w-3 h-3" />
            {item.date === "today" ? "Today" : "Yesterday"}, {item.time}
          </div>

          {/* What happened */}
          <div>
            <SectionLabel>What Happened</SectionLabel>
            <p className="text-sm text-white/55 leading-relaxed">{item.detail}</p>
          </div>

          {/* Why this action */}
          {item.whyReasons && item.whyReasons.length > 0 && (
            <div>
              <SectionLabel>Why KickSkill Did This</SectionLabel>
              <div className="space-y-2">
                {item.whyReasons.map((reason, i) => (
                  <div key={i} className="flex gap-2.5 items-start">
                    <CheckCircle2 className="w-3 h-3 text-violet-400/50 shrink-0 mt-0.5" />
                    <p className="text-xs text-white/50 leading-relaxed">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Match info */}
          {item.match && (
            <div>
              <SectionLabel>Match Score</SectionLabel>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-violet-300 tabular-nums">{item.match}%</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/6 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500" style={{ width: `${item.match}%` }} />
                </div>
                <span className="text-[10px] text-white/28">Threshold: 85%</span>
              </div>
            </div>
          )}

          {/* Matching skills */}
          {item.matchingSkills && item.matchingSkills.length > 0 && (
            <div>
              <SectionLabel>Matching Skills</SectionLabel>
              <div className="flex flex-wrap gap-1.5">
                {item.matchingSkills.map((s) => (
                  <span key={s} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-500/8 border border-violet-500/15 text-[11px] text-violet-300/80">
                    <BadgeCheck className="w-3 h-3" />{s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Skill gaps */}
          {item.gapSkills && item.gapSkills.length > 0 && (
            <div>
              <SectionLabel>Skill Gaps Identified</SectionLabel>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.gapSkills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/40">{s}</span>
                ))}
              </div>
              <button
                onClick={() => { onClose(); onNavigate("learning"); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/50 text-xs font-medium hover:text-white/80 hover:border-white/18 transition-all cursor-pointer"
              >
                <BookOpen className="w-3 h-3" />
                Improve Skill Gaps
              </button>
            </div>
          )}

          {/* Application action */}
          {item.category === "application" && item.role && (
            <div>
              <SectionLabel>Application Record</SectionLabel>
              <div className="space-y-2 text-xs">
                {[
                  { label: "Role", value: item.role },
                  { label: "Company", value: item.company ?? "" },
                  { label: "Resume", value: "Resume_v4_AI_ML_Focus.pdf" },
                  { label: "Cover Letter", value: "Generated by KickSkill" },
                  { label: "Source", value: "Authorised integration" },
                ].map((row) => (
                  <div key={row.label} className="flex items-start justify-between py-1.5 border-b border-white/5 last:border-0">
                    <span className="text-white/28">{row.label}</span>
                    <span className="text-white/55 text-right ml-4">{row.value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => { onClose(); onNavigate("applications"); }}
                className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600/12 border border-violet-500/18 text-violet-200 text-xs font-medium hover:bg-violet-600/22 transition-all cursor-pointer"
              >
                <ArrowRight className="w-3 h-3" />
                View Application
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

interface AgentActivityPageProps {
  onNavigate: (p: Page) => void;
}

export default function AgentActivityPage({ onNavigate }: AgentActivityPageProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | ActivityCategory>("all");
  const [selectedItem, setSelectedItem] = useState<ActivityItem | null>(null);
  const [command, setCommand] = useState("");
  const [progress, setProgress] = useState(27);
  const commandRef = useRef<HTMLInputElement>(null);

  // Slowly tick progress indicator to simulate live work
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => {
      setProgress((p) => (p >= 42 ? 27 : p + 1));
    }, 3200);
    return () => clearInterval(t);
  }, [isPaused]);

  const filters: { id: "all" | ActivityCategory; label: string }[] = [
    { id: "all", label: "All" },
    { id: "opportunity", label: "Opportunities" },
    { id: "application", label: "Applications" },
    { id: "skill", label: "Skills" },
    { id: "learning", label: "Learning" },
    { id: "profile", label: "Profile" },
  ];

  const filtered = activeFilter === "all"
    ? activityItems
    : activityItems.filter((a) => a.category === activeFilter);

  const todayItems = filtered.filter((a) => a.date === "today");
  const yesterdayItems = filtered.filter((a) => a.date === "yesterday");

  const quickCommands = [
    "Find me more AI internships",
    "Pause applications until I improve PyTorch",
    "Only apply to remote roles",
    "Find opportunities above 90% match",
  ];

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden bg-black">
      <div className="max-w-[1100px] mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white/92 mb-1">Agent Activity</h1>
            <p className="text-sm text-white/38">See what KickSkill is doing for your career.</p>
          </div>
          <div className="flex items-center gap-2 ml-4 shrink-0">
            <InteractiveHoverButton
              text="Agent Settings"
              className="w-36 text-xs text-white/70 border-white/10"
            />
            <button
              onClick={() => setIsPaused((p) => !p)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isPaused
                  ? "bg-violet-600/18 border border-violet-500/25 text-violet-200 hover:bg-violet-600/28"
                  : "bg-white/5 border border-white/10 text-white/50 hover:text-white/80 hover:border-white/18"
              }`}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              {isPaused ? "Resume Agent" : "Pause Agent"}
            </button>
          </div>
        </div>

        {/* Agent status bar */}
        <div className="relative mb-6 rounded-2xl border border-white/8 bg-white/[0.03] p-5 overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-32 rounded-full opacity-8 blur-3xl pointer-events-none" style={{ background: isPaused ? "radial-gradient(circle, #64748b, transparent)" : "radial-gradient(circle, #8b5cf6, transparent)" }} />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Status indicator */}
            <div className="flex items-center gap-3 shrink-0">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isPaused ? "bg-white/5 border-white/8" : "bg-violet-500/12 border-violet-500/20"}`}>
                <Bot className={`w-5 h-5 ${isPaused ? "text-white/30" : "text-violet-400"}`} />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/28 mb-0.5">KickSkill Agent</p>
                <div className="flex items-center gap-2">
                  <PulseDot active={!isPaused} />
                  <span className={`text-sm font-bold tracking-wide ${isPaused ? "text-white/35" : "text-violet-400"}`}>
                    {isPaused ? "PAUSED" : "ACTIVE"}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-white/6 shrink-0" />

            {/* Status description */}
            <p className="flex-1 text-xs text-white/40 leading-relaxed">
              {isPaused
                ? "The agent is paused. No new applications will be submitted. Monitoring continues."
                : "KickSkill is actively monitoring opportunities according to your preferences."}
            </p>

            <div className="hidden sm:block w-px h-8 bg-white/6 shrink-0" />

            {/* Stats */}
            <div className="flex items-center gap-5 shrink-0">
              {[
                { label: "Last active", value: "2 min ago" },
                { label: "Monitored", value: "127" },
                { label: "Prepared", value: "18" },
                { label: "Submitted", value: "12" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-sm font-bold text-white/75 tabular-nums leading-none">{s.value}</p>
                  <p className="text-[9px] text-white/25 mt-0.5 uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Currently working on */}
        {!isPaused && (
          <div className="mb-6">
            <CardWrap className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw className="w-3.5 h-3.5 text-violet-400/70 animate-spin" style={{ animationDuration: "3s" }} />
                <SectionLabel>Currently Working On</SectionLabel>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-white/80 mb-1">Analyzing AI/ML internship opportunities</p>
                  <p className="text-xs text-white/35 mb-3">Comparing job requirements against your Skill Passport</p>
                  {/* Progress bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full bg-white/6 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-1000"
                        style={{ width: `${(progress / 42) * 100}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-white/35 font-mono tabular-nums shrink-0">{progress} / 42</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0 text-xs text-white/30">
                  <div className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-violet-400/50" />
                    <span>Match threshold: 85%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-violet-400/50" />
                    <span>India / Remote</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate("opportunities")}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600/12 border border-violet-500/18 text-violet-200 text-xs font-medium hover:bg-violet-600/22 transition-all cursor-pointer"
                >
                  <Search className="w-3 h-3" />
                  View Opportunities
                </button>
              </div>
            </CardWrap>
          </div>
        )}

        {/* Main two-column grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">

          {/* Left — live activity feed */}
          <div>
            {/* Filter chips */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeFilter === f.id
                      ? "bg-violet-500/15 border border-violet-500/25 text-violet-200"
                      : "bg-white/4 border border-white/8 text-white/40 hover:text-white/65 hover:bg-white/7"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <SectionLabel>Live Activity</SectionLabel>

            {/* Today */}
            {todayItems.length > 0 && (
              <div className="mb-6">
                <p className="text-[10px] font-semibold text-white/20 uppercase tracking-widest mb-3">Today</p>
                <div className="space-y-0">
                  {todayItems.map((item, idx) => {
                    const c = CATEGORY_COLORS[item.category];
                    const isLast = idx === todayItems.length - 1 && yesterdayItems.length === 0;
                    return (
                      <div key={item.id} className="flex gap-3 group cursor-pointer" onClick={() => setSelectedItem(item)}>
                        {/* Timeline column */}
                        <div className="flex flex-col items-center w-8 shrink-0">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 ${c.bg} ${c.border} ${c.text} group-hover:scale-105 transition-transform`}>
                            {CATEGORY_ICONS[item.category]}
                          </div>
                          {!isLast && <div className="w-px flex-1 mt-1 mb-1 bg-white/5" />}
                        </div>

                        {/* Content */}
                        <div className={`flex-1 pb-4 ${isLast ? "" : ""}`}>
                          <div className="flex items-start justify-between gap-2 mb-0.5">
                            <p className="text-sm font-medium text-white/80 group-hover:text-white/95 transition-colors leading-snug">{item.title}</p>
                            <div className="flex items-center gap-2 shrink-0">
                              {item.match && (
                                <span className="text-[11px] font-semibold tabular-nums" style={{ color: item.match >= 85 ? "#10b981" : "#8b5cf6" }}>
                                  {item.match}%
                                </span>
                              )}
                              <span className="text-[10px] text-white/20 font-mono">{item.time}</span>
                            </div>
                          </div>
                          <p className="text-xs text-white/40 leading-snug mb-1">{item.subtitle}</p>
                          <p className="text-[11px] text-white/25 leading-relaxed">{item.detail}</p>
                          <div className="mt-1.5 flex items-center gap-1 text-[10px] text-violet-400/40 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>View explanation</span>
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Yesterday */}
            {yesterdayItems.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold text-white/20 uppercase tracking-widest mb-3">Yesterday</p>
                <div className="space-y-0">
                  {yesterdayItems.map((item, idx) => {
                    const c = CATEGORY_COLORS[item.category];
                    const isLast = idx === yesterdayItems.length - 1;
                    return (
                      <div key={item.id} className="flex gap-3 group cursor-pointer" onClick={() => setSelectedItem(item)}>
                        <div className="flex flex-col items-center w-8 shrink-0">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 ${c.bg} ${c.border} ${c.text} group-hover:scale-105 transition-transform`}>
                            {CATEGORY_ICONS[item.category]}
                          </div>
                          {!isLast && <div className="w-px flex-1 mt-1 mb-1 bg-white/5" />}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-start justify-between gap-2 mb-0.5">
                            <p className="text-sm font-medium text-white/60 group-hover:text-white/85 transition-colors leading-snug">{item.title}</p>
                            <div className="flex items-center gap-2 shrink-0">
                              {item.match && (
                                <span className="text-[11px] font-semibold tabular-nums text-white/35">{item.match}%</span>
                              )}
                              <span className="text-[10px] text-white/18 font-mono">{item.time}</span>
                            </div>
                          </div>
                          <p className="text-xs text-white/30 leading-snug mb-1">{item.subtitle}</p>
                          <p className="text-[11px] text-white/20 leading-relaxed">{item.detail}</p>
                          <div className="mt-1.5 flex items-center gap-1 text-[10px] text-violet-400/35 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>View explanation</span>
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-sm text-white/20">No activity in this category.</p>
              </div>
            )}

          </div>

          {/* Right sidebar */}
          <div className="space-y-4">

          </div>
        </div>

        <div className="h-12" />
      </div>

      {/* Activity detail drawer */}
      {selectedItem && (
        <ActivityDetail
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onNavigate={(p) => { setSelectedItem(null); onNavigate(p); }}
        />
      )}
    </div>
  );
}
