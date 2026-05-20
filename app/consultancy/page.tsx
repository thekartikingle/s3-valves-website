
// ============================================
// FILE: app/consultancy/page.tsx
// PURPOSE: Showcases consultancy services offered by S3 Valves.
// USED IN: /consultancy
// ============================================
 
"use client";
 
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useState, useEffect, useRef } from "react";
import { X, ChevronDown, ChevronUp, ArrowRight, ChevronLeft, ChevronRight, Download, FileText } from "lucide-react";
import Link from "next/link";
 
/* ─── DATA ───────────────────────────────────────────────────── */
 
const designFeatures = [
  "Part and Assembly Modeling",
  "Advanced Design for Manufacturing",
  "Structural Part and Assembly Analysis",
  "Routing of Pipes and Tubes",
  "Routing of Electrical Cabling and Wiring Harness",
  "Time-Based Motion Analysis",
  "Scan to 3D Reverse Engineering",
  "Analysis Tools",
  "Design for Manufacturing",
  "2D Drawings",
  "Animation and Visualization",
  "Automated Tolerance Stack-Up Analysis (TolAnalyst)",
  "Advanced Photorealistic Rendering (PhotoView 360)",
  "ECAD/MCAD Collaboration CircuitWorks",
  "Design for Cost / Quoting (SOLIDWORKS Costing)",
];
 
const simulationFeatures = [
  "Finite Element Analysis",
  "Linear Static Simulation for Assembly",
  "Time-Based Mechanism Motion Simulation",
  "Pressure Vessel Design Simulation",
  "Structural Thermal Simulation",
  "Buckling or Collapse Simulation",
  "Fatigue Simulation",
  "Topology Study",
  "Event-Based Motion Simulation",
  "Stress, Hot Spot Diagnostic and Design Comparison Study",
  "Design Optimization in Bracket Based on Simulation Data",
  "Roadmap Case Manager",
  "Advanced Contacts and Connectors",
];

const manufacturingFeatures = [
  "Manufacturing of designed parts and assemblies",
  "Manufacturing support for DFM-ready components",
  "Fabrication of structurally analyzed assemblies",
  "Pipeline, pipe routing, and tube routing fabrication",
  "Electrical cabling and wiring harness implementation",
  "Motion-ready mechanisms and moving assemblies",
  "Reverse-engineered 3D parts from scan data",
  "Analysis-backed industrial components",
  "2D drawing-based machining and fabrication",
  "Tolerance-controlled manufacturing",
  "Cost-optimized production planning",
  "Valve assemblies, fabricated structures, and integrated systems",
];

const flowSteps = [
  {
    label: "Choose Scope",
    text: "Start with the support you need: design and analysis, simulation, manufacturing guidance, or the complete path.",
  },
  {
    label: "Design",
    text: "When design support is needed, we create models, drawings, routings, assemblies, and production-ready engineering data.",
  },
  {
    label: "Simulate",
    text: "When validation is needed, we check performance through structural, thermal, fatigue, motion, and optimization studies.",
  },
  {
    label: "Manufacture",
    text: "When production is required, we can manufacture the engineered parts, assemblies, routings, structures, and valve systems.",
  },
];
 
