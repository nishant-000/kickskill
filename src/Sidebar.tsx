import { useState } from "react";
import type { Page } from "./App";
import {
  Home,
  Briefcase,
  BrainCircuit,
  BookOpen,
  BadgeCheck,
  ClipboardList,
  Sparkles,
  GraduationCap,
  FolderKanban,
  AlertCircle,
  ClipboardCheck,
  Route,
  UserRound,
  Folder,
  Award,
  Trophy,
  List,
  Loader2,
  CalendarCheck,
  XCircle,
  Bot,
  Target,
  Settings,
  ChevronRight,
  CircleUserRound,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface SubItem {
  icon: React.ReactNode;
  label: string;
}

interface NavItemDef {
  icon: React.ReactNode;
  label: string;
  subItems?: SubItem[];
}

const mainNav: NavItemDef[] = [
  { icon: <Home className="w-4 h-4" />, label: "Home" },
  {
    icon: <Briefcase className="w-4 h-4" />,
    label: "Opportunities",
    subItems: [
      { icon: <Sparkles className="w-3.5 h-3.5" />, label: "Recommended" },
      { icon: <GraduationCap className="w-3.5 h-3.5" />, label: "Internships" },
      { icon: <Briefcase className="w-3.5 h-3.5" />, label: "Jobs" },
      { icon: <FolderKanban className="w-3.5 h-3.5" />, label: "Projects" },
    ],
  },
  {
    icon: <BrainCircuit className="w-4 h-4" />,
    label: "Skills",
    subItems: [
      { icon: <BadgeCheck className="w-3.5 h-3.5" />, label: "My Skills" },
      { icon: <AlertCircle className="w-3.5 h-3.5" />, label: "Skill Gaps" },
      { icon: <ClipboardCheck className="w-3.5 h-3.5" />, label: "Assessments" },
    ],
  },
  {
    icon: <BookOpen className="w-4 h-4" />,
    label: "Learning",
    subItems: [
      { icon: <Sparkles className="w-3.5 h-3.5" />, label: "For You" },
      { icon: <Route className="w-3.5 h-3.5" />, label: "Roadmaps" },
      { icon: <GraduationCap className="w-3.5 h-3.5" />, label: "Courses" },
      { icon: <FolderKanban className="w-3.5 h-3.5" />, label: "Projects" },
    ],
  },
  {
    icon: <BadgeCheck className="w-4 h-4" />,
    label: "Skill Passport",
    subItems: [
      { icon: <UserRound className="w-3.5 h-3.5" />, label: "Overview" },
      { icon: <Folder className="w-3.5 h-3.5" />, label: "Projects" },
      { icon: <Award className="w-3.5 h-3.5" />, label: "Certifications" },
      { icon: <Trophy className="w-3.5 h-3.5" />, label: "Achievements" },
    ],
  },
  {
    icon: <ClipboardList className="w-4 h-4" />,
    label: "Applications",
    subItems: [
      { icon: <List className="w-3.5 h-3.5" />, label: "All Applications" },
      { icon: <Loader2 className="w-3.5 h-3.5" />, label: "In Progress" },
      { icon: <CalendarCheck className="w-3.5 h-3.5" />, label: "Interviews" },
      { icon: <BadgeCheck className="w-3.5 h-3.5" />, label: "Offers" },
      { icon: <XCircle className="w-3.5 h-3.5" />, label: "Rejected" },
    ],
  },
];

const bottomNav: NavItemDef[] = [
  { icon: <Target className="w-4 h-4" />, label: "Career Goal" },
  { icon: <Settings className="w-4 h-4" />, label: "Settings" },
];

const pageMap: Record<string, Page> = {
  Home: "home",
  Opportunities: "opportunities",
  Skills: "skills",
  Learning: "learning",
  "Skill Passport": "skill-passport",
  Applications: "applications",
};

const bottomPageMap: Record<string, Page> = {
  "Career Goal": "career-goal",
  "Settings": "settings",
};

function NavRow({
  item,
  openSections,
  onToggleSection,
  activePage,
  onNavigate,
  onClose,
}: {
  item: NavItemDef;
  openSections: Set<string>;
  onToggleSection: (label: string) => void;
  activePage: Page;
  onNavigate: (p: Page) => void;
  onClose: () => void;
}) {
  const hasChildren = item.subItems && item.subItems.length > 0;
  const isOpen = openSections.has(item.label);
  const mappedPage = pageMap[item.label];
  const isActive = mappedPage !== undefined && activePage === mappedPage;

  function handleClick() {
    if (mappedPage) {
      onNavigate(mappedPage);
      onClose();
    } else if (hasChildren) {
      onToggleSection(item.label);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer group justify-start ${
          isActive
            ? "bg-white/10 text-white border border-white/12 shadow-sm"
            : "text-neutral-400 hover:text-white hover:bg-white/5"
        }`}
      >
        <span className={`shrink-0 transition-colors ${isActive ? "text-violet-400" : "text-neutral-400 group-hover:text-white"}`}>
          {item.icon}
        </span>
        <span className="text-sm text-neutral-300 group-hover:text-white flex-1 text-left truncate font-medium">
          {item.label}
        </span>
        {hasChildren && (
          <ChevronRight
            onClick={(e) => {
              e.stopPropagation();
              onToggleSection(item.label);
            }}
            className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          />
        )}
      </button>

      {hasChildren && isOpen && (
        <div className="ml-7 mt-1 mb-1.5 space-y-0.5 border-l border-white/10 pl-3">
          {item.subItems!.map((sub) => (
            <button
              key={sub.label}
              onClick={() => {
                if (mappedPage) {
                  onNavigate(mappedPage);
                  onClose();
                }
              }}
              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-xs"
            >
              <span className="shrink-0 text-neutral-500">{sub.icon}</span>
              <span className="truncate">{sub.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  expanded: boolean;
  onExpandChange: (v: boolean) => void;
  activePage: Page;
  onNavigate: (p: Page) => void;
  onSignOut: () => void;
}

export default function Sidebar({ expanded, onExpandChange, activePage, onNavigate, onSignOut }: SidebarProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  function toggleSection(label: string) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  function handleCollapse() {
    onExpandChange(false);
  }

  function handleToggle() {
    onExpandChange(!expanded);
  }

  return (
    <>
      {/* Floating hamburger button when closed */}
      {!expanded && (
        <button
          onClick={handleToggle}
          aria-label="Open menu"
          className="fixed top-3.5 left-3.5 sm:top-4 sm:left-4 z-40 flex items-center justify-center w-10 h-10 rounded-xl bg-black/75 hover:bg-black/90 border border-white/12 text-neutral-300 hover:text-white backdrop-blur-md shadow-xl transition-all duration-200 cursor-pointer group hover:border-white/25 active:scale-95"
        >
          <Menu className="w-5 h-5 transition-transform group-hover:scale-105" />
        </button>
      )}

      {/* Overlay backdrop when expanded */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          expanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleCollapse}
      />

      {/* Slide-out drawer when expanded */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 flex flex-col
          w-[270px] sm:w-[280px] bg-neutral-950/95 backdrop-blur-2xl border-r border-white/10
          shadow-2xl transition-transform duration-300 ease-in-out
          ${expanded ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between px-4 border-b border-white/8 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-violet-600/30 border border-violet-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-violet-400" />
            </div>
            <span className="text-base font-semibold text-white tracking-wide">
              KickSkill
            </span>
          </div>
          <button
            onClick={handleCollapse}
            aria-label="Close menu"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/8 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable nav */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 space-y-0.5 px-3">
          {/* Main nav */}
          {mainNav.map((item) => (
            <NavRow
              key={item.label}
              item={item}
              openSections={openSections}
              onToggleSection={toggleSection}
              activePage={activePage}
              onNavigate={onNavigate}
              onClose={handleCollapse}
            />
          ))}

          {/* AI Agent section */}
          <div className="pt-3 mt-3 border-t border-white/8">
            <p className="px-3 pb-1.5 text-[10px] font-semibold text-neutral-500 uppercase tracking-widest">
              AI Agent
            </p>
            <button
              onClick={() => {
                onNavigate("agent-activity");
                handleCollapse();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer group justify-start ${
                activePage === "agent-activity"
                  ? "bg-white/10 text-white border border-white/12"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Bot className={`w-4 h-4 shrink-0 transition-colors ${activePage === "agent-activity" ? "text-violet-400" : "group-hover:text-violet-400"}`} />
              <span className="text-sm text-neutral-300 group-hover:text-white font-medium">
                Agent Activity
              </span>
            </button>
          </div>
        </div>

        {/* Bottom pinned items */}
        <div className="shrink-0 border-t border-white/8 px-3 py-2 space-y-0.5">
          {bottomNav.map((item) => {
            const mappedPage = bottomPageMap[item.label];
            const isActive = mappedPage !== undefined && activePage === mappedPage;
            return (
              <button
                key={item.label}
                onClick={() => {
                  if (mappedPage) {
                    onNavigate(mappedPage);
                    handleCollapse();
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-colors cursor-pointer group justify-start ${
                  isActive
                    ? "bg-white/10 text-white border border-white/12"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className={`shrink-0 transition-colors ${isActive ? "text-violet-400" : "group-hover:text-white"}`}>
                  {item.icon}
                </span>
                <span className="text-sm text-neutral-300 group-hover:text-white font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* User profile */}
        <div className="shrink-0 border-t border-white/8 px-3 py-3">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center shrink-0">
              <CircleUserRound className="w-4 h-4 text-neutral-300" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-white font-medium truncate leading-none mb-0.5">Nishant</p>
              <p className="text-xs text-neutral-500 truncate">Student</p>
            </div>
            <button
              onClick={() => {
                onSignOut();
                handleCollapse();
              }}
              title="Sign out"
              className="shrink-0 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/8 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
