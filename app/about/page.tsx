// ============================================
// FILE: app/about/page.tsx
// PURPOSE: Shares the company's story, vision, mission, and strengths.
// USED IN: /about
// DEPENDENCIES: framer-motion, next/image, lucide-react
// ============================================

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Factory,
  Gauge,
  Handshake,
  Layers3,
  MapPin,
  Microscope,
  ScanSearch,
  Settings,
  ShieldCheck,
  Target,
} from "lucide-react";

const visionMission = [
  {
    title: "Our Vision",
    text: "To become a trusted and recognized name in the industrial valve manufacturing sector by delivering innovative, durable, and high-performance flow control solutions.",
    icon: Target,
  },
  {
    title: "Our Mission",
    text: "To provide industries with reliable and precision-engineered valve solutions through continuous improvement, quality-focused manufacturing, and engineering excellence.",
    icon: BadgeCheck,
  },
];

const workplaceImages = [
  {
    src: "/images/about/New%20folder/conference%20hall.jpeg",
    label: "Conference Hall",
  },
  {
    src: "/images/about/New%20folder/ChatGPT%20Image%20May%2014%2C%202026%2C%2004_59_56%20PM.png",
    label: "Industrial Workspace",
  },
  {
    src: "/images/about/New%20folder/office.jpeg",
    label: "Office",
  },
  {
    src: "/images/about/New%20folder/storage%202%27.jpeg",
    label: "Storage Area",
  },
  {
    src: "/images/about/New%20folder/storage.jpeg",
    label: "Inventory Storage",
  },
  {
    src: "/images/about/New%20folder/work%20space.jpeg",
    label: "Work Space",
  },
];

const whyChooseUs = [
  {
    title: "Engineering-Driven Approach",
    text: "At S3 Valves, every product is developed with a strong engineering foundation focused on performance, reliability, and long-term operational efficiency. Our solutions are designed to meet demanding industrial requirements with precision and consistency.",
    image: "/images/consultancy/systemandanalysis/img2fordesignequipment.png",
    icon: Settings,
  },
  {
    title: "Advanced Design & Simulation",
    text: "We utilize SOLIDWORKS for product design, analysis, and simulation to validate performance before manufacturing. This technology-driven approach helps optimize designs, improve product reliability, reduce development limitations, and deliver cost-efficient engineering solutions tailored to application requirements.",
    image: "/images/consultancy/simulation/4simulationdrivenengineering.png",
    icon: ScanSearch,
  },
  {
    title: "Precision Manufacturing",
    text: "Our facility is equipped with automated CNC and VMC machining systems that ensure superior dimensional accuracy, repeatability, and high-quality surface finish. Modern manufacturing practices enable us to maintain strict quality standards throughout production.",
    image: "/images/consultancy/manufacturing/1.png",
    icon: Factory,
  },
  {
    title: "Experienced Technical Team",
    text: "Our core team brings over 20 years of experience in refrigeration systems, flow equipment, materials engineering, and chemical handling applications. This technical expertise allows us to develop dependable solutions suitable for challenging operating conditions.",
    image: "/images/about/New%20folder/ChatGPT%20Image%20May%2014%2C%202026%2C%2004_59_43%20PM.png",
    icon: Gauge,
  },
  {
    title: "Quality & Reliability",
    text: "We maintain a strong focus on quality at every stage of manufacturing, from material selection and machining to assembly and testing. Every product is manufactured with careful attention to safety, durability, sealing performance, and operational reliability.",
    image: "/images/about/ChatGPT%20Image%20May%2016%2C%202026%2C%2003_27_41%20PM.png",
    imagePosition: "object-top",
    icon: ShieldCheck,
  },
  {
    title: "Customization Capability",
    text: "We understand that every application has unique operational requirements. Our engineering and manufacturing capabilities allow us to provide customized solutions designed to meet specific pressure, temperature, media, and performance conditions.",
    image: "/images/consultancy/systemandanalysis/img4forintegratedengneering.png",
    icon: Layers3,
  },
  {
    title: "Commitment to Customer Satisfaction",
    text: "At S3 Valves, we believe in building long-term relationships through professionalism, transparency, timely delivery, and dependable technical support. Our commitment is to provide products and services that customers can trust with confidence.",
    image: "/images/about/ChatGPT%20Image%20May%2016%2C%202026%2C%2003_23_56%20PM.png",
    icon: Handshake,
  },
  {
    title: "Trusted Manufacturing Facility",
    text: "Located in Ambernath, our facility reflects our dedication toward modern engineering practices, precision manufacturing, and continuous technological improvement aimed at serving industries with excellence.",
    image: "/images/about/WhatsApp%20Image%202026-05-14%20at%202.37.02%20PM%20%281%29.jpeg",
    icon: MapPin,
  },
];

