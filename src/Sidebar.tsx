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
  expanded,
  openSections,
  onToggleSection,
  activePage,
  onNavigate,
}: {
  item: NavItemDef;
  expanded: boolean;
  openSections: Set<string>;
  onToggleSection: (label: string) => void;
  activePage: Page;
  onNavigate: (p: Page) => void;
}) {
  const hasChildren = item.subItems && item.subItems.length > 0;
  const isOpen = openSections.has(item.label);
  const mappedPage = pageMap[item.label];
  const isActive = mappedPage !== undefined && activePage === mappedPage;

  function handleClick() {
    if (mappedPage) {
      onNavigate(mappedPage);
    } else if (hasChildren && expanded) {
      onToggleSection(item.label);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer group ${
          isActive
            ? "bg-white/8 text-white border border-white/10"
            : "text-neutral-400 hover:text-white hover:bg-white/5"
        } ${expanded ? "justify-start" : "justify-center"}`}
      >
        <span className={`shrink-0 transition-colors ${isActive ? "text-white" : "text-neutral-400 group-hover:text-white"}`}>
          {item.icon}
        </span>
        {expanded && (
          <>
            <span className="sidebar-label text-sm text-neutral-300 group-hover:text-white flex-1 text-left truncate">
              {item.label}
            </span>
            {hasChildren && (
              <ChevronRight
                className={`w-3.5 h-3.5 text-neutral-600 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
              />
            )}
          </>
        )}
      </button>

      {expanded && hasChildren && isOpen && (
        <div className="ml-7 mt-0.5 mb-1 space-y-0.5 border-l border-white/8 pl-3">
          {item.subItems!.map((sub) => (
            <button
              key={sub.label}
              className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-neutral-500 hover:text-neutral-200 hover:bg-white/5 transition-colors cursor-pointer text-xs"
            >
              <span className="shrink-0">{sub.icon}</span>
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
    setOpenSections(new Set());
  }

  function handleToggle() {
    if (expanded) handleCollapse();
    else onExpandChange(true);
  }

  return (
    <>
      {/* Overlay backdrop on mobile when expanded */}
      {expanded && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={handleCollapse}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full z-40 flex flex-col
          bg-black/80 backdrop-blur-xl border-r border-white/8
          transition-all duration-300 ease-in-out overflow-hidden
          ${expanded ? "w-[220px]" : "w-16"}`}
      >
        {/* Header */}
        <div
          className={`flex h-14 items-center border-b border-white/8 shrink-0 ${
            expanded ? "justify-between px-4" : "justify-center"
          }`}
        >
            {expanded && (
            <span className="sidebar-label text-sm font-semibold text-white tracking-wide whitespace-nowrap">
              KickSkill
            </span>
          )}
          <button
            onClick={handleToggle}
            aria-expanded={expanded}
            aria-label={expanded ? "Close menu" : "Open menu"}
            className="group p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <svg
              className="pointer-events-none"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12L20 12"
                className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
              />
              <path
                d="M4 12H20"
                className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
              />
              <path
                d="M4 12H20"
                className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable nav */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 space-y-0.5 px-2">
          {/* Main nav */}
          {mainNav.map((item) => (
            <NavRow
              key={item.label}
              item={item}
              expanded={expanded}
              openSections={openSections}
              onToggleSection={toggleSection}
              activePage={activePage}
              onNavigate={onNavigate}
            />
          ))}

          {/* AI Agent section */}
          <div className="pt-3 mt-3 border-t border-white/8">
            {expanded && (
              <p className="sidebar-label px-3 pb-1.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-widest">
                AI Agent
              </p>
            )}
            <button
              onClick={() => onNavigate("agent-activity")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer group ${
                activePage === "agent-activity"
                  ? "bg-white/8 text-white border border-white/10"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              } ${expanded ? "justify-start" : "justify-center"}`}
            >
              <Bot className={`w-4 h-4 shrink-0 transition-colors ${activePage === "agent-activity" ? "text-white" : "group-hover:text-violet-400"}`} />
              {expanded && (
                <span className="sidebar-label text-sm text-neutral-300 group-hover:text-white">
                  Agent Activity
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom pinned items */}
        <div className="shrink-0 border-t border-white/8 px-2 py-2 space-y-0.5">
          {bottomNav.map((item) => {
            const mappedPage = bottomPageMap[item.label];
            const isActive = mappedPage !== undefined && activePage === mappedPage;
            return (
              <button
                key={item.label}
                onClick={() => mappedPage && onNavigate(mappedPage)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer group ${
                  isActive
                    ? "bg-white/8 text-white border border-white/10"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                } ${expanded ? "justify-start" : "justify-center"}`}
              >
                <span className={`shrink-0 transition-colors ${isActive ? "text-white" : "group-hover:text-white"}`}>
                  {item.icon}
                </span>
                {expanded && (
                  <span className="sidebar-label text-sm text-neutral-300 group-hover:text-white">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* User profile */}
        <div className="shrink-0 border-t border-white/8 px-2 py-3">
          <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${expanded ? "" : "justify-center"}`}>
            <div className="w-7 h-7 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center shrink-0">
              <CircleUserRound className="w-4 h-4 text-neutral-400" />
            </div>
            {expanded && (
              <div className="sidebar-label min-w-0 flex-1">
                <p className="text-sm text-white font-medium truncate leading-none mb-0.5">Nishant</p>
                <p className="text-xs text-neutral-500 truncate">Student</p>
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
