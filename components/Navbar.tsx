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
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
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
            className="absolute top-full left-0 right-0 bg-[#0a0f1e] shadow-2xl flex flex-col lg:hidden border-b border-white/10 overflow-hidden"
            // 📱 ANIMATION: Modern folding dropdown from top
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* 📱 MOBILE: Each nav link — 56px min height for comfortable tapping */}
            <nav className="flex flex-col pt-2 px-6">
              {navLinks.map((link, i) => (
                <MotionLink
                  key={link.name}
                  href={link.path}
                  prefetch
                  onClick={() => setMobileMenuOpen(false)}
                  // 📱 MOBILE: Large comfortable tap targets
                  // py-4: vertical padding for tap area
                  // active:text-primary instead of hover
                  className={`py-4 text-2xl font-semibold border-b border-white/10 flex items-center justify-between active:text-primary ${
                    pathname === link.path ? "text-primary" : "text-white"
                  }`}
                  // 📱 STAGGER: Each item drops down slightly
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.name}
                  {/* 📱 MOBILE: Arrow icon shows this is tappable */}
                  <ChevronRight className="w-5 h-5 text-primary" />
                </MotionLink>
              ))}
            </nav>

            {/* 📱 MOBILE: Contact info at bottom of menu */}
            <div className="mt-4 px-6 pb-8">
              {siteConfig.contact.phone.length > 0 && (
                <a href={`tel:${siteConfig.contact.phone[0].replace(/\s/g, '')}`} className="flex items-center gap-3 py-3 text-white/70">
                  <Phone className="w-5 h-5 text-primary" />
                  {siteConfig.contact.phone[0]}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
