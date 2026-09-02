import { useState, useCallback } from "react";
import {
  Sparkles,
  Bot,
  MapPin,
  Briefcase,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  BookOpen,
  Send,
  Bookmark,
  MessageSquare,
  RotateCcw,
  ChevronRight,
  Target,
  Zap,
  GraduationCap,
  FolderKanban,
} from "lucide-react";
import { GooeySearch } from "@/components/ui/gooey-search";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { OpportunityCardStack } from "@/components/ui/opportunity-card-stack";

type Tab = "Recommended" | "Internships" | "Jobs" | "Projects";

interface Opportunity {
  id: number;
  title: string;
  company: string;
  location: string;
  mode: string;
  match: number;
  skills: string[];
  skillGap: string[];
  about: string;
  responsibilities: string[];
  eligibility: string;
  deadline: string;
  whyMatch: string;
}

const allOpportunities: Opportunity[] = [
  {
    id: 1,
    title: "AI / ML Intern",
    company: "TechNova",
    location: "Remote",
    mode: "Internship",
    match: 91,
    skills: ["Python", "Machine Learning", "SQL", "PyTorch"],
    skillGap: ["Docker"],
    about:
      "Join TechNova's core AI team to build production ML pipelines, optimize model performance, and contribute to real-world applications used by millions.",
    responsibilities: [
      "Build and optimize ML models for production",
      "Work with large-scale datasets",
      "Collaborate with senior engineers on architecture",
      "Document experiments and results",
    ],
    eligibility:
      "Final year students or recent graduates in CS, AI, or Data Science.",
    deadline: "Sep 30, 2026",
    whyMatch:
      "Your Python and Machine Learning skills closely match the requirements for this role. You are missing one recommended skill: Docker.",
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company: "Axiom Labs",
    location: "Bangalore",
    mode: "Full-time",
    match: 78,
    skills: ["React", "TypeScript", "CSS", "Node.js"],
    skillGap: ["GraphQL", "Testing"],
    about:
      "Build beautiful, high-performance web applications for Axiom's growing product suite used by enterprise clients across Asia.",
    responsibilities: [
      "Develop reusable UI component libraries",
      "Optimize web performance and Core Web Vitals",
      "Collaborate closely with product design",
      "Write unit and integration tests",
    ],
    eligibility: "1+ year of experience in frontend development.",
    deadline: "Oct 15, 2026",
    whyMatch:
      "Your React and TypeScript skills are a strong match. Adding GraphQL knowledge would significantly improve your profile for this role.",
  },
  {
    id: 3,
    title: "Data Science Project",
    company: "OpenResearch",
    location: "Remote",
    mode: "Project",
    match: 85,
    skills: ["Python", "Pandas", "Visualization", "Statistics"],
    skillGap: [],
    about:
      "Contribute to open data research analyzing global education trends. Published work and certification provided upon completion.",
    responsibilities: [
      "Clean and analyze real-world datasets",
      "Build interactive visualizations",
      "Write research summaries and reports",
      "Present findings to the research team",
    ],
    eligibility: "Open to all students and early-career professionals.",
    deadline: "Nov 1, 2026",
    whyMatch:
      "All required skills match your profile. This is an excellent opportunity to build portfolio projects and gain published research experience.",
  },
  {
    id: 4,
    title: "Backend Developer Intern",
    company: "Stackwise",
    location: "Hybrid · Pune",
    mode: "Internship",
    match: 72,
    skills: ["Node.js", "PostgreSQL", "REST APIs", "Docker"],
    skillGap: ["Kubernetes", "Redis"],
    about:
      "Work on Stackwise's backend infrastructure, building scalable APIs and microservices that power a fast-growing B2B SaaS platform.",
    responsibilities: [
      "Design and implement REST APIs",
      "Optimize database queries and schema",
      "Write unit and integration tests",
      "Participate in code reviews",
    ],
    eligibility: "3rd or 4th year engineering students.",
    deadline: "Sep 20, 2026",
    whyMatch:
      "Your Node.js skills are relevant, but strengthening your Docker and database skills would increase your match score considerably.",
  },
  {
    id: 5,
    title: "Product Manager Intern",
    company: "Loopify",
    location: "Remote",
    mode: "Internship",
    match: 68,
    skills: ["Product Thinking", "Analytics", "User Research", "Figma"],
    skillGap: ["SQL", "A/B Testing"],
    about:
      "Help shape the roadmap of Loopify's consumer app by conducting user research, analyzing metrics, and collaborating with engineering and design.",
    responsibilities: [
      "Conduct user research and synthesize insights",
      "Define product requirements and user stories",
      "Track metrics and analyze product performance",
      "Coordinate cross-functional delivery",
    ],
    eligibility:
      "Students in business, CS, or design with strong analytical thinking.",
    deadline: "Oct 5, 2026",
    whyMatch:
      "Your analytical and design skills are a good foundation. Learning SQL basics would immediately improve your match for PM roles.",
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "CloudBase",
    location: "Remote",
    mode: "Full-time",
    match: 61,
    skills: ["Docker", "Linux", "CI/CD", "AWS"],
    skillGap: ["Terraform", "Kubernetes", "Monitoring"],
    about:
      "CloudBase is looking for a DevOps Engineer to manage cloud infrastructure, automate deployments, and improve system reliability.",
    responsibilities: [
      "Manage AWS cloud infrastructure",
      "Build and maintain CI/CD pipelines",
      "Monitor system health and reliability",
      "Automate infrastructure provisioning",
    ],
    eligibility: "2+ years of experience with cloud platforms and DevOps tools.",
    deadline: "Oct 31, 2026",
    whyMatch:
      "You have foundational Docker and Linux skills, but this role requires deeper cloud infrastructure experience. Focus on Terraform and Kubernetes first.",
  },
];

