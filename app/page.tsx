// ============================================
// 📱 MOBILE TESTING CHECKLIST — verify before commit
// ============================================
// □ 320px (iPhone SE): No horizontal scroll, text readable
// □ 375px (iPhone 14): Hero looks good, buttons accessible  
// □ 390px (iPhone 14 Pro): Dynamic Island doesn't cover content
// □ 414px (iPhone Plus): Layout not too stretched
// □ 768px (iPad): 2-col grid looks balanced
// □ Landscape phone: Content not cropped, navbar still works
// □ Tap targets: All buttons/links min 44x44px
// □ Input focus: No auto-zoom (font-size >= 16px on inputs)
// □ Keyboard open: Form inputs visible above keyboard
// □ Scroll: No jank, momentum scroll works on iOS
// □ Images: No layout shift (aspect ratios set)
// □ Animations: Smooth 60fps, no dropped frames
// □ Tables: Horizontal scroll works, no overflow
// □ Map: Loads correctly, "Get Directions" opens Maps app
// □ Safe areas: Content clears iPhone notch and home indicator
// □ Dark mode: Site looks good (already dark themed ✓)

// ============================================
// FILE: app/page.tsx
// PURPOSE: The Home page featuring a cinematic hero section,
//          particle background, statistical counters, and 
//          a marquee for partner logos/certifications.
// USED IN: Root directory ("/")
// DEPENDENCIES: framer-motion, react-countup (if any, or custom hook), tsparticles
// ============================================

"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { siteConfig } from "@/config/site";
import { ArrowRight, ShieldCheck, Settings, Award, Flame, Droplet, FlaskConical, Wheat, Route, ActivitySquare, Factory, DraftingCompass, ClipboardCheck, PenTool, Wrench, PackageCheck, Truck } from "lucide-react";

// --- Form/Particle initialization State ---
// This ensures that particles engine is only loaded once
// on the client side to prevent hydration errors.

// --- Animation Variants ---
// Defines the start (hidden) and end (visible) states for hero text animation
const heroTextVariants = {
  hidden: { opacity: 0, y: 50 },   // Start: invisible, shifted 50px down
  visible: { opacity: 1, y: 0 },   // End: fully visible, natural position
};

// Defines the staggered container for feature cards
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delays each child animation by 0.2s
    },
  },
};

// Defines individual feature card slide-up animation
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// --- Custom Stats Hook ---
// Hook to handle IntersectionObserver logic and number counting
function useCounter(endValue: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Easing function (easeOutQuart)
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * endValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, endValue, duration]);

  return { count, ref };
}

// --- Inner Components ---

