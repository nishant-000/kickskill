import { useState, useMemo } from "react";
import {
  Briefcase,
  Clock,
  CalendarDays,
  CheckCircle2,
  Circle,
  X,
  ChevronRight,
  Bot,
  BadgeCheck,
  AlertTriangle,
  Zap,
  TrendingUp,
  Search,
  BookOpen,
  Settings,
  BarChart3,
  FileText,
  MapPin,
  IndianRupee,
  Target,
  Activity,
  Send,
  Eye,
  UserCheck,
  Award,
  BrainCircuit,
  ArrowRight,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import type { Page } from "../App";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import { List, XCircle } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

// ─── Types ────────────────────────────────────────────────────────────────────

type AppStatus =
  | "submitted"
  | "resume_viewed"
  | "shortlisted"
  | "interview"
  | "offer"
  | "rejected";

type AppTab = "all" | "progress" | "interview" | "offer" | "rejected";

const appTabNavItems = [
  { name: "All", icon: List },
  { name: "In Progress", icon: Clock },
  { name: "Interviews", icon: CalendarDays },
  { name: "Offers", icon: CheckCircle2 },
  { name: "Rejected", icon: XCircle },
];
const appTabNameToId: Record<string, AppTab> = {
  "All": "all", "In Progress": "progress", "Interviews": "interview", "Offers": "offer", "Rejected": "rejected",
};
const appTabIdToName: Record<AppTab, string> = {
  "all": "All", "progress": "In Progress", "interview": "Interviews", "offer": "Offers", "rejected": "Rejected",
};

const officeImages = [
  "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=900&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1579487785973-74d2ca7abdd5?w=900&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?w=900&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1575318634028-6a0cfcb60c59?w=900&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1498409785966-ab341407de6e?w=900&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1700809887584-0798672b1d48?w=900&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1496664444929-8c75efb9546f?w=900&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1572521165329-b197f9ea3da6?w=900&h=300&fit=crop&auto=format",
];

interface Application {
  id: number;
  role: string;
  company: string;
  companyInitial: string;
  accentColor: string;
  date: string;
  match: number;
  status: AppStatus;
  rejectedAt?: AppStatus;
  location: string;
  stipend: string;
  jobType: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PIPELINE: { key: AppStatus; label: string }[] = [
  { key: "submitted", label: "Applied" },
  { key: "resume_viewed", label: "Resume Viewed" },
  { key: "shortlisted", label: "Shortlisted" },
  { key: "interview", label: "Interview" },
  { key: "offer", label: "Offer" },
];

const STATUS_FULL: Record<AppStatus, string> = {
  submitted: "Application Submitted",
  resume_viewed: "Resume Viewed",
  shortlisted: "Shortlisted",
  interview: "Interview Scheduled",
  offer: "Offer Received",
  rejected: "Rejected",
};

const apps: Application[] = [
  // In Progress
  { id: 1, role: "AI/ML Intern", company: "Nexus AI Labs", companyInitial: "N", accentColor: "#8b5cf6", date: "Aug 31, 2026", match: 91, status: "resume_viewed", location: "Bangalore / Remote", stipend: "₹20,000", jobType: "Internship" },
  { id: 2, role: "Backend Engineering Intern", company: "DataStream Inc", companyInitial: "D", accentColor: "#6366f1", date: "Aug 29, 2026", match: 87, status: "resume_viewed", location: "Hyderabad", stipend: "₹18,000", jobType: "Internship" },
  { id: 3, role: "Software Engineer Intern", company: "CloudEdge Systems", companyInitial: "C", accentColor: "#4f46e5", date: "Aug 27, 2026", match: 84, status: "submitted", location: "Remote", stipend: "₹16,000", jobType: "Internship" },
  { id: 4, role: "Data Science Intern", company: "Analytiq", companyInitial: "A", accentColor: "#7c3aed", date: "Aug 25, 2026", match: 88, status: "shortlisted", location: "Pune / Remote", stipend: "₹22,000", jobType: "Internship" },
  { id: 5, role: "ML Research Intern", company: "DeepWork AI", companyInitial: "D", accentColor: "#6d28d9", date: "Aug 23, 2026", match: 79, status: "submitted", location: "Remote", stipend: "₹15,000", jobType: "Internship" },
  { id: 6, role: "Python Developer Intern", company: "StackBuilder", companyInitial: "S", accentColor: "#5b21b6", date: "Aug 21, 2026", match: 82, status: "submitted", location: "Chennai", stipend: "₹17,000", jobType: "Internship" },
  { id: 7, role: "Full Stack Intern", company: "TechCraft", companyInitial: "T", accentColor: "#4c1d95", date: "Aug 19, 2026", match: 77, status: "submitted", location: "Bangalore", stipend: "₹15,000", jobType: "Internship" },
  { id: 8, role: "AI Engineer Intern", company: "RoboSystems", companyInitial: "R", accentColor: "#8b5cf6", date: "Aug 17, 2026", match: 86, status: "resume_viewed", location: "Hyderabad / Remote", stipend: "₹20,000", jobType: "Internship" },
  // Interviews
  { id: 9, role: "Software Engineer Intern", company: "PivotLabs", companyInitial: "P", accentColor: "#3b82f6", date: "Aug 15, 2026", match: 93, status: "interview", location: "Bangalore", stipend: "₹25,000", jobType: "Internship" },
  { id: 10, role: "Backend Intern", company: "SystemCore", companyInitial: "S", accentColor: "#2563eb", date: "Aug 12, 2026", match: 89, status: "interview", location: "Remote", stipend: "₹20,000", jobType: "Internship" },
  { id: 11, role: "Data Analyst Intern", company: "Insightful", companyInitial: "I", accentColor: "#1d4ed8", date: "Aug 10, 2026", match: 85, status: "interview", location: "Mumbai", stipend: "₹18,000", jobType: "Internship" },
  { id: 12, role: "ML Engineer", company: "OpenPattern", companyInitial: "O", accentColor: "#1e40af", date: "Aug 8, 2026", match: 91, status: "interview", location: "Bangalore / Remote", stipend: "₹30,000", jobType: "Full-time" },
  // Offers
  { id: 13, role: "AI/ML Intern", company: "TechVenture Labs", companyInitial: "T", accentColor: "#10b981", date: "Aug 5, 2026", match: 94, status: "offer", location: "Bangalore", stipend: "₹25,000", jobType: "Internship" },
  { id: 14, role: "Software Engineer", company: "InnovateTech", companyInitial: "I", accentColor: "#059669", date: "Aug 2, 2026", match: 88, status: "offer", location: "Remote", stipend: "₹28,000", jobType: "Full-time" },
  // Rejected
  { id: 15, role: "DevOps Intern", company: "CloudNative", companyInitial: "C", accentColor: "#64748b", date: "Jul 30, 2026", match: 62, status: "rejected", rejectedAt: "resume_viewed", location: "Bangalore", stipend: "₹14,000", jobType: "Internship" },
  { id: 16, role: "Backend Developer", company: "NodeForge", companyInitial: "N", accentColor: "#475569", date: "Jul 28, 2026", match: 71, status: "rejected", rejectedAt: "shortlisted", location: "Remote", stipend: "₹16,000", jobType: "Internship" },
  { id: 17, role: "Data Engineer Intern", company: "PipelineIO", companyInitial: "P", accentColor: "#64748b", date: "Jul 25, 2026", match: 68, status: "rejected", rejectedAt: "submitted", location: "Hyderabad", stipend: "₹16,000", jobType: "Internship" },
  { id: 18, role: "Cloud Intern", company: "SkyOps", companyInitial: "S", accentColor: "#475569", date: "Jul 22, 2026", match: 55, status: "rejected", rejectedAt: "resume_viewed", location: "Pune", stipend: "₹15,000", jobType: "Internship" },
  { id: 19, role: "Full Stack Intern", company: "WebFoundry", companyInitial: "W", accentColor: "#64748b", date: "Jul 18, 2026", match: 74, status: "rejected", rejectedAt: "shortlisted", location: "Delhi", stipend: "₹17,000", jobType: "Internship" },
  { id: 20, role: "ML Ops Intern", company: "Kaizen AI", companyInitial: "K", accentColor: "#475569", date: "Jul 15, 2026", match: 61, status: "rejected", rejectedAt: "submitted", location: "Remote", stipend: "₹15,000", jobType: "Internship" },
  { id: 21, role: "React Developer", company: "UIForge", companyInitial: "U", accentColor: "#64748b", date: "Jul 12, 2026", match: 69, status: "rejected", rejectedAt: "resume_viewed", location: "Bangalore", stipend: "₹16,000", jobType: "Internship" },
  { id: 22, role: "Python Intern", company: "ScriptWorks", companyInitial: "S", accentColor: "#475569", date: "Jul 9, 2026", match: 72, status: "rejected", rejectedAt: "shortlisted", location: "Chennai", stipend: "₹14,000", jobType: "Internship" },
  { id: 23, role: "NLP Engineer Intern", company: "LinguaLabs", companyInitial: "L", accentColor: "#64748b", date: "Jul 6, 2026", match: 58, status: "rejected", rejectedAt: "submitted", location: "Remote", stipend: "₹18,000", jobType: "Internship" },
  { id: 24, role: "AI Research Intern", company: "ThinkFrame", companyInitial: "T", accentColor: "#475569", date: "Jul 2, 2026", match: 65, status: "rejected", rejectedAt: "resume_viewed", location: "Hyderabad", stipend: "₹16,000", jobType: "Internship" },
];

const agentLog = [
  { time: "10:42", icon: <Search className="w-3.5 h-3.5" />, action: "Found opportunity matching your criteria" },
  { time: "10:43", icon: <BrainCircuit className="w-3.5 h-3.5" />, action: "Analyzed job requirements and skill match" },
  { time: "10:43", icon: <BadgeCheck className="w-3.5 h-3.5" />, action: "Compared against your Skill Passport" },
  { time: "10:44", icon: <BarChart3 className="w-3.5 h-3.5" />, action: "Match score calculated: 91%" },
  { time: "10:45", icon: <FileText className="w-3.5 h-3.5" />, action: "Resume tailored to role requirements" },
  { time: "10:46", icon: <FileText className="w-3.5 h-3.5" />, action: "Cover letter generated and reviewed" },
  { time: "10:46", icon: <Send className="w-3.5 h-3.5" />, action: "Application submitted via company portal" },
];

const matchingSkills = [
  { name: "Python", yours: 86, required: 70 },
  { name: "Machine Learning", yours: 74, required: 70 },
  { name: "SQL", yours: 81, required: 60 },
  { name: "FastAPI", yours: 58, required: 50 },
  { name: "NumPy", yours: 77, required: 65 },
];

const gapSkills = [
  { name: "PyTorch", yours: 42, required: 70 },
  { name: "Docker", yours: 35, required: 60 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pipelineIdx(status: AppStatus): number {
  const keys = PIPELINE.map((p) => p.key);
  return keys.indexOf(status);
}

function getTabFilter(tab: AppTab): (a: Application) => boolean {
  if (tab === "all") return () => true;
  if (tab === "progress") return (a) => ["submitted", "resume_viewed", "shortlisted"].includes(a.status);
  if (tab === "interview") return (a) => a.status === "interview";
  if (tab === "offer") return (a) => a.status === "offer";
  if (tab === "rejected") return (a) => a.status === "rejected";
  return () => true;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CardWrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/[0.03] border border-white/8 rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-3">
      {children}
    </p>
  );
}

function MatchBadge({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-white/40 tabular-nums">
      <Activity className="w-2.5 h-2.5" />
      {value}% Match
    </span>
  );
}

function StatusPill({ status }: { status: AppStatus }) {
  const styles: Record<AppStatus, { bg: string; text: string; border: string }> = {
    submitted:     { text: "text-white/35" },
    resume_viewed: { text: "text-white/45" },
    shortlisted:   { text: "text-white/55" },
    interview:     { text: "text-white/55" },
    offer:         { text: "text-white/60" },
    rejected:      { text: "text-white/25" },
  };
  const s = styles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${s.text}`}>
      {STATUS_FULL[status]}
    </span>
  );
}

function StatusTimeline({ status, rejected = false }: { status: AppStatus; rejected?: boolean }) {
  const currentIdx = rejected ? pipelineIdx(status) : pipelineIdx(status);
  return (
    <div className="flex items-center gap-0 mt-3">
      {PIPELINE.map((step, i) => {
        const isDone = !rejected && i < currentIdx;
        const isCurrent = !rejected && i === currentIdx;
        const isRejectedHere = rejected && i === currentIdx;
        const isFuture = (!rejected && i > currentIdx) || (rejected && i > currentIdx);
        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-2 h-2 rounded-full transition-all ${
                  isRejectedHere
                    ? "bg-white/20 ring-1 ring-white/15"
                    : isCurrent
                    ? "bg-violet-400 ring-2 ring-violet-400/30"
                    : isDone
                    ? "bg-violet-600/60"
                    : "bg-white/10"
                }`}
              />
              <span
                className={`text-[8.5px] whitespace-nowrap ${
                  isCurrent
                    ? "text-violet-300 font-medium"
                    : isDone
                    ? "text-white/30"
                    : isFuture
                    ? "text-white/12"
                    : "text-white/18"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < PIPELINE.length - 1 && (
              <div
                className={`h-px w-8 sm:w-10 mb-3.5 ${
                  i < currentIdx && !rejected ? "bg-violet-600/40" : "bg-white/6"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ApplicationCard({ app, onView }: { app: Application; onView: (a: Application) => void }) {
  return (
    <CardWrap className="overflow-hidden hover:bg-white/[0.045] transition-colors group">
      {/* Office banner */}
      <div className="w-full h-32 overflow-hidden">
        <img
          src={officeImages[(app.id - 1) % officeImages.length]}
          alt={app.company}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
        />
      </div>

      <div className="p-5">
        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="text-sm font-semibold text-white/90 leading-none mb-1">{app.role}</h3>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <span>{app.company}</span>
                <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                <span>{app.jobType}</span>
                <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                <span>{app.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
            </div>
          </div>

          <StatusTimeline status={app.status === "rejected" ? (app.rejectedAt ?? "submitted") : app.status} rejected={app.status === "rejected"} />

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
            <div className="flex items-center gap-3 text-[11px] text-white/28">
              <span className="flex items-center gap-1">
                <CalendarDays className="w-3 h-3" />
                Applied {app.date}
              </span>
              <span className="flex items-center gap-1">
                <Bot className="w-3 h-3" />
                KickSkill Agent
              </span>
              <span className="flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                {app.stipend.replace("₹", "")} / mo
              </span>
            </div>
            <button
              onClick={() => onView(app)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/4 border border-white/8 text-xs text-white/45 hover:text-white/80 hover:bg-white/8 hover:border-white/15 transition-all cursor-pointer group-hover:border-white/12"
            >
              View Application
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </CardWrap>
  );
}

// ─── Application Detail Drawer ────────────────────────────────────────────────

function DetailDrawer({ app, onClose, onNavigate }: { app: Application; onClose: () => void; onNavigate: (p: Page) => void }) {
  const [drawerTab, setDrawerTab] = useState<"overview" | "match" | "agent">("overview");

  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      {/* Backdrop */}
      <div className="flex-1 bg-black/50 backdrop-blur-sm" />
      {/* Drawer */}
      <div
        className="relative w-full max-w-[500px] h-full bg-black/80 border-l border-white/8 overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/80 border-b border-white/6 px-6 py-4 flex items-start gap-4">
          <div
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
            style={{ background: `${app.accentColor}20`, border: `1px solid ${app.accentColor}30` }}
          >
            {app.companyInitial}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-white/92 leading-none mb-0.5">{app.role}</h2>
            <p className="text-xs text-white/40">{app.company} · {app.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/6 transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current status */}
        <div className="px-6 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-white/28 flex items-center gap-1"><CalendarDays className="w-3 h-3" /> Applied {app.date}</span>
          </div>
          {/* Vertical pipeline */}
          <div className="space-y-0">
            {PIPELINE.map((step, i) => {
              const current = app.status === "rejected"
                ? pipelineIdx(app.rejectedAt ?? "submitted")
                : pipelineIdx(app.status);
              const isDone = app.status !== "rejected" && i < current;
              const isCurrent = app.status !== "rejected" && i === current;
              const isRejectedAt = app.status === "rejected" && i === current;
              const isFuture = (!isCurrent && !isDone && !isRejectedAt);
              return (
                <div key={step.key} className="flex gap-3 items-stretch">
                  <div className="flex flex-col items-center w-5 shrink-0">
                    <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${isCurrent ? "bg-violet-400 ring-2 ring-violet-400/30" : isDone ? "bg-violet-600/60" : isRejectedAt ? "bg-white/20" : "bg-white/8"}`} />
                    {i < PIPELINE.length - 1 && <div className="w-px flex-1 mt-1 mb-0.5 bg-white/6" />}
                  </div>
                  <div className={`pb-3 text-xs font-medium ${isCurrent ? "text-violet-300" : isDone ? "text-white/35" : "text-white/15"}`}>
                    {step.label}
                    {isCurrent && <span className="ml-2 text-[10px] text-violet-400/60">· Current stage</span>}
                    {isDone && <span className="ml-2 text-[10px] text-white/20">· Completed</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Drawer tabs */}
        <div className="flex gap-0 border-b border-white/6 px-6">
          {([["overview", "Overview"], ["match", "Match Analysis"], ["agent", "Agent Log"]] as const).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setDrawerTab(id)}
              className={`px-3 py-2.5 text-xs font-medium border-b-2 -mb-px transition-all cursor-pointer ${
                drawerTab === id
                  ? "border-violet-500 text-white/90"
                  : "border-transparent text-white/35 hover:text-white/65"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Drawer content */}
        <div className="p-6 flex-1">
          {drawerTab === "overview" && (
            <div className="space-y-5">
              {/* Job requirements */}
              <div>
                <SectionLabel>Job Requirements</SectionLabel>
                <div className="flex flex-wrap gap-1.5">
                  {["Python", "Machine Learning", "SQL", "FastAPI", "NumPy", "PyTorch", "Docker", "Git"].map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-[11px] text-white/50">{s}</span>
                  ))}
                </div>
              </div>

              {/* Resume used */}
              <div>
                <SectionLabel>Resume Used</SectionLabel>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.025] border border-white/6">
                  <FileText className="w-3.5 h-3.5 text-violet-400/70 shrink-0" />
                  <span className="text-xs text-white/55">Resume_v4_AI_ML_Focus.pdf</span>
                  <span className="ml-auto text-[10px] text-violet-300/60 font-medium">Tailored by Agent</span>
                </div>
              </div>

              {/* Cover letter */}
              <div>
                <SectionLabel>Cover Letter</SectionLabel>
                <div className="px-3 py-2.5 rounded-xl bg-white/[0.025] border border-white/6">
                  <p className="text-xs text-white/40 leading-relaxed line-clamp-3">
                    "I am a third-year B.Tech student at IIIT Tiruchirappalli specialising in Computer Science, with a strong background in Python-based ML pipelines and real-world deployment experience. My work on the AI Resume Analyzer project..."
                  </p>
                  <p className="text-[10px] text-violet-400/50 mt-2">Generated and tailored by KickSkill Agent</p>
                </div>
              </div>

              {/* Application timeline */}
              <div>
                <SectionLabel>Application Timeline</SectionLabel>
                <div className="space-y-2.5">
                  {[
                    { date: app.date, event: "Application submitted by KickSkill Agent" },
                    ...(["resume_viewed", "shortlisted", "interview", "offer"].includes(app.status) ? [{ date: "Next day", event: "Resume viewed by recruiter" }] : []),
                    ...(["shortlisted", "interview", "offer"].includes(app.status) ? [{ date: "+3 days", event: "Shortlisted for next round" }] : []),
                    ...(["interview", "offer"].includes(app.status) ? [{ date: "+5 days", event: "Interview invitation received" }] : []),
                    ...(app.status === "offer" ? [{ date: "+14 days", event: "Offer letter received" }] : []),
                  ].map((ev, i) => (
                    <div key={i} className="flex gap-3 text-xs">
                      <span className="text-white/25 font-mono shrink-0 w-16">{ev.date}</span>
                      <span className="text-white/50">{ev.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {drawerTab === "match" && (
            <div className="space-y-6">
              {/* Why you match */}
              <div>
                <SectionLabel>Why You Match</SectionLabel>
                <div className="space-y-3">
                  {matchingSkills.map((s) => (
                    <div key={s.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white/70">{s.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-white/30">Required: {s.required}%</span>
                          <span className="text-xs font-semibold text-violet-300 tabular-nums">{s.yours}%</span>
                        </div>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                        <div className="h-full rounded-full bg-violet-500/70 relative" style={{ width: `${s.yours}%` }}>
                          <div className="absolute top-0 h-full w-px bg-white/40" style={{ left: `${(s.required / s.yours) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why not a perfect match */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <SectionLabel>Skill Gaps</SectionLabel>
                  <AlertTriangle className="w-3 h-3 text-white/20 -mt-3" />
                </div>
                <div className="space-y-3">
                  {gapSkills.map((s) => (
                    <div key={s.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white/50">{s.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-white/25">Required: {s.required}%</span>
                          <span className="text-xs font-semibold text-white/35 tabular-nums">{s.yours}%</span>
                        </div>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                        <div className="h-full rounded-full bg-white/20" style={{ width: `${s.yours}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => { onClose(); onNavigate("learning"); }}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-violet-600/14 border border-violet-500/20 text-violet-200 text-xs font-medium hover:bg-violet-600/22 transition-all cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Improve Skill Gaps
                </button>
              </div>
            </div>
          )}

          {drawerTab === "agent" && (
            <div className="space-y-4">
              <SectionLabel>KickSkill Agent Activity</SectionLabel>
              <div className="space-y-0">
                {agentLog.map((entry, i) => (
                  <div key={i} className="flex gap-3 items-stretch">
                    <div className="flex flex-col items-center w-6 shrink-0">
                      <div className="w-5 h-5 rounded-full bg-violet-500/12 border border-violet-500/18 flex items-center justify-center shrink-0 text-violet-400/70">
                        {entry.icon}
                      </div>
                      {i < agentLog.length - 1 && <div className="w-px flex-1 mt-1 mb-1 bg-white/5" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-xs text-white/60 leading-none mb-0.5">{entry.action}</p>
                      <p className="text-[10px] text-white/22 font-mono">{entry.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Safety note */}
              <div className="flex gap-2 p-3 rounded-xl bg-white/[0.025] border border-white/6">
                <ShieldAlert className="w-3.5 h-3.5 text-white/25 shrink-0 mt-0.5" />
                <p className="text-[10px] text-white/30 leading-relaxed">
                  All agent actions are recorded here. KickSkill never falsifies credentials, modifies verified skills, or accepts offers on your behalf. Offer acceptance requires your explicit approval.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

interface ApplicationsPageProps {
  onNavigate: (p: Page) => void;
}

export default function ApplicationsPage({ onNavigate }: ApplicationsPageProps) {
  const [activeTab, setActiveTab] = useState<AppTab>("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const filteredApps = useMemo(
    () => apps.filter(getTabFilter(activeTab)),
    [activeTab]
  );

  const stats = {
    total: apps.length,
    progress: apps.filter(getTabFilter("progress")).length,
    interview: apps.filter(getTabFilter("interview")).length,
    offer: apps.filter(getTabFilter("offer")).length,
    rejected: apps.filter(getTabFilter("rejected")).length,
  };

  const tabDefs: { id: AppTab; label: string; count: number }[] = [
    { id: "all", label: "All", count: stats.total },
    { id: "progress", label: "In Progress", count: stats.progress },
    { id: "interview", label: "Interviews", count: stats.interview },
    { id: "offer", label: "Offers", count: stats.offer },
    { id: "rejected", label: "Rejected", count: stats.rejected },
  ];

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden bg-black [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="max-w-[1100px] mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white/92 mb-1">Applications</h1>
            <p className="text-sm text-white/38">Track every opportunity, application and outcome in one place.</p>
          </div>
          <div className="flex items-center gap-2 ml-4 shrink-0">
            <InteractiveHoverButton
              text="Opportunities"
              onClick={() => onNavigate("opportunities")}
              className="w-36 text-xs text-white/70 border-white/10"
            />
            <InteractiveHoverButton
              text="Ask KickSkill"
              className="w-36 text-xs text-white/70 border-violet-500/30"
            />
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {[
            { label: "Total", value: stats.total, icon: <Briefcase className="w-3.5 h-3.5" />, accent: "text-white/55" },
            { label: "In Progress", value: stats.progress, icon: <Clock className="w-3.5 h-3.5" />, accent: "text-violet-300" },
            { label: "Interviews", value: stats.interview, icon: <CalendarDays className="w-3.5 h-3.5" />, accent: "text-violet-300" },
            { label: "Offers", value: stats.offer, icon: <CheckCircle2 className="w-3.5 h-3.5" />, accent: "text-violet-200" },
            { label: "Rejected", value: stats.rejected, icon: <Circle className="w-3.5 h-3.5" />, accent: "text-white/30" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.025] border border-white/7">
              <span className={s.accent}>{s.icon}</span>
              <div>
                <p className={`text-lg font-bold tabular-nums leading-none ${s.accent}`}>{s.value}</p>
                <p className="text-[10px] text-white/28 mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>


        {/* Main content grid */}
        <div>
          {/* Tabs */}
          <div className="mb-8">
            <AnimeNavBar
              items={appTabNavItems}
              activeTab={appTabIdToName[activeTab]}
              onTabChange={(name) => setActiveTab(appTabNameToId[name])}
            />
          </div>

          {/* Cards */}
          <div className="space-y-3">
            {filteredApps.map((app) => (
              <ApplicationCard key={app.id} app={app} onView={setSelectedApp} />
            ))}
            {filteredApps.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-sm text-white/25">No applications in this category.</p>
              </div>
            )}
          </div>
        </div>

        <div className="h-12" />
      </div>

      {/* Application detail drawer */}
      {selectedApp && (
        <DetailDrawer app={selectedApp} onClose={() => setSelectedApp(null)} onNavigate={onNavigate} />
      )}
    </div>
  );
}
