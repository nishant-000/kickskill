import { useState, useRef, useCallback, useEffect } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Star,
  CalendarCheck,
  TrendingUp,
  Bot,
  Building2,
  Settings,
  ChevronRight,
  X,
  BadgeCheck,
  Sparkles,
  Send,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Circle,
  FileText,
  UserRound,
  Eye,
  MessageSquare,
  Trash2,
  PauseCircle,
  Search,
  SlidersHorizontal,
  IndianRupee,
  Paperclip,
  ArrowUpIcon,
  LogOut,
} from "lucide-react";
import type { Page } from "../App";

// ─── Types ────────────────────────────────────────────────────────────────────

type IndustrySection =
  | "dashboard"
  | "opportunities"
  | "candidates"
  | "shortlist"
  | "interviews"
  | "skill-demand"
  | "ai-recruiting"
  | "company-profile";

interface Opportunity {
  id: string;
  title: string;
  type: "Internship" | "Job" | "Project";
  applicants: number;
  strongMatches: number;
  avgMatch: number;
  status: "Accepting" | "Paused" | "Closed";
  deadline: string;
  skills: string[];
}

interface Candidate {
  id: string;
  code: string;
  role: string;
  match: number;
  verifiedSkills: { name: string; level: number; verified: boolean }[];
  gapSkills: { name: string; level: number }[];
  projects: number;
  internships: number;
  institution: string;
  degree: string;
  status: "matched" | "shortlisted" | "interview" | "selected" | "rejected";
  projectRelevance: "High" | "Medium" | "Low";
  expRelevance: "High" | "Medium" | "Low";
}

