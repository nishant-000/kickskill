import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import {
  BookOpen,
  Route,
  Sparkles,
  FolderKanban,
  ArrowRight,
  BrainCircuit,
  MessageSquare,
  Play,
  CheckCircle2,
  Circle,
  Clock,
  ChevronRight,
  Search,
  TrendingUp,
  Zap,
  Target,
} from "lucide-react";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { MovingBorderBox } from "@/components/ui/moving-border";

const learningNavItems = [
  { name: "For You", icon: Sparkles },
  { name: "Roadmaps", icon: Route },
  { name: "Courses", icon: BookOpen },
  { name: "Projects", icon: FolderKanban },
];
const learningNameToId: Record<string, LearningTab> = {
  "For You": "foryou", "Roadmaps": "roadmaps", "Courses": "courses", "Projects": "projects",
};
const learningIdToName: Record<LearningTab, string> = {
  "foryou": "For You", "roadmaps": "Roadmaps", "courses": "Courses", "projects": "Projects",
};

type LearningTab = "foryou" | "roadmaps" | "courses" | "projects";

const tabDefs: { id: LearningTab; label: string; icon: React.ReactNode }[] = [
  { id: "foryou", label: "For You", icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: "roadmaps", label: "Roadmaps", icon: <Route className="w-3.5 h-3.5" /> },
  { id: "courses", label: "Courses", icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: "projects", label: "Projects", icon: <FolderKanban className="w-3.5 h-3.5" /> },
];

const COURSE_FILTERS = ["All", "AI/ML", "Development", "Data", "Cloud", "Cybersecurity", "Soft Skills"];

const recommendations = [
  {
    id: 1,
    title: "PyTorch Fundamentals",
    type: "course",
    skillGap: "PyTorch",
    current: 42,
    target: 70,
    progress: 32,
    impact: "Improving PyTorch could unlock 12 additional AI/ML opportunities.",
    impactCount: "+12 opportunities",
    cta: "Continue Learning",
    started: true,
    accentColor: "#8b5cf6",
  },
  {
    id: 2,
    title: "Docker for Machine Learning",
    type: "course",
    skillGap: "Docker",
    current: 35,
    target: 65,
    progress: 0,
    impact: "Containerization is required in 68% of ML engineering roles.",
    impactCount: "+8 opportunities",
    cta: "Start Learning",
    started: false,
    accentColor: "#6366f1",
  },
  {
    id: 3,
    title: "Build an NLP Project",
    type: "project",
    skillGap: null,
    current: null,
    target: null,
    progress: 0,
    skills: ["Python", "NLP", "Machine Learning"],
    impact: "A shipped NLP project increases recruiter response rate by 3×.",
    impactCount: "+6 opportunity matches",
    cta: "Start Project",
    started: false,
    accentColor: "#3b82f6",
  },
  {
    id: 4,
    title: "AWS for ML Engineers",
    type: "course",
    skillGap: "AWS",
    current: 28,
    target: 60,
    progress: 0,
    impact: "Cloud deployment is a core requirement for production ML roles.",
    impactCount: "+9 opportunities",
    cta: "Start Learning",
    started: false,
    accentColor: "#2563eb",
  },
];

const prioritySkills = [
  { rank: 1, name: "PyTorch", current: 42, required: 70, priority: "High", impact: "Could unlock 12 opportunities", color: "#8b5cf6" },
  { rank: 2, name: "Docker", current: 35, required: 65, priority: "High", impact: "Required in 68% of ML roles", color: "#6366f1" },
  { rank: 3, name: "NLP", current: 30, required: 65, priority: "Medium", impact: "Could unlock 8 opportunities", color: "#4f46e5" },
  { rank: 4, name: "AWS", current: 28, required: 60, priority: "Medium", impact: "Opens production ML roles", color: "#3b82f6" },
];

const roadmapStages = [
  { num: "01", title: "Python & Programming", status: "completed" },
  { num: "02", title: "Machine Learning", status: "completed" },
  { num: "03", title: "PyTorch", status: "inprogress" },
  { num: "04", title: "NLP", status: "upcoming" },
  { num: "05", title: "Docker & Deployment", status: "upcoming" },
  { num: "06", title: "Production ML Project", status: "upcoming" },
];

