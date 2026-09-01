import { useState, useRef, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import clsx from "clsx";

const GooeyFilter = () => (
  <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
    <defs>
      <filter id="goo-effect">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -15"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
);

const SearchIcon = ({ isUnsupported }: { isUnsupported: boolean }) => (
  <motion.svg
    initial={{ opacity: 0, scale: 0.8, x: -4, filter: isUnsupported ? "none" : "blur(5px)" }}
    animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, scale: 0.8, x: -4, filter: isUnsupported ? "none" : "blur(5px)" }}
    transition={{ delay: 0.1, duration: 1, type: "spring", bounce: 0.15 }}
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </motion.svg>
);

const LoadingIcon = () => (
  <svg
    className="gsb-loading-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    aria-label="Loading"
    role="status"
  >
    <rect width="256" height="256" fill="none" />
    {[
      [[128, 32], [128, 64]],
      [[195.88, 60.12], [173.25, 82.75]],
      [[224, 128], [192, 128]],
      [[195.88, 195.88], [173.25, 173.25]],
      [[128, 224], [128, 192]],
      [[60.12, 195.88], [82.75, 173.25]],
      [[32, 128], [64, 128]],
      [[60.12, 60.12], [82.75, 82.75]],
    ].map(([[x1, y1], [x2, y2]], i) => (
      <line
        key={i}
        x1={x1} y1={y1} x2={x2} y2={y2}
        fill="none" stroke="rgba(255,255,255,0.4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"
      />
    ))}
  </svg>
);

const InfoIcon = ({ index }: { index: number }) => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ delay: index * 0.12 + 0.3 }}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20.2832 19.9316"
    className="gsb-info-icon"
    aria-hidden="true"
    fill="none"
  >
    <path
      d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.91420 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.91420 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </motion.svg>
);

const buttonVariants = {
  initial: { x: 0, width: 120 },
  step1: { x: 0, width: 120 },
  step2: { x: -10, width: 220 },
};

const iconVariants = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

export const isUnsupportedBrowser = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent.toLowerCase();
  const isSafari =
    ua.includes("safari") &&
    !ua.includes("chrome") &&
    !ua.includes("chromium") &&
    !ua.includes("android") &&
    !ua.includes("firefox");
  return isSafari || ua.includes("crios");
};

const getResultItemVariants = (index: number, isUnsupported: boolean) => ({
  initial: { y: 0, scale: 0.3, filter: isUnsupported ? "none" : "blur(10px)" },
  animate: { y: (index + 1) * 50, scale: 1, filter: "blur(0px)" },
  exit: { y: isUnsupported ? 0 : -4, scale: 0.8, color: "#000000" },
});

const getResultItemTransition = (index: number) => ({
  duration: 0.75,
  delay: index * 0.12,
  type: "spring" as const,
  bounce: 0.35,
  exit: { duration: index * 0.1 },
});

interface GooeySearchBarProps {
  placeholder?: string;
  suggestions?: string[];
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
  filterActive?: boolean;
}

export const GooeySearchBar = ({
  placeholder = "Search...",
  suggestions = [],
  onSearch,
  onFilterClick,
  filterActive = false,
}: GooeySearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<{
    step: number;
    searchData: string[];
    searchText: string;
    isLoading: boolean;
  }>({
    step: 1,
    searchData: [],
    searchText: "",
    isLoading: false,
  });

  const debouncedSearchText = useDebounce(state.searchText, 400);
  const isUnsupported = useMemo(() => isUnsupportedBrowser(), []);

  const handleButtonClick = () => {
    setState((prev) => ({ ...prev, step: 2 }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, searchText: e.target.value }));
  };

  useEffect(() => {
    if (state.step === 2) {
      inputRef.current?.focus();
    } else {
      setState((prev) => ({ ...prev, searchText: "", searchData: [], isLoading: false }));
    }
  }, [state.step]);

  useEffect(() => {
    let cancelled = false;
    if (debouncedSearchText) {
      setState((prev) => ({ ...prev, isLoading: true }));
      const run = async () => {
        try {
          await new Promise((r) => setTimeout(r, 300));
          const filtered = suggestions.filter((item) =>
            item.toLowerCase().includes(debouncedSearchText.trim().toLowerCase())
          );
          if (!cancelled) {
            setState((prev) => ({ ...prev, searchData: filtered, isLoading: false }));
          }
        } catch {
          if (!cancelled) setState((prev) => ({ ...prev, isLoading: false }));
        }
      };
      run();
    } else {
      setState((prev) => ({ ...prev, searchData: [], isLoading: false }));
    }
    return () => { cancelled = true; };
  }, [debouncedSearchText, suggestions]);

  useEffect(() => {
    onSearch?.(debouncedSearchText);
  }, [debouncedSearchText, onSearch]);

  return (
    <div className="gsb-outer">
      {/* Gooey filter only wraps the search button — never the pill */}
      <div className={clsx("gsb-wrapper", isUnsupported && "gsb-no-goo")}>
        <GooeyFilter />
        <div className="gsb-button-content">
          <motion.div
            className="gsb-button-content-inner"
            initial="initial"
            animate={state.step === 1 ? "step1" : "step2"}
            transition={{ duration: 0.75, type: "spring", bounce: 0.15 }}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key="search-text-wrapper"
                className="gsb-search-results"
                role="listbox"
                aria-label="Search results"
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: isUnsupported ? 0.5 : 1.25, duration: 0.5 }}
              >
                <AnimatePresence mode="popLayout">
                  {state.searchData.map((item, index) => (
                    <motion.div
                      key={item}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      variants={getResultItemVariants(index, isUnsupported)}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={getResultItemTransition(index)}
                      className="gsb-search-result"
                      role="option"
                      onClick={() => {
                        setState((prev) => ({ ...prev, searchText: item }));
                        onSearch?.(item);
                      }}
                    >
                      <div className="gsb-search-result-title">
                        <InfoIcon index={index} />
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.12 + 0.3 }}
                        >
                          {item}
                        </motion.span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            <motion.div
              variants={buttonVariants}
              onClick={handleButtonClick}
              whileHover={{ scale: state.step === 2 ? 1 : 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="gsb-search-btn"
              role="button"
            >
              {state.step === 1 ? (
                <span className="gsb-search-text">Search</span>
              ) : (
                <input
                  ref={inputRef}
                  type="text"
                  className="gsb-search-input"
                  placeholder={placeholder}
                  aria-label="Search input"
                  value={state.searchText}
                  onChange={handleSearch}
                />
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Filter pill — lives outside the gooey filter wrapper so it is never clipped */}
      <AnimatePresence mode="wait">
        {state.step === 2 && (
          <motion.div
            key="filter-pill"
            className={clsx("gsb-separate-element", filterActive && "gsb-separate-element--active")}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={iconVariants}
            transition={{ delay: 0.65, duration: 0.85, type: "spring", bounce: 0.15 }}
            onClick={onFilterClick}
            style={{ cursor: onFilterClick ? "pointer" : "default" }}
            title="Filters"
          >
            {state.isLoading ? (
              <LoadingIcon />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.15, duration: 0.5, type: "spring", bounce: 0.15 }}
              >
                <SlidersHorizontal
                  size={14}
                  strokeWidth={2}
                  className={filterActive ? "text-violet-300" : "text-white/60"}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GooeySearchBar;
