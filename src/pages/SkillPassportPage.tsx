import { useState } from "react";
import {
  BadgeCheck,
  Share2,
  Pencil,
  X,
  ShieldCheck,
  Code2,
  Award,
  Briefcase,
  BrainCircuit,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Target,
  BookOpen,
  FolderKanban,
  TrendingUp,
  GraduationCap,
  Trophy,
  GitMerge,
  Users,
  Zap,
} from "lucide-react";
import type { Page } from "../App";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import { CreepyButton } from "@/components/ui/creepy-button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { UserRound, FolderKanban as FolderKanbanIcon, Award as AwardIcon, Trophy as TrophyIcon } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}
import { AdmitOneTicket, PASSPORT_LAYOUT, PASSPORT_TEXTURE } from "../components/ui/admit-one-ticket";

type PassportTab = "overview" | "projects" | "certifications" | "experience" | "achievements";

const tabDefs: { id: PassportTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
];

const passportNavItems = [
  { name: "Overview", icon: UserRound },
  { name: "Projects", icon: FolderKanbanIcon },
  { name: "Certifications", icon: AwardIcon },
  { name: "Experience", icon: Briefcase },
  { name: "Achievements", icon: TrophyIcon },
];
const passportNameToId: Record<string, PassportTab> = {
  "Overview": "overview", "Projects": "projects",
  "Certifications": "certifications", "Experience": "experience", "Achievements": "achievements",
};
const passportIdToName: Record<PassportTab, string> = {
  "overview": "Overview", "projects": "Projects",
  "certifications": "Certifications", "experience": "Experience", "achievements": "Achievements",
};

const verifiedSkills = [
  { name: "Python", level: 86, source: "Skill Assessment + Project", verified: true },
  { name: "Machine Learning", level: 74, source: "Skill Assessment + Certification", verified: true },
  { name: "SQL", level: 81, source: "Skill Assessment", verified: true },
  { name: "React", level: 68, source: "Project", verified: true },
  { name: "Git", level: 89, source: "Skill Assessment", verified: true },
  { name: "PyTorch", level: 42, source: "Course Progress", verified: false },
  { name: "Docker", level: 35, source: "In Progress", verified: false },
  { name: "FastAPI", level: 58, source: "Project", verified: true },
  { name: "NumPy", level: 77, source: "Skill Assessment", verified: true },
  { name: "Pandas", level: 72, source: "Skill Assessment", verified: true },
  { name: "TensorFlow", level: 48, source: "Course Progress", verified: false },
  { name: "Node.js", level: 61, source: "Project", verified: true },
];

const featuredProjects = [
  {
    id: 1,
    title: "AI Resume Analyzer",
    desc: "AI-powered resume analysis platform that scores resumes against job descriptions and suggests targeted improvements.",
    skills: ["Python", "NLP", "FastAPI", "PostgreSQL"],
    status: "Verified Project",
    verified: true,
    year: "2025",
    link: "#",
    github: "https://github.com/nishantsingh/ai-resume-analyzer",
  },
  {
    id: 2,
    title: "Campus Delivery Platform",
    desc: "Real-time delivery coordination system for a 4,000-student campus with route optimization and live tracking.",
    skills: ["React", "Node.js", "Firebase"],
    status: "Live Project",
    verified: true,
    year: "2025",
    link: "#",
    github: "https://github.com/nishantsingh/campus-delivery",
  },
  {
    id: 3,
    title: "ML Model Serving API",
    desc: "Containerized REST API for serving trained scikit-learn and PyTorch models with request batching and caching.",
    skills: ["Python", "Docker", "FastAPI", "PyTorch"],
    status: "Verified Project",
    verified: true,
    year: "2026",
    link: "#",
    github: "https://github.com/nishantsingh/ml-serving-api",
  },
];

