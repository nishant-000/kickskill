import { useState, useRef, useEffect, useCallback } from "react";
import Sidebar from "./Sidebar";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import SkillsPage from "./pages/SkillsPage";
import LearningPage from "./pages/LearningPage";
import SkillPassportPage from "./pages/SkillPassportPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import AgentActivityPage from "./pages/AgentActivityPage";
import CareerGoalPage from "./pages/CareerGoalPage";
import SettingsPage from "./pages/SettingsPage";
import IndustryPage from "./pages/IndustryPage";
import RoleSelectionPage from "./pages/RoleSelectionPage";

export type Page = "home" | "opportunities" | "skills" | "learning" | "skill-passport" | "applications" | "agent-activity" | "career-goal" | "settings" | "industry" | "role-select";
import {
  ArrowUpIcon,
  Paperclip,
  Search,
  BrainCircuit,
  Route,
  FileText,
  Send,
  TrendingUp,
  X,
} from "lucide-react";

function useAutoResizeTextarea({
  minHeight,
  maxHeight,
}: {
  minHeight: number;
  maxHeight?: number;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }
      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Infinity)
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    if (textareaRef.current)
      textareaRef.current.style.height = `${minHeight}px`;
  }, [minHeight]);

  return { textareaRef, adjustHeight };
}

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function QuickAction({ icon, label, onClick }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border border-white/10 bg-black/60 text-white text-xs sm:text-sm hover:bg-black/80 hover:border-white/20 transition-colors cursor-pointer"
    >
      <span className="shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

interface SignUpData {
  name: string;
  email: string;
  institution: string;
  degree: string;
  branch: string;
  graduationYear: string;
  careerGoal: string;
  targetRole: string;
  currentSkills: string;
}

const emptySignUp: SignUpData = {
  name: "",
  email: "",
  institution: "",
  degree: "",
  branch: "",
  graduationYear: "",
  careerGoal: "",
  targetRole: "",
  currentSkills: "",
};

const glassModal =
  "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md";
const glassPanel =
  "relative w-[92%] sm:w-full max-w-sm bg-violet-950/40 backdrop-blur-2xl border border-violet-400/15 rounded-2xl p-6 sm:p-8 shadow-[0_8px_48px_rgba(0,0,0,0.6)] ring-1 ring-white/5 mx-auto";
const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/25 focus:bg-white/8 transition-all";
const labelCls = "block text-xs text-white/40 mb-1.5 tracking-wide uppercase";

export default function App() {
  const [message, setMessage] = useState("");
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 48,
    maxHeight: 150,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activePage, setActivePage] = useState<Page>("role-select");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  const [showSignIn, setShowSignIn] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpStep, setSignUpStep] = useState(0);
  const [signUpData, setSignUpData] = useState<SignUpData>(emptySignUp);

  function handleQuickAction(prompt: string) {
    setMessage(prompt);
  }

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    const name = signInEmail.split("@")[0] || "there";
    setUserName(name.charAt(0).toUpperCase() + name.slice(1));
    setIsAuthenticated(true);
    setShowSignIn(false);
    setSignInEmail("");
    setSignInPassword("");
    setActivePage("home");
  }

  function handleSignUpNext(e: React.FormEvent) {
    e.preventDefault();
    if (signUpStep < 2) {
      setSignUpStep((s) => s + 1);
    } else {
      setUserName(
        signUpData.name.trim()
          ? signUpData.name.trim().split(" ")[0]
          : "there"
      );
      setIsAuthenticated(true);
      setShowSignUp(false);
      setSignUpStep(0);
      setSignUpData(emptySignUp);
    }
  }

  function updateSignUp(field: keyof SignUpData, value: string) {
    setSignUpData((prev) => ({ ...prev, [field]: value }));
  }

  const quickActions = [
    {
      icon: <Search className="w-4 h-4" />,
      label: "Find Opportunities",
      prompt: "Find internships and jobs that match my skills and career goals.",
    },
    {
      icon: <BrainCircuit className="w-4 h-4" />,
      label: "Analyze My Skills",
      prompt: "Analyze my current skills and identify my strengths and skill gaps.",
    },
    {
      icon: <Route className="w-4 h-4" />,
      label: "Career Roadmap",
      prompt:
        "Create a personalized career roadmap based on my current skills and target career.",
    },
    {
      icon: <FileText className="w-4 h-4" />,
      label: "Improve My Resume",
      prompt: "Analyze my resume and suggest improvements for my target roles.",
    },
    {
      icon: <Send className="w-4 h-4" />,
      label: "Apply for Me",
      prompt:
        "Find suitable opportunities and prepare applications based on my preferences and permissions.",
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      label: "Career Progress",
      prompt:
        "Show my career readiness, progress, applications and the skills I should improve next.",
    },
  ];

  return (
    <main className="w-full h-full bg-black text-white overflow-hidden">
      {activePage !== "role-select" && activePage !== "industry" && (
        <Sidebar
          expanded={sidebarExpanded}
          onExpandChange={setSidebarExpanded}
          activePage={activePage}
          onNavigate={setActivePage}
          onSignOut={() => { setIsAuthenticated(false); setUserName(""); setActivePage("role-select"); }}
        />
      )}
      {activePage === "opportunities" && (
        <div className="relative w-full h-full">
          <OpportunitiesPage />
        </div>
      )}
      {activePage === "skills" && (
        <div className="relative w-full h-full">
          <SkillsPage onNavigate={setActivePage} />
        </div>
      )}
      {activePage === "learning" && (
        <div className="relative w-full h-full">
          <LearningPage />
        </div>
      )}
      {activePage === "skill-passport" && (
        <div className="relative w-full h-full">
          <SkillPassportPage onNavigate={setActivePage} />
        </div>
      )}
      {activePage === "applications" && (
        <div className="relative w-full h-full">
          <ApplicationsPage onNavigate={setActivePage} />
        </div>
      )}
      {activePage === "agent-activity" && (
        <div className="relative w-full h-full">
          <AgentActivityPage onNavigate={setActivePage} />
        </div>
      )}
      {activePage === "career-goal" && (
        <div className="relative w-full h-full">
          <CareerGoalPage onNavigate={setActivePage} />
        </div>
      )}
      {activePage === "settings" && (
        <div className="relative w-full h-full">
          <SettingsPage onNavigate={setActivePage} />
        </div>
      )}
      {activePage === "industry" && (
        <div className="fixed inset-0 z-20">
          <IndustryPage
            onSwitchWorkspace={() => setActivePage("home")}
            onSignOut={() => setActivePage("role-select")}
          />
        </div>
      )}
      {activePage === "role-select" && (
        <div className="fixed inset-0 z-30">
          <RoleSelectionPage onNavigate={setActivePage} />
        </div>
      )}
      <div
        className={`relative w-full h-full bg-cover bg-center flex flex-col items-center overflow-hidden ${activePage !== "home" ? "hidden" : ""}`}
        style={{
          backgroundImage:
            "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon_2.png')",
        }}
      >
        {/* Top-right auth */}
        <div className="absolute top-3.5 right-3.5 sm:top-6 sm:right-6 flex items-center gap-3 z-10">
          {isAuthenticated ? (
            <button
              onClick={() => { setIsAuthenticated(false); setUserName(""); setActivePage("role-select"); }}
              className="px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-lg text-xs sm:text-sm border border-neutral-700 bg-black/40 backdrop-blur-sm text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => setShowSignIn(true)}
              className="px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-lg text-xs sm:text-sm border border-white/10 bg-black/50 backdrop-blur-md text-neutral-200 hover:text-white hover:bg-black/70 hover:border-white/20 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Scrollable middle */}
        <div className="flex-1 w-full overflow-y-auto min-h-0" />

        {/* Fixed bottom: title + input + quick actions */}
        <div className="w-full max-w-3xl lg:max-w-4xl px-4 sm:px-6 pb-8 sm:pb-16 md:pb-[20vh] shrink-0 mx-auto">
          <div className="text-center mb-6 sm:mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold drop-shadow-sm shimmer-text">
              {isAuthenticated ? `${getGreeting()}, ${userName}.` : "KickSkill AI"}
            </h1>
            {isAuthenticated && (
              <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-neutral-200">What are we working toward today?</p>
            )}
          </div>
          <div className="relative bg-black/60 backdrop-blur-md rounded-2xl border border-white/12 h-[104px] flex flex-col justify-between shadow-2xl">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask KickSkill anything about your career..."
              className="w-full flex-1 px-4 pt-3 resize-none border-none bg-transparent text-white text-sm focus:outline-none placeholder:text-neutral-400"
              style={{ overflow: "hidden", height: "100%" }}
            />
            <div className="flex items-center justify-between px-3 pb-2">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-md text-white cursor-pointer group"
              >
                <Paperclip className="w-4 h-4 transition-transform duration-200 group-hover:rotate-[-20deg]" />
              </button>
              <button
                disabled={!message.trim()}
                className={`p-2 rounded-lg text-white disabled:cursor-not-allowed cursor-pointer group transition-colors duration-200 ${message.trim() ? "bg-violet-600 hover:bg-violet-500" : "bg-neutral-700 text-neutral-400"}`}
              >
                <ArrowUpIcon className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span className="sr-only">Send</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 max-w-full">
            {quickActions.map((a) => (
              <QuickAction
                key={a.label}
                icon={a.icon}
                label={a.label}
                onClick={() => handleQuickAction(a.prompt)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      {showSignIn && (
        <div className={glassModal} onClick={() => setShowSignIn(false)}>
          <div className={glassPanel} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowSignIn(false)}
              className="absolute top-4 right-4 text-white/30 hover:text-white/80 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-7">
              <h2 className="text-2xl font-semibold text-white mb-1 tracking-tight">
                Welcome back
              </h2>
              <p className="text-sm text-white/40">Sign in to KickSkill</p>
            </div>

            <form onSubmit={handleSignIn} className="flex flex-col gap-5">
              <div>
                <label className={labelCls}>Email</label>
                <input
                  type="email"
                  required
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Password</label>
                <input
                  type="password"
                  required
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputCls}
                />
              </div>
              <button
                type="submit"
                className="mt-1 w-full py-2.5 rounded-xl border border-white/15 bg-white/10 hover:bg-white/18 text-white text-sm font-medium tracking-wide transition-all cursor-pointer backdrop-blur-sm"
              >
                Sign In
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-white/30">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => { setShowSignIn(false); setShowSignUp(true); }}
                className="text-white/60 hover:text-white underline underline-offset-2 cursor-pointer transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className={glassModal} onClick={() => setShowSignUp(false)}>
          <div className={glassPanel} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                setShowSignUp(false);
                setSignUpStep(0);
                setSignUpData(emptySignUp);
              }}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i <= signUpStep ? "bg-white/60" : "bg-neutral-700"
                  }`}
                />
              ))}
            </div>

            {signUpStep === 0 && (
              <>
                <h2 className="text-xl font-semibold text-white mb-1">
                  Create your profile
                </h2>
                <p className="text-sm text-neutral-400 mb-6">
                  Step 1 of 3 — Basic info
                </p>
                <form onSubmit={handleSignUpNext} className="flex flex-col gap-4">
                  <div>
                    <label className={labelCls}>Name</label>
                    <input
                      required
                      value={signUpData.name}
                      onChange={(e) => updateSignUp("name", e.target.value)}
                      placeholder="Your full name"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Email</label>
                    <input
                      type="email"
                      required
                      value={signUpData.email}
                      onChange={(e) => updateSignUp("email", e.target.value)}
                      placeholder="you@example.com"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Institution</label>
                    <input
                      value={signUpData.institution}
                      onChange={(e) =>
                        updateSignUp("institution", e.target.value)
                      }
                      placeholder="University or college"
                      className={inputCls}
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 w-full py-2.5 rounded-lg border border-neutral-600 bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors cursor-pointer"
                  >
                    Continue
                  </button>
                </form>
              </>
            )}

            {signUpStep === 1 && (
              <>
                <h2 className="text-xl font-semibold text-white mb-1">
                  Education
                </h2>
                <p className="text-sm text-neutral-400 mb-6">
                  Step 2 of 3 — Academic details
                </p>
                <form onSubmit={handleSignUpNext} className="flex flex-col gap-4">
                  <div>
                    <label className={labelCls}>Degree</label>
                    <input
                      value={signUpData.degree}
                      onChange={(e) => updateSignUp("degree", e.target.value)}
                      placeholder="e.g. B.Tech, BSc, MBA"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Branch / Field</label>
                    <input
                      value={signUpData.branch}
                      onChange={(e) => updateSignUp("branch", e.target.value)}
                      placeholder="e.g. Computer Science, Design"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Graduation Year</label>
                    <input
                      value={signUpData.graduationYear}
                      onChange={(e) =>
                        updateSignUp("graduationYear", e.target.value)
                      }
                      placeholder="e.g. 2026"
                      className={inputCls}
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 w-full py-2.5 rounded-lg border border-neutral-600 bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors cursor-pointer"
                  >
                    Continue
                  </button>
                </form>
              </>
            )}

            {signUpStep === 2 && (
              <>
                <h2 className="text-xl font-semibold text-white mb-1">
                  Career goals
                </h2>
                <p className="text-sm text-neutral-400 mb-6">
                  Step 3 of 3 — Help KickSkill personalize your experience
                </p>
                <form onSubmit={handleSignUpNext} className="flex flex-col gap-4">
                  <div>
                    <label className={labelCls}>Career Goal</label>
                    <input
                      value={signUpData.careerGoal}
                      onChange={(e) =>
                        updateSignUp("careerGoal", e.target.value)
                      }
                      placeholder="e.g. Get into a top tech company"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Target Role</label>
                    <input
                      value={signUpData.targetRole}
                      onChange={(e) =>
                        updateSignUp("targetRole", e.target.value)
                      }
                      placeholder="e.g. ML Engineer, Product Designer"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Current Skills</label>
                    <input
                      value={signUpData.currentSkills}
                      onChange={(e) =>
                        updateSignUp("currentSkills", e.target.value)
                      }
                      placeholder="e.g. Python, Figma, React"
                      className={inputCls}
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 w-full py-2.5 rounded-lg border border-neutral-600 bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors cursor-pointer"
                  >
                    Create Profile
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
