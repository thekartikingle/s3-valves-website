// ============================================
// FILE: config/site.ts
// PURPOSE: Central configuration for all company-specific
//          information. Edit this file to update contact
//          details, location, and social links site-wide.
// USED IN: Navbar, Footer, Contact page, SEO metadata
// ============================================

export const siteConfig = {

  // --- Company Identity ---
  name: "S3 Valves",
  tagline: "Precision Flow Control Solutions",
  description: "Leading manufacturer of industrial flow control valves and equipment, delivering precision-engineered solutions for diverse industrial applications.", // Used in SEO meta tags

  // --- Contact Information ---
  // TODO: Replace with actual company contact details
  contact: {
    phone: ["+91 9822795225", "+91 7887516306"],
    email: ["sales@s3valves.in"],
    address: "I-8, Plot No. K-3 & H-104/105, K-2, Udyog Bhavan No. 2, Anand Nagar MIDC, Ambernath, Maharashtra 421506",
    workingHours: "Mon – Sat: 9:00 AM – 6:00 PM",
  },

  // --- Google Maps Configuration ---
  // TODO: Replace with actual shop coordinates
  // To find coordinates: right-click location on Google Maps → "What's here?"
  location: {
    lat: 19.1800,
    lng: 73.1900,
    googleMapsUrl: "https://maps.google.com/?q=S3+Valves+Anand+Nagar+MIDC+Ambernath",
  },

  // --- Social Media Links ---
  social: {
    linkedin: "https://www.linkedin.com/in/s3-valves-3461b03a0/",
    whatsapp: "https://wa.me/917887516306",
    instagram: "https://www.instagram.com/s3valves/",
    indiamart: "#",
  },

  // --- SEO ---
  url: "https://s3valves.com",   // Production domain for canonical URLs
  ogImage: "/images/mainn/herophotocard.png",
};