const certifications = [
  {
    id: 1,
    title: "Machine Learning Specialization",
    org: "Coursera / DeepLearning.AI",
    year: "2025",
    skills: ["Python", "ML", "Data Science"],
    verified: true,
    image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "Python for Data Science",
    org: "IBM / Coursera",
    year: "2024",
    skills: ["Python", "Pandas", "NumPy"],
    verified: true,
    image: "https://images.unsplash.com/photo-1638636241638-aef5120c5153?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "React — The Complete Guide",
    org: "Udemy",
    year: "2024",
    skills: ["React", "JavaScript", "Node.js"],
    verified: true,
    image: "https://images.unsplash.com/photo-1755540735876-ff503cf594fe?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: 4,
    title: "SQL for Analytics",
    org: "Mode Analytics",
    year: "2024",
    skills: ["SQL", "PostgreSQL", "Data Analysis"],
    verified: true,
    image: "https://images.unsplash.com/photo-1785119774760-185873634dcb?w=600&h=360&fit=crop&auto=format",
  },
];

const experiences = [
  {
    id: 1,
    role: "AI Engineering Intern",
    org: "TechVenture Labs",
    duration: "June 2026 – August 2026",
    type: "Internship",
    skills: ["Python", "Machine Learning", "Docker"],
    desc: "Developed ML pipelines for structured data classification and contributed to an internal model-serving framework.",
    verified: true,
  },
  {
    id: 2,
    role: "Full Stack Developer",
    org: "Freelance",
    duration: "Jan 2025 – May 2025",
    type: "Freelance",
    skills: ["React", "Node.js", "Firebase"],
    desc: "Built and deployed 3 production web applications for local businesses, including the campus delivery platform.",
    verified: true,
  },
  {
    id: 3,
    role: "Research Assistant",
    org: "IIIT Tiruchirappalli — NLP Lab",
    duration: "Aug 2024 – Dec 2024",
    type: "Research",
    skills: ["Python", "NLP", "PyTorch"],
    desc: "Assisted in developing a multilingual sentiment analysis dataset and ran baseline model experiments.",
    verified: true,
  },
];

const achievements = [
  {
    id: 1,
    title: "1st Place — Smart India Hackathon",
    org: "Government of India",
    date: "2025",
    type: "Hackathon",
    icon: <Trophy className="w-4 h-4" />,
    verified: true,
  },
  {
    id: 2,
    title: "Top 50 — HackWithInfy",
    org: "Infosys",
    date: "2025",
    type: "Competition",
    icon: <Award className="w-4 h-4" />,
    verified: true,
  },
  {
    id: 3,
    title: "Open Source Contributor",
    org: "scikit-learn (GitHub)",
    date: "2025",
    type: "Open Source",
    icon: <GitMerge className="w-4 h-4" />,
    verified: false,
  },
  {
    id: 4,
    title: "Technical Head — IIIT-T Coding Club",
    org: "IIIT Tiruchirappalli",
    date: "2024 – Present",
    type: "Leadership",
    icon: <Users className="w-4 h-4" />,
    verified: true,
  },
  {
    id: 5,
    title: "Best Project Award — Annual Tech Fest",
    org: "IIIT Tiruchirappalli",
    date: "2025",
    type: "Award",
    icon: <Award className="w-4 h-4" />,
    verified: true,
  },
  {
    id: 6,
    title: "Finalist — Inter-NIT Programming League",
    org: "NIT Consortium",
    date: "2024",
    type: "Competition",
    icon: <Trophy className="w-4 h-4" />,
    verified: true,
  },
];

const passportStrength = [
  { label: "Verified Skills", value: 85, color: "#8b5cf6" },
  { label: "Projects", value: 78, color: "#6366f1" },
  { label: "Certifications", value: 72, color: "#4f46e5" },
  { label: "Experience", value: 64, color: "#3b82f6" },
];

function VerifiedBadge({ verified }: { verified: boolean }) {
  if (!verified) return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/4 border border-white/8 text-[10px] text-white/30">
      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
      In Progress
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-500/10 border border-violet-500/18 text-[10px] text-violet-300">
      <BadgeCheck className="w-3 h-3" />
      Verified
    </span>
  );
}