const courses = [
  { title: "Machine Learning with Python", provider: "Coursera", skill: "Machine Learning", difficulty: "Intermediate", duration: "6 weeks", progress: 68, relevance: "High", category: "AI/ML" },
  { title: "Docker Fundamentals", provider: "Udemy", skill: "Docker", difficulty: "Beginner", duration: "3 weeks", progress: 0, relevance: "High", category: "Development" },
  { title: "AWS Cloud Practitioner", provider: "AWS Training", skill: "AWS", difficulty: "Beginner", duration: "4 weeks", progress: 0, relevance: "High", category: "Cloud" },
  { title: "Deep Learning Specialization", provider: "deeplearning.ai", skill: "PyTorch", difficulty: "Advanced", duration: "10 weeks", progress: 22, relevance: "High", category: "AI/ML" },
  { title: "NLP with Transformers", provider: "Hugging Face", skill: "NLP", difficulty: "Intermediate", duration: "5 weeks", progress: 0, relevance: "Medium", category: "AI/ML" },
  { title: "FastAPI in Production", provider: "TestDriven.io", skill: "FastAPI", difficulty: "Intermediate", duration: "2 weeks", progress: 0, relevance: "Medium", category: "Development" },
];

const projects = [
  {
    title: "NLP Sentiment Analysis API",
    desc: "Build a production-ready REST API that classifies sentiment in real-time text streams.",
    skills: ["Python", "NLP", "FastAPI", "Docker"],
    difficulty: "Intermediate",
    impact: "High",
    duration: "2-3 weeks",
    color: "#8b5cf6",
  },
  {
    title: "Deploy an ML Model to AWS",
    desc: "Package a trained PyTorch model in Docker and serve it via AWS Lambda + API Gateway.",
    skills: ["PyTorch", "Docker", "AWS"],
    difficulty: "Intermediate",
    impact: "High",
    duration: "1-2 weeks",
    color: "#6366f1",
  },
  {
    title: "Real-Time Object Detection App",
    desc: "Build a webcam-powered object detection demo using YOLO and a React frontend.",
    skills: ["Python", "PyTorch", "React", "WebSockets"],
    difficulty: "Advanced",
    impact: "High",
    duration: "3-4 weeks",
    color: "#4f46e5",
  },
  {
    title: "Data Pipeline with Airflow",
    desc: "Orchestrate a multi-step ETL pipeline that feeds a live ML model in production.",
    skills: ["Python", "Airflow", "SQL", "Docker"],
    difficulty: "Advanced",
    impact: "Medium",
    duration: "2-3 weeks",
    color: "#3b82f6",
  },
];

