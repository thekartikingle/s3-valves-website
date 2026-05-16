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
// FILE: app/layout.tsx
// PURPOSE: Root layout component wrapping all pages.
//          Configures Next.js metadata, injects web fonts (Inter, Rajdhani),
//          and includes global navigational elements like Navbar and Footer.
// USED IN: Applies automatically to the entire application.
// DEPENDENCIES: next/font/google (fonts), siteConfig (metadata)
// ============================================

import type { Metadata, Viewport } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

// --- Font Configuration ---
// Next.js automatically optimizes and serves these fonts locally
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const rajdhani = Rajdhani({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani" 
});

// --- SEO Metadata ---
// Global metadata used across the site. Mapped from our central site configuration.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    type: "website",
  },
};

// --- Components ---
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

// --- Root Layout Component ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // HTML wrapper applies our font variables and dark background color
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${rajdhani.variable} font-sans antialiased bg-[#0a0f1e] text-white min-h-screen flex flex-col`}>
        {/* --- Global Navigation --- */}
        <Navbar />
        
        {/* Main page content fills remaining vertical space */}
        {/* Added top padding so Navbar doesn't overlap content */}
        <main className="flex-grow pt-[88px]">
          <PageTransition>{children}</PageTransition>
        </main>
        
        {/* --- Global Footer --- */}
        <Footer />
      </body>
    </html>
  );
}
