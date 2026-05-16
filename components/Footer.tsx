// ============================================
// FILE: components/Footer.tsx
// PURPOSE: Global footer containing secondary links, contact info,
//          social links, and copyright text.
// USED IN: app/layout.tsx
// DEPENDENCIES: lucide-react (icons), siteConfig
// ============================================

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark border-t border-white/10 pt-16 pb-8 text-sm">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

        {/* --- Brand & About Column --- */}
        <div className="space-y-4">
          <Link href="/" className="text-2xl font-rajdhani font-bold text-white flex items-center gap-3 mb-4">
            <Image
              src="/images/logo/logo1.png"
              alt="S3 Valves Logo"
              width={200}
              height={80}
              className="object-contain h-12 w-auto"
            />
            {siteConfig.name}
          </Link>
          <div className="py-2 w-40 h-24 overflow-hidden relative flex items-center justify-center">
            <Image
              src="/images/footer/Make-in-India-logo-svg_logoshape.com.png"
              alt="Make in India"
              width={200}
              height={100}
              className="object-contain scale-110"
            />
          </div>
          <p className="text-muted leading-relaxed">
            {siteConfig.tagline}. Leading the industry with innovative automated valve solutions and flow control systems customized for demanding environments.
          </p>

          {/* Social Links */}
          <div className="flex gap-4 pt-2">
            <a href={siteConfig.social.linkedin} className="text-muted hover:text-primary transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a href={siteConfig.social.whatsapp} className="text-muted hover:text-green-500 transition-colors">
              <FaWhatsapp size={20} />
            </a>
            <a href={siteConfig.social.instagram} className="text-muted hover:text-pink-500 transition-colors">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* --- Quick Links Column --- */}
        <div>
          <h3 className="text-white font-rajdhani font-semibold text-xl mb-6">Quick Links</h3>
          <ul className="space-y-3">
            {[
              { name: "About Us", path: "/about" },
              { name: "Our Products", path: "/products" },
              { name: "ISO Certification", path: "/#iso-certification" },
              { name: "Contact Us", path: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.path} className="text-muted hover:text-primary transition-colors flex items-center gap-2 group">
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Top Products Column --- */}
        <div>
          <h3 className="text-white font-rajdhani font-semibold text-xl mb-6">Products</h3>
          <ul className="space-y-3">
            {[
              { name: "Ball Valves", path: "/products/ball-valve" },
              { name: "Gate Valves", path: "/products/gate-valve" },
              { name: "Globe Valve Y Type", path: "/products/globe-valve-y-type" },
              { name: "Globe Valve Angle Type", path: "/products/globe-valve-angle-type" },
              { name: "Butterfly Valves", path: "/products/butterfly-valve" },
              { name: "NRV", path: "/products/check-valve" },
              { name: "Sight Glass", path: "/products/sight-glass" },
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.path} className="text-muted hover:text-primary transition-colors flex items-center gap-2 group">
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Contact Info Column --- */}
        <div>
          <h3 className="text-white font-rajdhani font-semibold text-xl mb-6">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-muted">
              <MapPin className="text-primary shrink-0 mt-1" size={18} />
              <span>{siteConfig.contact.address}</span>
            </li>
            <li className="flex gap-3 text-muted">
              <Phone className="text-primary shrink-0 mt-1" size={18} />
              <div className="flex flex-col">
                {siteConfig.contact.phone.map(phone => (
                  <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{phone}</a>
                ))}
              </div>
            </li>
            <li className="flex gap-3 text-muted">
              <Mail className="text-primary shrink-0 mt-1" size={18} />
              <div className="flex flex-col">
                {siteConfig.contact.email.map(email => (
                  <a key={email} href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
                ))}
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* --- Copyright Bar --- */}
      <div className="container mx-auto px-6 md:px-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted text-xs">
          &copy; {currentYear} {siteConfig.name}. All rights reserved.
        </p>
        <p className="text-muted text-xs">
        
        </p>
      </div>
    </footer>
  );
}
