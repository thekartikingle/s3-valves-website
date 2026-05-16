// ============================================
// FILE: lib/sendEmail.ts
// PURPOSE: Handles contact form email submission
//          using EmailJS (no backend server required).
//          Called from the ContactForm component on submit.
// USED IN: app/contact/page.tsx
// DEPENDENCIES: @emailjs/browser
// ============================================

import emailjs from "@emailjs/browser";

// --- Email Sending Function ---
// Parameters match the contact form fields tracked in React state.
// Returns a promise: resolves on 200 OK success from EmailJS, rejects on failure
export async function sendContactEmail(formData: {
  name: string;       // Visitor's full name
  company: string;    // Visitor's company (optional field)
  email: string;      // Reply-to email address allowing us to email back
  phone: string;      // Contact phone number for direct sales calls
  product: string;    // Selected valve/product of interest from drop-down
  message: string;    // Expanded inquiry message body detailing specs
}) {

  // --- EmailJS Configuration ---
  // These values come from .env.local environment variables
  // Never hardcode API keys — always use environment variables for security.
  // Note: For NextJS to expose them to browser, they must have NEXT_PUBLIC_ prefix.
  const serviceId  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS is not configured. Add NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.");
  }

  // --- Template Parameters ---
  // Keys must EXACTLY match the variable names set in your EmailJS template mapping
  // e.g. {{from_name}} in the EmailJS dashboard template = from_name key here
  const templateParams = {
    from_name:    formData.name,
    from_company: formData.company,
    from_email:   formData.email,
    from_phone:   formData.phone,
    product:      formData.product,
    message:      formData.message,
    to_name:      "S3 Valves Sales Team", // Recipient greeting hardcoded matching internal structure
  };

  // --- Send Email ---
  // emailjs.send pushes the data to their server which routes it to your linked inbox
  return await emailjs.send(serviceId, templateId, templateParams, publicKey);
}
