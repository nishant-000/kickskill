import { GraduationCap, Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import { TwistingRibbon } from "../components/ui/twisting-ribbon";
import type { Page } from "../App";

const ribbonDark = {
  face:  "#7c3aed",
  foldA: "#6366f1",
  foldB: "#a78bfa",
  foldC: "#4338ca",
};

interface RoleSelectionPageProps {
  onNavigate: (p: Page) => void;
}

const roles = [
  {
    page: "home" as Page,
    icon: <GraduationCap className="w-8 h-8" />,
    title: "I'm looking for opportunities",
    desc: "Find internships, jobs and projects that match your verified skills.",
    points: [
      "AI Skill Assessment",
      "Personalized Learning",
      "Skill Passport",
      "AI Opportunity Matching",
      "Application Tracking",
    ],
    cta: "Continue as Student",
  },
  {
    page: "industry" as Page,
    icon: <Building2 className="w-8 h-8" />,
    title: "I'm hiring / looking for talent",
    desc: "Find candidates with verified skills that match what your team needs.",
    points: [
      "Post Opportunities",
      "AI Skill Matching",
      "Verified Candidate Profiles",
      "Shortlisting",
      "Recruitment Management",
    ],
    cta: "Continue as Industry",
  },
];

export default function RoleSelectionPage({ onNavigate }: RoleSelectionPageProps) {
  return (
    <div className="w-full h-full bg-black flex flex-col items-center overflow-auto relative">
      {/* Ribbon background */}
      <div className="absolute inset-0 pointer-events-none">
        <TwistingRibbon
          darkColors={ribbonDark}
          waveAmplitude={1.1}
          waveSpeed={0.014}
          twistCycles={5}
          segments={350}
        />
      </div>
      {/* Vignette overlay so the ribbon doesn't overpower the cards */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,black_80%)]" />
      {/* Top bar */}
      <div className="relative w-full flex items-center px-8 pt-6 shrink-0 z-10">
        <span className="text-sm font-semibold text-white/50 tracking-wide">KickSkill</span>
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex flex-col items-center justify-center w-full px-4 py-12 z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold text-white/92 drop-shadow-sm shimmer-text pb-2">
            What brings you to KickSkill?
          </h1>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl mb-10">
          {roles.map((r) => (
            <button
              key={r.page}
              onClick={() => onNavigate(r.page)}
              className="group text-left p-7 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md hover:bg-black/55 hover:border-white/20 hover:shadow-[0_0_40px_rgba(139,92,246,0.10)] transition-all duration-300 cursor-pointer focus:outline-none"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white/6 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white/65 group-hover:bg-white/8 transition-all mb-6">
                {r.icon}
              </div>

              {/* Text */}
              <p className="text-lg font-semibold text-white/75 group-hover:text-white/92 leading-snug mb-2 transition-colors">
                {r.title}
              </p>
              <p className="text-sm text-white/32 leading-relaxed mb-6">{r.desc}</p>

              {/* Feature points */}
              <ul className="space-y-2 mb-7">
                {r.points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 shrink-0 text-white/18 group-hover:text-violet-400/60 transition-colors" />
                    <span className="text-xs text-white/35">{p}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex items-center gap-2 text-sm font-medium text-white/35 group-hover:text-violet-200 transition-colors">
                {r.cta} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          ))}
        </div>

        {/* Trust line */}
        <p className="text-xs text-white/18">
          Your information is used only to personalise your KickSkill experience.
        </p>
      </div>
    </div>
  );
}
