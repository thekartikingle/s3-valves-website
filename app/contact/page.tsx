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
// FILE: app/contact/page.tsx
// PURPOSE: Provides contact methods including a live mapped form
//          sending data via EmailJS, interactive Google Maps embed,
//          and direct contact links.
// USED IN: /contact
// DEPENDENCIES: framer-motion, lib/sendEmail.ts
// ============================================

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { sendContactEmail } from "@/lib/sendEmail";
import { products } from "@/data/products";
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";

export default function ContactPage() {
  // --- Form State Object ---
  // Tracks every field's internal value tied to controlled React inputs
  const [formData, setFormData] = useState({
    name: "",       // Stores the visitor's name for greeting
    company: "",    // Stores B2B company name context
    email: "",      // Crucial for replying digitally
    phone: "",      // Crucial for direct voice interaction
    product: "",    // Allows routing to correct technical salesperson
    message: "",    // The actual context/specs requested
  });

  // --- UI Lifecycle States ---
  const [isSubmitting, setIsSubmitting] = useState(false);  // True when awaiting EmailJS fetch to prevent double clicks
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle"); // Tracks exact phase to show correct user feedback UI
  const [errorMessage, setErrorMessage] = useState("");

  // --- Form Validation Function ---
  // Ensures data intelligence before hitting API limits
  const validateForm = () => {
    // 1. Name rule: Exists. We need to know who we're talking to.
    if (!formData.name.trim()) return "Full Name is required.";
    
    // 2. Email rule: Basic regex. It must follow an x@y.z standard to be a valid reply path.
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Please enter a valid email address.";
    
    // 3. Message rule: At least 10 chars. Prevents spam or accidental single character submits.
    if (formData.message.trim().length < 10) return "Message must be at least 10 characters.";

    return null; // Null means valid
  };

  // --- Form Submit Handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate before proceeding
    const err = validateForm();
    if (err) {
      setSubmitStatus("error");
      setErrorMessage(err);
      return;
    }

    // Success/error state transitions:
    // 1. Set to loading state immediately to show spinner and disable button
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // 2. Call the server/EmailJS wrapper
      await sendContactEmail(formData);
      
      // 3. On success: transform UI into a green thank-you state
      setSubmitStatus("success");
      setFormData({ name: "", company: "", email: "", phone: "", product: "", message: "" });
    } catch (error) {
      console.error(error);
      // 4. On failure: show red error block and allow retry
      setSubmitStatus("error");
      setErrorMessage("Failed to send message. Please check your connection or try calling us directly.");
    } finally {
      // 5. Always stop the spinner regardless of outcome
      setIsSubmitting(false);
    }
  };

  return (
    <div className="industrial-surface min-h-screen bg-dark w-full pt-20">
      
      {/* Page Header */}
      <section className="pt-24 pb-16 px-6 md:px-12 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-rajdhani font-bold text-white mb-6">Get in Touch</h1>
        <p className="text-lg text-muted">
          Our engineering team is ready to evaluate your requirements and specify the perfect flow control mechanism for your application.
        </p>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="container mx-auto px-6 md:px-12 pb-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* --- LEFT COLUMN: CONTACT INFO & MAP --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact Cards */}
            <div className="glass-card p-8 space-y-8">
              <h3 className="font-rajdhani text-2xl font-bold text-white border-b border-white/10 pb-4">Corporate Office</h3>
              
              <div className="flex gap-4 items-start">
                <MapPin className="text-primary shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-white font-semibold text-lg mb-1">Location</h4>
                  <p className="text-muted leading-relaxed">{siteConfig.contact.address}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Phone className="text-primary shrink-0 mt-1" size={24} />
                <div>
                   <h4 className="text-white font-semibold text-lg mb-1">Sales & Support</h4>
                   <div className="flex flex-col gap-1">
                     {siteConfig.contact.phone.map(phone => (
                       <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="text-muted hover:text-white transition-colors">
                         {phone}
                       </a>
                     ))}
                   </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Mail className="text-primary shrink-0 mt-1" size={24} />
                <div>
                   <h4 className="text-white font-semibold text-lg mb-1">Email Us</h4>
                   <div className="flex flex-col gap-1">
                     {siteConfig.contact.email.map(email => (
                       <a key={email} href={`mailto:${email}`} className="text-muted hover:text-white transition-colors">
                         {email}
                       </a>
                     ))}
                   </div>
                </div>
              </div>

              {/* WhatsApp direct link (format explained) */}
              {/* WhatsApp URL syntax uses `wa.me/` followed by full phone without +, spaces, or dashes. */}
              {/* Appending `?text=XYZ` pre-fills the user's message box when the app opens. */}
              <a 
                href={siteConfig.social.whatsapp} 
                className="w-full mt-4 flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 py-3 rounded-lg font-semibold transition-colors"
              >
                 <MessageCircle size={20} /> Chat on WhatsApp
              </a>
            </div>

            {/* Interactive Google Map Embed */}
            {/* 📱 MOBILE: Map uses min height sizes to prevent collapse on small phones */}
            <div className="glass-card p-2 w-full h-[300px] md:h-[400px] lg:h-64 overflow-hidden rounded-2xl relative">
              {/* Map Embed URL explanation: */}
              {/* Uses Google Maps Embed API in "place" mode for simplicity. */}
              {/* To change coordinates/pin securely: Use NEXT_PUBLIC_GOOGLE_MAPS_API_KEY + place mapping `q=Lat,Lng` */}
              {/* Since the prompt asks for standard embed iframe approach without keys if generic: */}
              <iframe 
                src={`https://maps.google.com/maps?q=${siteConfig.location.lat},${siteConfig.location.lng}&z=14&output=embed`}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                // The filter inverses map colors to fake a dark mode map matching the UI
                className="rounded-xl opacity-80 mix-blend-luminosity filter invert grayscale contrast-125"
              ></iframe>
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN: THE FORM --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 glass-card p-8 md:p-12 relative overflow-hidden"
          >
             <h2 className="text-3xl font-rajdhani font-bold text-white mb-2">Send an Inquiry</h2>
             <p className="text-muted mb-8">Fill out the form below and a representative will contact you shortly.</p>

             {/* Animated status overlay blocking form usage after successful submission */}
             <AnimatePresence>
               {submitStatus === "success" && (
                 <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                   className="absolute inset-0 z-50 bg-dark/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8"
                 >
                   <CheckCircle2 className="text-green-500 mb-6" size={64} />
                   <h3 className="text-3xl font-rajdhani font-bold text-white mb-4">Message Sent!</h3>
                   <p className="text-muted text-lg mb-8 max-w-sm">Thank you for reaching out. Our engineering sales team will review your specifications and contact you within 24 hours.</p>
                   <button onClick={() => setSubmitStatus("idle")} className="btn-primary">Send Another Inquiry</button>
                 </motion.div>
               )}
             </AnimatePresence>

             <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Form layout utilizes CSS Grid on large screens, stacks on small screens */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Full Name *</label>
                    {/* 📱 MOBILE: text-base prevents iOS Safari from auto-zooming when focused */}
                    <input 
                      required 
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 h-12 md:h-14 text-base text-white focus:outline-none focus:border-primary transition-colors focus:bg-primary/5" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Company Name</label>
                    <input 
                      type="text" 
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 h-12 md:h-14 text-base text-white focus:outline-none focus:border-primary transition-colors focus:bg-primary/5" 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Email Address *</label>
                    {/* 📱 MOBILE: type="email" loads the email-optimized keyboard */}
                    <input 
                      required 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 h-12 md:h-14 text-base text-white focus:outline-none focus:border-primary transition-colors focus:bg-primary/5" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Phone Number</label>
                    {/* 📱 MOBILE: type="tel" loads the numeric keypad */}
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 h-12 md:h-14 text-base text-white focus:outline-none focus:border-primary transition-colors focus:bg-primary/5" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Primary Product of Interest</label>
                  <select 
                    value={formData.product}
                    onChange={e => setFormData({...formData, product: e.target.value})}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 h-12 md:h-14 text-base text-white focus:outline-none focus:border-primary transition-colors focus:bg-primary/5 appearance-none"
                  >
                     <option value="" disabled className="text-black">-- Select a Valve Type --</option>
                     {products.map(p => (
                       <option value={p.name} key={p.slug} className="text-black">{p.name}</option>
                     ))}
                     <option value="Other/Multiple" className="text-black">Multiple / General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Message / Specifications *</label>
                  <textarea 
                    required 
                    rows={5} 
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    placeholder="Please include sizing, pressure class, material grade, or any API requirements..."
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-4 text-base text-white focus:outline-none focus:border-primary transition-colors focus:bg-primary/5 resize-y" 
                  />
                </div>

                {/* Inline Error Block if validation or network fails */}
                <AnimatePresence>
                  {submitStatus === "error" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-2 text-red-500 bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                      <AlertCircle size={20} className="shrink-0" />
                      <span className="text-sm font-medium">{errorMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button dynamically altering state via 'disabled' attribute to prevent spam */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={24} /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

             </form>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
