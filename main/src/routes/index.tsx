import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import shoe1 from "@/assets/1.png";
import shoe2 from "@/assets/2.png";
import shoe3 from "@/assets/3.png";
import shoe4 from "@/assets/4.png";
import shoe5 from "@/assets/5.png";
import nikeLogo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sneaker — Trending Design" },
      { name: "description", content: "A cinematic sneaker showcase slider with premium motion and color theming." },
      { property: "og:title", content: "Sneaker — Trending Design" },
      { property: "og:description", content: "A cinematic sneaker showcase slider." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        // Added Dancing Script to the font imports for the navbar
        href: "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap",
      },
    ],
  }),
  component: Index,
});

type Slide = {
  id: number;
  img: string;
  bgFrom: string;
  bgTo: string;
  circle: string;
  card: string;
  cardSoft: string;
  accent: string;
  faded: string;
  ring: string;
  ringActive: string;
};

const SLIDES: Slide[] = [
  {
    id: 1,
    img: shoe1,
    bgFrom: "#f6c6d8",
    bgTo: "#f9d9e4",
    circle: "#eaa7c1",
    card: "#e5589a",
    cardSoft: "#f19bbe",
    accent: "#c23271",
    faded: "#e78bb2",
    ring: "#b34274",
    ringActive: "#7a1e46",
  },
  {
    id: 2,
    img: shoe2,
    bgFrom: "#bcd3f7",
    bgTo: "#d6e3fb",
    circle: "#8fb2ec",
    card: "#2f6fe0",
    cardSoft: "#7fa6ee",
    accent: "#1a3f8a",
    faded: "#7aa0e2",
    ring: "#2f5db3",
    ringActive: "#132c66",
  },
  {
    id: 3,
    img: shoe3,
    bgFrom: "#ffd4b0",
    bgTo: "#ffe3c9",
    circle: "#f6b581",
    card: "#f57a2e",
    cardSoft: "#f9a769",
    accent: "#a63f0a",
    faded: "#eea06a",
    ring: "#c85a1a",
    ringActive: "#6b2c07",
  },
  {
    id: 4,
    img: shoe4,
    bgFrom: "#bfe9c9",
    bgTo: "#d7f0dc",
    circle: "#8dcf9e",
    card: "#3aae5a",
    cardSoft: "#7fcf92",
    accent: "#1a5d2e",
    faded: "#7cc48d",
    ring: "#2e8548",
    ringActive: "#124021",
  },
  {
    id: 5,
    img: shoe5,
    bgFrom: "#dcc7f6",
    bgTo: "#e8d9f9",
    circle: "#b8a1e6",
    card: "#8a3fd6",
    cardSoft: "#b487e6",
    accent: "#4a1a86",
    faded: "#a685d8",
    ring: "#6d2fa8",
    ringActive: "#37175e",
  },
];

const luxEase = [0.22, 1, 0.36, 1] as const;

