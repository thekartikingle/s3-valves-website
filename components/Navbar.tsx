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
// FILE: components/Navbar.tsx
// PURPOSE: Primary site navigation. Includes responsive mobile menu,
//          sticky top behavior, and smooth transitions.
// USED IN: app/layout.tsx
// DEPENDENCIES: framer-motion (animations), lucide-react (icons)
// ============================================

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import Image from "next/image";

const MotionLink = motion(Link);

// --- Navigation Links ---
const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Consultancy", path: "/consultancy" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // --- Scroll Effect ---
  // Detects when the user has scrolled down to change Navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Outer wrapper defaults to transparent, becomes glass-card when scrolled
    // 📱 MOBILE: Added navbar-safe to pad for PWA/notch mode
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-safe ${
        isScrolled ? "bg-card/90 backdrop-blur-md border-b border-border/30 shadow-lg shadow-primary/10 py-0" : "bg-transparent py-0"
      }`}
    >
      {/* 📱 MOBILE: height h-16 (64px) for standard touch-friendly nav height */}
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-24">
        
        {/* --- Logo --- */}
        <Link href="/" prefetch className="flex items-center">
          <Image 
            src="/images/logo/logo1.png" 
            alt="S3 Valves Logo" 
            width={120} 
            height={80} 
            className="object-contain h-12 md:h-16 w-auto"
            priority
          />
        </Link>

        {/* --- Desktop Navigation --- */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                prefetch
                className={`relative text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-text"
                }`}
              >
                {link.name}
                {/* Active indicator dot using framer-motion for smooth layout change */}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          
          {/* Primary Call to Action */}
          <Link href="/contact" prefetch className="btn-primary ml-4 text-sm px-5 py-2.5">
            Get a Quote
          </Link>
        </nav>

        {/* --- Mobile Menu Toggle --- */}
        <motion.button
          className="relative md:hidden grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-white/15 bg-white/[0.07] text-white shadow-lg shadow-primary/10 backdrop-blur-xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={mobileMenuOpen}
          whileTap={{ scale: 0.92 }}
          animate={{
            borderColor: mobileMenuOpen ? "rgba(0, 102, 204, 0.65)" : "rgba(255, 255, 255, 0.15)",
            boxShadow: mobileMenuOpen
              ? "0 14px 34px rgba(0, 102, 204, 0.28)"
              : "0 10px 28px rgba(0, 0, 0, 0.2)",
          }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        >
          <motion.span
            className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_44%,rgba(0,102,204,0.22))]"
            animate={{ opacity: mobileMenuOpen ? 1 : 0.45 }}
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mobileMenuOpen ? "close" : "menu"}
              className="relative z-10"
              initial={{ opacity: 0, rotate: -45, scale: 0.72 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.72 }}
              transition={{ type: "spring", stiffness: 520, damping: 34 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* --- Mobile Navigation Dropdown --- */}
      {/* 📱 MOBILE NAVBAR MUST HAVE: */}
      {/* 4. Menu: Full-screen overlay, not a tiny dropdown */}
      {/* 6. Close on: outside tap, escape key, route change (via onClick) */}
      {/* 7. Backdrop: blurred overlay behind open menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          // 📱 MOBILE: Dropdown anchoring beneath the navbar
          // absolute top-full: positions exactly under the header
          // bg-[#0a0f1e]: solid static dark color, removed transparency
          <motion.div
            className="absolute top-full left-0 right-0 flex max-h-[calc(100svh-4rem)] flex-col overflow-x-hidden overflow-y-auto border-b border-white/10 bg-[#0a0f1e]/95 shadow-2xl shadow-primary/10 backdrop-blur-2xl lg:hidden"
            // 📱 ANIMATION: Modern folding dropdown from top
            initial={{ opacity: 0, y: -18, clipPath: "inset(0 0 100% 0 round 0 0 28px 28px)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 0 0 28px 28px)" }}
            exit={{ opacity: 0, y: -12, clipPath: "inset(0 0 100% 0 round 0 0 28px 28px)" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,102,204,0.16),transparent_36%),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:100%_100%,56px_56px]" />
            {/* 📱 MOBILE: Each nav link — 56px min height for comfortable tapping */}
            <nav className="relative flex flex-col px-5 pt-4">
              {navLinks.map((link, i) => (
                <MotionLink
                  key={link.name}
                  href={link.path}
                  prefetch
                  onClick={() => setMobileMenuOpen(false)}
                  // 📱 MOBILE: Large comfortable tap targets
                  // py-4: vertical padding for tap area
                  // active:text-primary instead of hover
                  className={`group flex min-h-12 items-center justify-between rounded-xl border border-white/0 px-3 py-2.5 text-base font-semibold active:text-primary ${
                    pathname === link.path ? "text-primary" : "text-white"
                  }`}
                  // 📱 STAGGER: Each item drops down slightly
                  initial={{ opacity: 0, x: -18, filter: "blur(8px)" }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                    backgroundColor: pathname === link.path ? "rgba(0, 102, 204, 0.12)" : "rgba(255, 255, 255, 0)",
                    borderColor: pathname === link.path ? "rgba(0, 102, 204, 0.28)" : "rgba(255, 255, 255, 0)",
                  }}
                  transition={{ delay: 0.08 + i * 0.055, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.name}
                  {/* 📱 MOBILE: Arrow icon shows this is tappable */}
                  <ChevronRight className="h-4 w-4 text-primary transition-transform duration-300 group-active:translate-x-1" />
                </MotionLink>
              ))}
            </nav>

            {/* 📱 MOBILE: Contact info at bottom of menu */}
            <motion.div
              className="relative mt-3 px-6 pb-7"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.35 }}
            >
              {siteConfig.contact.phone.length > 0 && (
                <a href={`tel:${siteConfig.contact.phone[0].replace(/\s/g, '')}`} className="flex items-center gap-3 py-3 text-white/70">
                  <Phone className="w-5 h-5 text-primary" />
                  {siteConfig.contact.phone[0]}
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