function SkillBar({ name, level, source, verified }: { name: string; level: number; source: string; verified: boolean }) {
  const barColor = verified ? "#8b5cf6" : "rgba(255,255,255,0.15)";
  return (
    <div className="group flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
      <div className="w-32 shrink-0">
        <p className="text-sm font-medium text-white/80">{name}</p>
        <p className="text-[10px] text-white/28 mt-0.5">{source}</p>
      </div>
      <div className="flex-1 min-w-0">
        <div className="h-1.5 w-full rounded-full bg-white/6 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${level}%`, background: barColor }}
          />
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-sm font-semibold tabular-nums" style={{ color: verified ? "#a78bfa" : "rgba(255,255,255,0.3)" }}>
          {level}%
        </span>
        {verified && <BadgeCheck className="w-3.5 h-3.5 text-violet-400/70" />}
      </div>
    </div>
  );
}

function SkillTag({ label }: { label: string }) {
  return (
    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-[10px] text-white/45">
      {label}
    </span>
  );
}

function CardWrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/[0.03] border border-white/8 rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-semibold text-white/90 mb-4">{children}</h2>
  );
}

// SVG arc readiness ring
function ReadinessRing({ value }: { value: number }) {
  const r = 36;
  const cx = 44;
  const cy = 44;
  const circumference = 2 * Math.PI * r;
  const dash = (value / 100) * circumference;
  return (
    <div className="relative w-[88px] h-[88px] shrink-0">
      <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
        <circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke="url(#readiness-grad)" strokeWidth="5"
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="readiness-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-white/90">{value}%</span>
      </div>
    </div>
  );
}

function OverviewTab({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="space-y-8">

      {/* Verified Skills */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <SectionLabel>Verified Skills</SectionLabel>
          <button
            onClick={() => onNavigate("skills")}
            className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
          >
            View All Skills <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <CardWrap className="px-5 divide-y divide-white/5">
          {verifiedSkills.slice(0, 6).map((s) => (
            <SkillBar key={s.name} {...s} />
          ))}
        </CardWrap>
      </section>

      {/* Projects */}
      <section>
        <SectionLabel>Featured Projects</SectionLabel>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {featuredProjects.map((p) => (
            <CardWrap key={p.id} className="p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] text-white/28 font-mono uppercase tracking-widest mb-1">{p.year}</p>
                  <h3 className="text-sm font-semibold text-white/88">{p.title}</h3>
                </div>
                <VerifiedBadge verified={p.verified} />
              </div>
              <p className="text-xs text-white/38 leading-relaxed flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.skills.map((s) => <SkillTag key={s} label={s} />)}
              </div>
              <button className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg border border-white/8 bg-white/3 text-xs text-white/45 hover:text-white/75 hover:border-white/14 transition-all cursor-pointer mt-1">
                <ExternalLink className="w-3 h-3" /> View Project
              </button>
            </CardWrap>
          ))}
        </div>
      </section>

    </div>
  );
}


function ProjectsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white/90">Projects</h2>
        <p className="text-sm text-white/35 mt-0.5">Verified through code review, deployment, or peer assessment.</p>
      </div>
      <div className="space-y-4">
        {featuredProjects.map((p) => (
          <CardWrap key={p.id} className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] text-white/28 uppercase tracking-widest">{p.year}</span>
                </div>
                <h3 className="text-base font-semibold text-white/90">{p.title}</h3>
              </div>
              <VerifiedBadge verified={p.verified} />
            </div>
            <p className="text-sm text-white/45 leading-relaxed mb-4">{p.desc}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.skills.map((s) => <SkillTag key={s} label={s} />)}
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 bg-white/3 text-xs text-white/50 hover:text-white/80 hover:border-white/18 transition-all cursor-pointer">
                <ExternalLink className="w-3.5 h-3.5" /> View Project
              </button>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 bg-white/3 text-xs text-white/50 hover:text-white/80 hover:border-white/18 transition-all cursor-pointer"
              >
                <GithubIcon className="w-3.5 h-3.5" /> GitHub
              </a>
            </div>
          </CardWrap>
        ))}
      </div>
    </div>
  );
}

function CertificationsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white/90">Certifications</h2>
        <p className="text-sm text-white/35 mt-0.5">{certifications.filter((c) => c.verified).length} verified certifications.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {certifications.map((c) => (
          <CardWrap key={c.id} className="overflow-hidden">
            {/* Certificate image preview */}
            <div className="relative w-full h-40 bg-white/4 overflow-hidden">
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 right-3">
                <VerifiedBadge verified={c.verified} />
              </div>
            </div>
            {/* Card content */}
            <div className="p-5">
              <p className="font-mono text-[10px] text-white/28 uppercase tracking-widest mb-1">{c.year}</p>
              <h3 className="text-sm font-semibold text-white/90 mb-0.5">{c.title}</h3>
              <p className="text-xs text-white/40 mb-3">{c.org}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {c.skills.map((s) => <SkillTag key={s} label={s} />)}
              </div>
              <button className="flex items-center gap-1.5 text-xs text-violet-400/75 hover:text-violet-300 transition-colors cursor-pointer">
                <ExternalLink className="w-3 h-3" /> View Certificate
              </button>
            </div>
          </CardWrap>
        ))}
      </div>
    </div>
  );
}

function ExperienceTab() {
  const typeColors: Record<string, string> = {
    Internship: "#8b5cf6",
    Freelance: "#6366f1",
    Research: "#3b82f6",
  };
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white/90">Experience</h2>
        <p className="text-sm text-white/35 mt-0.5">Internships, freelance, research, and industry contributions.</p>
      </div>
      <div className="relative space-y-0">
        {experiences.map((exp, i) => {
          const color = typeColors[exp.type] ?? "#8b5cf6";
          const isLast = i === experiences.length - 1;
          return (
            <div key={exp.id} className="relative flex gap-5">
              {!isLast && (
                <div className="absolute left-[11px] top-[26px] bottom-0 w-px bg-white/6" />
              )}
              <div
                className="shrink-0 w-5 h-5 rounded-full border mt-5 z-10"
                style={{ background: `${color}20`, borderColor: `${color}40` }}
              />
              <CardWrap className="flex-1 p-5 mb-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-white/90">{exp.role}</h3>
                    <p className="text-xs text-white/50 mt-0.5">{exp.org}</p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <VerifiedBadge verified={exp.verified} />
                    <p className="text-[10px] text-white/28 mt-1 font-mono">{exp.duration}</p>
                  </div>
                </div>
                <p className="text-xs text-white/40 leading-relaxed mb-3">{exp.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((s) => <SkillTag key={s} label={s} />)}
                </div>
              </CardWrap>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AchievementsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white/90">Achievements</h2>
        <p className="text-sm text-white/35 mt-0.5">Hackathons, awards, open source contributions, and leadership.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {achievements.map((a) => (
          <CardWrap key={a.id} className="p-5 flex gap-4">
            <div
              className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border"
              style={{ background: "rgba(139,92,246,0.10)", borderColor: "rgba(139,92,246,0.18)", color: "#a78bfa" }}
            >
              {a.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-sm font-semibold text-white/88">{a.title}</h3>
                <VerifiedBadge verified={a.verified} />
              </div>
              <p className="text-xs text-white/40">{a.org}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">{a.date}</span>
                <span className="w-1 h-1 rounded-full bg-white/15" />
                <span className="text-[10px] text-white/30">{a.type}</span>
              </div>
            </div>
          </CardWrap>
        ))}
      </div>
    </div>
  );
}

// Share Passport Modal
function SharePassportModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-black/90 border border-white/10 rounded-2xl p-7 shadow-[0_8px_64px_rgba(0,0,0,0.7)] overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/25 hover:text-white/70 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-5">
          <Share2 className="w-4 h-4 text-violet-400" />
          <h2 className="text-base font-semibold text-white/90">Public Skill Passport</h2>
        </div>

        {/* Public header */}
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600/40 to-indigo-700/40 border border-white/12 flex items-center justify-center shrink-0">
            <span className="text-base font-bold text-white/85">NS</span>
          </div>
          <div>
            <h3 className="text-base font-semibold text-white/90">Nishant Singh</h3>
            <p className="text-xs text-white/40">AI / ML Engineer · IIIT Tiruchirappalli</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Passport Strength</p>
            <p className="text-xl font-bold text-violet-400">78%</p>
          </div>
        </div>

        {/* Verified Skills */}
        <div className="mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-3">Verified Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {verifiedSkills.filter((s) => s.verified).map((s) => (
              <span key={s.name} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/18 text-xs text-violet-300">
                <BadgeCheck className="w-3 h-3" /> {s.name} {s.level}%
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-3">Projects</p>
          <div className="space-y-2">
            {featuredProjects.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-sm text-white/75">{p.title}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.skills.map((s) => <SkillTag key={s} label={s} />)}
                  </div>
                </div>
                <VerifiedBadge verified={p.verified} />
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-3">Certifications</p>
          <div className="space-y-2">
            {certifications.filter((c) => c.verified).map((c) => (
              <div key={c.id} className="flex items-center justify-between py-1.5">
                <div>
                  <p className="text-xs text-white/70">{c.title}</p>
                  <p className="text-[10px] text-white/35">{c.org} · {c.year}</p>
                </div>
                <BadgeCheck className="w-3.5 h-3.5 text-violet-400/70" />
              </div>
            ))}
          </div>
        </div>

        {/* Share actions */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600/18 border border-violet-500/22 text-violet-200 text-sm font-medium hover:bg-violet-600/28 transition-all cursor-pointer">
            <Share2 className="w-4 h-4" /> Copy Link
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/4 text-white/55 text-sm hover:text-white/80 hover:border-white/18 transition-all cursor-pointer">
            <ExternalLink className="w-4 h-4" /> Open Preview
          </button>
        </div>
      </div>
    </div>
  );
}

interface SkillPassportPageProps {
  onNavigate: (p: Page) => void;
}

export default function SkillPassportPage({ onNavigate }: SkillPassportPageProps) {
  const [activeTab, setActiveTab] = useState<PassportTab>("overview");
  const [showShare, setShowShare] = useState(false);

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden bg-black">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-4 sm:py-8 pl-16 sm:pl-16">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white/92 mb-1">Skill Passport</h1>
            <p className="text-xs sm:text-sm text-white/38">Your verified record of skills, experience and achievements.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <InteractiveHoverButton
              text="Edit Profile"
              className="w-28 sm:w-32 text-xs text-white/70 border-white/10"
            />
            <CreepyButton
              onClick={() => setShowShare(true)}
              className="text-xs"
              coverClassName="bg-violet-600 text-white text-xs font-semibold"
            >
              <Share2 className="w-3.5 h-3.5 mr-1.5 inline-block" /> Share Passport
            </CreepyButton>
          </div>
        </div>

        {/* Profile Hero — Ticket Card */}
        <div className="mb-6">
          <div className="flex justify-center max-w-full overflow-x-auto py-2">
            <AdmitOneTicket
              name="Nishant Singh"
              presenter="KickSkill · Skill Passport"
              event="AI / ML Engineer Track"
              venue="IIIT Tiruchirappalli"
              dates="B.Tech CSE · 2027"
              stubText="VERIFIED"
              watermark="2026"
              width={Math.min(680, window.innerWidth - 80)}
              layout={PASSPORT_LAYOUT}
              texture={PASSPORT_TEXTURE}
            />
          </div>
        </div>


        {/* Tab Nav */}
        <div className="mb-8">
          <AnimeNavBar
            items={passportNavItems}
            activeTab={passportIdToName[activeTab]}
            onTabChange={(name) => setActiveTab(passportNameToId[name])}
          />
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && <OverviewTab onNavigate={onNavigate} />}
        {activeTab === "projects" && <ProjectsTab />}
        {activeTab === "certifications" && <CertificationsTab />}
        {activeTab === "experience" && <ExperienceTab />}
        {activeTab === "achievements" && <AchievementsTab />}

        <div className="h-12" />
      </div>

      {showShare && <SharePassportModal onClose={() => setShowShare(false)} />}
    </div>
  );
}