// Individual Stat Counter Sub-component
function StatItem({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) {
  const { count, ref } = useCounter(value, 2500); // 2.5s duration

  return (
    // Inner stat block wrapper
    <div ref={ref} className="group relative px-4 py-5 text-center md:px-8 md:py-6">
      <div className="mb-2 font-rajdhani text-3xl font-bold leading-none text-white md:text-4xl">
        {count}{suffix}
      </div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted transition-colors group-hover:text-primary">
        {label}
      </div>
    </div>
  );
}

// --- Page Component Definition ---
export default function HomePage() {
  const [initParticles, setInitParticles] = useState(false);
  // 📱 RULE 3: Detect mobile for conditional rendering (like particle counts)
  const [isMobile, setIsMobile] = useState(false);

  // Initialize tsparticles engine slim version for lightweight load
  useEffect(() => {
    // 📱 768px = md breakpoint (standard tablet/mobile boundary)
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInitParticles(true);
    });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    // Outer page wrapper
    <div className="min-h-screen bg-dark flex flex-col pt-0">

      {/* --- HERO SECTION --- */}
      {/* Visual Purpose: First impression with full viewport height, darkened video/image background,
          and a compelling, animated value proposition call-to-action. */}
      {/* 📱 MOBILE: min-h-[100svh] accounts for browser UI. pb-32 adds bottom padding to ensure the -mt-16 overlap from the stats counter doesn't hit the buttons. */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16 pb-32 md:pb-[env(safe-area-inset-bottom)]">
        
        {/* --- Optimized Background Image --- */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mainn/herobackground.png"
            alt="Hero Background"
            fill
            priority
            quality={90}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* --- Particles Background --- */}
        {/* Only renders on the client side after engine init */}
        {initParticles && (
          <div className="absolute inset-0 z-0 opacity-40">
            <Particles
              id="tsparticles"
              options={{
                background: {
                  color: { value: "transparent" }, // Transparent so underlying bg shows
                },
                fpsLimit: 60,                     // Caps frame rate for performance
                interactivity: {
                  events: {
                    onHover: {
                      enable: true,               // Particles react on mouse hover
                      mode: "repulse",            // Push particles away
                    },
                  },
                  modes: {
                    repulse: {
                      distance: 100,              // Repulse radius
                      duration: 0.4,              // How quickly they return
                    },
                  },
                },
                particles: {
                  color: { value: "#0066CC" },    // Particle color (site primary)
                  links: {
                    color: "#0066CC",
                    distance: 150,                // Max distance to draw connecting lines
                    enable: true,                 // Turn on web-like connections
                    opacity: 0.3,                 // Transparency of lines
                    width: 1,
                  },
                  move: {
                    enable: true,                 // Allow movement
                    speed: 1,                     // Slow drift speed
                    direction: "none",            // Random direction
                    outModes: { default: "bounce" }, // Bounce off container walls
                  },
                  number: {
                    density: { enable: true, width: 800, height: 800 }, // Number depends on screen size
                    value: isMobile ? 20 : 60,           // 📱 RULE 1: Reduce particles on mobile
                  },
                  opacity: { value: 0.5 },
                  shape: { type: "circle" },
                  size: { value: { min: 1, max: 3 } },   // Particle dot sizes
                },
                detectRetina: true,                      // Higher quality on high-DPI screens
              }}
            />
          </div>
        )}

        {/* --- Background Gradient Overlay for Readability --- */}
        {/* 📱 MOBILE: Stronger overlay on mobile for text readability over small screen area */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark md:bg-gradient-to-r md:from-dark md:via-dark/70 md:to-transparent z-0" />

        {/* --- Hero Content Container --- */}
        {/* Reduces the top padding gap under the navbar on mobile */}
        <div className="container relative z-10 mx-auto px-6 text-center lg:text-left pt-2 md:pt-12">

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl mx-auto lg:mx-0"
            >
              {/* Animated Eyebrow Text */}
              <motion.p
                variants={heroTextVariants}
                transition={{ duration: 0.6 }}
                className="text-primary font-bold tracking-[0.2em] uppercase mb-4 text-xs sm:text-sm md:text-base cursor-default"
              >
                Industrial Grade Dependability
              </motion.p>

              {/* Animated Main Headline */}
              <motion.h1
                variants={heroTextVariants}
                transition={{ duration: 0.6 }}
                // 📱 MOBILE: Responsive fluid typography scaling up to cinematic desktop
                className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-rajdhani font-bold text-white mb-2 md:mb-6 leading-tight"
              >
                Mastering the Flow with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00aaff]">Precision</span>
              </motion.h1>

              {/* Animated Subtitle */}
              <motion.p
                variants={heroTextVariants}
                transition={{ duration: 0.6 }}
                // 📱 MOBILE: Constrain width & use text-sm to preserve readability on narrow screens
                className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-white/80 md:text-text mb-4 md:mb-10 max-w-sm sm:max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                {siteConfig.description}
              </motion.p>

              {/* 📱 MOBILE: Hero Image Display Card (Visible only on mobile, placed between text and buttons) */}
              <motion.div
                variants={heroTextVariants}
                transition={{ duration: 0.6 }}
                // Extensively reduced margin-top (mt-2) and margin-bottom (mb-6) to tighten gap to text and buttons
                className="lg:hidden relative w-full h-[250px] sm:h-[350px] mt-2 mb-6"
              >
                <div className="glass-card p-3 rounded-2xl w-full h-full shadow-2xl border border-white/10 overflow-hidden group">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/40">
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 duration-500" />
                    <Image
                      src="/images/mainn/herophotocard.png"
                      alt="Collection of S3 Valves"
                      fill
                      priority
                      className="object-contain p-4 drop-shadow-2xl md:group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                {/* Decorative glows around the card */}
                <div className="absolute -inset-1 blur-2xl bg-primary/20 z-[-1] rounded-full" />
              </motion.div>

              {/* Animated CTA Buttons */}
              <motion.div
                variants={heroTextVariants}
                transition={{ duration: 0.6 }}
                // 📱 MOBILE: flex-col stacks buttons full-width. py-4 for large tap targets.
                className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Link href="/products" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 py-4 active:scale-95 btn-ripple">
                  Explore Products <ArrowRight size={18} />
                </Link>
                <Link href="/contact" className="w-full sm:w-auto px-8 py-4 rounded-lg border border-white/30 active:bg-white/10 hover:bg-white/10 transition-colors font-semibold text-white text-center btn-ripple">
                  Request Quote
                </Link>
              </motion.div>
            </motion.div>

            {/* --- Hero Image Display Card (Desktop Only) --- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative w-full h-[500px]"
            >
              <div className="glass-card p-3 rounded-2xl w-full h-full shadow-2xl border border-white/10 overflow-hidden group">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/40">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 duration-500" />
                  <Image
                    src="/images/mainn/herophotocard.png"
                    alt="Collection of S3 Valves"
                    fill
                    priority
                    className="object-contain p-4 drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Decorative glows around the card */}
              <div className="absolute -inset-1 blur-2xl bg-primary/20 z-[-1] rounded-full" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- STATS COUNTER SECTION --- */}
      {/* Visual Purpose: To showcase trust signals immediately below the hero with a dark layered backdrop */}
      <section className="relative z-20 -mt-10 container mx-auto px-6 md:px-12">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1424]/90 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-md">
          <div className="grid grid-cols-2 divide-x divide-y divide-white/10 md:grid-cols-4 md:divide-y-0">
          <StatItem value={20} label="Years Experience" suffix="+" />
          <StatItem value={1500} label="Projects Completed" suffix="+" />
          <StatItem value={12} label="Valve Types" />
          <StatItem value={100} label="Client Satisfaction" suffix="%" />
          </div>
        </div>
      </section>

      {/* --- ISO CERTIFICATION SECTION --- */}
      <section id="iso-certification" className="container mx-auto px-6 md:px-12 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-2xl border border-primary/25 bg-[#0d1424] p-6 shadow-[0_20px_70px_rgba(0,102,204,0.12)] md:p-10"
        >
          <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
          <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
              <Award size={42} />
            </div>

            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary sm:text-sm">
                Certified Manufacturing
              </p>
              <h2 className="font-rajdhani text-3xl font-bold leading-tight text-white md:text-5xl">
                ISO 9001:2015 Certified Company
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
                S3 Valves follows a quality management approach focused on controlled manufacturing, inspection, testing, and continual improvement across industrial valve production.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5 text-left lg:text-center">
              <div className="font-rajdhani text-4xl font-bold text-white">ISO</div>
              <div className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                9001:2015
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- INDUSTRIES SECTION --- */}
      {/* Visual Purpose: Highlight the main sectors served with interactive and animated cards */}
      <section className="py-24 container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="section-heading mb-2">Industries We Serve</h2>
            <p className="text-muted max-w-xl">Providing precision-engineered flow control solutions tailored to the unique and rigorous demands of critical sectors.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Food Processing",
              description: "Ensuring hygienic, contamination-free flow control that meets strict FDA standards.",
              icon: Wheat,
              color: "text-green-400",
              iconBg: "bg-green-500/10 text-green-500",
              glow: "bg-green-500"
            },
            {
              name: "Chemical Plants",
              description: "Corrosion-resistant valves built to handle aggressive fluids and hazardous chemicals safely.",
              icon: FlaskConical,
              color: "text-purple-400",
              iconBg: "bg-purple-500/10 text-purple-500",
              glow: "bg-purple-500"
            },
            {
              name: "Petroleum Industry",
              description: "High-pressure, severe-service solutions optimizing refinery throughput and pipeline management.",
              icon: Droplet,
              color: "text-blue-400",
              iconBg: "bg-blue-500/10 text-blue-500",
              glow: "bg-blue-500"
            },
            {
              name: "Oil & Gas Industry",
              description: "API-certified flow control for upstream extraction, midstream transport, and downstream processing.",
              icon: Flame,
              color: "text-orange-400",
              iconBg: "bg-orange-500/10 text-orange-500",
              glow: "bg-orange-500"
            }
          ].map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-[#111827] rounded-2xl p-8 group flex flex-col items-start border border-white/5 hover:border-white/20 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className={`absolute -inset-1 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none ${industry.glow}`} />
              
              <div className={`w-14 h-14 rounded-xl ${industry.iconBg} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                <industry.icon size={28} />
              </div>
              
              <h3 className={`text-2xl font-rajdhani font-bold mb-3 text-white transition-colors duration-300 group-hover:${industry.color} relative z-10`}>
                {industry.name}
              </h3>
              
              <p className="text-muted leading-relaxed text-sm relative z-10">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CONSULTANCY PREVIEW SECTION --- */}
      {/* Visual Purpose: Introduce engineering services without making users leave the homepage first. */}
      <section className="pb-24 container mx-auto px-6 md:px-12">
        <div className="flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55 }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="text-primary font-bold tracking-[0.2em] uppercase mb-4 text-xs sm:text-sm">
                Engineering Consultancy
              </p>
              <h2 className="section-heading mb-5">From Design to Manufacturing Support</h2>
              <p className="text-muted leading-relaxed max-w-3xl">
                Bring us the requirement, drawing, assembly, routing, or site challenge. Our team can support the exact stage your project needs, from engineering design to validated production planning.
              </p>
            </div>
            <Link href="/consultancy" className="btn-primary inline-flex shrink-0 items-center justify-center gap-2">
              Explore Consultancy <ArrowRight size={18} />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                name: "Pipeline Design",
                description: "Pipe routing, tube routing, layout planning, and practical engineering documentation for industrial systems.",
                icon: Route,
                image: "/images/consultancy/systemandanalysis/img1forpipeline.png",
              },
              {
                name: "Simulation",
                description: "Structural, thermal, fatigue, pressure, and motion studies to reduce risk before fabrication begins.",
                icon: ActivitySquare,
                image: "/images/consultancy/simulation/pipeline stress analysis.png",
              },
              {
                name: "Manufacturing Support",
                description: "DFM-ready guidance, tolerance control, fabrication support, and production planning for engineered parts.",
                icon: Factory,
                image: "/images/consultancy/manufacturing/1.png",
              },
              {
                name: "Engineering Analysis",
                description: "Part modeling, assembly review, 2D drawings, reverse engineering, and analysis-backed design decisions.",
                icon: DraftingCompass,
                image: "/images/consultancy/systemandanalysis/img2fordesignequipment.png",
              },
            ].map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group overflow-hidden rounded-2xl border border-white/5 bg-[#111827] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="relative aspect-[16/10] bg-[#0a0f1e] overflow-hidden border-b border-white/5">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-5 opacity-85 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary backdrop-blur">
                    <service.icon size={22} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-rajdhani text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ENGINEERING PROCESS STRIP --- */}
      {/* Visual Purpose: Show how S3 moves from inquiry to dispatch in a clear industrial workflow. */}
      <section className="py-20 border-y border-white/5 bg-[#080d19]">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55 }}
            className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-primary sm:text-sm">
                Engineering Process
              </p>
              <h2 className="section-heading mb-4">From requirement to dispatch.</h2>
              <p className="max-w-2xl text-muted leading-relaxed">
                A focused workflow helps every order move through review, design, manufacturing, inspection, and delivery with clarity.
              </p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 font-rajdhani text-lg font-bold text-primary transition-colors hover:text-white">
              Start a Requirement <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid gap-3 md:grid-cols-5">
            {[
              {
                title: "Requirement",
                text: "Application, media, pressure, temperature, and size details are reviewed.",
                icon: ClipboardCheck,
              },
              {
                title: "Design Review",
                text: "Engineering fit, materials, connections, and customization needs are finalized.",
                icon: PenTool,
              },
              {
                title: "Manufacturing",
                text: "Machining, assembly, and production follow controlled manufacturing practices.",
                icon: Wrench,
              },
              {
                title: "Testing",
                text: "Dimensional checks, sealing performance, and quality requirements are verified.",
                icon: PackageCheck,
              },
              {
                title: "Dispatch",
                text: "Finished products are prepared for delivery with support documentation.",
                icon: Truck,
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="quiet-card-motion relative overflow-hidden rounded-xl border border-white/10 bg-dark/70 p-5"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-white/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-3 font-rajdhani text-2xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CORE ADVANTAGES --- */}
      {/* Visual Purpose: Highlighting the company's manufacturing edge */}
      <section className="py-24 container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-12 text-center">

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-rajdhani font-bold mb-3">Highlight</h3>
            <p className="text-muted text-sm leading-relaxed">Accomplishing the supply of flow control instruments and equipments with sustainable and trustworthy chain of products.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-6">
              <Settings size={32} />
            </div>
            <h3 className="text-xl font-rajdhani font-bold mb-3">Product Research</h3>
            <p className="text-muted text-sm leading-relaxed">Serve the industries with optimum range of products and services, under the guidance of experts.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-rajdhani font-bold mb-3">Quality Production</h3>
            <p className="text-muted text-sm leading-relaxed">With the up-growing technologies, the accuracy for every product is supported by CNC machining. Overall quality considering all safety factors are looked upon.</p>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