function Index() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const slide = SLIDES[index];

  const go = useCallback((d: 1 | -1) => {
    setDir(d);
    setIndex((i) => (i + d + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden text-neutral-900 select-none"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Animated background gradient (crossfade layer per slide) */}
      <AnimatePresence>
        <motion.div
          key={`bg-${slide.id}`}
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: luxEase }}
          style={{
            background: `linear-gradient(120deg, ${slide.bgFrom} 0%, ${slide.bgTo} 55%, #ffffff 100%)`,
          }}
        />
      </AnimatePresence>

      {/* Soft ambient light overlay for polish */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.55), transparent 45%), radial-gradient(circle at 85% 90%, rgba(0,0,0,0.10), transparent 55%)",
        }}
      />

      {/* Dark wedge bottom-left */}
      <div
        className="absolute -left-40 -bottom-40 h-[520px] w-[520px] rounded-full -z-10"
        style={{ background: "radial-gradient(circle at 30% 30%, #4a3a44 0%, #2a2028 60%, transparent 75%)" }}
      />

      {/* Big Circle */}
      <AnimatePresence>
        <motion.div
          key={`circle-${slide.id}`}
          className="pointer-events-none absolute -z-0"
          style={{
            left: "18%",
            top: "-18%",
            width: "72vw",
            height: "72vw",
            maxWidth: 1100,
            maxHeight: 1100,
            borderRadius: "9999px",
            background: `radial-gradient(circle at 40% 40%, ${slide.circle} 0%, ${slide.card} 65%, ${slide.accent} 100%)`,
            boxShadow: `0 60px 120px -30px ${slide.accent}55`,
          }}
          initial={{ scale: 0.94, opacity: 0, rotate: dir * -4 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 1.02, opacity: 0 }}
          transition={{ duration: 1.2, ease: luxEase }}
        />
      </AnimatePresence>

      {/* Rectangle glass card */}
      <AnimatePresence>
        <motion.div
          key={`rect-${slide.id}`}
          className="pointer-events-none absolute"
          style={{
            left: "34%",
            top: "10%",
            width: "44%",
            height: "70%",
            background: `linear-gradient(180deg, ${slide.cardSoft} 0%, ${slide.card} 100%)`,
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            boxShadow: `0 40px 80px -20px ${slide.accent}66, inset 0 1px 0 rgba(255,255,255,0.25)`,
          }}
          initial={{ x: dir * 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: dir * -60, opacity: 0 }}
          transition={{ duration: 1.1, ease: luxEase }}
        />
      </AnimatePresence>

      {/* Faded huge "NIKE" text behind shoe */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={`faded-${slide.id}`}
            className="font-black tracking-tighter absolute"
            style={{
              color: slide.faded,
              fontSize: "clamp(120px, 22vw, 340px)",
              letterSpacing: "-0.05em",
              mixBlendMode: "multiply",
            }}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 0.55 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 1.2, ease: luxEase }}
          >
            NIKE
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <header className="relative z-30 flex items-center justify-between px-10 pt-8 md:px-16">
        <div className="flex items-center gap-16">
          <img
            src={nikeLogo}
            alt="Nike"
            // Increased height by 50% (h-[48px] vs h-8, md:h-[60px] vs md:h-10) 
            className="w-auto object-contain h-[48px] md:h-[60px]"
            // Shifted right by 5% of viewport width
            style={{ 
              filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))",
              transform: "translateX(5vw)" 
            }}
          />
        </div>
        {/* Changed tracking and uppercase to fit cursive, bumped size by 20% (13px -> 15.6px) */}
        <nav className="hidden md:flex items-center gap-14 font-semibold text-black">
          {["Men", "Women", "Kids", "Collections"].map((label) => (
            <a
              key={label}
              href="#"
              className="group relative py-1 transition-colors hover:text-black/80"
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: "24.6px" }}
            >
              {label}
              <span
                className="pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>
        <div className="w-24" />
      </header>

      {/* Left vertical "TRENDING DESIGN" */}
      <div className="absolute left-4 bottom-16 z-20 flex items-center gap-3 md:left-6">
        <div className="h-px w-8 bg-black/70" />
        <div className="flex flex-col items-start" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          <span className="text-xs font-extrabold tracking-[0.4em] text-black">TRENDING</span>
          <span className="mt-4 text-xs font-medium tracking-[0.4em] text-black/70">DESIGN</span>
        </div>
      </div>

      <div className="absolute top-1/2 z-30 -translate-y-1/2 right-[calc(2rem+6vw)] md:right-[calc(4rem+6vw)]">
        <div className="flex flex-col items-center gap-10">
          {SLIDES.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className="group relative flex items-center gap-4"
                aria-label={`Slide ${i + 1}`}
              >
                <motion.span
                  animate={{
                    scale: active ? 1.2 : 1,
                    color: active ? slide.ringActive : slide.ring,
                  }}
                  transition={{ duration: 0.6, ease: luxEase }}
                  className="text-2xl font-light tabular-nums"
                >
                  {i + 1}
                </motion.span>
                {active && (
                  <motion.span
                    layoutId="ring-indicator"
                    className="absolute -left-3 -top-2 h-10 w-10 rounded-full border"
                    style={{ borderColor: slide.ringActive }}
                    transition={{ duration: 0.7, ease: luxEase }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero content */}
      <main className="relative z-10 mx-auto grid max-w-[1500px] grid-cols-1 gap-6 px-10 pt-6 md:grid-cols-12 md:px-16">
        <div className="col-span-6 pt-6 md:pt-16">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${slide.id}`}
              className="font-black leading-[0.85] tracking-tight text-white"
              style={{
                fontSize: "clamp(70px, 12vw, 190px)",
                letterSpacing: "-0.04em",
                textShadow: "0 20px 60px rgba(0,0,0,0.18)",
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.8, ease: luxEase }}
            >
              <span className="block">SNEA</span>
              <span className="block">
                KER<span style={{ color: slide.ringActive }}>.</span>
              </span>
            </motion.h1>
          </AnimatePresence>
        </div>

        <div className="col-span-6 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`num-${slide.id}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.6, ease: luxEase }}
              className="absolute left-4 top-8 text-2xl font-light text-white/95 md:top-16 tabular-nums"
            >
              {String(index + 1).padStart(2, "0")}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Shoe — continuous physical exchange (no fade, no disappearing) */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <AnimatePresence initial={false} custom={dir}>
          <motion.img
            key={slide.id}
            src={slide.img}
            alt="Sneaker"
            custom={dir}
            className="absolute"
            style={{
              right: "24%",
              top: "18%",
              width: "min(60vw, 900px)",
              filter: "drop-shadow(0 50px 60px rgba(0,0,0,0.28)) drop-shadow(0 20px 25px rgba(0,0,0,0.15))",
              willChange: "transform",
            }}
            variants={{
              enter: (d: 1 | -1) => ({
                x: d === 1 ? "110vw" : "-110vw",
                rotate: d === 1 ? 22 : -22,
                y: 30,
                opacity: 1,
              }),
              center: {
                x: 0,
                rotate: 0,
                y: [30, -12, 0],
                opacity: 1,
                transition: {
                  x: { duration: 1.4, ease: luxEase },
                  rotate: { duration: 1.5, ease: luxEase },
                  y: { duration: 1.6, ease: luxEase, times: [0, 0.55, 1] },
                },
              },
              exit: (d: 1 | -1) => ({
                x: d === 1 ? "-110vw" : "110vw",
                rotate: d === 1 ? -22 : 22,
                y: -10,
                opacity: 1,
                transition: {
                  x: { duration: 1.4, ease: luxEase },
                  rotate: { duration: 1.5, ease: luxEase },
                  y: { duration: 1.4, ease: luxEase },
                },
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"

          />
        </AnimatePresence>
      </div>

      {/* Bottom-center premium navigation */}
      <div className="absolute bottom-10 left-1/2 z-40 -translate-x-1/2">
        <div
          className="flex items-center gap-2 rounded-full border border-white/40 bg-white/25 p-2 backdrop-blur-xl"
          style={{
            boxShadow:
              "0 20px 60px -15px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          <button
            onClick={() => go(-1)}
            className="group flex items-center gap-3 rounded-full px-5 py-3 text-[11px] font-bold uppercase tracking-[0.28em] transition-all duration-500 hover:bg-white/70"
            style={{ color: slide.ringActive }}
            aria-label="Previous slide"
          >
            <span
              className="grid h-8 w-8 place-items-center rounded-full border transition-transform duration-500 group-hover:-translate-x-0.5"
              style={{ borderColor: slide.ringActive }}
            >
              <Arrow className="h-3 w-3 rotate-180" />
            </span>
            Prev
          </button>
          <div className="h-6 w-px bg-black/10" />
          <button
            onClick={() => go(1)}
            className="group flex items-center gap-3 rounded-full px-5 py-3 text-[11px] font-bold uppercase tracking-[0.28em] transition-all duration-500 hover:bg-white/70"
            style={{ color: slide.ringActive }}
            aria-label="Next slide"
          >
            Next
            <span
              className="grid h-8 w-8 place-items-center rounded-full border transition-transform duration-500 group-hover:translate-x-0.5"
              style={{ borderColor: slide.ringActive }}
            >
              <Arrow className="h-3 w-3" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}