const filterTabs = ["Recommended", "Internships", "Jobs", "Projects"] as Tab[];

const tabNavItems = [
  { name: "Recommended", icon: Sparkles },
  { name: "Internships", icon: GraduationCap },
  { name: "Jobs", icon: Briefcase },
  { name: "Projects", icon: FolderKanban },
];

const matchColor = (_pct: number) => "text-white/60";
const matchBg = (_pct: number) => "bg-white/8 border-white/12";

export default function OpportunitiesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Recommended");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = useCallback((q: string) => setSearchQuery(q), []);

  const suggestions = allOpportunities.flatMap((o) => [o.title, o.company, ...o.skills]);

  const handleGooeySearch = useCallback(
    (q: string): string[] => {
      setSearchQuery(q);
      const lower = q.toLowerCase();
      return [...new Set(suggestions.filter((s) => s.toLowerCase().includes(lower)))];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [showApply, setShowApply] = useState<Opportunity | null>(null);

  const filtered = allOpportunities.filter((o) => {
    const matchesTab =
      activeTab === "Recommended" ||
      (activeTab === "Internships" && o.mode === "Internship") ||
      (activeTab === "Jobs" && o.mode === "Full-time") ||
      (activeTab === "Projects" && o.mode === "Project");
    const matchesSearch =
      !searchQuery ||
      o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.skills.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesTab && matchesSearch;
  });

  return (
    <div className="relative h-full flex flex-col bg-black text-white overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-900/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative shrink-0 px-4 pt-4 sm:px-8 sm:pt-8 pb-5 border-b border-white/8 pl-16 sm:pl-16">
        {/* Breadcrumb */}
        <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest mb-2">
          KickSkill / Opportunities
        </p>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-white mb-1">
          Opportunities
        </h1>
        <p className="text-sm text-neutral-500 mb-6">
          Find internships, jobs and projects that match your skills and career
          goals.
        </p>

        {/* Search */}
        <div className="ks-search-wrap flex items-center gap-3">
          <GooeySearch
            onSearch={handleGooeySearch}
            placeholder="Search roles, companies, skills..."
            buttonLabel="Search"
            onSelect={handleSearch}
            debounceMs={300}
            maxResults={5}
            onFilterToggle={() => setShowFilters((v) => !v)}
            filterActive={showFilters}
          />
        </div>

        {/* Filter tabs */}
        <div className="pt-6">
          <AnimeNavBar
            items={tabNavItems}
            activeTab={activeTab}
            onTabChange={(name) => setActiveTab(name as Tab)}
          />
        </div>
      </div>

      {/* Main scrollable area */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-8 py-5">
          {/* AI match header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-sm font-medium text-white">
                Recommended for you
              </span>
              <span className="text-xs text-neutral-600">
                · Based on your skills, career goal and profile
              </span>
            </div>
            <span className="text-xs text-neutral-500">
              {filtered.length} matches found
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Target className="w-8 h-8 text-neutral-700 mb-4" />
              <p className="text-neutral-400 text-sm mb-1">
                No strong matches yet.
              </p>
              <p className="text-neutral-600 text-xs mb-5">
                KickSkill can help you close the skill gaps needed for more
                opportunities.
              </p>
              <button className="px-4 py-2 rounded-xl border border-white/10 bg-black/50 text-sm text-neutral-300 hover:text-white hover:border-white/20 transition-colors cursor-pointer">
                View Skill Gaps
              </button>
            </div>
          ) : (
            <OpportunityCardStack
              opportunities={filtered}
              onApply={(opp) => setShowApply(opp)}
            />
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <>
          <div
            className="absolute inset-0 z-20"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 z-30 bg-black/90 backdrop-blur-xl border-l border-white/10 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
              <span className="text-sm font-semibold text-white">Filters</span>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 text-neutral-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {[
                "Role",
                "Skills",
                "Location",
                "Work Mode",
                "Experience",
                "Stipend",
                "Industry",
                "Sort By",
              ].map((f) => (
                <div key={f}>
                  <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest mb-2">
                    {f}
                  </p>
                  <input
                    placeholder={`Filter by ${f.toLowerCase()}...`}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-xs text-white placeholder:text-neutral-700 focus:outline-none focus:border-white/20 transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="shrink-0 px-5 py-4 border-t border-white/8 flex gap-2">
              <button className="flex-1 py-2 rounded-xl border border-white/10 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5">
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
              <button className="flex-1 py-2 rounded-xl border border-violet-500/30 bg-violet-600/15 text-xs text-violet-300 hover:bg-violet-600/25 transition-colors cursor-pointer">
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}

      {/* Detail Panel */}
      {selectedOpp && (
        <>
          <div
            className="absolute inset-0 z-20 bg-black/40"
            onClick={() => setSelectedOpp(null)}
          />
          <div className="absolute right-0 top-0 h-full w-[420px] z-30 bg-black/95 backdrop-blur-xl border-l border-white/10 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 shrink-0">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  {selectedOpp.title}
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {selectedOpp.company}
                </p>
              </div>
              <button
                onClick={() => setSelectedOpp(null)}
                className="p-1.5 text-neutral-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {/* Meta */}
              <div className="flex flex-wrap gap-2">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${matchBg(selectedOpp.match)} ${matchColor(selectedOpp.match)}`}
                >
                  {selectedOpp.match}% Match
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {selectedOpp.location}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  {selectedOpp.mode}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedOpp.deadline}
                </span>
              </div>

              {/* About */}
              <div>
                <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest mb-2">
                  About
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {selectedOpp.about}
                </p>
              </div>

              {/* Required skills */}
              <div>
                <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest mb-2">
                  Required Skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedOpp.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-neutral-300 flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3 text-violet-400" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skill gaps */}
              {selectedOpp.skillGap.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest mb-2">
                    Your Skill Gaps
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedOpp.skillGap.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/40 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Responsibilities */}
              <div>
                <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest mb-2">
                  Responsibilities
                </p>
                <ul className="space-y-1.5">
                  {selectedOpp.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-neutral-400">
                      <ChevronRight className="w-3 h-3 text-neutral-600 mt-0.5 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eligibility */}
              <div>
                <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest mb-2">
                  Eligibility
                </p>
                <p className="text-xs text-neutral-400">{selectedOpp.eligibility}</p>
              </div>

              {/* AI explanation */}
              <div className="p-3 rounded-xl bg-violet-900/10 border border-violet-500/15">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  <span className="text-xs font-medium text-violet-300">
                    Why this matches you
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {selectedOpp.whyMatch}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="shrink-0 px-6 py-4 border-t border-white/8 flex gap-2">
              <button className="p-2 rounded-xl border border-white/10 bg-white/5 text-neutral-400 hover:text-white transition-colors cursor-pointer">
                <Bookmark className="w-4 h-4" />
              </button>
              <InteractiveHoverButton
                text="Ask KickSkill"
                className="flex-1 text-xs text-white/70 border-white/10"
              />
              <button
                onClick={() => {
                  setSelectedOpp(null);
                  setShowApply(selectedOpp);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-violet-500/30 bg-violet-600/15 text-xs text-violet-300 hover:bg-violet-600/25 hover:border-violet-500/50 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Apply
              </button>
            </div>
          </div>
        </>
      )}

      {/* Application Modal */}
      {showApply && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-black/95 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  Application Readiness
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {showApply.title} · {showApply.company}
                </p>
              </div>
              <button
                onClick={() => setShowApply(null)}
                className="p-1.5 text-neutral-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {[
                { label: "Resume Match", value: `${showApply.match - 4}%`, ok: showApply.match > 75 },
                { label: "Skill Match", value: `${showApply.match}%`, ok: showApply.match > 70 },
                { label: "Eligibility", value: showApply.match > 65 ? "Met" : "Partial", ok: showApply.match > 65 },
                { label: "Skill Gaps", value: showApply.skillGap.length === 0 ? "None" : showApply.skillGap.join(", "), ok: showApply.skillGap.length === 0 },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2 border-b border-white/6 last:border-0">
                  <span className="text-xs text-neutral-500">{row.label}</span>
                  <span className={`text-xs font-medium ${row.ok ? "text-violet-300" : "text-white/40"}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="px-6 pb-6 flex flex-col gap-2">
              <button className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-neutral-300 hover:text-white hover:border-white/20 transition-colors cursor-pointer flex items-center justify-center gap-2">
                <BookOpen className="w-3.5 h-3.5" />
                Prepare Application
              </button>
              <button className="w-full py-2.5 rounded-xl border border-violet-500/30 bg-violet-600/15 text-xs text-violet-300 hover:bg-violet-600/25 transition-colors cursor-pointer flex items-center justify-center gap-2">
                <Zap className="w-3.5 h-3.5" />
                Apply for Me
              </button>
              <p className="text-[10px] text-neutral-700 text-center mt-1">
                "Apply for Me" uses the KickSkill AI Agent to autonomously prepare and submit your application.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
