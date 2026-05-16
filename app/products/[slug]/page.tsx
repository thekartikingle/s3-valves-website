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
// FILE: app/products/[slug]/page.tsx
// PURPOSE: Dynamic entry point for an individual valve's detail page.
//          This is a Server Component that determines static routing
//          and fetches the correct product data before rendering the Client UI.
// USED IN: Dynamic route /products/[slug]
// DEPENDENCIES: products.ts (data store), ProductDetailClient.tsx (interactive UI)
// ============================================

import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

// --- Static Generation Function ---
// generateStaticParams() tells Next.js at build time which routes exist.
// Instead of building pages on-demand (SSR), it pre-renders all 11 product pages
// as static HTML for maximum performance and SEO.
export function generateStaticParams() {
  // We iterate through our central products array and spit out the required
  // parameter object { slug: string } for each product.
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Ensure the page title and description match the product for SEO
export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return { title: "Product Not Found" };
  
  return {
    title: `${product.name} | S3 Valves`,
    description: product.description,
  };
}

// --- Page Component (Server) ---
// Receives the dynamic "slug" parameter from the URL
export default function ProductPage({ params }: { params: { slug: string } }) {
  // Find the exact product object matching the URL slug
  const product = products.find((p) => p.slug === params.slug);
  
  // If user types a random URL (e.g. /products/fake-valve), throw 404
  if (!product) {
    notFound();
  }

  // Related products filter logic:
  // Pick up to M products that share at least one application industry with the current product.
  // Exclude the current product itself.
  const relatedProducts = products
    .filter(
      (p) => 
        p.slug !== product.slug && 
        p.applications.some(app => product.applications.includes(app))
    )
    .slice(0, 3); // Limit to 3 related items max

  // Pass down data to the Client Component which handles state/animation
  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
