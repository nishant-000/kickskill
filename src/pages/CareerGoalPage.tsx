import { useState } from "react";
import {
  Target,
  BrainCircuit,
  Sparkles,
  BookOpen,
  Search,
  Bot,
  TrendingUp,
  CheckCircle2,
  Circle,
  ChevronRight,
  IndianRupee,
  MapPin,
  Briefcase,
  BadgeCheck,
  Route,
  Settings,
  Send,
  History,
  Zap,
  ArrowDown,
} from "lucide-react";
import type { Page } from "../App";

// ─── Static data ──────────────────────────────────────────────────────────────

const ROLES = [
  "AI / ML Engineer",
  "Software Engineer",
  "Backend Engineer",
  "Frontend Engineer",
  "Data Scientist",
  "Data Engineer",
  "Cybersecurity Engineer",
  "Cloud Engineer",
  "Product Manager",
  "UI/UX Designer",
];

const INDUSTRIES = [
  "Artificial Intelligence",
  "Software",
  "FinTech",
  "Healthcare",
  "EdTech",
  "Cybersecurity",
  "E-commerce",
  "Automotive",
  "Gaming",
  "Government",
];

const TIMELINES = ["Exploring", "3 Months", "6 Months", "1 Year", "2+ Years"];

const LOCATIONS = ["India", "Remote", "International"];
const MODES = ["Remote", "Hybrid", "On-site"];
const OPP_TYPES = ["Internship", "Full-time", "Part-time", "Projects", "Apprenticeships"];

const PRIORITIES = [
  "Prioritise skill development",
  "Prioritise internships",
  "Prioritise job opportunities",
  "Prioritise high-growth industries",
  "Prioritise remote opportunities",
  "Prioritise high-match opportunities",
];

const goalSkills = [
  { name: "Python",           level: 86, status: "Strong"           },
  { name: "Machine Learning", level: 74, status: "Developing"       },
  { name: "SQL",              level: 81, status: "Strong"           },
  { name: "Git",              level: 89, status: "Strong"           },
  { name: "NumPy / Pandas",   level: 75, status: "Developing"       },
  { name: "FastAPI",          level: 58, status: "Developing"       },
  { name: "NLP",              level: 48, status: "Developing"       },
  { name: "PyTorch",          level: 42, status: "Needs Improvement"},
  { name: "Docker",           level: 35, status: "Needs Improvement"},
  { name: "Cloud (AWS/GCP)",  level: 28, status: "Needs Improvement"},
];

const careerPath = [
  { label: "Current Profile",    desc: "Your verified skills and experience" },
  { label: "Skill Development",  desc: "Close gaps in PyTorch, Docker, and Cloud" },
  { label: "Projects",           desc: "Build 1–2 production-grade ML projects" },
  { label: "Internship",         desc: "Land a relevant AI/ML internship" },
  { label: "Interview",          desc: "Interview and receive offer" },
  { label: "Career Goal",        desc: "AI / ML Engineer — full-time role" },
];
const CURRENT_STAGE = 1; // "Skill Development"

const agentWorkflow = [
  { icon: <Search className="w-3.5 h-3.5" />,     label: "Monitor Opportunities" },
  { icon: <BrainCircuit className="w-3.5 h-3.5" />, label: "Analyse Industry Requirements" },
  { icon: <BadgeCheck className="w-3.5 h-3.5" />,  label: "Compare With Your Skills" },
  { icon: <Target className="w-3.5 h-3.5" />,      label: "Identify Gaps" },
  { icon: <BookOpen className="w-3.5 h-3.5" />,    label: "Recommend Learning" },
  { icon: <Briefcase className="w-3.5 h-3.5" />,   label: "Find Projects" },
  { icon: <Send className="w-3.5 h-3.5" />,        label: "Prepare Applications" },
  { icon: <TrendingUp className="w-3.5 h-3.5" />,  label: "Track Outcomes" },
];