const sections = [
  {
    id: "design",
    number: "01",
    label: "Design & Analysis",
    tagline: "First, we turn your requirement into an engineered design.",
    description:
      "Our consultancy team helps clients move from an idea, site problem, or existing component to a complete engineering package. We create part and assembly models, routed pipes and tubes, wiring harness layouts, 2D drawings, tolerance studies, costing support, and visualizations that make the design clear before money is spent on production.",
    promise:
      "You get design intent, manufacturing logic, and technical documentation in one connected workflow.",
    features: designFeatures,
    images: [
      "/images/consultancy/systemandanalysis/img1forpipeline.png",
      "/images/consultancy/systemandanalysis/img2fordesignequipment.png",
      "/images/consultancy/systemandanalysis/img3forfabricatedstructure.png",
      "/images/consultancy/systemandanalysis/img4forintegratedengneering.png",
    ],
    imageLabels: ["Pipeline", "Design Equipment", "Fabricated Structure", "Integrated Engineering"],
  },
  {
    id: "simulation",
    number: "02",
    label: "Simulation",
    tagline: "Then, we prove the design before it reaches the shop floor.",
    description:
      "After the model is ready, we use simulation to reduce uncertainty. Structural, thermal, fatigue, buckling, pressure vessel, topology, and dynamic studies help confirm whether the product can survive real operating loads, motion, contact conditions, and service environments.",
    promise:
      "You see risk earlier, improve the design faster, and enter manufacturing with stronger confidence.",
    features: simulationFeatures,
    images: [
      "/images/consultancy/simulation/pipeline stress analysis.png",
      "/images/consultancy/simulation/2equipmentdesign.png",
      "/images/consultancy/simulation/3structuralanalysis.png",
      "/images/consultancy/simulation/4simulationdrivenengineering.png",
    ],
    imageLabels: [
      "Pipeline Stress Analysis",
      "Equipment Design",
      "Structural Analysis",
      "Simulation Driven Engineering",
    ],
  },
  {
    id: "manufacturing",
    number: "03",
    label: "Manufacturing",
    tagline: "Finally, we can manufacture what we design and validate.",
    description:
      "S3 Valves can manufacture the product that comes out of the consultancy process. That includes the designed parts and assemblies, DFM-ready components, structurally analyzed assemblies, routed pipe and tube systems, electrical cabling and wiring harness outputs, reverse-engineered components, fabricated structures, valve assemblies, and integrated engineering systems described above.",
    promise:
      "The same team that understands the design intent can help turn it into a finished industrial product.",
    features: manufacturingFeatures,
    images: [
      "/images/consultancy/manufacturing/1.png",
      "/images/consultancy/manufacturing/2.png",
      "/images/consultancy/manufacturing/3.png",
      "/images/consultancy/manufacturing/4.png",
    ],
    imageLabels: ["Manufacturing 1", "Manufacturing 2", "Manufacturing 3", "Manufacturing 4"],
  },
];
 
/* ─── CAROUSEL ───────────────────────────────────────────────── */
 
type CarouselItem = { src?: string; label: string };