interface Interview {
  candidateCode: string;
  role: string;
  stage: string;
  date: string;
  status: "Confirmed" | "Pending";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const opportunities: Opportunity[] = [
  {
    id: "o1", title: "AI / ML Intern", type: "Internship",
    applicants: 184, strongMatches: 27, avgMatch: 91,
    status: "Accepting", deadline: "Oct 15, 2026",
    skills: ["Python", "Machine Learning", "PyTorch", "SQL"],
  },
  {
    id: "o2", title: "Backend Engineering Intern", type: "Internship",
    applicants: 96, strongMatches: 18, avgMatch: 87,
    status: "Accepting", deadline: "Oct 20, 2026",
    skills: ["Node.js", "PostgreSQL", "Docker", "REST APIs"],
  },
  {
    id: "o3", title: "Data Science Analyst", type: "Job",
    applicants: 62, strongMatches: 11, avgMatch: 83,
    status: "Accepting", deadline: "Nov 1, 2026",
    skills: ["Python", "SQL", "Tableau", "Statistics"],
  },
  {
    id: "o4", title: "DevOps Engineer", type: "Job",
    applicants: 38, strongMatches: 6, avgMatch: 79,
    status: "Paused", deadline: "Nov 15, 2026",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
  },
];

const candidates: Candidate[] = [
  {
    id: "c1", code: "Candidate 01", role: "AI / ML Intern", match: 94,
    verifiedSkills: [
      { name: "Python", level: 92, verified: true },
      { name: "Machine Learning", level: 87, verified: true },
      { name: "PyTorch", level: 81, verified: true },
      { name: "SQL", level: 90, verified: true },
    ],
    gapSkills: [{ name: "Docker", level: 42 }, { name: "AWS", level: 31 }],
    projects: 3, internships: 1, institution: "IIT Bombay", degree: "B.Tech CSE",
    status: "shortlisted", projectRelevance: "High", expRelevance: "High",
  },
  {
    id: "c2", code: "Candidate 02", role: "AI / ML Intern", match: 89,
    verifiedSkills: [
      { name: "Python", level: 88, verified: true },
      { name: "Machine Learning", level: 84, verified: true },
      { name: "SQL", level: 79, verified: true },
    ],
    gapSkills: [{ name: "PyTorch", level: 38 }, { name: "AWS", level: 28 }],
    projects: 2, internships: 0, institution: "NIT Trichy", degree: "B.Tech AI",
    status: "matched", projectRelevance: "High", expRelevance: "Medium",
  },
  {
    id: "c3", code: "Candidate 03", role: "AI / ML Intern", match: 86,
    verifiedSkills: [
      { name: "Python", level: 85, verified: true },
      { name: "PyTorch", level: 80, verified: true },
      { name: "SQL", level: 74, verified: false },
    ],
    gapSkills: [{ name: "Machine Learning", level: 55 }],
    projects: 4, internships: 1, institution: "BITS Pilani", degree: "B.E. CS",
    status: "matched", projectRelevance: "High", expRelevance: "High",
  },
  {
    id: "c4", code: "Candidate 04", role: "Backend Engineering Intern", match: 91,
    verifiedSkills: [
      { name: "Node.js", level: 89, verified: true },
      { name: "PostgreSQL", level: 86, verified: true },
      { name: "REST APIs", level: 92, verified: true },
    ],
    gapSkills: [{ name: "Docker", level: 45 }, { name: "Kubernetes", level: 22 }],
    projects: 2, internships: 1, institution: "IIT Delhi", degree: "B.Tech CSE",
    status: "shortlisted", projectRelevance: "High", expRelevance: "High",
  },
  {
    id: "c5", code: "Candidate 05", role: "Backend Engineering Intern", match: 84,
    verifiedSkills: [
      { name: "Node.js", level: 82, verified: true },
      { name: "PostgreSQL", level: 77, verified: false },
      { name: "Docker", level: 71, verified: true },
    ],
    gapSkills: [{ name: "REST APIs", level: 60 }],
    projects: 1, internships: 0, institution: "VIT Vellore", degree: "B.Tech CS",
    status: "interview", projectRelevance: "Medium", expRelevance: "Low",
  },
];

const interviews: Interview[] = [
  { candidateCode: "Candidate 04", role: "Backend Engineering Intern", stage: "Technical Interview", date: "Tomorrow, 4:00 PM", status: "Confirmed" },
  { candidateCode: "Candidate 01", role: "AI / ML Intern", stage: "HR Screening", date: "Sep 5, 2:00 PM", status: "Confirmed" },
  { candidateCode: "Candidate 07", role: "Data Science Analyst", stage: "Technical Interview", date: "Sep 6, 11:00 AM", status: "Pending" },
];

const skillDemand = [
  { name: "Python", pct: 84 },
  { name: "Machine Learning", pct: 72 },
  { name: "SQL", pct: 61 },
  { name: "PyTorch", pct: 54 },
  { name: "Docker", pct: 48 },
  { name: "Node.js", pct: 43 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function CardWrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white/[0.03] border border-white/8 rounded-2xl ${className}`}>{children}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-3">{children}</p>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Accepting:    "bg-violet-500/10 border-violet-500/20 text-violet-300/80",
    Paused:       "bg-white/6 border-white/10 text-white/45",
    Closed:       "bg-white/5 border-white/10 text-white/30",
    Confirmed:    "bg-violet-500/10 border-violet-500/20 text-violet-200/80",
    Pending:      "bg-white/5 border-white/10 text-white/35",
    shortlisted:  "bg-violet-500/10 border-violet-500/20 text-violet-200/80",
    interview:    "bg-violet-500/10 border-violet-500/20 text-violet-200/80",
    selected:     "bg-violet-500/10 border-violet-500/20 text-violet-300/80",
    rejected:     "bg-white/4 border-white/8 text-white/30",
    matched:      "bg-white/5 border-white/10 text-white/38",
  };
  const labels: Record<string, string> = {
    shortlisted: "Shortlisted", interview: "Interview", selected: "Selected",
    rejected: "Rejected", matched: "Matched",
  };
  const cls = map[status] ?? map.matched;
  return <span className={`px-2 py-0.5 rounded-md text-[10px] border ${cls}`}>{labels[status] ?? status}</span>;
}

function MatchRing({ value, size = 40 }: { value: number; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={value >= 88 ? "#8b5cf6" : value >= 75 ? "#6366f1" : "rgba(255,255,255,0.2)"}
        strokeWidth="3" strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Post Opportunity Drawer ───────────────────────────────────────────────────

function PostOpportunityDrawer({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"form" | "analyze" | "confirm">("form");
  const [jobDesc, setJobDesc] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [formData, setFormData] = useState({
    title: "", type: "Internship", location: "Remote", duration: "", stipend: "",
    qualification: "", description: "", deadline: "",
  });

  const extractedRequired = ["Python", "Machine Learning", "PyTorch"];
  const extractedPreferred = ["Docker", "AWS"];

  function handleAnalyze() {
    if (jobDesc.trim()) { setAnalyzed(true); setStep("analyze"); }
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-lg bg-black/80 border-l border-white/8 h-full overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8 shrink-0">
          <div>
            <h2 className="text-base font-semibold text-white/90">Post Opportunity</h2>
            <p className="text-xs text-white/30 mt-0.5">Define the role and required skills.</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/5 transition-all cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 px-6 py-5 space-y-5">
          {(step === "form" || step === "analyze" || step === "confirm") && (
            <>
              {/* Basic fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-[10px] text-white/28 uppercase tracking-wider block mb-1.5">Role Title</label>
                  <input value={formData.title} onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. AI / ML Intern"
                    className="w-full px-3 py-2 bg-white/4 border border-white/8 rounded-xl text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-violet-500/40 transition-all" />
                </div>
                <div>
                  <label className="text-[10px] text-white/28 uppercase tracking-wider block mb-1.5">Type</label>
                  <select value={formData.type} onChange={(e) => setFormData((p) => ({ ...p, type: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/4 border border-white/8 rounded-xl text-sm text-white/65 focus:outline-none focus:border-violet-500/40 transition-all appearance-none cursor-pointer">
                    {["Internship", "Job", "Project", "Apprenticeship"].map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-white/28 uppercase tracking-wider block mb-1.5">Location</label>
                  <select value={formData.location} onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/4 border border-white/8 rounded-xl text-sm text-white/65 focus:outline-none focus:border-violet-500/40 transition-all appearance-none cursor-pointer">
                    {["Remote", "Hybrid", "On-site"].map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-white/28 uppercase tracking-wider block mb-1.5">Duration</label>
                  <input value={formData.duration} onChange={(e) => setFormData((p) => ({ ...p, duration: e.target.value }))}
                    placeholder="e.g. 3 months"
                    className="w-full px-3 py-2 bg-white/4 border border-white/8 rounded-xl text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-violet-500/40 transition-all" />
                </div>
                <div>
                  <label className="text-[10px] text-white/28 uppercase tracking-wider block mb-1.5">Stipend / Salary</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-white/25 pointer-events-none" />
                    <input value={formData.stipend} onChange={(e) => setFormData((p) => ({ ...p, stipend: e.target.value }))}
                      placeholder="15,000 / month"
                      className="w-full pl-7 pr-3 py-2 bg-white/4 border border-white/8 rounded-xl text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-violet-500/40 transition-all" />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] text-white/28 uppercase tracking-wider block mb-1.5">Application Deadline</label>
                  <input type="date" value={formData.deadline} onChange={(e) => setFormData((p) => ({ ...p, deadline: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/4 border border-white/8 rounded-xl text-sm text-white/65 focus:outline-none focus:border-violet-500/40 transition-all" />
                </div>
              </div>

              {/* Job description + AI extraction */}
              <div>
                <label className="text-[10px] text-white/28 uppercase tracking-wider block mb-1.5">Job Description</label>
                <textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} rows={4}
                  placeholder="Describe the role and what skills you are looking for..."
                  className="w-full px-3 py-2.5 bg-white/4 border border-white/8 rounded-xl text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-violet-500/40 transition-all resize-none leading-relaxed" />
                <button onClick={handleAnalyze}
                  className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600/14 border border-violet-500/22 text-violet-200 text-xs font-medium hover:bg-violet-600/22 transition-all cursor-pointer">
                  <Sparkles className="w-3 h-3" /> Analyze With KickSkill
                </button>
              </div>

              {/* AI extraction results */}
              {analyzed && (
                <CardWrap className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400/70" />
                    <SectionLabel>KickSkill Extracted</SectionLabel>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-white/28 uppercase tracking-wider mb-2">Required</p>
                      <div className="flex flex-wrap gap-1.5">
                        {extractedRequired.map((s) => (
                          <span key={s} className="px-2 py-1 rounded-lg bg-violet-500/15 border border-violet-500/22 text-violet-200 text-xs">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/28 uppercase tracking-wider mb-2">Preferred</p>
                      <div className="flex flex-wrap gap-1.5">
                        {extractedPreferred.map((s) => (
                          <span key={s} className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white/45 text-xs">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/25 mt-3">You can edit these before publishing.</p>
                </CardWrap>
              )}
            </>
          )}
        </div>

        <div className="shrink-0 px-6 pb-6 pt-4 border-t border-white/6 flex gap-2">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl border border-white/10 text-xs text-white/35 hover:text-white/60 transition-all cursor-pointer">Cancel</button>
          <button
            onClick={() => onClose()}
            className="flex-1 py-2 rounded-xl bg-violet-600/20 border border-violet-500/28 text-violet-200 text-xs font-semibold hover:bg-violet-600/30 transition-all cursor-pointer">
            {analyzed ? "Confirm & Publish" : "Publish Opportunity"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Candidate Detail Drawer ──────────────────────────────────────────────────

function CandidateDetailDrawer({ candidate, onClose }: { candidate: Candidate; onClose: () => void }) {
  const [shortlisted, setShortlisted] = useState(candidate.status === "shortlisted" || candidate.status === "interview");

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-lg bg-black/80 border-l border-white/8 h-full overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600/30 to-violet-700/30 border border-white/10 flex items-center justify-center">
              <UserRound className="w-4 h-4 text-white/50" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white/90 leading-none">{candidate.code}</p>
              <p className="text-xs text-white/32 mt-0.5">{candidate.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <MatchRing value={candidate.match} size={36} />
              <span className="text-sm font-bold text-white/80">{candidate.match}%</span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/5 transition-all cursor-pointer ml-2">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 px-6 py-5 space-y-5">
          {/* Info row */}
          <div className="flex gap-4 text-xs text-white/38">
            <span>{candidate.institution}</span>
            <span className="text-white/15">·</span>
            <span>{candidate.degree}</span>
            <span className="text-white/15">·</span>
            <span>{candidate.projects} projects</span>
            {candidate.internships > 0 && <><span className="text-white/15">·</span><span>{candidate.internships} internship</span></>}
          </div>

          {/* Why this candidate matches */}
          <CardWrap className="p-4">
            <SectionLabel>Why This Candidate Matches</SectionLabel>
            <div className="space-y-3 mb-4">
              {candidate.verifiedSkills.map((s) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-white/65">{s.name}</span>
                      {s.verified ? (
                        <BadgeCheck className="w-3 h-3 text-violet-400/70" />
                      ) : (
                        <span className="text-[9px] text-white/25 border border-white/10 rounded px-1">Self-reported</span>
                      )}
                    </div>
                    <span className="text-xs text-white/45 font-medium">{s.level}%</span>
                  </div>
                  <div className="h-1 bg-white/6 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${s.verified ? "bg-violet-500/60" : "bg-white/20"}`}
                      style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/6">
              <div>
                <p className="text-[10px] text-white/25 mb-0.5">Project Relevance</p>
                <p className={`text-xs font-medium ${candidate.projectRelevance === "High" ? "text-violet-300/80" : "text-white/45"}`}>{candidate.projectRelevance}</p>
              </div>
              <div>
                <p className="text-[10px] text-white/25 mb-0.5">Experience</p>
                <p className={`text-xs font-medium ${candidate.expRelevance === "High" ? "text-violet-300/80" : "text-white/45"}`}>{candidate.expRelevance}</p>
              </div>
              <div>
                <p className="text-[10px] text-white/25 mb-0.5">Overall Match</p>
                <p className="text-xs font-semibold text-violet-200">{candidate.match}%</p>
              </div>
            </div>
          </CardWrap>

          {/* Skill gaps */}
          {candidate.gapSkills.length > 0 && (
            <CardWrap className="p-4">
              <SectionLabel>Skill Gaps</SectionLabel>
              <p className="text-[11px] text-white/25 mb-3 leading-relaxed">These skills are listed as preferred but not yet verified.</p>
              <div className="space-y-3">
                {candidate.gapSkills.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/45">{s.name}</span>
                      <span className="text-xs text-white/30">{s.level}%</span>
                    </div>
                    <div className="h-1 bg-white/6 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-white/15" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardWrap>
          )}
        </div>

        {/* Actions */}
        <div className="shrink-0 px-6 pb-6 pt-4 border-t border-white/6">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShortlisted(true)}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                shortlisted
                  ? "bg-violet-600/20 border-violet-500/28 text-violet-200"
                  : "bg-white/4 border-white/10 text-white/45 hover:text-white/80"
              }`}>
              <Star className="w-3 h-3" /> {shortlisted ? "Shortlisted" : "Shortlist"}
            </button>
            <button className="flex items-center justify-center gap-1.5 py-2 rounded-xl border border-violet-500/22 bg-violet-500/10 text-violet-200 text-xs font-medium hover:bg-violet-500/18 transition-all cursor-pointer">
              <CalendarCheck className="w-3 h-3" /> Request Interview
            </button>
            <button className="flex items-center justify-center gap-1.5 py-2 rounded-xl border border-white/10 bg-white/4 text-white/45 text-xs hover:text-white/80 transition-all cursor-pointer">
              <Eye className="w-3 h-3" /> View Skill Passport
            </button>
            <button className="flex items-center justify-center gap-1.5 py-2 rounded-xl border border-white/10 bg-white/4 text-white/45 text-xs hover:text-white/80 transition-all cursor-pointer">
              <MessageSquare className="w-3 h-3" /> Contact Candidate
            </button>
            <button className="col-span-2 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-white/8 bg-white/3 text-white/30 text-xs hover:text-white/55 hover:border-white/15 transition-all cursor-pointer">
              <Trash2 className="w-3 h-3" /> Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Industry Sidebar ──────────────────────────────────────────────────────────

const sidebarNav = [
  { id: "ai-recruiting",  label: "AI Recruiting",   icon: <Bot className="w-4 h-4" /> },
  { id: "dashboard",      label: "Dashboard",       icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: "opportunities",  label: "Opportunities",   icon: <Briefcase className="w-4 h-4" /> },
  { id: "candidates",     label: "Candidates",      icon: <Users className="w-4 h-4" /> },
  { id: "shortlist",      label: "Shortlist",       icon: <Star className="w-4 h-4" /> },
  { id: "interviews",     label: "Interviews",      icon: <CalendarCheck className="w-4 h-4" /> },
  { id: "skill-demand",   label: "Skill Demand",    icon: <TrendingUp className="w-4 h-4" /> },
];

const sidebarBottom = [
  { id: "company-profile", label: "Company Profile", icon: <Building2 className="w-4 h-4" /> },
  { id: "settings",        label: "Settings",        icon: <Settings className="w-4 h-4" /> },
];

function IndustrySidebar({
  expanded, onExpandChange, activeSection, onSection, onSwitchWorkspace, onSignOut,
}: {
  expanded: boolean; onExpandChange: (v: boolean) => void;
  activeSection: IndustrySection; onSection: (s: IndustrySection) => void;
  onSwitchWorkspace: () => void; onSignOut: () => void;
}) {
  function handleToggle() { onExpandChange(!expanded); }

  return (
    <>
      {expanded && (
        <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => onExpandChange(false)} />
      )}
      <aside className={`fixed left-0 top-0 h-full z-40 flex flex-col bg-black/80 backdrop-blur-xl border-r border-white/8 transition-all duration-300 ease-in-out overflow-hidden ${expanded ? "w-[220px]" : "w-16"}`}>
        {/* Header */}
        <div className={`flex h-14 items-center border-b border-white/8 shrink-0 ${expanded ? "justify-between px-4" : "justify-center"}`}>
          {expanded && (
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-5 h-5 rounded bg-violet-600/30 border border-violet-500/30 flex items-center justify-center shrink-0">
                <Building2 className="w-3 h-3 text-violet-300" />
              </div>
              <span className="text-sm font-semibold text-white tracking-wide whitespace-nowrap truncate">KickSkill</span>
            </div>
          )}
          <button
            onClick={handleToggle}
            aria-expanded={expanded}
            aria-label={expanded ? "Close menu" : "Open menu"}
            className="group p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <svg className="pointer-events-none" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12L20 12" className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]" />
              <path d="M4 12H20" className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45" />
              <path d="M4 12H20" className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]" />
            </svg>
          </button>
        </div>

        {/* Switch workspace */}
        {expanded && (
          <div className="px-3 py-2 border-b border-white/6">
            <button onClick={onSwitchWorkspace} className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/4 border border-white/8 text-xs text-white/35 hover:text-white/65 hover:border-white/14 transition-all cursor-pointer">
              <ArrowUpRight className="w-3 h-3 shrink-0" />
              <span className="truncate">Switch Workspace</span>
            </button>
          </div>
        )}

        {/* Main nav */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 space-y-0.5 px-2">
          {sidebarNav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSection(item.id as IndustrySection)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer group ${
                  isActive ? "bg-white/8 text-white border border-white/10" : "text-neutral-400 hover:text-white hover:bg-white/5"
                } ${expanded ? "justify-start" : "justify-center"}`}
              >
                <span className={`shrink-0 transition-colors ${isActive ? "text-white" : "group-hover:text-violet-400"}`}>{item.icon}</span>
                {expanded && <span className="text-sm text-neutral-300 group-hover:text-white truncate">{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Bottom */}
        <div className="shrink-0 border-t border-white/8 px-2 py-2 space-y-0.5">
          {sidebarBottom.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button key={item.id} onClick={() => onSection(item.id as IndustrySection)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer group ${
                  isActive ? "bg-white/8 text-white border border-white/10" : "text-neutral-400 hover:text-white hover:bg-white/5"
                } ${expanded ? "justify-start" : "justify-center"}`}>
                <span className={`shrink-0 ${isActive ? "text-white" : "group-hover:text-white"}`}>{item.icon}</span>
                {expanded && <span className="text-sm text-neutral-300 group-hover:text-white truncate">{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Company identity */}
        <div className="shrink-0 border-t border-white/8 px-2 py-3">
          <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${expanded ? "" : "justify-center"}`}>
            <div className="w-7 h-7 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-neutral-400" />
            </div>
            {expanded && (
              <div className="min-w-0 flex-1">
                <p className="text-sm text-white font-medium truncate leading-none mb-0.5">NovaTech</p>
                <p className="text-xs text-neutral-500 truncate">Technology / AI</p>
              </div>
            )}
            {expanded && (
              <button
                onClick={onSignOut}
                title="Sign out"
                className="shrink-0 p-1.5 rounded-lg text-neutral-600 hover:text-white hover:bg-white/8 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Dashboard Section ────────────────────────────────────────────────────────

function DashboardSection({
  onSection, onPostOpportunity, onViewCandidate,
}: {
  onSection: (s: IndustrySection) => void;
  onPostOpportunity: () => void;
  onViewCandidate: (c: Candidate) => void;
}) {
  const stats = [
    { label: "Active Opportunities", value: "8" },
    { label: "Candidates Matched", value: "342" },
    { label: "Shortlisted", value: "47" },
    { label: "Interviews", value: "18" },
    { label: "Offers", value: "6" },
  ];

  const [aiQuery, setAiQuery] = useState("");
  const aiInputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white/92 mb-1">Industry Dashboard</h1>
          <p className="text-sm text-white/38">Find the right skills, not just the right resumes.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/4 text-xs text-white/45 hover:text-white/80 transition-all cursor-pointer">
            <Sparkles className="w-3 h-3" /> Ask KickSkill
          </button>
          <button onClick={onPostOpportunity} className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-violet-600/20 border border-violet-500/28 text-violet-200 text-xs font-semibold hover:bg-violet-600/30 transition-all cursor-pointer">
            <Briefcase className="w-3 h-3" /> Post Opportunity
          </button>
        </div>
      </div>

      {/* Company profile strip */}
      <CardWrap className="px-5 py-4 flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/25 to-indigo-700/25 border border-white/10 flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4 text-white/55" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white/85 leading-none">NovaTech AI</p>
            <p className="text-xs text-white/32 mt-0.5">Technology / AI</p>
          </div>
        </div>
        <div className="flex items-center gap-6 ml-4 text-sm">
          {[
            { label: "Company Size", value: "51–200" },
            { label: "Active Opportunities", value: "8" },
            { label: "Candidates", value: "342" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-[10px] text-white/25">{s.label}</p>
              <p className="text-sm font-semibold text-white/75">{s.value}</p>
            </div>
          ))}
        </div>
        <button onClick={() => onSection("company-profile")} className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/4 text-xs text-white/40 hover:text-white/75 transition-all cursor-pointer shrink-0">
          <Building2 className="w-3 h-3" /> Company Profile
        </button>
      </CardWrap>

      {/* Recruitment overview */}
      <div className="grid grid-cols-5 gap-3">
        {stats.map((s) => (
          <CardWrap key={s.label} className="p-4 text-center">
            <p className="text-2xl font-bold text-white/90 leading-none mb-1">{s.value}</p>
            <p className="text-[10px] text-white/30 leading-tight">{s.label}</p>
          </CardWrap>
        ))}
      </div>

      {/* AI Insight */}
      <CardWrap className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-violet-400/70" />
          <SectionLabel>KickSkill AI Insight</SectionLabel>
        </div>
        <p className="text-sm text-white/60 leading-relaxed mb-4">
          Your <span className="text-white/80 font-medium">AI Engineer internship</span> has received{" "}
          <span className="text-white/80 font-medium">184 applicants</span>. Instead of reviewing every resume manually, KickSkill identified{" "}
          <span className="text-white/80 font-medium">27 candidates</span> with an 85%+ verified skill match.{" "}
          <span className="text-white/80 font-medium">8 candidates</span> have particularly strong project evidence.
        </p>
        <button onClick={() => onSection("candidates")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600/14 border border-violet-500/22 text-violet-200 text-xs font-medium hover:bg-violet-600/22 transition-all cursor-pointer">
          <ChevronRight className="w-3 h-3" /> View Matches
        </button>
      </CardWrap>

      {/* Two-column body */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
        <div className="space-y-5">
          {/* Active Opportunities */}
          <CardWrap>
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <SectionLabel>Active Opportunities</SectionLabel>
              <button onClick={() => onSection("opportunities")} className="text-xs text-white/28 hover:text-white/55 transition-colors cursor-pointer flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="divide-y divide-white/5">
              {opportunities.slice(0, 3).map((opp) => (
                <div key={opp.id} className="px-5 py-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-white/80 leading-none mb-1">{opp.title}</p>
                      <div className="flex items-center gap-2 text-xs text-white/30">
                        <span>{opp.type}</span>
                        <span className="text-white/12">·</span>
                        <span>{opp.applicants} applicants</span>
                        <span className="text-white/12">·</span>
                        <span className="text-violet-300/60">{opp.strongMatches} strong matches</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white/55">{opp.avgMatch}% avg</span>
                      <StatusBadge status={opp.status} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1 mt-1">
                      {opp.skills.slice(0, 3).map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded text-[10px] bg-white/4 border border-white/8 text-white/30">{s}</span>
                      ))}
                    </div>
                    <button onClick={() => onSection("candidates")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/4 text-xs text-white/40 hover:text-white/80 transition-all cursor-pointer shrink-0">
                      View Candidates
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardWrap>

          {/* Top Matched Candidates */}
          <CardWrap>
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <SectionLabel>Top Matched Candidates</SectionLabel>
              <button onClick={() => onSection("candidates")} className="text-xs text-white/28 hover:text-white/55 transition-colors cursor-pointer flex items-center gap-1">
                All candidates <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="divide-y divide-white/5">
              {candidates.slice(0, 4).map((c) => (
                <div key={c.id} className="px-5 py-4 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center shrink-0">
                    <UserRound className="w-4 h-4 text-white/30" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm text-white/75 font-medium leading-none">{c.code}</p>
                      <StatusBadge status={c.status} />
                    </div>
                    <p className="text-xs text-white/28 mb-1.5">{c.role} · {c.institution}</p>
                    <div className="flex flex-wrap gap-1">
                      {c.verifiedSkills.slice(0, 3).map((s) => (
                        <span key={s.name} className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-white/4 border border-white/8 text-white/38">
                          {s.verified && <BadgeCheck className="w-2.5 h-2.5 text-violet-400/60" />} {s.name}
                        </span>
                      ))}
                      {c.gapSkills.length > 0 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/4 border border-white/8 text-white/35">
                          {c.gapSkills[0].name} gap
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-base font-bold text-white/80 leading-none">{c.match}%</p>
                      <p className="text-[10px] text-white/25 mt-0.5">match</p>
                    </div>
                    <button onClick={() => onViewCandidate(c)} className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-white/10 bg-white/4 text-xs text-white/40 hover:text-white/80 transition-all cursor-pointer">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardWrap>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Skill Demand */}
          <CardWrap className="p-5">
            <SectionLabel>Your Most Requested Skills</SectionLabel>
            <div className="space-y-3">
              {skillDemand.map((s) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/55">{s.name}</span>
                    <span className="text-xs text-white/35">{s.pct}%</span>
                  </div>
                  <div className="h-1 bg-white/6 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-violet-500/40" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardWrap>

          {/* Interviews */}
          <CardWrap className="p-5">
            <div className="flex items-center justify-between mb-3">
              <SectionLabel>Upcoming Interviews</SectionLabel>
              <button onClick={() => onSection("interviews")} className="text-[10px] text-white/25 hover:text-white/50 cursor-pointer">View all</button>
            </div>
            <div className="space-y-3">
              {interviews.map((iv, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/18 flex items-center justify-center shrink-0 mt-0.5">
                    <CalendarCheck className="w-3.5 h-3.5 text-violet-300/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white/65 leading-none mb-0.5">{iv.candidateCode}</p>
                    <p className="text-[11px] text-white/30">{iv.role}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Clock className="w-2.5 h-2.5 text-white/20" />
                      <span className="text-[10px] text-white/28">{iv.date}</span>
                      <StatusBadge status={iv.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardWrap>

        </div>
      </div>
    </div>
  );
}

// ─── Opportunities Section ────────────────────────────────────────────────────

function OpportunitiesSection({ onPostOpportunity }: { onPostOpportunity: () => void }) {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white/90 mb-1">Opportunities</h2>
          <p className="text-xs text-white/35">All roles posted by NovaTech AI.</p>
        </div>
        <button onClick={onPostOpportunity} className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-violet-600/20 border border-violet-500/28 text-violet-200 text-xs font-semibold hover:bg-violet-600/30 transition-all cursor-pointer shrink-0">
          <Briefcase className="w-3 h-3" /> Post Opportunity
        </button>
      </div>
      <CardWrap className="divide-y divide-white/5">
        {opportunities.map((opp) => (
          <div key={opp.id} className="px-5 py-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-base font-semibold text-white/85 leading-none mb-1.5">{opp.title}</p>
                <div className="flex items-center gap-2 text-xs text-white/30">
                  <span>{opp.type}</span>
                  <span className="text-white/12">·</span>
                  <span>Deadline {opp.deadline}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={opp.status} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3 text-xs">
              {[
                { label: "Applicants", value: opp.applicants },
                { label: "Strong Matches", value: opp.strongMatches },
                { label: "Avg Match", value: `${opp.avgMatch}%` },
              ].map((s) => (
                <div key={s.label} className="bg-white/[0.02] border border-white/6 rounded-xl px-3 py-2">
                  <p className="text-[10px] text-white/22 mb-0.5">{s.label}</p>
                  <p className="font-semibold text-white/70">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {opp.skills.map((s) => (
                  <span key={s} className="px-1.5 py-0.5 rounded text-[10px] bg-white/4 border border-white/8 text-white/35">{s}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/4 text-xs text-white/40 hover:text-white/80 transition-all cursor-pointer">
                  <Eye className="w-3 h-3" /> View Candidates
                </button>
                <button className="flex items-center gap-1 px-2 py-1.5 rounded-xl border border-white/10 bg-white/4 text-xs text-white/30 hover:text-white/60 transition-all cursor-pointer">
                  <PauseCircle className="w-3 h-3" />
                </button>
                <button className="flex items-center gap-1 px-2 py-1.5 rounded-xl border border-white/10 bg-white/4 text-xs text-white/30 hover:text-white/60 transition-all cursor-pointer">
                  <FileText className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </CardWrap>
    </div>
  );
}

// ─── Candidates Section ───────────────────────────────────────────────────────

function CandidatesSection({ onViewCandidate }: { onViewCandidate: (c: Candidate) => void }) {
  const [filterRole, setFilterRole] = useState("All");
  const [search, setSearch] = useState("");
  const roles = ["All", "AI / ML Intern", "Backend Engineering Intern", "Data Science Analyst"];

  const filtered = candidates.filter((c) => {
    if (filterRole !== "All" && c.role !== filterRole) return false;
    if (search && !c.code.toLowerCase().includes(search.toLowerCase()) && !c.role.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white/90 mb-1">Candidates</h2>
          <p className="text-xs text-white/35">AI-matched candidates sorted by verified skill coverage.</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/4 text-xs text-white/40 hover:text-white/75 transition-all cursor-pointer shrink-0">
          <SlidersHorizontal className="w-3 h-3" /> Filters
        </button>
      </div>
      {/* Role filter + search */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25 pointer-events-none" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidates..."
            className="w-full pl-9 pr-3 py-2 bg-white/4 border border-white/8 rounded-xl text-xs text-white/60 placeholder:text-white/22 focus:outline-none focus:border-violet-500/30 transition-all" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {roles.map((r) => (
            <button key={r} onClick={() => setFilterRole(r)}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-all cursor-pointer ${
                filterRole === r
                  ? "bg-violet-500/15 border-violet-500/25 text-violet-200"
                  : "bg-white/4 border-white/8 text-white/35 hover:text-white/65"
              }`}>
              {r}
            </button>
          ))}
        </div>
      </div>
      <CardWrap className="divide-y divide-white/5">
        {filtered.map((c) => (
          <div key={c.id} className="px-5 py-4 flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600/20 to-violet-700/20 border border-white/8 flex items-center justify-center shrink-0">
              <UserRound className="w-4 h-4 text-white/35" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-semibold text-white/80">{c.code}</p>
                <StatusBadge status={c.status} />
              </div>
              <p className="text-xs text-white/28 mb-1.5">{c.role} · {c.institution}</p>
              <div className="flex flex-wrap gap-1">
                {c.verifiedSkills.slice(0, 3).map((s) => (
                  <span key={s.name} className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-white/4 border border-white/8 text-white/38">
                    {s.verified && <BadgeCheck className="w-2.5 h-2.5 text-violet-400/60" />} {s.name}
                  </span>
                ))}
                {c.gapSkills.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/4 border border-white/8 text-white/30">{c.gapSkills[0].name} gap</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden sm:block">
                <p className="text-lg font-bold text-white/80 leading-none">{c.match}%</p>
                <p className="text-[10px] text-white/22">match</p>
              </div>
              <button onClick={() => onViewCandidate(c)} className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-white/10 bg-white/4 text-xs text-white/40 hover:text-white/80 transition-all cursor-pointer">
                View Profile
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-violet-500/22 bg-violet-500/8 text-violet-200/60 text-xs hover:bg-violet-500/15 transition-all cursor-pointer">
                <Star className="w-3 h-3" /> Shortlist
              </button>
            </div>
          </div>
        ))}
      </CardWrap>
    </div>
  );
}

// ─── Shortlist Section ────────────────────────────────────────────────────────

function ShortlistSection({ onViewCandidate }: { onViewCandidate: (c: Candidate) => void }) {
  const shortlisted = candidates.filter((c) => c.status === "shortlisted" || c.status === "interview" || c.status === "selected");
  const stages = ["Shortlisted", "Interview", "Selected", "Rejected"];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-white/90 mb-1">Shortlist</h2>
        <p className="text-xs text-white/35">Candidates you have moved forward in the recruitment process.</p>
      </div>
      <div className="flex items-center gap-3 mb-2">
        {stages.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs ${
              s === "Shortlisted" ? "bg-violet-500/10 border-violet-500/22 text-violet-200/80" : "bg-white/4 border-white/8 text-white/28"
            }`}>
              {s === "Shortlisted" ? <Star className="w-3 h-3" /> : s === "Interview" ? <CalendarCheck className="w-3 h-3" /> : s === "Selected" ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
              {s}
            </div>
            {i < stages.length - 1 && <ChevronRight className="w-3 h-3 text-white/15" />}
          </div>
        ))}
      </div>
      <CardWrap className="divide-y divide-white/5">
        {shortlisted.map((c) => (
          <div key={c.id} className="px-5 py-4 flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center shrink-0">
              <UserRound className="w-4 h-4 text-white/30" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-medium text-white/75">{c.code}</p>
                <StatusBadge status={c.status} />
              </div>
              <p className="text-xs text-white/28">{c.role} · {c.match}% match</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <select className="px-2 py-1 bg-white/4 border border-white/8 rounded-lg text-xs text-white/45 focus:outline-none focus:border-violet-500/30 cursor-pointer appearance-none">
                {stages.map((s) => <option key={s}>{s}</option>)}
              </select>
              <button onClick={() => onViewCandidate(c)} className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/4 text-xs text-white/40 hover:text-white/80 transition-all cursor-pointer">View</button>
            </div>
          </div>
        ))}
      </CardWrap>
    </div>
  );
}

// ─── Interviews Section ───────────────────────────────────────────────────────

function InterviewsSection() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-white/90 mb-1">Interviews</h2>
        <p className="text-xs text-white/35">Scheduled and pending interviews.</p>
      </div>
      <CardWrap className="divide-y divide-white/5">
        {interviews.map((iv, i) => (
          <div key={i} className="px-5 py-5 flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/18 flex items-center justify-center shrink-0">
              <CalendarCheck className="w-4 h-4 text-violet-300/60" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white/80 leading-none mb-1">{iv.candidateCode}</p>
              <p className="text-xs text-white/32 mb-1">{iv.role} · {iv.stage}</p>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-white/22" />
                <span className="text-xs text-white/35">{iv.date}</span>
                <StatusBadge status={iv.status} />
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/4 text-xs text-white/40 hover:text-white/80 transition-all cursor-pointer shrink-0">
              View
            </button>
          </div>
        ))}
      </CardWrap>
    </div>
  );
}

// ─── Skill Demand Section ─────────────────────────────────────────────────────

function SkillDemandSection() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-white/90 mb-1">Skill Demand</h2>
        <p className="text-xs text-white/35">Skills most frequently required across your opportunities.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <CardWrap className="p-5">
          <SectionLabel>Most Requested Skills</SectionLabel>
          <div className="space-y-4">
            {skillDemand.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-white/65">{s.name}</span>
                  <span className="text-sm font-semibold text-white/50">{s.pct}%</span>
                </div>
                <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-violet-500/50" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardWrap>
        <CardWrap className="p-5">
          <SectionLabel>Candidate Availability</SectionLabel>
          <div className="space-y-4">
            {[
              { name: "Python", available: 284 },
              { name: "Machine Learning", available: 141 },
              { name: "SQL", available: 312 },
              { name: "PyTorch", available: 89 },
              { name: "Docker", available: 95 },
              { name: "Node.js", available: 178 },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                <span className="text-sm text-white/55">{s.name}</span>
                <span className="text-xs text-white/35">{s.available} matched students</span>
              </div>
            ))}
          </div>
        </CardWrap>
      </div>
    </div>
  );
}

// ─── AI Recruiting Home ───────────────────────────────────────────────────────

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const quickActions = [
  { icon: <Search className="w-4 h-4" />,   label: "Find Candidates",      prompt: "Find the strongest candidates for my AI/ML internship role." },
  { icon: <Sparkles className="w-4 h-4" />, label: "Top Matches",          prompt: "Show me the top matched candidates across all my active opportunities." },
  { icon: <Briefcase className="w-4 h-4" />,label: "Post Opportunity",     prompt: "Help me create a new job posting and extract the required skills." },
  { icon: <BadgeCheck className="w-4 h-4" />,label: "Skill Analysis",      prompt: "Analyse the skill gaps across my current shortlisted candidates." },
  { icon: <Users className="w-4 h-4" />,    label: "Compare Candidates",   prompt: "Compare the top three candidates for my Backend Engineering role." },
  { icon: <TrendingUp className="w-4 h-4" />,label: "Hiring Insights",     prompt: "Give me insights on my hiring pipeline and where candidates are dropping off." },
];

function AiRecruitingSection({ onPostOpportunity }: { onPostOpportunity: () => void }) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "48px";
    el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
  }, []);

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.style.height = "48px";
  }, []);

  return (
    <div
      className="w-full h-full bg-cover bg-center flex flex-col items-center overflow-hidden"
      style={{ backgroundImage: "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon_2.png')" }}
    >
      {/* Centered heading */}
      <div className="flex-1 w-full flex flex-col items-center justify-center min-h-0">
        <div className="text-center pb-8">
          <h1 className="text-4xl font-semibold drop-shadow-sm shimmer-text">
            {getGreeting()}, NovaTech.
          </h1>
          <p className="mt-2 text-neutral-300/70 text-base">Find the right skills, not just the right resumes.</p>
        </div>
      </div>

      {/* Bottom: input + quick actions */}
      <div className="w-full max-w-[52rem] px-4 pb-[26vh] shrink-0">
        <div className="relative bg-black/50 backdrop-blur-md rounded-xl border border-white/10 h-[100px] flex flex-col justify-between">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => { setMessage(e.target.value); adjustHeight(); }}
            placeholder="Ask KickSkill about your candidates or opportunities..."
            className="w-full flex-1 px-4 pt-3 resize-none border-none bg-transparent text-white text-sm focus:outline-none placeholder:text-neutral-400"
            style={{ overflow: "hidden", height: "100%" }}
          />
          <div className="flex items-center justify-between px-3 pb-2">
            <input ref={fileInputRef} type="file" className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-md text-white cursor-pointer group"
            >
              <Paperclip className="w-4 h-4 transition-transform duration-200 group-hover:rotate-[-20deg]" />
            </button>
            <button
              disabled={!message.trim()}
              className={`p-2 rounded-lg text-white disabled:cursor-not-allowed cursor-pointer group transition-colors duration-200 ${
                message.trim() ? "bg-violet-600 hover:bg-violet-500" : "bg-neutral-700 text-neutral-400"
              }`}
            >
              <ArrowUpIcon className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {quickActions.map((a) => (
            <button
              key={a.label}
              onClick={() => setMessage(a.prompt)}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/10 bg-black/50 text-white hover:bg-black/70 hover:border-white/20 transition-colors cursor-pointer"
            >
              {a.icon}
              <span className="text-xs">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Company Profile Section ──────────────────────────────────────────────────

function CompanyProfileSection() {
  const [editing, setEditing] = useState(false);
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white/90 mb-1">Company Profile</h2>
          <p className="text-xs text-white/35">Visible to matched students based on their privacy settings.</p>
        </div>
        {!editing && (
          <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/4 text-xs text-white/40 hover:text-white/80 transition-all cursor-pointer">
            Edit Profile
          </button>
        )}
      </div>
      <CardWrap className="p-5">
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600/25 to-indigo-700/25 border border-white/10 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white/45" />
          </div>
          <div>
            <p className="text-base font-semibold text-white/90">NovaTech AI</p>
            <p className="text-xs text-white/38 mt-0.5">Technology / AI · 51–200 employees</p>
          </div>
        </div>
        {[
          { label: "Website", value: "novatech.ai" },
          { label: "Headquarters", value: "Bangalore, India" },
          { label: "Founded", value: "2019" },
          { label: "Industry", value: "Technology / AI" },
          { label: "About", value: "Building AI-powered infrastructure tools for the next generation of developers." },
        ].map((row) => (
          <div key={row.label} className="flex items-start justify-between py-3 border-b border-white/5 last:border-0">
            <span className="text-xs text-white/28 w-28 shrink-0">{row.label}</span>
            {editing ? (
              <input defaultValue={row.value} className="flex-1 bg-white/4 border border-white/8 rounded-lg px-2 py-1 text-xs text-white/65 focus:outline-none focus:border-violet-500/35 transition-all" />
            ) : (
              <span className="flex-1 text-xs text-white/60 text-right">{row.value}</span>
            )}
          </div>
        ))}
        {editing && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-white/6 justify-end">
            <button onClick={() => setEditing(false)} className="px-4 py-1.5 rounded-xl text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer">Cancel</button>
            <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-violet-600/18 border border-violet-500/25 text-violet-200 text-xs font-medium hover:bg-violet-600/28 transition-all cursor-pointer">
              <CheckCircle2 className="w-3 h-3" /> Save Changes
            </button>
          </div>
        )}
      </CardWrap>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

interface IndustryPageProps {
  onSwitchWorkspace: () => void;
  onSignOut: () => void;
}

export default function IndustryPage({ onSwitchWorkspace, onSignOut }: IndustryPageProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<IndustrySection>("ai-recruiting");
  const [showPostOpportunity, setShowPostOpportunity] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const isHome = activeSection === "ai-recruiting";

  function renderSection() {
    switch (activeSection) {
      case "dashboard":       return <DashboardSection onSection={setActiveSection} onPostOpportunity={() => setShowPostOpportunity(true)} onViewCandidate={setSelectedCandidate} />;
      case "opportunities":   return <OpportunitiesSection onPostOpportunity={() => setShowPostOpportunity(true)} />;
      case "candidates":      return <CandidatesSection onViewCandidate={setSelectedCandidate} />;
      case "shortlist":       return <ShortlistSection onViewCandidate={setSelectedCandidate} />;
      case "interviews":      return <InterviewsSection />;
      case "skill-demand":    return <SkillDemandSection />;
      case "company-profile": return <CompanyProfileSection />;
      default:                return null;
    }
  }

  return (
    <div className="w-full h-full bg-black text-white overflow-hidden flex">
      <IndustrySidebar
        expanded={sidebarExpanded}
        onExpandChange={setSidebarExpanded}
        activeSection={activeSection}
        onSection={setActiveSection}
        onSwitchWorkspace={onSwitchWorkspace}
        onSignOut={onSignOut}
      />

      <div className={`relative flex-1 h-full transition-all duration-300 ease-in-out ${sidebarExpanded ? "ml-[220px]" : "ml-16"}`}>
        {isHome ? (
          <AiRecruitingSection onPostOpportunity={() => setShowPostOpportunity(true)} />
        ) : (
          <div className="h-full overflow-y-auto overflow-x-hidden">
            <div className="max-w-[1100px] mx-auto px-6 py-8">
              {renderSection()}
              <div className="h-12" />
            </div>
          </div>
        )}
      </div>

      {showPostOpportunity && <PostOpportunityDrawer onClose={() => setShowPostOpportunity(false)} />}
      {selectedCandidate && <CandidateDetailDrawer candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />}
    </div>
  );
}
