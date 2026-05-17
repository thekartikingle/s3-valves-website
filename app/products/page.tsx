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
// FILE: app/products/page.tsx
// PURPOSE: Displays the full catalog of S3 Valves. Includes interactive
//          filtering logic to sort products, stagger-animated product
//          cards, and dynamic links to individual detail pages.
// USED IN: /products
// DEPENDENCIES: framer-motion (animations), products.ts (data store)
// ============================================

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import { ArrowRight, Search, Filter, Download, FileText } from "lucide-react";

// --- Animation Variants ---
// Stagger wrapper: delays the appearance of each product card by 0.1s
// so they enter fluidly one by one rather than all at once.
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Represents a single card entering the screen (pops up & fades in)
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  exit:   { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export default function ProductsPage() {
  // --- Filter State Logic ---
  // `searchQuery` stores the text inputted by the user
  // `activeFilter` might store specific categories if expanded later
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Logic:
  // We use Array.filter() to iterate over all products.
  // It checks if the product's name, tagline, or applications contain the search string.
  // .toLowerCase() ensures the search is case-insensitive.
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    const hitsName = product.name.toLowerCase().includes(query);
    const hitsTagline = product.tagline.toLowerCase().includes(query);
    // Check if any application matches
    const hitsApp = product.applications.some(app => app.toLowerCase().includes(query));
    
    return hitsName || hitsTagline || hitsApp;
  });

  return (
    <div className="industrial-surface min-h-screen bg-dark w-full">
      
      {/* --- Page Header Banner --- */}
      {/* Visual Purpose: Establish the page context and provide visual separation from navbar */}
      {/* bg-gradient adds a subtle glow effect matching the primary brand color */}
      <section className="pt-24 pb-16 px-6 md:px-12 bg-gradient-to-b from-primary/10 to-transparent border-b border-white/5">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <h1 className="section-heading mb-4">Our Complete Catalog</h1>
              <p className="text-muted text-lg max-w-2xl">
                Engineered for excellence. Explore our comprehensive range of industrial flow control solutions meeting the highest industry standards.
              </p>
            </div>
            <a
              href="/brochure/S3-Valves-Brochure%20(1).pdf"
              download
              className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg border border-primary/35 bg-primary/10 px-5 py-3 font-rajdhani text-base font-bold tracking-wide text-white shadow-[0_18px_45px_rgba(0,102,204,0.14)] transition-all duration-300 active:scale-95 active:bg-primary/20 sm:w-auto md:hover:border-primary/70 md:hover:bg-primary/15"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">
                <FileText size={17} />
              </span>
              Download Company Brochure
              <Download size={16} className="text-white/55 transition-colors group-hover:text-primary" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- Main Content Area --- */}
      {/* Visual Purpose: Houses the filter controls and the responsive product grid */}
      <section className="py-12 px-6 md:px-12 container mx-auto">
        
        {/* --- Search & Filter Bar --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          
          {/* Search Input Container */}
          <div className="relative w-full md:w-96 text-text">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
            <input 
              type="text" 
              placeholder="Search valves, materials, apps..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // bg-dark/50 (transparent dark), border border-border (blueish subtle border), rounded-full for pill shape
              className="w-full bg-dark/50 border border-border rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary shadow-inner"
            />
          </div>

          {/* Result Count Indicator */}
          <div className="text-sm font-medium text-muted bg-white/5 px-4 py-2 rounded-full flex items-center gap-2">
            <Filter size={14} />
            Showing {filteredProducts.length} Product{filteredProducts.length !== 1 && 's'}
          </div>
        </div>

        {/* --- Dynamic Product Grid --- */}
        {/* Using AnimatePresence to ensure items animate out smoothly when filtered out */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          // Responsive Grid: 2 col on mobile and tablet, 3 col on desktop, 4 on ultrawide
          // 📱 MOBILE: 2 cards per row (even on 320px phones)
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {/* 
               Product grid map()
               For each product in filteredProducts, we render a card.
               The stagger effect delay formula implicitly handles delay via Framer's staggerChildren parent property.
            */}
            {filteredProducts.map((product) => {
              
              // Slug generation logic: 
              // The slug is pre-generated in data/products.ts to ensure consistent URL targeting.
              // Here we just map it into the Href string format `/products/{slug}`
              const productUrl = `/products/${product.slug}`;

              return (
                <motion.div 
                  key={product.slug}
                  variants={cardVariants}
                  // We apply 'layout' so sibling cards adjust smoothly when one is removed via filter
                  layout 
                  // 📱 MOBILE: active state instead of hover for tap feedback, no transform on mobile touch
                  className="quiet-card-motion bg-[#111827] rounded-2xl group flex flex-col h-full overflow-hidden border border-white/5 active:border-white/20 md:hover:border-white/20 transition-all duration-300 relative"
                >
                  
                  {/* --- Card Top: Image Element --- */}
                  {/* 📱 MOBILE: Fixed aspect ratio aspect-[4/3] prevents layout shift */}
                  <div className="relative aspect-[4/3] w-full bg-[#1a2234] overflow-hidden border-b border-border/20">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent z-10" />
                    
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill 
                      // 📱 MOBILE: Lazy load all except first 3 cards, use sizes
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-4 md:group-hover:scale-105 transition-transform duration-500 opacity-90 md:group-hover:opacity-100" 
                    />
                  </div>

                  {/* --- Card Body: Info --- */}
                  {/* 📱 Smaller padding inside card */}
                  <div className="p-3 md:p-6 flex flex-col flex-grow z-20">
                    {/* 📱 Smaller text so it fits in half-width card */}
                    <h3 className="text-sm md:text-xl font-rajdhani font-bold mb-1 text-white md:group-hover:text-primary transition-colors leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs md:text-sm font-medium tracking-wide text-primary mb-2 md:mb-4">
                      {product.tagline}
                    </p>
                    {/* 📱 Hide description on mobile (too cramped), show on tablet+ */}
                    <p className="hidden md:block text-white/60 text-sm mb-6 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    
                    {/* Attributes Pill List */}
                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                      {product.applications.slice(0, 2).map((app, ix) => (
                        <span key={ix} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-white/5 border border-white/10 rounded whitespace-nowrap">
                          {app}
                        </span>
                      ))}
                      {product.applications.length > 2 && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 text-muted whitespace-nowrap">
                          +{product.applications.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* --- Card Footer: Action Area --- */}
                  <div className="px-3 pb-3 md:px-6 md:pb-6 mt-auto">
                    <Link href={productUrl}>
                      {/* 📱 Smaller button text */}
                      <button className="mt-3 w-full py-2.5 md:py-3 text-xs md:text-sm bg-primary/10 active:bg-primary hover:bg-primary text-primary active:text-white hover:text-white font-semibold rounded-lg border border-primary/30 transition-all duration-200 flex items-center justify-center gap-2">
                        View Details <ArrowRight size={16} />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty State Fallback */}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                <Search size={24} className="text-muted" />
              </div>
              <h3 className="text-xl font-rajdhani font-bold text-white mb-2">No products found</h3>
              <p className="text-muted">Try adjusting your search criteria.</p>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