export default function AboutPage() {
  return (
    <div className="industrial-surface min-h-screen bg-dark w-full pt-20">
      {/* --- HERO --- */}
      <section className="relative overflow-hidden px-6 pb-20 pt-24 md:px-12 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,102,204,0.18),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(255,107,0,0.08),transparent_28%)]" />
        <div className="container relative mx-auto grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary sm:text-sm">
              About S3 Valves
            </p>
            <h1 className="mb-7 font-rajdhani text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
              Mastering the Flow with Precision.
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg lg:text-xl">
              S3 Valves is a professionally driven engineering and manufacturing company based in Ambernath, dedicated to delivering reliable, precision-engineered valve and flow control solutions for modern industrial applications. Built on the foundation of quality, innovation, and technical expertise, the company focuses on developing products that combine performance, durability, and cost efficiency.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-[0_28px_90px_rgba(0,0,0,0.35)]">
              <Image
                src="/images/about/weilding.png"
                alt="S3 Valves welding and manufacturing work"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 rounded-xl border border-white/10 bg-dark/90 px-5 py-4 backdrop-blur-md">
              <div className="flex items-center gap-3 text-sm font-semibold text-white">
                <Microscope className="h-5 w-5 text-primary" />
                Engineered for performance, durability, and cost efficiency.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- VISION & MISSION --- */}
      <section className="container mx-auto px-6 pb-24 md:px-12">
        <div className="grid gap-5 md:grid-cols-2">
          {visionMission.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="quiet-card-motion group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111827] p-7 md:p-9"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-primary/70" />
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                <item.icon size={28} />
              </div>
              <h2 className="mb-4 font-rajdhani text-3xl font-bold text-white">{item.title}</h2>
              <p className="text-base leading-relaxed text-muted md:text-lg">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1424]/90 py-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
        >
          <div className="relative overflow-hidden">
            <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-5 px-5 hover:[animation-play-state:paused]">
              {[...workplaceImages, ...workplaceImages].map((image, index) => (
                <div
                  key={`${image.label}-${index}`}
                  className="relative h-64 w-[340px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-dark sm:h-72 sm:w-[420px] lg:h-80 lg:w-[520px]"
                >
                  <Image
                    src={image.src}
                    alt={image.label}
                    fill
                    sizes="(max-width: 640px) 340px, (max-width: 1024px) 420px, 520px"
                    className="object-cover opacity-90 transition-transform duration-500 hover:scale-105 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="border-t border-white/5 bg-[#080d19] py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary sm:text-sm">
              Why Choose Us
            </p>
            <h2 className="section-heading mb-5">Built for demanding industrial applications.</h2>
            <p className="text-base leading-relaxed text-muted md:text-lg">
              Our strength comes from combining engineering judgement, modern manufacturing, and quality-focused execution across every stage of product development.
            </p>
          </div>

          <div className="space-y-10 md:space-y-14">
            {whyChooseUs.map((item, index) => {
              const isReversed = index % 2 === 1;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.55 }}
                className="quiet-card-motion grid items-center gap-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1424] p-4 md:grid-cols-2 md:gap-10 md:p-6"
                >
                  <div className={`relative aspect-[16/10] overflow-hidden rounded-xl bg-dark ${isReversed ? "md:order-2" : ""}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`object-cover transition-transform duration-700 hover:scale-105 ${item.imagePosition ?? ""}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/65 via-transparent to-transparent" />
                  </div>

                  <div className={`p-2 md:p-4 ${isReversed ? "md:order-1" : ""}`}>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon size={24} />
                    </div>
                    <h3 className="mb-4 font-rajdhani text-3xl font-bold text-white md:text-4xl">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-muted md:text-lg">
                      {item.text}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-5 rounded-2xl border border-primary/20 bg-primary/10 p-7 md:flex-row md:items-center md:p-8">
            <div>
              <h3 className="font-rajdhani text-3xl font-bold text-white">Need a valve solution for a specific application?</h3>
              <p className="mt-2 text-muted">Our team can help review your pressure, temperature, media, and performance requirements.</p>
            </div>
            <a href="/contact" className="btn-primary inline-flex shrink-0 items-center justify-center gap-2">
              Talk to Our Team <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
