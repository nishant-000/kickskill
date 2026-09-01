import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CreepyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  coverClassName?: string;
}

type Coords = { x: number; y: number };

export const CreepyButton = ({
  children,
  className,
  coverClassName,
  onClick,
  ...props
}: CreepyButtonProps) => {
  const eyesRef = useRef<HTMLSpanElement>(null);
  const [eyeCoords, setEyeCoords] = useState<Coords>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const updateEyes = (e: React.MouseEvent | React.TouchEvent) => {
    const userEvent =
      "touches" in e ? (e as React.TouchEvent).touches[0] : (e as React.MouseEvent);
    if (!eyesRef.current) return;
    const eyesRect = eyesRef.current.getBoundingClientRect();
    const eyesCenter = { x: eyesRect.left + eyesRect.width / 2, y: eyesRect.top + eyesRect.height / 2 };
    const dx = userEvent.clientX - eyesCenter.x;
    const dy = userEvent.clientY - eyesCenter.y;
    const angle = Math.atan2(-dy, dx) + Math.PI / 2;
    const distance = Math.hypot(dx, dy);
    setEyeCoords({
      x: (Math.sin(angle) * Math.min(distance, 180)) / 180,
      y: (Math.cos(angle) * Math.min(distance, 75)) / 75,
    });
  };

  const resetEyes = () => { setEyeCoords({ x: 0, y: 0 }); setIsHovered(false); };

  const pupilStyle = {
    transform: `translate(calc(-50% + ${eyeCoords.x * 50}%), calc(-50% + ${eyeCoords.y * 50}%))`,
  };

  return (
    <button
      className={cn(
        "relative min-w-[9em] rounded-xl bg-black cursor-pointer outline-none select-none group",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-400",
        className
      )}
      onClick={onClick}
      onMouseMove={(e) => { updateEyes(e); setIsHovered(true); }}
      onTouchMove={updateEyes}
      onMouseLeave={resetEyes}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      {...props}
    >
      <span
        ref={eyesRef}
        className="absolute flex items-center gap-[0.375em] right-[1em] bottom-[0.5em] h-[0.75em] z-0 pointer-events-none"
      >
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="relative w-[0.75em] bg-white rounded-full overflow-hidden"
            animate={{ height: ["0.75em", "0.75em", "0em", "0.75em"] }}
            transition={{ duration: 3, times: [0, 0.92, 0.96, 1], repeat: Infinity, ease: "linear" }}
          >
            <span
              className="absolute top-1/2 left-1/2 w-[0.375em] h-[0.375em] bg-black rounded-full transition-transform duration-75 ease-out"
              style={pupilStyle}
            />
          </motion.span>
        ))}
      </span>

      <motion.span
        className={cn(
          "absolute inset-0 block rounded-xl bg-violet-600 text-white font-bold tracking-wider",
          "shadow-[inset_0_0_0_0.125em_rgba(0,0,0,1)]",
          "flex items-center justify-center px-4 py-2",
          "origin-[1.25em_50%]",
          coverClassName
        )}
        animate={{ rotate: isHovered ? -12 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.8 }}
      >
        {children}
      </motion.span>

      <span className="block opacity-0 px-4 py-2 font-bold tracking-wider min-w-[9em]">
        {children}
      </span>
    </button>
  );
};

export default CreepyButton;