const previousGoals = [
  { role: "AI / ML Engineer",  note: "Current",              active: true  },
  { role: "Software Engineer", note: "Previously selected",  active: false },
  { role: "Data Scientist",    note: "Previously explored",  active: false },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function CardWrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white/[0.03] border border-white/8 rounded-2xl ${className}`}>{children}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-3">{children}</p>;
}

function SkillStatusLabel({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Strong":            "text-violet-300/80",
    "Developing":        "text-violet-300/70",
    "Needs Improvement": "text-white/30",
  };
  return <span className={`text-[10px] ${styles[status] ?? "text-white/30"}`}>{status}</span>;
}

function ReadinessArc({ value }: { value: number }) {
  const r = 32, cx = 40, cy = 40;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <div className="relative w-[80px] h-[80px] shrink-0">
      <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#cg-grad)" strokeWidth="5"
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" />
        <defs>
          <linearGradient id="cg-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-white/90 leading-none">{value}%</span>
      </div>
    </div>
  );
}

function MultiChip({
  label,
  selected,
  onClick,
}: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
        selected
          ? "bg-violet-500/15 border-violet-500/30 text-violet-200"
          : "bg-white/4 border-white/8 text-white/40 hover:text-white/70 hover:bg-white/7 hover:border-white/14"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface CareerGoalPageProps {
  onNavigate: (p: Page) => void;
}

export default function CareerGoalPage({ onNavigate }: CareerGoalPageProps) {
  const [selectedRole, setSelectedRole] = useState("AI / ML Engineer");
  const [roleSearch, setRoleSearch] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState(new Set(["Artificial Intelligence", "Software"]));
  const [selectedLocations, setSelectedLocations] = useState(new Set(["India", "Remote"]));
  const [selectedModes, setSelectedModes] = useState(new Set(["Remote", "Hybrid"]));
  const [selectedTypes, setSelectedTypes] = useState(new Set(["Internship", "Full-time"]));
  const [selectedTimeline, setSelectedTimeline] = useState("6 Months");
  const [selectedPriorities, setSelectedPriorities] = useState(
    new Set(["Prioritise internships", "Prioritise high-match opportunities"])
  );
  const [stipend, setStipend] = useState("15000");
  const [aiCommand, setAiCommand] = useState("");
  const [saved, setSaved] = useState(false);

  function toggle<T>(set: Set<T>, val: T): Set<T> {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    return next;
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2800);
  }

  const filteredRoles = roleSearch.trim()
    ? ROLES.filter((r) => r.toLowerCase().includes(roleSearch.toLowerCase()))
    : ROLES;

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden bg-black">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-4 sm:py-8 pl-16 sm:pl-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold text-white/92">Career Goal</h1>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-violet-500/8 border border-violet-500/15 text-violet-400/80 text-[11px] font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                CAREER GOAL ACTIVE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/38">Tell KickSkill where you want to go. It will help you figure out how to get there.</p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">

          {/* ── Left column ─────────────────────────────────────────────── */}
          <div className="space-y-6">

            {/* Current goal hero */}
            <div className="relative rounded-2xl border border-white/8 bg-white/[0.03] p-6 overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-40 rounded-full opacity-8 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
              <SectionLabel>Your Current Goal</SectionLabel>
              <div className="relative flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white/95 mb-3">{selectedRole}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-1.5 text-xs">
                    {[
                      { label: "Target Industry",    value: "Technology / AI" },
                      { label: "Target Experience",  value: "Internship → Full-time" },
                      { label: "Target Timeline",    value: selectedTimeline },
                    ].map((row) => (
                      <div key={row.label}>
                        <p className="text-[10px] text-white/25 uppercase tracking-wider mb-0.5">{row.label}</p>
                        <p className="text-white/65">{row.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <ReadinessArc value={78} />
                  <p className="text-[10px] text-white/28 uppercase tracking-wider">Readiness</p>
                </div>
              </div>
            </div>

            {/* What do you want to become */}
            <CardWrap className="p-5">
              <SectionLabel>What Do You Want to Become?</SectionLabel>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25 pointer-events-none" />
                <input
                  type="text"
                  value={roleSearch}
                  onChange={(e) => setRoleSearch(e.target.value)}
                  placeholder="Search roles..."
                  className="w-full pl-9 pr-4 py-2 bg-white/4 border border-white/8 rounded-xl text-sm text-white/70 placeholder:text-white/22 focus:outline-none focus:border-violet-500/40 focus:bg-white/6 transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {filteredRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
                      selectedRole === role
                        ? "bg-violet-500/18 border-violet-500/35 text-violet-100 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "bg-white/4 border-white/8 text-white/45 hover:text-white/75 hover:bg-white/7 hover:border-white/14"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </CardWrap>

            {/* Required skills */}
            <CardWrap className="p-5">
              <div className="flex items-center justify-between mb-4">
                <SectionLabel>Skills Required for Your Goal</SectionLabel>
                <button
                  onClick={() => onNavigate("skills")}
                  className="flex items-center gap-1 text-[11px] text-violet-400/60 hover:text-violet-300 transition-colors cursor-pointer"
                >
                  View Full Skill Analysis
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3.5">
                {goalSkills.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/65">{s.name}</span>
                      <div className="flex items-center gap-2">
                        <SkillStatusLabel status={s.status} />
                        <span className="text-xs font-semibold tabular-nums"
                          style={{ color: s.level >= 75 ? "#10b981" : s.level >= 55 ? "#a78bfa" : "rgba(255,255,255,0.32)" }}>
                          {s.level}%
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${s.level}%`,
                          background: s.level >= 75 ? "rgba(16,185,129,0.55)" : s.level >= 55 ? "rgba(139,92,246,0.55)" : "rgba(255,255,255,0.18)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardWrap>

            {/* Path to the goal */}
            <CardWrap className="p-5">
              <SectionLabel>Your Path to the Goal</SectionLabel>
              <div className="space-y-0 mb-4">
                {careerPath.map((step, i) => {
                  const isCurrent = i === CURRENT_STAGE;
                  const isDone = i < CURRENT_STAGE;
                  const isFuture = i > CURRENT_STAGE;
                  const isLast = i === careerPath.length - 1;
                  return (
                    <div key={step.label} className="flex gap-4">
                      <div className="flex flex-col items-center w-6 shrink-0">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                          isCurrent ? "bg-violet-500/20 border-violet-500/40" :
                          isDone ? "bg-white/8 border-white/12" :
                          isLast ? "bg-violet-500/12 border-violet-500/25" :
                          "bg-transparent border-white/8"
                        }`}>
                          {isDone
                            ? <CheckCircle2 className="w-3 h-3 text-white/35" />
                            : isCurrent
                            ? <div className="w-2 h-2 rounded-full bg-violet-400" />
                            : isLast
                            ? <Target className="w-3 h-3 text-violet-400/60" />
                            : <Circle className="w-3 h-3 text-white/12" />
                          }
                        </div>
                        {!isLast && <div className={`w-px flex-1 mt-1 mb-1 ${isDone ? "bg-white/10" : "bg-white/5"}`} />}
                      </div>
                      <div className="pb-4">
                        <p className={`text-sm font-medium leading-none mb-0.5 ${
                          isCurrent ? "text-violet-300" : isDone ? "text-white/40" : isLast ? "text-violet-300/80" : "text-white/22"
                        }`}>
                          {step.label}
                          {isCurrent && <span className="ml-2 text-[10px] text-violet-400/50 font-normal">· Current stage</span>}
                        </p>
                        <p className={`text-[11px] leading-relaxed ${isCurrent ? "text-white/40" : "text-white/18"}`}>{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="px-4 py-3 rounded-xl bg-violet-500/6 border border-violet-500/12">
                <p className="text-[11px] font-medium text-violet-300/70 mb-1">Current Stage — Skill Development</p>
                <p className="text-xs text-white/38 leading-relaxed">
                  You are strong in programming fundamentals. Your biggest gaps are deployment and advanced ML skills.
                </p>
              </div>
            </CardWrap>

            {/* Save row */}
            <div className="flex items-center justify-between pt-2 pb-2">
              <div className={`text-xs text-violet-300/80 transition-all duration-300 ${saved ? "opacity-100" : "opacity-0"}`}>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Career goal updated.
                </span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <button className="px-4 py-2 rounded-xl text-xs text-white/35 hover:text-white/65 transition-colors cursor-pointer">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-violet-600/22 border border-violet-500/30 text-violet-100 text-xs font-semibold hover:bg-violet-600/32 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Save Career Goal
                </button>
              </div>
            </div>
          </div>

          {/* ── Right sidebar ────────────────────────────────────────────── */}
          <div className="space-y-4">

            {/* Preferred industries */}
            <CardWrap className="p-5">
              <SectionLabel>Preferred Industries</SectionLabel>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {INDUSTRIES.map((ind) => (
                  <MultiChip
                    key={ind}
                    label={ind}
                    selected={selectedIndustries.has(ind)}
                    onClick={() => setSelectedIndustries(toggle(selectedIndustries, ind))}
                  />
                ))}
              </div>
            </CardWrap>

            {/* Work preferences */}
            <CardWrap className="p-5">
              <SectionLabel>Work Preferences</SectionLabel>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2">Location</p>
                  <div className="flex flex-wrap gap-1.5">
                    {LOCATIONS.map((l) => (
                      <MultiChip key={l} label={l} selected={selectedLocations.has(l)}
                        onClick={() => setSelectedLocations(toggle(selectedLocations, l))} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2">Work Mode</p>
                  <div className="flex flex-wrap gap-1.5">
                    {MODES.map((m) => (
                      <MultiChip key={m} label={m} selected={selectedModes.has(m)}
                        onClick={() => setSelectedModes(toggle(selectedModes, m))} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2">Opportunity Type</p>
                  <div className="flex flex-wrap gap-1.5">
                    {OPP_TYPES.map((t) => (
                      <MultiChip key={t} label={t} selected={selectedTypes.has(t)}
                        onClick={() => setSelectedTypes(toggle(selectedTypes, t))} />
                    ))}
                  </div>
                </div>
              </div>
            </CardWrap>

            {/* Compensation */}
            <CardWrap className="p-5">
              <SectionLabel>Compensation</SectionLabel>
              <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2">Minimum Stipend</p>
              <div className="relative mb-1">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25 pointer-events-none" />
                <input
                  type="number"
                  value={stipend}
                  onChange={(e) => setStipend(e.target.value)}
                  placeholder="15000"
                  className="w-full pl-8 pr-4 py-2 bg-white/4 border border-white/8 rounded-xl text-sm text-white/65 placeholder:text-white/22 focus:outline-none focus:border-violet-500/40 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <p className="text-[10px] text-white/20">/ month · optional</p>
            </CardWrap>

            {/* Timeline */}
            <CardWrap className="p-5">
              <SectionLabel>When Do You Want to Reach This Goal?</SectionLabel>
              <div className="flex flex-col gap-1.5">
                {TIMELINES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTimeline(t)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      selectedTimeline === t
                        ? "bg-violet-500/15 border-violet-500/28 text-violet-200"
                        : "bg-white/3 border-white/6 text-white/38 hover:text-white/65 hover:bg-white/6"
                    }`}
                  >
                    {t}
                    {selectedTimeline === t && <CheckCircle2 className="w-3.5 h-3.5 text-violet-400/70" />}
                  </button>
                ))}
              </div>
            </CardWrap>


          </div>
        </div>

        <div className="h-12" />
      </div>
    </div>
  );
}
