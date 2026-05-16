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
// FILE: app/products/[slug]/ProductDetailClient.tsx
// PURPOSE: Interactive Client Component for the product detail page.
//          Handles Lightbox image viewing, "Request Quote" modal state, 
//          and smooth scrolling spec tabs/tables.
// USED IN: app/products/[slug]/page.tsx
// DEPENDENCIES: framer-motion, lucide-react, react state
// ============================================

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";
import { sendContactEmail } from "@/lib/sendEmail";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, X, Maximize2, FileText, Settings, Ruler, Loader2 } from "lucide-react";

export default function ProductDetailClient({ 
  product, 
  relatedProducts 
}: { 
  product: Product, 
  relatedProducts: Product[] 
}) {

  // --- INTERACTIVE STATES ---

  // Lightbox open/close state logic:
  // Boolean state tracking whether the large image view overlay is active.
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // "Request Quote" modal open/close mechanism:
  // Controls the visibility of the quote popup overlay triggered by the primary CTA buttons.
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isQuoteSubmitting, setIsQuoteSubmitting] = useState(false);
  const [quoteStatus, setQuoteStatus] = useState<"idle" | "success" | "error">("idle");
  const [quoteError, setQuoteError] = useState("");

  // Active Tab for specifications area
  const [activeTab, setActiveTab] = useState<"features" | "specs" | "dimensions">("features");

  // --- RENDER HELPERS ---
  const validateQuoteForm = () => {
    if (!quoteFormData.name.trim()) return "Full Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(quoteFormData.email)) return "Please enter a valid email address.";
    if (quoteFormData.message.trim().length < 10) return "Requirements must be at least 10 characters.";
    return null;
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateQuoteForm();
    if (error) {
      setQuoteStatus("error");
      setQuoteError(error);
      return;
    }

    setIsQuoteSubmitting(true);
    setQuoteStatus("idle");
    setQuoteError("");

    try {
      await sendContactEmail({
        name: quoteFormData.name,
        company: quoteFormData.company,
        email: quoteFormData.email,
        phone: quoteFormData.phone,
        product: product.name,
        message: quoteFormData.message,
      });
      setQuoteStatus("success");
      setQuoteFormData({ name: "", company: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      setQuoteStatus("error");
      setQuoteError("Failed to send inquiry. Please check EmailJS setup or contact us directly.");
    } finally {
      setIsQuoteSubmitting(false);
    }
  };

  // Spec table render function
  // Maps the product.specs object strictly into table rows.
  // We use Object.entries to iterate over keys/values programmatically.
  const renderSpecTableRows = () => {
    // Human-readable labels for the specification keys
    const specLabels: Record<keyof Product["specs"], string> = {
      sizeRange: "Size Range",
      material: "Material Options",
      connection: "End Connection",
      pressure: "Pressure Rating",
      temperature: "Temperature Range",
      operation: "Operation",
      standard: "Industry Standards"
    };

    return Object.entries(product.specs).map(([key, value]) => {
      const typedKey = key as keyof Product["specs"];
      return (
        // Hover tint for table rows to assist reading across columns
        <tr key={key} className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <th className="py-4 px-6 text-left font-rajdhani text-text font-semibold w-1/3 bg-white/[0.02]">
            {specLabels[typedKey]}
          </th>
          <td className="py-4 px-6 text-muted">
            {value}
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="industrial-surface min-h-screen bg-dark w-full pt-20">
      
      {/* Back navigation breadcrumb */}
      <div className="container mx-auto px-6 md:px-12 py-6 border-b border-white/5">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
      </div>

      {/* --- HERO PRODUCT DETAILS --- */}
      <section className="container mx-auto px-6 md:px-12 py-12 md:py-20 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Visual/Image Column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Main Image Setup */}
          <div 
            className="glass-card aspect-square relative flex items-center justify-center overflow-hidden cursor-zoom-in group border border-white/10"
            onClick={() => setIsLightboxOpen(true)}
          >
            <div className="absolute inset-0 bg-[#0a0f1e] z-0" />
            
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-contain p-8 group-hover:scale-105 transition-transform duration-500 z-10" 
            />

            {/* Hover overlay instructing user to click to expand */}
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
              <div className="bg-dark/80 backdrop-blur text-white px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                <Maximize2 size={16} /> Enlarge Image
              </div>
            </div>
          </div>
        </motion.div>

        {/* Text/Content Column */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <div className="inline-flex flex-wrap gap-2 mb-6">
            {product.applications.map((app) => (
              <span key={app} className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                {app}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-rajdhani font-bold text-white mb-2 leading-tight">
            {product.name}
          </h1>
          <p className="text-xl text-primary font-medium tracking-wide mb-8">
            {product.tagline}
          </p>

          <p className="text-muted text-lg leading-relaxed mb-10">
            {product.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            {/* Primary trigger for Request Quote modal */}
            <button 
              onClick={() => setIsQuoteModalOpen(true)}
              className="btn-primary flex-1 text-center justify-center py-4 text-lg"
            >
              Request a Quote
            </button>
            <a 
              href="#specifications" 
              className="px-8 py-4 rounded-lg border border-white/20 hover:bg-white/5 transition-colors font-semibold text-white flex-1 text-center flex items-center justify-center gap-2"
            >
              View Tech Data <ChevronRight size={18} />
            </a>
          </div>
        </motion.div>
      </section>

      {/* --- TECHNICAL DATA SECTION (TABS) --- */}
      <section id="specifications" className="border-t border-white/5 py-24 bg-[#080d19]">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 md:gap-4 mb-12 border-b border-white/10 pb-4">
            <button 
              onClick={() => setActiveTab("features")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-rajdhani text-lg font-semibold transition-colors ${activeTab === "features" ? "bg-primary text-white" : "text-muted hover:text-white"}`}
            >
              <CheckCircle2 size={20} /> Features
            </button>
            <button 
              onClick={() => setActiveTab("specs")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-rajdhani text-lg font-semibold transition-colors ${activeTab === "specs" ? "bg-primary text-white" : "text-muted hover:text-white"}`}
            >
              <Settings size={20} /> Specifications
            </button>
            <button 
              onClick={() => setActiveTab("dimensions")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-rajdhani text-lg font-semibold transition-colors ${activeTab === "dimensions" ? "bg-primary text-white" : "text-muted hover:text-white"}`}
            >
              <Ruler size={20} /> Dimensions
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="glass-card p-6 md:p-12 overflow-hidden min-h-[400px]">
            <AnimatePresence mode="wait">
              {/* === FEATURES TAB === */}
              {activeTab === "features" && (
                <motion.div 
                  key="features"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div>
                    <h3 className="section-heading text-3xl mb-6">Key Engineering Features</h3>
                    <ul className="space-y-4">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex gap-4 items-start">
                          <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                          <span className="text-lg text-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-dark rounded-xl border border-white/5 p-8 flex flex-col justify-center items-center text-center">
                    <FileText className="text-muted mb-4 opacity-50" size={64} />
                    <h4 className="text-white font-rajdhani font-bold text-xl mb-2">Need detailed drawings?</h4>
                    <p className="text-muted text-sm mb-6">General Assembly (GA) drawings available upon request.</p>
                    <button onClick={() => setIsQuoteModalOpen(true)} className="text-primary hover:text-white underline font-medium">
                      Request GA Drawing
                    </button>
                  </div>
                </motion.div>
              )}

              {/* === SPECS TAB === */}
              {activeTab === "specs" && (
                <motion.div 
                  key="specs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="section-heading text-3xl mb-6">Technical Specifications</h3>
                  {/* 📱 MOBILE: Scrollable tables (never let tables break layout) */}
                  <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
                    <table className="w-full text-left border-collapse rounded-lg min-w-[500px]">
                      <tbody className="bg-dark/50">
                        {renderSpecTableRows()}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* === DIMENSIONS TAB === */}
              {activeTab === "dimensions" && (
                <motion.div 
                  key="dimensions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="section-heading text-3xl mb-6">Dimensional Data</h3>
                  {/* 📱 MOBILE: Scrollable tables (never let tables break layout) */}
                  <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
                    <table className="w-full text-left border-collapse whitespace-nowrap border border-white/10 rounded-lg min-w-[600px] overflow-hidden">
                      {/* Dimension table column header meanings:
                          DN = Nominal Diameter (mm)
                          NPS = Nominal Pipe Size (inch)
                          L = Length (Face-to-Face) (mm)
                          H = Height (mm)
                          Weight = Approximate Weight (kg) */}
                      <thead className="bg-[#111827] text-white">
                        <tr>
                          <th className="py-4 px-6 border-b border-white/10">DN (mm)</th>
                          <th className="py-4 px-6 border-b border-white/10">NPS (inch)</th>
                          <th className="py-4 px-6 border-b border-white/10">L (mm)</th>
                          <th className="py-4 px-6 border-b border-white/10">H (mm)</th>
                          <th className="py-4 px-6 border-b border-white/10">Weight (kg)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-dark/30 divide-y divide-white/5">
                        {product.dimensions.map((dim, idx) => (
                          <tr key={idx} className="hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 font-semibold text-primary">{dim.dn}</td>
                            <td className="py-4 px-6 text-text">{dim.nps}</td>
                            <td className="py-4 px-6 text-muted">{dim.l}</td>
                            <td className="py-4 px-6 text-muted">{dim.h}</td>
                            <td className="py-4 px-6 text-muted">{dim.weight} kg</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted mt-4">* Note: Dimensions are approximate. Certified drawings are provided during the engineering phase.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- RELATED PRODUCTS SECTION --- */}
      {relatedProducts.length > 0 && (
        <section className="py-24 border-t border-white/5 container mx-auto px-6 md:px-12 bg-dark">
          <h2 className="section-heading mb-12">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct) => (
              <Link 
                key={relProduct.slug} 
                href={`/products/${relProduct.slug}`}
                className="quiet-card-motion glass-card block p-6 group"
              >
                <div className="h-40 bg-[#111827] mb-6 rounded flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-colors">
                  <span className="text-muted/30 font-rajdhani">{relProduct.name} Preview</span>
                </div>
                <h3 className="text-xl font-rajdhani font-bold text-white group-hover:text-primary transition-colors">{relProduct.name}</h3>
                <p className="text-sm text-text mt-2 line-clamp-2">{relProduct.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                  View <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* --- FLOATING OVERLAYS (MODAL & LIGHTBOX) --- */}
      <AnimatePresence>
        
        {/* === LIGHTBOX MODAL === */}
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-xl flex items-center justify-center p-6"
            // Closes when user clicks the background backdrop
            onClick={() => setIsLightboxOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors p-2 bg-white/5 rounded-full"
              // Closes explicitly hitting the X button
              onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
            >
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.9 }} 
              animate={{ scale: 1 }} 
              exit={{ scale: 0.9 }} 
              // Stopping propagation prevents background clicks from closing the modal if user clicks the image div
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-5xl aspect-video bg-[#111827] border border-white/10 shadow-2xl flex items-center justify-center rounded-xl overflow-hidden"
            >
              {/* TODO: Max resolution Next Image here */}
              <div className="text-center">
                <span className="text-white/20 font-rajdhani text-6xl font-bold">{product.name}</span>
                <p className="text-muted mt-4">Full Resolution Rendering</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* === REQUEST QUOTE MODAL === */}
        {isQuoteModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] bg-dark/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setIsQuoteModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }} 
              onClick={(e) => e.stopPropagation()} 
              className="glass-card w-full max-w-xl p-8 bg-[#0a0f1e]/95 border-primary/20 shadow-[-10px_10px_30px_rgba(0,102,204,0.1)] relative"
            >
              <button 
                className="absolute top-6 right-6 text-muted hover:text-white transition-colors"
                onClick={() => setIsQuoteModalOpen(false)}
              >
                <X size={24} />
              </button>
              
              <h2 className="text-3xl font-rajdhani font-bold text-white mb-2">Request a Quote</h2>
              <p className="text-primary text-sm mb-6 pb-6 border-b border-white/10">Inquiring about: <strong className="text-white">{product.name}</strong></p>
              
              {quoteStatus === "success" ? (
                <div className="py-10 text-center">
                  <CheckCircle2 className="mx-auto mb-5 text-green-500" size={56} />
                  <h3 className="mb-3 text-2xl font-rajdhani font-bold text-white">Inquiry Sent</h3>
                  <p className="mx-auto mb-6 max-w-sm text-muted">
                    Thank you. Our team will review your {product.name} requirement and contact you shortly.
                  </p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      setQuoteStatus("idle");
                      setIsQuoteModalOpen(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              ) : (
              <form className="space-y-4" onSubmit={handleQuoteSubmit}>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    required
                    type="text"
                    value={quoteFormData.name}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    value={quoteFormData.email}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Company</label>
                    <input
                      type="text"
                      value={quoteFormData.company}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, company: e.target.value })}
                      className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Phone</label>
                    <input
                      type="tel"
                      value={quoteFormData.phone}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                      className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Requirements</label>
                  <textarea
                    required
                    rows={4}
                    value={quoteFormData.message}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, message: e.target.value })}
                    placeholder={`Specific size, pressure or material considerations for the ${product.name}...`}
                    className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary resize-none"
                  />
                </div>
                {quoteStatus === "error" && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-red-400">
                    <AlertCircle size={18} className="shrink-0" />
                    <span className="text-sm font-medium">{quoteError}</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isQuoteSubmitting}
                  className="btn-primary w-full mt-4 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isQuoteSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> Sending...
                    </>
                  ) : (
                    "Send Inquiry"
                  )}
                </button>
              </form>
              )}
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* 📱 MOBILE: Sticky bottom CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-[#0a0f1e]/95 backdrop-blur-md border-t border-white/10 pb-[calc(1rem+env(safe-area-inset-bottom))] lg:hidden">
        <button onClick={() => setIsQuoteModalOpen(true)} className="w-full py-4 bg-[#0066CC] text-white font-bold rounded-xl active:scale-95 transition-transform">
          Request a Quote
        </button>
      </div>

    </div>
  );
}
