import { useState } from "react";
import {
  CircleUserRound,
  Target,
  Bot,
  FileText,
  Bell,
  Shield,
  BadgeCheck,
  ShieldCheck,
  Upload,
  Settings,
  CheckCircle2,
  Sparkles,
  IndianRupee,
  Pencil,
  KeyRound,
  LogOut,
  Trash2,
  X,
  ChevronRight,
  Lock,
  Globe,
  Building2,
  Eye,
  GraduationCap,
} from "lucide-react";
import type { Page } from "../App";

// ─── Types ────────────────────────────────────────────────────────────────────

type Section = "profile" | "career" | "agent" | "documents" | "notifications" | "privacy";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function CardWrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white/[0.03] border border-white/8 rounded-2xl ${className}`}>{children}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-3">{children}</p>;
}

function FieldRow({ label, value, editing, inputType = "text", onChange }: {
  label: string; value: string; editing: boolean;
  inputType?: string; onChange?: (v: string) => void;
}) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-white/5 last:border-0">
      <span className="text-xs text-white/30 w-28 shrink-0">{label}</span>
      {editing ? (
        <input
          type={inputType}
          defaultValue={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white/75 focus:outline-none focus:border-violet-500/40 transition-all"
        />
      ) : (
        <span className="flex-1 text-xs text-white/65 text-right">{value}</span>
      )}
    </div>
  );
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer border shrink-0 ${
        enabled ? "bg-violet-600/50 border-violet-500/40" : "bg-white/6 border-white/10"
      }`}
    >
      <span className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200 ${
        enabled ? "translate-x-4 bg-violet-200" : "translate-x-0.5 bg-white/25"
      }`} />
    </button>
  );
}

function MultiChip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
        selected
          ? "bg-violet-500/15 border-violet-500/28 text-violet-200"
          : "bg-white/4 border-white/8 text-white/38 hover:text-white/65 hover:bg-white/6"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Section: Profile ─────────────────────────────────────────────────────────

function ProfileSection() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-white/90 mb-0.5">Your Profile</h2>
        <p className="text-xs text-white/35">Personal information used across KickSkill.</p>
      </div>

      {/* Avatar + name */}
      <CardWrap className="p-5">
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600/35 to-indigo-700/35 border border-white/10 flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-white/85">NS</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-white/90">Nishant Singh</p>
            <p className="text-xs text-white/38 mt-0.5">Student · IIIT Tiruchirappalli</p>
          </div>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/4 text-xs text-white/45 hover:text-white/80 hover:border-white/18 transition-all cursor-pointer shrink-0"
            >
              <Pencil className="w-3 h-3" />
              Edit Profile
            </button>
          )}
        </div>
        <div>
          <FieldRow label="Email" value="nishant@example.com" editing={editing} inputType="email" />
          <FieldRow label="Institution" value="IIIT Tiruchirappalli" editing={editing} />
          <FieldRow label="Degree" value="B.Tech" editing={editing} />
          <FieldRow label="Field" value="Computer Science" editing={editing} />
          <FieldRow label="Graduation Year" value="2027" editing={editing} />
        </div>
        {editing && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/6">
            <div className={`text-xs text-violet-300/80 transition-opacity ${saved ? "opacity-100" : "opacity-0"}`}>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Changes saved.</span>
            </div>
            <div className="flex gap-2 ml-auto">
              <button onClick={() => setEditing(false)} className="px-4 py-1.5 rounded-xl text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-violet-600/20 border border-violet-500/28 text-violet-200 text-xs font-medium hover:bg-violet-600/30 transition-all cursor-pointer">
                <CheckCircle2 className="w-3 h-3" /> Save Changes
              </button>
            </div>
          </div>
        )}
      </CardWrap>
    </div>
  );
}

// ─── Section: Career Preferences ─────────────────────────────────────────────

function CareerSection({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white/90 mb-0.5">Career Preferences</h2>
          <p className="text-xs text-white/35">Your current career goal and targeting preferences.</p>
        </div>
        <button
          onClick={() => onNavigate("career-goal")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600/14 border border-violet-500/22 text-violet-200 text-xs font-medium hover:bg-violet-600/22 transition-all cursor-pointer shrink-0 ml-4"
        >
          <Target className="w-3 h-3" />
          Edit Career Goal
        </button>
      </div>

      <CardWrap className="p-5">
        <div className="space-y-4">
          {[
            { label: "Target Role", value: "AI / ML Engineer" },
            { label: "Preferred Industries", value: "Technology · AI · Software" },
            { label: "Preferred Locations", value: "India · Remote" },
            { label: "Work Mode", value: "Remote · Hybrid" },
            { label: "Opportunity Types", value: "Internships · Jobs · Projects" },
            { label: "Target Timeline", value: "6 Months" },
          ].map((row) => (
            <div key={row.label} className="flex items-start justify-between py-2.5 border-b border-white/5 last:border-0">
              <span className="text-xs text-white/30 w-36 shrink-0">{row.label}</span>
              <span className="flex-1 text-xs text-white/65 text-right">{row.value}</span>
            </div>
          ))}
        </div>
      </CardWrap>
    </div>
  );
}

// ─── Section: Agent Permissions ───────────────────────────────────────────────

const agentModes = [
  {
    id: "ask",
    label: "Ask Before Every Action",
    desc: "KickSkill prepares actions but asks for your confirmation before performing them.",
  },
  {
    id: "prepare",
    label: "Auto-Prepare",
    desc: "KickSkill can search opportunities and prepare applications automatically.",
  },
  {
    id: "apply",
    label: "Auto-Apply",
    desc: "KickSkill can automatically apply to qualifying opportunities where automation is permitted.",
  },
];

function AgentSection() {
  const [agentMode, setAgentMode] = useState("apply");
  const [minMatch, setMinMatch] = useState("85");
  const [minStipend, setMinStipend] = useState("15000");
  const [roles, setRoles] = useState(new Set(["AI / ML", "Software Engineering", "Backend"]));
  const [locations, setLocations] = useState(new Set(["India", "Remote"]));
  const [modes, setModes] = useState(new Set(["Remote", "Hybrid"]));
  const [saved, setSaved] = useState(false);

  function toggle<T>(s: Set<T>, v: T) { const n = new Set(s); n.has(v) ? n.delete(v) : n.add(v); return n; }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-white/90 mb-0.5">KickSkill Agent</h2>
        <p className="text-xs text-white/35">Control what KickSkill can do on your behalf.</p>
      </div>

      {/* Mode selector */}
      <CardWrap className="p-5">
        <SectionLabel>Agent Mode</SectionLabel>
        <div className="space-y-2">
          {agentModes.map((m) => (
            <button
              key={m.id}
              onClick={() => setAgentMode(m.id)}
              className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                agentMode === m.id
                  ? "bg-violet-500/10 border-violet-500/28"
                  : "bg-white/[0.02] border-white/6 hover:bg-white/4 hover:border-white/10"
              }`}
            >
              <div className={`mt-0.5 w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center ${
                agentMode === m.id ? "border-violet-400 bg-violet-500/30" : "border-white/20"
              }`}>
                {agentMode === m.id && <div className="w-1.5 h-1.5 rounded-full bg-violet-300" />}
              </div>
              <div>
                <p className={`text-sm font-semibold leading-none mb-1 ${agentMode === m.id ? "text-violet-200" : "text-white/55"}`}>
                  {m.label.toUpperCase()}
                </p>
                <p className="text-xs text-white/35 leading-relaxed">{m.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </CardWrap>

      {/* Application rules */}
      <CardWrap className="p-5">
        <SectionLabel>Application Rules</SectionLabel>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1.5">Minimum Match</p>
              <div className="relative">
                <input type="number" value={minMatch} onChange={(e) => setMinMatch(e.target.value)} min="0" max="100"
                  className="w-full pr-6 pl-3 py-2 bg-white/4 border border-white/8 rounded-xl text-sm text-white/65 focus:outline-none focus:border-violet-500/40 transition-all [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/28">%</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1.5">Minimum Stipend</p>
              <div className="relative">
                <IndianRupee className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-white/25 pointer-events-none" />
                <input type="number" value={minStipend} onChange={(e) => setMinStipend(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 bg-white/4 border border-white/8 rounded-xl text-sm text-white/65 focus:outline-none focus:border-violet-500/40 transition-all [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
              </div>
            </div>
          </div>
          <div>
            <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2">Preferred Roles</p>
            <div className="flex flex-wrap gap-1.5">
              {["AI / ML", "Software Engineering", "Backend", "Data Science", "Cloud"].map((r) => (
                <MultiChip key={r} label={r} selected={roles.has(r)} onClick={() => setRoles(toggle(roles, r))} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2">Location</p>
            <div className="flex flex-wrap gap-1.5">
              {["India", "Remote", "International"].map((l) => (
                <MultiChip key={l} label={l} selected={locations.has(l)} onClick={() => setLocations(toggle(locations, l))} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2">Work Mode</p>
            <div className="flex flex-wrap gap-1.5">
              {["Remote", "Hybrid", "On-site"].map((m) => (
                <MultiChip key={m} label={m} selected={modes.has(m)} onClick={() => setModes(toggle(modes, m))} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/6">
          <div className={`text-xs text-violet-300/80 transition-opacity ${saved ? "opacity-100" : "opacity-0"}`}>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> Rules saved.</span>
          </div>
          <button
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
            className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-violet-600/18 border border-violet-500/25 text-violet-200 text-xs font-medium hover:bg-violet-600/28 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-3 h-3" /> Save Agent Rules
          </button>
        </div>
      </CardWrap>

      {/* Protected actions */}
      <CardWrap className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-white/25" />
          <SectionLabel>Protected Actions</SectionLabel>
        </div>
        <p className="text-[11px] text-white/25 mb-3 leading-relaxed">KickSkill will never perform the following actions, regardless of instructions or permissions.</p>
        <div className="space-y-2">
          {[
            "Invent skills or experience",
            "Modify verified credentials",
            "Submit false information",
            "Make payments",
            "Accept employment contracts",
            "Accept job offers",
            "Apply twice to the same opportunity",
          ].map((rule) => (
            <div key={rule} className="flex items-center gap-2.5">
              <ShieldCheck className="w-3 h-3 text-white/18 shrink-0" />
              <span className="text-xs text-white/32">{rule}</span>
            </div>
          ))}
        </div>
      </CardWrap>

    </div>
  );
}

// ─── Section: Documents ───────────────────────────────────────────────────────

const docs = [
  { type: "Resume",           name: "AI/ML Resume v3",      status: "verified",  icon: <FileText className="w-4 h-4" /> },
  { type: "Resume",           name: "General Resume",        status: "uploaded",  icon: <FileText className="w-4 h-4" /> },
  { type: "Certificates",     name: "4 certificates",        status: "verified",  icon: <BadgeCheck className="w-4 h-4" /> },
  { type: "Academic Records", name: "Transcript 2024–2026",  status: "verified",  icon: <GraduationCap className="w-4 h-4" /> },
  { type: "Portfolio",        name: "GitHub Profile",        status: "uploaded",  icon: <Eye className="w-4 h-4" /> },
];

function DocStatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    verified: { cls: "bg-violet-500/8 border-violet-500/15 text-violet-300/70", label: "Verified" },
    uploaded: { cls: "bg-white/5 border-white/10 text-white/38", label: "Uploaded" },
    pending:  { cls: "bg-white/5 border-white/10 text-white/38", label: "Pending" },
  };
  const s = map[status] ?? map.uploaded;
  return <span className={`px-2 py-0.5 rounded-md text-[10px] border ${s.cls}`}>{s.label}</span>;
}

function DocumentsSection() {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white/90 mb-0.5">Documents</h2>
          <p className="text-xs text-white/35">Files the KickSkill Agent can use when preparing applications.</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600/14 border border-violet-500/22 text-violet-200 text-xs font-medium hover:bg-violet-600/22 transition-all cursor-pointer shrink-0 ml-4">
          <Upload className="w-3 h-3" /> Upload Document
        </button>
      </div>

      <CardWrap className="divide-y divide-white/5">
        {docs.map((doc) => (
          <div key={doc.name} className="flex items-center gap-4 px-5 py-4">
            <div className="w-8 h-8 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center text-white/35 shrink-0">
              {doc.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/70 font-medium leading-none mb-0.5">{doc.name}</p>
              <p className="text-[10px] text-white/28">{doc.type}</p>
            </div>
            <DocStatusBadge status={doc.status} />
          </div>
        ))}
      </CardWrap>

      {/* Default application profile */}
      <CardWrap className="p-5">
        <SectionLabel>Default Application Profile</SectionLabel>
        <div className="space-y-2.5 mb-4">
          {[
            { label: "Default Resume",             value: "AI/ML Resume v3" },
            { label: "Cover Letter Style",         value: "Professional" },
            { label: "Default Portfolio",          value: "Skill Passport" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
              <span className="text-xs text-white/30">{row.label}</span>
              <span className="text-xs text-white/60 font-medium">{row.value}</span>
            </div>
          ))}
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/45 hover:text-white/80 hover:border-white/18 transition-all cursor-pointer">
          <Settings className="w-3 h-3" /> Manage Application Profile
        </button>
      </CardWrap>
    </div>
  );
}

// ─── Section: Notifications ───────────────────────────────────────────────────

const notifItems = [
  { id: "matches",    label: "New opportunity matches",    desc: "When KickSkill finds a new match above your threshold" },
  { id: "submitted",  label: "Application submitted",      desc: "When the agent submits an application on your behalf" },
  { id: "status",     label: "Application status changed", desc: "Resume viewed, shortlisted, or rejected" },
  { id: "interview",  label: "Interview invitations",      desc: "When you receive an interview invitation" },
  { id: "offers",     label: "Offers",                     desc: "When you receive a job or internship offer" },
  { id: "gaps",       label: "Skill gap alerts",           desc: "When new skill gaps are identified for your target role" },
  { id: "learning",   label: "Learning recommendations",   desc: "Personalised course and project suggestions" },
  { id: "agent",      label: "Agent activity",             desc: "Summary of what KickSkill did for your career today" },
];

function NotificationsSection() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(notifItems.map((n) => [n.id, n.id !== "agent"]))
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-white/90 mb-0.5">Notifications</h2>
        <p className="text-xs text-white/35">Choose which KickSkill events you want to be notified about.</p>
      </div>
      <CardWrap className="divide-y divide-white/5">
        {notifItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between px-5 py-4">
            <div className="flex-1 min-w-0 pr-4">
              <p className="text-sm text-white/70 leading-none mb-0.5">{item.label}</p>
              <p className="text-[11px] text-white/28 leading-relaxed">{item.desc}</p>
            </div>
            <Toggle enabled={enabled[item.id]} onChange={(v) => setEnabled((p) => ({ ...p, [item.id]: v }))} />
          </div>
        ))}
      </CardWrap>
    </div>
  );
}

// ─── Section: Privacy ─────────────────────────────────────────────────────────

const visibilityOptions = ["Private", "Institutions", "Verified Industry", "Public"];

const visibilityIcons: Record<string, React.ReactNode> = {
  Private:           <Lock className="w-3 h-3" />,
  Institutions:      <Building2 className="w-3 h-3" />,
  "Verified Industry": <BadgeCheck className="w-3 h-3" />,
  Public:            <Globe className="w-3 h-3" />,
};

const privacyToggles = [
  { id: "matching",    label: "Opportunity matching",       desc: "Allow KickSkill to match your profile with opportunities" },
  { id: "discovery",  label: "Industry discovery",         desc: "Allow verified employers to discover your profile" },
  { id: "ai",         label: "AI personalisation",         desc: "Use your activity to improve recommendations" },
  { id: "storage",    label: "Application data storage",   desc: "Store application history for analytics and insights" },
];

const aiSources = [
  "Skill Profile", "Skill Assessments", "Projects",
  "Certifications", "Career Goal", "Application History",
  "Learning Progress", "Industry Demand",
];

function PrivacySection({ onSignOut }: { onSignOut: () => void }) {
  const [profileVisibility, setProfileVisibility] = useState("Verified Industry");
  const [passportVisibility, setPassportVisibility] = useState("Verified Industry");
  const [ptEnabled, setPtEnabled] = useState<Record<string, boolean>>({ matching: true, discovery: true, ai: true, storage: true });
  const [aiEnabled, setAiEnabled] = useState<Record<string, boolean>>(Object.fromEntries(aiSources.map((s) => [s, true])));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-white/90 mb-0.5">Privacy & Data</h2>
        <p className="text-xs text-white/35">Control how your information is used and who can see it.</p>
      </div>

      {/* Visibility controls */}
      <CardWrap className="p-5">
        <SectionLabel>Profile Visibility</SectionLabel>
        <div className="space-y-4">
          {[
            { label: "Profile Visibility",         value: profileVisibility,   setter: setProfileVisibility },
            { label: "Skill Passport Visibility",  value: passportVisibility,  setter: setPassportVisibility },
          ].map((item) => (
            <div key={item.label} className="pb-4 border-b border-white/5 last:border-0 last:pb-0">
              <p className="text-xs text-white/45 mb-2">{item.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {visibilityOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => item.setter(opt)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all cursor-pointer ${
                      item.value === opt
                        ? "bg-violet-500/15 border-violet-500/28 text-violet-200"
                        : "bg-white/4 border-white/8 text-white/35 hover:text-white/65 hover:bg-white/6"
                    }`}
                  >
                    {visibilityIcons[opt]}
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardWrap>

      {/* Privacy toggles */}
      <CardWrap className="divide-y divide-white/5">
        {privacyToggles.map((item) => (
          <div key={item.id} className="flex items-center justify-between px-5 py-4">
            <div className="flex-1 min-w-0 pr-4">
              <p className="text-sm text-white/68 leading-none mb-0.5">{item.label}</p>
              <p className="text-[11px] text-white/28 leading-relaxed">{item.desc}</p>
            </div>
            <Toggle enabled={ptEnabled[item.id]} onChange={(v) => setPtEnabled((p) => ({ ...p, [item.id]: v }))} />
          </div>
        ))}
      </CardWrap>

      {/* AI personalisation sources */}
      <CardWrap className="p-5">
        <SectionLabel>AI Personalisation</SectionLabel>
        <p className="text-[11px] text-white/28 mb-4 leading-relaxed">
          KickSkill uses these signals to improve opportunity matching and career recommendations.
        </p>
        <div className="space-y-2">
          {aiSources.map((src) => (
            <div key={src} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
              <span className="text-xs text-white/55">{src}</span>
              <Toggle enabled={aiEnabled[src]} onChange={(v) => setAiEnabled((p) => ({ ...p, [src]: v }))} />
            </div>
          ))}
        </div>
      </CardWrap>

      {/* Account */}
      <CardWrap className="p-5">
        <SectionLabel>Account</SectionLabel>
        <div className="space-y-2">
          {[
            { label: "Email",               value: "nishant@example.com" },
            { label: "Password",            value: "••••••••••••" },
            { label: "Connected Accounts",  value: "GitHub · Google" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
              <span className="text-xs text-white/30">{row.label}</span>
              <span className="text-xs text-white/55">{row.value}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/6">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/4 text-xs text-white/45 hover:text-white/80 hover:border-white/18 transition-all cursor-pointer">
            <KeyRound className="w-3 h-3" /> Change Password
          </button>
          <button onClick={onSignOut} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/4 text-xs text-white/45 hover:text-white/80 hover:border-white/18 transition-all cursor-pointer">
            <LogOut className="w-3 h-3" /> Sign Out
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/8 bg-white/3 text-xs text-white/35 hover:text-white/60 hover:border-white/15 transition-all cursor-pointer ml-auto"
          >
            <Trash2 className="w-3 h-3" /> Delete Account
          </button>
        </div>
      </CardWrap>

      {/* Delete confirm overlay */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md" onClick={() => setShowDeleteConfirm(false)}>
          <div className="relative w-full max-w-sm bg-black/90 border border-white/10 rounded-2xl p-6 shadow-[0_8px_64px_rgba(0,0,0,0.7)]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowDeleteConfirm(false)} className="absolute top-4 right-4 text-white/25 hover:text-white/60 cursor-pointer transition-colors">
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-semibold text-white/90 mb-1">Delete Account</h3>
            <p className="text-xs text-white/40 leading-relaxed mb-5">
              This will permanently delete your KickSkill account, profile, skill passport, and all application history. This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-2 rounded-xl border border-white/10 bg-white/4 text-xs text-white/45 hover:text-white/80 transition-all cursor-pointer">Cancel</button>
              <button className="flex-1 py-2 rounded-xl border border-white/12 bg-white/6 text-xs text-white/55 hover:bg-white/10 transition-all cursor-pointer">Delete Account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "profile",       label: "Profile",              icon: <CircleUserRound className="w-4 h-4" /> },
  { id: "career",        label: "Career Preferences",   icon: <Target className="w-4 h-4" /> },
  { id: "agent",         label: "Agent Permissions",    icon: <Bot className="w-4 h-4" /> },
  { id: "documents",     label: "Documents",            icon: <FileText className="w-4 h-4" /> },
  { id: "notifications", label: "Notifications",        icon: <Bell className="w-4 h-4" /> },
  { id: "privacy",       label: "Privacy",              icon: <Shield className="w-4 h-4" /> },
];

interface SettingsPageProps {
  onNavigate: (p: Page) => void;
}

export default function SettingsPage({ onNavigate }: SettingsPageProps) {
  const [activeSection, setActiveSection] = useState<Section>("profile");

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden bg-black">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-4 sm:py-8 pl-16 sm:pl-16">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white/92 mb-1">Profile & Settings</h1>
          <p className="text-xs sm:text-sm text-white/38">Manage your identity, preferences and KickSkill experience.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-start w-full">

          {/* Settings nav — vertical on desktop, horizontal on mobile */}
          <nav className="shrink-0 w-full sm:w-48 xl:w-52">
            {/* Mobile: horizontal scroll */}
            <div className="flex sm:hidden gap-1 overflow-x-auto pb-2 mb-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    activeSection === item.id
                      ? "bg-violet-500/15 border-violet-500/25 text-violet-200"
                      : "bg-white/4 border-white/8 text-white/40 hover:text-white/70"
                  }`}
                >
                  {item.icon}
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              ))}
            </div>
            {/* Desktop: vertical list */}
            <div className="hidden sm:flex flex-col gap-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-left transition-all cursor-pointer ${
                    activeSection === item.id
                      ? "bg-violet-500/12 border border-violet-500/22 text-violet-200 font-medium"
                      : "text-white/40 hover:text-white/70 hover:bg-white/5"
                  }`}
                >
                  <span className={activeSection === item.id ? "text-violet-300" : "text-white/28"}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Section content */}
          <div className="flex-1 min-w-0">
            {activeSection === "profile"       && <ProfileSection />}
            {activeSection === "career"        && <CareerSection onNavigate={onNavigate} />}
            {activeSection === "agent"         && <AgentSection />}
            {activeSection === "documents"     && <DocumentsSection />}
            {activeSection === "notifications" && <NotificationsSection />}
            {activeSection === "privacy"       && <PrivacySection onSignOut={() => onNavigate("home")} />}
          </div>
        </div>

        <div className="h-12" />
      </div>
    </div>
  );
}