function FlowOverview() {
  return (
    <section className="w-full px-4 pb-6 sm:px-6 md:px-12 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {flowSteps.map((step, index) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-5 text-left"
          >
            <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              {index < flowSteps.length - 1 && (
                <ArrowRight className="hidden h-4 w-4 text-white/25 lg:block" />
              )}
            </div>
            <h3 className="font-rajdhani text-2xl font-bold text-white">{step.label}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
 
function Carousel({ items }: { items: CarouselItem[] }) {
  const [active, setActive] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const startX = useRef(0);
  const dragging = useRef(false);
  const total = items.length;
 
  const goTo = (i: number) => setActive(Math.max(0, Math.min(total - 1, i)));

  useEffect(() => {
    if (total <= 1 || isGrabbing) return;

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [total, isGrabbing]);
 
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    dragging.current = false;
    setIsGrabbing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (Math.abs(e.clientX - startX.current) > 8) dragging.current = true;
  };
  const finishDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging.current) {
      const diff = startX.current - e.clientX;
      if (diff > 50) goTo(active + 1);
      else if (diff < -50) goTo(active - 1);
    }
    setIsGrabbing(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full select-none flex-col gap-4"
    >
      {/* ── Slide window ── */}
      <div
        className="w-full overflow-hidden rounded-lg border border-white/10 bg-card"
        style={{ cursor: isGrabbing ? "grabbing" : "grab", touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onPointerLeave={finishDrag}
      >
        {/* Track */}
        <div
          className="flex"
          style={{
            transform: `translateX(calc(-${active * 100}% - ${active * 12}px))`,
            transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
            gap: "12px",
            willChange: "transform",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] min-h-[260px] w-full flex-shrink-0 overflow-hidden bg-card sm:aspect-[16/10] lg:aspect-[16/9]"
            >
              {/* Real image */}
              {item.src ? (
                <>
                  <img
                    src={item.src}
                    alt={item.label}
                    className="absolute inset-0 h-full w-full object-contain p-3 sm:p-5"
                    draggable={false}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                  {/* Gradient scrim so label is readable */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 45%)",
                    }}
                  />
                </>
              ) : (
                /* Placeholder shimmer */
                <motion.div
                  animate={{ top: ["-20%", "120%"] }}
                  transition={{
                    duration: 5 + i * 1.3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 2,
                  }}
                  className="absolute left-0 right-0 pointer-events-none"
                  style={{
                    height: "45%",
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.035) 50%, transparent 100%)",
                  }}
                />
              )}
 
              {/* Counter — top left */}
              <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                <span
                  className="text-xs font-mono tracking-widest"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {String(i + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(total).padStart(2, "0")}
                </span>
              </div>
 
              {/* Label — bottom left */}
              <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
                <span
                  className="text-xs font-mono tracking-widest uppercase"
                  style={{ color: item.src ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.28)" }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
 
      {/* ── Controls ── */}
      <div className="flex items-center justify-between px-1">
 
        {/* Dot pills */}
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                height: "6px",
                borderRadius: "3px",
                background:
                  i === active
                    ? "var(--color-primary, #e5e7eb)"
                    : "rgba(255,255,255,0.18)",
                width: i === active ? "26px" : "6px",
                transition: "width 0.35s cubic-bezier(0.22,1,0.36,1), background 0.3s",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
 
        {/* Arrow buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-card text-muted transition-colors duration-200 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => goTo(active + 1)}
            disabled={active === total - 1}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-card text-muted transition-colors duration-200 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
 
/* ─── FEATURE MODAL ──────────────────────────────────────────── */
 
function FeatureModal({
  open,
  onClose,
  label,
  features,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  features: string[];
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
 
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-t-2xl bg-card sm:rounded-2xl"
            style={{ maxHeight: "calc(100vh - 2rem)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-5 pb-5 pt-6 sm:px-8 sm:pb-6 sm:pt-8">
              <div>
                <p className="mb-1 font-mono text-sm uppercase tracking-widest text-primary">
                  All Capabilities
                </p>
                <h3 className="font-rajdhani text-3xl font-bold text-white">{label}</h3>
              </div>
              <button
                onClick={onClose}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-dark text-muted transition-colors hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
 
            <div className="mx-5 h-px bg-white/5 sm:mx-8" />
 
            <div className="overflow-y-auto px-5 py-5 sm:px-8 sm:py-6" style={{ maxHeight: "58vh" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {features.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="flex min-h-11 items-start gap-4 rounded-lg px-3 py-3.5 transition-colors duration-200 hover:bg-dark/60 sm:px-4"
                  >
                    <span className="mt-0.5 w-6 flex-shrink-0 font-mono text-sm text-primary/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base leading-snug text-muted">{f}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
 
/* ─── SECTION BLOCK ──────────────────────────────────────────── */
 
function SectionBlock({
  section,
}: {
  section: (typeof sections)[0];
}) {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const PREVIEW = 6;
  const hasFeatures = section.features.length > 0;
  const shown = expanded ? section.features : section.features.slice(0, PREVIEW);
 
  // Build carousel items — prefer real images, fall back to placeholders
  const carouselItems: CarouselItem[] = section.imageLabels.map((label, i) => ({
    label,
    src: section.images?.[i] || undefined,
  }));
 
  return (
    <>
      <FeatureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        label={section.label}
        features={section.features}
      />
 
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="w-full px-4 py-12 sm:px-6 md:px-12 lg:px-16"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:gap-10">
 
          {/* Section label + heading */}
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="font-mono text-lg font-bold uppercase tracking-widest text-primary sm:text-xl"
            >
              Section {section.number} — {section.label}
            </motion.p>
 
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="font-rajdhani text-3xl font-bold leading-tight text-white sm:text-4xl"
            >
              {section.tagline.replace(/\n/g, " ")}
            </motion.h2>
 
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="text-sm leading-relaxed text-muted sm:text-base"
              style={{ maxWidth: "65ch", letterSpacing: "0.3px" }}
            >
              {section.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-2 max-w-2xl rounded-lg border border-primary/25 bg-primary/10 px-5 py-4 text-base font-medium leading-relaxed text-white/85"
            >
              {section.promise}
            </motion.div>
          </div>
 
          {/* Swipeable carousel */}
          <Carousel items={carouselItems} />
 
          {/* Features */}
          {hasFeatures && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                <span className="text-xs font-mono tracking-widest text-primary uppercase">
                  Capabilities
                </span>
                <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
                <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>
                  {section.features.length} features
                </span>
              </div>
 
              <div className="grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence initial={false}>
                  {shown.map((feat, i) => (
                    <motion.div
                      key={feat}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22, delay: i * 0.025 }}
                      className="group flex min-h-12 items-center gap-3 py-3.5 sm:py-4"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                      <span className="text-base leading-snug text-muted transition-colors duration-200 group-hover:text-white">
                        {feat}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
 
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                {section.features.length > PREVIEW && (
                  <button
                    onClick={() => setExpanded((p) => !p)}
                    className="flex min-h-11 items-center gap-2 text-left font-rajdhani text-base font-bold text-muted transition-colors duration-200 hover:text-white"
                  >
                    {expanded ? (
                      <>Show less <ChevronUp size={15} /></>
                    ) : (
                      <>Show all {section.features.length} features <ChevronDown size={15} /></>
                    )}
                  </button>
                )}
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex min-h-11 items-center gap-2 text-left font-rajdhani text-base font-bold text-primary transition-colors duration-200 hover:text-white"
                >
                  Full feature detail <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
 
          {!hasFeatures && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-mono tracking-widest uppercase text-muted/40"
            >
              Full details coming soon
            </motion.p>
          )}
        </div>
 
        {/* Section divider */}
        <div
          className="max-w-7xl mx-auto mt-14"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
          }}
        />
      </motion.section>
    </>
  );
}
 
/* ─── PAGE ───────────────────────────────────────────────────── */
 
export default function ConsultancyPage() {
  return (
    <div className="industrial-surface mx-auto flex w-full flex-col items-center text-center">
 
      {/* ── HERO ── */}
      <section className="w-full px-4 pb-10 pt-28 sm:px-6 md:px-12 md:pt-32 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-5">
 
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="font-mono text-base font-bold uppercase tracking-widest text-primary sm:text-lg"
          >
            {siteConfig.name} — Consultancy Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-4xl font-rajdhani text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl"
          >
            CHOOSE THE ENGINEERING SUPPORT YOU NEED, FROM DESIGN TO SIMULATION TO MANUFACTURING.
          </motion.h1>
 
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="mx-auto max-w-3xl text-base leading-relaxed text-muted sm:text-lg lg:text-xl"
          >
            Work with us for design and analysis, simulation, manufacturing
            support, or the complete end-to-end path. We adapt the consultancy scope to
            the stage your project is in.
          </motion.p>
 
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22 }}
            className="flex flex-wrap justify-center gap-3 pt-3"
          >
            <span className="rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 font-rajdhani text-base font-bold tracking-wide text-white shadow-[0_0_24px_rgba(0,102,204,0.12)] sm:text-lg">
              Design &amp; Analysis, Simulation and Manufacturing, Full Scope
            </span>
            <a
              href="/brochure/S3-Valves-Consultancy-Brochure.pdf"
              download
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.05] px-5 py-2.5 font-rajdhani text-base font-bold tracking-wide text-white shadow-[0_0_24px_rgba(0,102,204,0.1)] backdrop-blur-md transition-all duration-300 active:scale-95 active:border-primary/55 active:bg-primary/15 hover:border-primary/45 hover:bg-white/10 sm:text-lg"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-primary">
                <FileText size={15} />
              </span>
              Download Consultancy Brochure
              <Download size={15} className="text-white/50" />
            </a>
          </motion.div>
        </div>
 
        <div
          className="mx-auto mt-10 max-w-7xl"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.08) 100%)",
          }}
        />
      </section>

      <FlowOverview />
 
      {/* ── THREE SECTIONS ── */}
      {sections.map((section) => (
        <SectionBlock key={section.id} section={section} />
      ))}
 
      {/* ── CTA ── */}
      <section className="py-20 px-6 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-lg font-rajdhani text-3xl font-bold leading-tight text-white sm:text-4xl"
          >
            Bring us the requirement. We will support the exact stage you need.
          </motion.h2>
 
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Share the part, assembly, routing, valve system, or industrial problem you
            want to solve. We can help with a single stage or coordinate design,
            simulation, and manufacturing together when the project calls for it.
          </motion.p>
 
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="flex w-full flex-col items-stretch gap-3 pt-2 sm:w-auto sm:flex-row sm:items-center sm:gap-5"
          >
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 font-rajdhani text-base font-bold tracking-wide text-dark transition-opacity hover:opacity-90"
            >
              Get in touch <ArrowRight size={14} />
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center justify-center gap-2 px-8 py-3.5 font-rajdhani text-base font-bold tracking-wide text-muted transition-colors hover:text-white"
            >
              Learn about us <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