function PriorityBadge({ priority }: { priority: string }) {
  const color = priority === "High"
    ? "bg-violet-500/15 text-violet-300 border-violet-500/20"
    : "bg-white/8 text-white/45 border-white/10";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border ${color}`}>
      {priority} Priority
    </span>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  return (
    <MovingBorderBox
      as="span"
      borderRadius="0.375rem"
      containerClassName="inline-flex"
      duration={2500}
      className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium text-white/50"
    >
      {difficulty}
    </MovingBorderBox>
  );
}

function SkillTag({ label }: { label: string }) {
  return (
    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-[10px] text-white/50">
      {label}
    </span>
  );
}

function ProgressBar({ value, color = "#8b5cf6" }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  );
}

function RecommendationsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<Map<number, HTMLElement>>(new Map());
  const activeRef = useRef<{ idx: number; color: string } | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  // Pair recs into rows of 2
  const rows = useMemo(() => {
    const out: (typeof recommendations[number])[][] = [];
    for (let i = 0; i < recommendations.length; i += 2) {
      out.push(recommendations.slice(i, i + 2));
    }
    return out;
  }, []);

  const moveTo = useCallback((idx: number, color: string) => {
    const grid = gridRef.current;
    const highlight = highlightRef.current;
    const el = cellRefs.current.get(idx);
    if (!grid || !highlight || !el) return;
    const rect = el.getBoundingClientRect();
    const crect = grid.getBoundingClientRect();
    highlight.style.transform = `translate(${rect.left - crect.left}px, ${rect.top - crect.top}px)`;
    highlight.style.width = `${rect.width}px`;
    highlight.style.height = `${rect.height}px`;
    highlight.style.backgroundColor = color;
    activeRef.current = { idx, color };
  }, []);

  useEffect(() => {
    const first = recommendations[0];
    const h = highlightRef.current;
    if (h) {
      h.style.transitionDuration = "0s";
      moveTo(0, first.accentColor);
      requestAnimationFrame(() => { if (h) h.style.transitionDuration = "250ms"; });
    }
    const onResize = () => { if (activeRef.current) moveTo(activeRef.current.idx, activeRef.current.color); };
    const grid = gridRef.current;
    const ro = grid ? new ResizeObserver(onResize) : null;
    if (grid && ro) ro.observe(grid);
    window.addEventListener("resize", onResize);
    return () => { ro?.disconnect(); window.removeEventListener("resize", onResize); };
  }, [moveTo]);

  return (
    <div
      ref={gridRef}
      className="relative w-full border border-white/10 overflow-hidden"
      style={{ borderRadius: "16px" }}
    >
      {/* Sliding highlight */}
      <div
        ref={highlightRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,0.10), rgba(255,255,255,0) 52%), linear-gradient(180deg, rgba(255,255,255,0) 55%, rgba(0,0,0,0.25))",
          transitionProperty: "transform, width, height, background-color",
          transitionDuration: "250ms",
          transitionTimingFunction: "ease",
          opacity: 0.22,
        }}
      />

      {rows.map((row, r) => (
        <div
          key={r}
          className={`flex flex-col sm:flex-row ${r < rows.length - 1 ? "border-b border-white/8" : ""}`}
        >
          {row.map((rec, c) => {
            const globalIdx = r * 2 + c;
            const isActive = activeIdx === globalIdx;
            return (
              <div
                key={rec.id}
                ref={(el) => {
                  if (el) cellRefs.current.set(globalIdx, el);
                  else cellRefs.current.delete(globalIdx);
                }}
                onMouseEnter={() => { setActiveIdx(globalIdx); moveTo(globalIdx, rec.accentColor); }}
                className={`relative z-[1] flex-1 p-6 cursor-default transition-all duration-200 ${
                  c < row.length - 1 ? "sm:border-r border-b sm:border-b-0 border-white/8" : ""
                }`}
              >
                {/* Type + impact row */}
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 pt-0.5">
                    ( {rec.type === "project" ? "project" : "course"} )
                  </span>
                  {rec.impactCount && (
                    <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-200 ${
                      isActive
                        ? "bg-white/15 border-white/20 text-white/90"
                        : "bg-violet-500/10 border-violet-500/20 text-violet-300"
                    }`}>
                      <TrendingUp className="w-3 h-3" />
                      {rec.impactCount}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className={`text-base font-semibold mb-4 transition-colors duration-200 ${isActive ? "text-white" : "text-white/80"}`}>
                  {rec.title}
                </h3>

                {/* Skill gap stats */}
                {rec.type !== "project" && rec.skillGap && (
                  <div className="flex items-center gap-5 mb-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-white/25 mb-0.5">Skill Gap</p>
                      <p className="text-sm text-white/65 font-medium">{rec.skillGap}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-white/25 mb-0.5">Current</p>
                      <p className="text-sm font-semibold" style={{ color: isActive ? "#fff" : rec.accentColor }}>{rec.current}%</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-white/25 mb-0.5">Target</p>
                      <p className="text-sm text-white/55 font-medium">{rec.target}%</p>
                    </div>
                  </div>
                )}

                {"skills" in rec && rec.skills && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(rec.skills as string[]).map((s) => (
                      <span key={s} className={`px-2 py-0.5 rounded-md text-[10px] border transition-all duration-200 ${
                        isActive ? "bg-white/10 border-white/15 text-white/70" : "bg-white/5 border-white/8 text-white/45"
                      }`}>{s}</span>
                    ))}
                  </div>
                )}

                <p className="text-xs text-white/38 mb-4 leading-relaxed">{rec.impact}</p>

                {rec.started && rec.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between mb-1.5">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-white/25">Progress</span>
                      <span className="text-xs font-medium" style={{ color: isActive ? "#fff" : rec.accentColor }}>{rec.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${rec.progress}%`, background: isActive ? "rgba(255,255,255,0.7)" : rec.accentColor }}
                      />
                    </div>
                  </div>
                )}

                <button
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-white/15 border-white/25 text-white hover:bg-white/20"
                      : "bg-transparent border-white/10 text-white/45 hover:text-white/70"
                  }`}
                >
                  {rec.started ? <Play className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  {rec.cta}
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function ForYouTab() {
  return (
    <div className="space-y-10">
      {/* Recommended */}
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-white/92">Recommended for you</h2>
          <p className="text-sm text-white/38 mt-0.5">Personalized recommendations based on your target career and skill gaps.</p>
        </div>
        <RecommendationsGrid />
      </section>


      {/* AI Insight */}
      <section>
        <div className="relative bg-gradient-to-br from-violet-950/30 via-indigo-950/20 to-transparent border border-violet-500/15 rounded-2xl p-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-violet-500/20 border border-violet-500/25 flex items-center justify-center">
                <BrainCircuit className="w-3.5 h-3.5 text-violet-300" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-violet-400">KickSkill Analysis</span>
            </div>
            <p className="text-sm text-white/65 leading-relaxed mb-2">
              Based on your target role and recent opportunity requirements, <span className="text-white/85 font-medium">PyTorch is currently your highest-impact skill gap.</span>
            </p>
            <p className="text-sm text-white/55 leading-relaxed mb-5">
              I recommend completing the PyTorch fundamentals path before starting another certification. The ML Engineer roles you are targeting require a minimum of 70% PyTorch proficiency — you are at 42%.
            </p>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600/20 border border-violet-500/25 text-violet-200 text-sm font-medium hover:bg-violet-600/30 hover:border-violet-500/40 transition-all cursor-pointer">
              <Sparkles className="w-4 h-4" />
              Build My Learning Plan
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

function RoadmapsTab() {
  const progress = 42;

  return (
    <div className="max-w-2xl">
      <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Active Roadmap</p>
            <h2 className="text-xl font-semibold text-white/92">AI / ML Engineer</h2>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Overall Progress</p>
            <p className="text-3xl font-bold text-violet-400">{progress}%</p>
          </div>
        </div>
        <ProgressBar value={progress} color="#8b5cf6" />
      </div>

      <div className="relative space-y-0">
        {roadmapStages.map((stage, i) => {
          const isCompleted = stage.status === "completed";
          const isInProgress = stage.status === "inprogress";
          const isLast = i === roadmapStages.length - 1;

          return (
            <div key={stage.num} className="relative flex gap-5">
              {/* Line */}
              {!isLast && (
                <div className="absolute left-[19px] top-[38px] bottom-0 w-px" style={{
                  background: isCompleted
                    ? "linear-gradient(to bottom, rgba(139,92,246,0.4), rgba(139,92,246,0.15))"
                    : "rgba(255,255,255,0.06)"
                }} />
              )}

              {/* Node */}
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 mt-4 transition-all" style={{
                background: isCompleted ? "rgba(139,92,246,0.2)" : isInProgress ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.03)",
                borderColor: isCompleted ? "rgba(139,92,246,0.5)" : isInProgress ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.08)",
              }}>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-violet-400" />
                ) : isInProgress ? (
                  <Play className="w-3.5 h-3.5 text-violet-300" />
                ) : (
                  <Circle className="w-4 h-4 text-white/15" />
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 flex items-center justify-between py-4 border-b transition-all ${
                isLast ? "border-transparent" : "border-white/5"
              } ${isInProgress ? "group" : ""}`}>
                <div>
                  <span className="text-[10px] text-white/25 font-mono mr-2">{stage.num}</span>
                  <span className={`text-sm font-medium ${
                    isCompleted ? "text-white/55 line-through decoration-white/20" :
                    isInProgress ? "text-white/92" :
                    "text-white/40"
                  }`}>
                    {stage.title}
                  </span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${
                  isCompleted
                    ? "bg-violet-500/10 border-violet-500/20 text-violet-300"
                    : isInProgress
                    ? "bg-violet-500/12 border-violet-500/25 text-violet-300"
                    : "bg-white/3 border-white/6 text-white/25"
                }`}>
                  {isCompleted ? "Completed" : isInProgress ? "In Progress" : "Not Started"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600/20 border border-violet-500/25 text-violet-200 text-sm font-medium hover:bg-violet-600/30 hover:border-violet-500/40 transition-all cursor-pointer">
          <Play className="w-4 h-4" />
          Continue Roadmap
        </button>
      </div>
    </div>
  );
}

function CoursesTab() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = courses.filter((c) => {
    const matchesFilter = activeFilter === "All" || c.category === activeFilter;
    const matchesSearch = search === "" || c.title.toLowerCase().includes(search.toLowerCase()) || c.skill.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full bg-white/4 border border-white/8 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white/80 placeholder:text-white/25 focus:outline-none focus:border-white/18 focus:bg-white/6 transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {COURSE_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                activeFilter === f
                  ? "bg-violet-500/18 border-violet-500/30 text-violet-200"
                  : "bg-white/3 border-white/8 text-white/40 hover:text-white/65 hover:border-white/14"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((c) => (
          <div
            key={c.title}
            className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 hover:border-white/14 hover:bg-white/[0.05] transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{c.provider}</p>
                <h3 className="text-sm font-semibold text-white/90">{c.title}</h3>
              </div>
              <span className={`shrink-0 ml-3 text-[10px] px-2 py-0.5 rounded-md border font-medium ${
                c.relevance === "High"
                  ? "bg-violet-500/12 border-violet-500/20 text-violet-300"
                  : "bg-white/6 border-white/10 text-white/45"
              }`}>
                {c.relevance} Relevance
              </span>
            </div>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <DifficultyBadge difficulty={c.difficulty} />
              <span className="flex items-center gap-1 text-xs text-white/35">
                <Clock className="w-3 h-3" />
                {c.duration}
              </span>
              <SkillTag label={c.skill} />
            </div>
            {c.progress > 0 && (
              <div className="mb-4">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[10px] text-white/30 uppercase tracking-wider">Progress</span>
                  <span className="text-xs text-violet-400 font-medium">{c.progress}%</span>
                </div>
                <ProgressBar value={c.progress} />
              </div>
            )}
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium border border-white/10 bg-white/4 text-white/50 hover:text-white/85 hover:border-white/20 hover:bg-white/8 transition-all cursor-pointer">
              <ArrowRight className="w-3.5 h-3.5" />
              View Course
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-white/25 text-sm">
          No courses match your search.
        </div>
      )}
    </div>
  );
}

function ProjectsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white/92 mb-1">Build what you are missing.</h2>
        <p className="text-sm text-white/38">Projects selected to close your specific skill gaps. Each one ships something real.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div
            key={p.title}
            className="group relative bg-white/[0.03] border border-white/8 rounded-2xl p-5 hover:border-white/14 hover:bg-white/[0.05] transition-all duration-200 overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-50"
              style={{ background: `linear-gradient(90deg, transparent, ${p.color}50, transparent)` }}
            />
            <div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-5 blur-2xl pointer-events-none"
              style={{ background: p.color }}
            />
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-semibold text-white/90 pr-2">{p.title}</h3>
                <span className={`shrink-0 text-[10px] px-2.5 py-1 rounded-lg border font-medium ${
                  p.impact === "High"
                    ? "bg-violet-500/12 border-violet-500/20 text-violet-300"
                    : "bg-white/6 border-white/10 text-white/45"
                }`}>
                  {p.impact} Impact
                </span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.skills.map((s) => <SkillTag key={s} label={s} />)}
              </div>
              <div className="flex items-center gap-3 mb-4">
                <DifficultyBadge difficulty={p.difficulty} />
                <span className="flex items-center gap-1 text-xs text-white/35">
                  <Clock className="w-3 h-3" />
                  {p.duration}
                </span>
              </div>
              <button
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer"
                style={{
                  borderColor: `${p.color}30`,
                  background: `${p.color}10`,
                  color: "rgba(255,255,255,0.6)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = `${p.color}20`;
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = `${p.color}10`;
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
                }}
              >
                <Play className="w-3.5 h-3.5" />
                Start Project
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState<LearningTab>("foryou");

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden bg-black">
      <div className="max-w-[1100px] mx-auto px-6 py-8">

        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white/92 mb-1">Learning</h1>
            <p className="text-sm text-white/38">Build the skills that move your career forward.</p>
          </div>
          <InteractiveHoverButton
            text="Ask KickSkill"
            className="w-36 text-sm text-white/70 border-violet-500/30 shrink-0 ml-4"
          />
        </div>

        {/* Tab Nav */}
        <div className="mb-8">
          <AnimeNavBar
            items={learningNavItems}
            activeTab={learningIdToName[activeTab]}
            onTabChange={(name) => setActiveTab(learningNameToId[name])}
          />
        </div>

        {/* Tab Content */}
        {activeTab === "foryou" && <ForYouTab />}
        {activeTab === "roadmaps" && <RoadmapsTab />}
        {activeTab === "courses" && <CoursesTab />}
        {activeTab === "projects" && <ProjectsTab />}

        <div className="h-12" />
      </div>
    </div>
  );
}
