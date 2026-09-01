import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  icon: LucideIcon;
}

interface AnimeNavBarProps {
  items: NavItem[];
  activeTab: string;
  onTabChange: (name: string) => void;
  className?: string;
}

export function AnimeNavBar({ items, activeTab, onTabChange, className }: AnimeNavBarProps) {
  const [mounted, setMounted] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={cn("flex justify-center", className)}>
      <motion.div
        className="flex items-center gap-1 bg-black/50 border border-white/10 backdrop-blur-lg py-1.5 px-1.5 rounded-full shadow-lg relative"
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          const isHovered = hoveredTab === item.name;

          return (
            <button
              key={item.name}
              onClick={() => onTabChange(item.name)}
              onMouseEnter={() => setHoveredTab(item.name)}
              onMouseLeave={() => setHoveredTab(null)}
              className={cn(
                "relative cursor-pointer text-sm font-medium px-5 py-2 rounded-full transition-colors duration-300 select-none",
                "text-white/50 hover:text-white/80",
                isActive && "text-white"
              )}
            >
              {/* Active glow layers */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-violet-500/25 rounded-full blur-md" />
                  <div className="absolute inset-[-4px] bg-violet-500/18 rounded-full blur-xl" />
                  <div className="absolute inset-[-8px] bg-violet-500/12 rounded-full blur-2xl" />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-400/20 to-violet-500/0"
                    style={{ animation: "shine 3s ease-in-out infinite" }}
                  />
                </motion.div>
              )}

              {/* Active solid pill */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-white/8 border border-white/12 -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Label */}
              <motion.span
                className="relative z-10 hidden sm:inline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.span>

              {/* Mobile: icon only */}
              <motion.span
                className="sm:hidden relative z-10"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={16} strokeWidth={2} />
              </motion.span>

              {/* Hover ghost pill */}
              <AnimatePresence>
                {isHovered && !isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 bg-white/6 rounded-full -z-10"
                  />
                )}
              </AnimatePresence>

              {/* Mascot above active tab */}
              {isActive && (
                <motion.div
                  layoutId="anime-mascot"
                  className="absolute -top-11 left-1/2 -translate-x-1/2 pointer-events-none"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="relative w-10 h-10">
                    {/* Head */}
                    <motion.div
                      className="absolute w-9 h-9 bg-white rounded-full left-1/2 -translate-x-1/2"
                      animate={
                        hoveredTab
                          ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }
                          : { y: [0, -3, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }
                      }
                    >
                      {/* Eyes */}
                      <motion.div
                        className="absolute w-1.5 h-1.5 bg-neutral-800 rounded-full"
                        animate={hoveredTab ? { scaleY: [1, 0.1, 1], transition: { duration: 0.2 } } : {}}
                        style={{ left: "26%", top: "38%" }}
                      />
                      <motion.div
                        className="absolute w-1.5 h-1.5 bg-neutral-800 rounded-full"
                        animate={hoveredTab ? { scaleY: [1, 0.1, 1], transition: { duration: 0.2 } } : {}}
                        style={{ right: "26%", top: "38%" }}
                      />
                      {/* Cheeks */}
                      <div className="absolute w-1.5 h-1 bg-violet-300/60 rounded-full" style={{ left: "14%", top: "54%" }} />
                      <div className="absolute w-1.5 h-1 bg-violet-300/60 rounded-full" style={{ right: "14%", top: "54%" }} />
                      {/* Mouth */}
                      <motion.div
                        className="absolute w-3 h-1.5 border-b-2 border-neutral-700 rounded-full"
                        animate={hoveredTab ? { scaleY: 1.5, y: -1 } : { scaleY: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ left: "31%", top: "58%" }}
                      />
                    </motion.div>
                    {/* Tail/body nub */}
                    <motion.div
                      className="absolute -bottom-1 left-1/2 w-3 h-3 -translate-x-1/2"
                      animate={
                        hoveredTab
                          ? { y: [0, -4, 0], transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" } }
                          : { y: [0, 2, 0], transition: { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }
                      }
                    >
                      <div className="w-full h-full bg-white rotate-45 transform origin-center" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}

export default AnimeNavBar;
