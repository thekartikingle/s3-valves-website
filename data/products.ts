// ============================================
// FILE: data/products.ts
// PURPOSE: Central data store for all valve products.
//          Used to generate product cards, detail pages,
//          spec tables, dimension tables, and SEO metadata.
// USED IN: /products page, /products/[slug] dynamic pages
// ============================================

// --- TypeScript Interface ---
// Defines the shape/structure of every product object
// Every field here maps to a UI element on the product detail page
export interface Product {
  slug: string;        // URL-safe identifier e.g. "ball-valve" → /products/ball-valve
  name: string;        // Display name shown in cards and page headings
  tagline: string;     // Short subtitle shown under the product name
  description: string; // Full paragraph description for the detail page
  image: string;       // Path to main product image in /public/images/products/
  features: string[];  // Bullet list of key features (shown with checkmark icons)
  applications: string[]; // Industries this valve is used in
  specs: {
    sizeRange: string;   // e.g. "15mm – 300mm" — shown in spec table row 1
    material: string;    // Body material options — shown in spec table row 2
    connection: string;  // End connection types — shown in spec table row 3
    pressure: string;    // Pressure rating — shown in spec table row 4
    temperature: string; // Operating temperature — shown in spec table row 5
    operation: string;   // How it's operated — shown in spec table row 6
    standard: string;    // Industry standards — shown in spec table row 7
  };
  dimensions: {
    dn: string;      // Nominal diameter in mm
    nps: string;     // Nominal pipe size in inches
    l: string;       // Face-to-face length in mm
    h: string;       // Height in mm
    weight: string;  // Weight in kg
  }[];
}

// --- Product Data Array ---
// Add all 12 valve objects here following the interface above
export const products: Product[] = [

  // ---- 1. Ball Valve ----
  // Quarter-turn valve using a spherical ball to control flow
  {
    slug: "ball-valve",
    name: "Ball Valve",
    tagline: "Quarter-turn precision flow control",
    // TODO: Replace placeholder description with actual product copy
    description: "S3 Ball Valves offer reliable shutoff and control for a wide range of liquids and gases. Engineered for low pressure drop and long service life, these valves feature robust bodies designed to excel in demanding environments.",
    // TODO: Add actual product image to public/images/products/
    image: "/images/products/ballvalue.png",
    features: [
      "Full bore & reduced bore options", // Full bore = same diameter as pipe
      "Fire safe design (API 607)",        // Prevents leakage in fire conditions
      "Anti-static device",               // Dissipates static electricity buildup
      "Blowout proof stem"                // Prevents stem ejection under high pressure
    ],
    applications: ["Oil & Gas", "Water Treatment", "Chemical Processing", "Pharmaceutical"],
    specs: {
      sizeRange: "15mm – 300mm (½\" – 12\")",
      material: "SS304, SS316, WCB, CF8M",
      connection: "Flanged / Threaded / Socket Weld",
      pressure: "PN10 – PN40 / Class 150–300",
      temperature: "-20°C to +200°C",
      operation: "Manual / Gear / Pneumatic / Electric Actuator",
      standard: "API 6D, BS 5351, IS 9890",
    },
    dimensions: [
      // DN=nominal diameter, NPS=pipe size, L=length, H=height, weight in kg
      { dn: "15", nps: "½\"", l: "108", h: "65", weight: "0.8" },
      { dn: "20", nps: "¾\"", l: "117", h: "70", weight: "1.1" },
      { dn: "25", nps: "1\"", l: "127", h: "75", weight: "1.4" },
      { dn: "40", nps: "1½\"", l: "165", h: "95", weight: "2.5" },
      { dn: "50", nps: "2\"", l: "178", h: "105", weight: "3.8" },
    ],
  },

  // ---- 2. Gate Valve ----
  {
    slug: "gate-valve",
    name: "Gate Valve",
    tagline: "Unrestricted flow linear motion valve",
    description: "S3 Gate Valves are ideal for full flow shut-off services with minimal pressure drop. Their solid or flexible wedge design ensures tight sealing and dependable isolation in high-pressure networks.",
    image: "/images/products/gatevalue.png",
    features: [
      "Solid, flexible & split wedge designs",
      "Outside Screw & Yoke (OS&Y)",
      "Back seat arrangement",
      "Renewable seat rings"
    ],
    applications: ["Refineries", "Power Plants", "Pipelines"],
    specs: {
      sizeRange: "40mm – 600mm (1½\" – 24\")",
      material: "Cast Steel, Forged Steel, Alloy Steel",
      connection: "Flanged / Butt Weld",
      pressure: "Class 150 – Class 2500",
      temperature: "-50°C to +400°C",
      operation: "Handwheel / Gearbox / Motorized",
      standard: "API 600, ASME B16.34",
    },
    dimensions: [
      { dn: "50", nps: "2\"", l: "178", h: "400", weight: "18.0" },
      { dn: "80", nps: "3\"", l: "203", h: "480", weight: "32.0" },
      { dn: "100", nps: "4\"", l: "229", h: "580", weight: "49.0" },
    ],
  },

  // ---- 3. Globe Valve ----
  {
    slug: "globe-valve-y-type",
    name: "Globe Valve Y type",
    tagline: "Precision throttling in linear motion",
    description: "Designed primarily to throttle flow or provide regular shut-off, S3 Globe Valves feature contoured plugs that grant proportional flow behavior and excellent resistance to wear.",
    image: "/images/products/globevalue.png",
    features: [
      "Parabolic, plug, and flat disk options",
      "Excellent throttling characteristics",
      "High seat tightness"
    ],
    applications: ["Boiler Vents", "Cooling Water Systems", "Fuel Oil"],
    specs: {
      sizeRange: "15mm – 400mm (½\" – 16\")",
      material: "WCB, CF8, CF8M, Duplex",
      connection: "Flanged / Butt Weld",
      pressure: "Class 150 – Class 1500",
      temperature: "-20°C to +450°C",
      operation: "Manual / Pneumatic",
      standard: "BS 1873, ASME B16.34",
    },
    dimensions: [
      { dn: "50", nps: "2\"", l: "203", h: "350", weight: "21.0" },
      { dn: "80", nps: "3\"", l: "241", h: "420", weight: "36.0" },
      { dn: "100", nps: "4\"", l: "292", h: "500", weight: "55.0" },
    ],
  },

  // ---- 4. Check Valve ----
  {
    slug: "check-valve",
    name: "Check Valve",
    tagline: "Backflow prevention automatically",
    description: "S3 Check Valves permit flow in one direction and automatically close to prevent backflow, safeguarding critical pumps and pipeline equipment from damage.",
    image: "/images/products/checkvalue.png",
    features: [
      "Swing and Lift check designs",
      "Low pressure drop",
      "Non-slam action"
    ],
    applications: ["Pump Discharge", "Compression Stations", "HVAC"],
    specs: {
      sizeRange: "40mm – 600mm (1½\" – 24\")",
      material: "Cast Steel, Stainless Steel",
      connection: "Flanged / Wafer",
      pressure: "Class 150 – Class 900",
      temperature: "-29°C to +300°C",
      operation: "Automatic (Flow activated)",
      standard: "BS 1868, API 6D",
    },
    dimensions: [
      { dn: "50", nps: "2\"", l: "203", h: "135", weight: "14.0" },
      { dn: "100", nps: "4\"", l: "292", h: "210", weight: "40.0" },
      { dn: "150", nps: "6\"", l: "356", h: "280", weight: "75.0" },
    ],
  },

  // ---- 5. Butterfly Valve ----
  {
    slug: "butterfly-valve",
    name: "Butterfly Valve",
    tagline: "Compact quarter-turn disc valve",
    description: "Extremely lightweight and cost-effective, S3 Butterfly Valves deliver fast operation and bubble-tight shut-off in a compact profile.",
    image: "/images/products/butterflyvalue.png",
    features: [
      "Centric and eccentric designs",
      "Replaceable seat",
      "Low torque operation"
    ],
    applications: ["Water Distribution", "Fire Protection", "Chemical Lines"],
    specs: {
      sizeRange: "50mm – 1200mm (2\" – 48\")",
      material: "CI, DI, WCB, SS316",
      connection: "Wafer / Lug / Double Flanged",
      pressure: "PN10 – PN25",
      temperature: "-10°C to +150°C",
      operation: "Lever / Gear / Actuated",
      standard: "API 609, EN 593",
    },
    dimensions: [
      { dn: "50", nps: "2\"", l: "43", h: "250", weight: "3.5" },
      { dn: "100", nps: "4\"", l: "52", h: "320", weight: "6.0" },
      { dn: "200", nps: "8\"", l: "60", h: "440", weight: "15.0" },
    ],
  },

  // ---- 6. Plug Valve ----
  {
    slug: "globe-valve-angle-type",
    name: "Globe Valve Angle type",
    tagline: "Angular flow control valve",
    description: "S3 Globe Valves provide precise flow control with a linear motion stem, ensuring reliable shut-off and excellent throttling performance in demanding applications.",
    image: "/images/products/anglevalue.png",
    features: [
      "Lubricated and non-lubricated models",
      "Minimal maintenance",
      "Cavity-free design"
    ],
    applications: ["Slurry Handling", "Chemical Transport", "Mining"],
    specs: {
      sizeRange: "15mm – 300mm (½\" – 12\")",
      material: "Cast Iron, Carbon Steel, Exotic Alloys",
      connection: "Flanged / Threaded",
      pressure: "Class 150 – Class 600",
      temperature: "-40°C to +250°C",
      operation: "Wrench / Gear / Pneumatic",
      standard: "API 599",
    },
    dimensions: [
      { dn: "25", nps: "1\"", l: "127", h: "130", weight: "4.5" },
      { dn: "50", nps: "2\"", l: "178", h: "160", weight: "12.0" },
      { dn: "100", nps: "4\"", l: "229", h: "240", weight: "28.0" },
    ],
  },

  // ---- 7. Diaphragm Valve ----
  {
    slug: "diaphragm-valve",
    name: "Diaphragm Valve",
    tagline: "Pinch-action elastomeric seal",
    description: "The S3 Diaphragm Valve isolates the working parts from the process media, ensuring ultimate purity and zero contamination in sanitary pipelines.",
    image: "/images/products/diaphgramvalue.png",
    features: [
      "Weir and straight-through designs",
      "Various lining materials (PTFE, Rubber)",
      "Hermetic sealing"
    ],
    applications: ["Biotech", "Food & Beverage", "Corrosive Chemicals"],
    specs: {
      sizeRange: "15mm – 250mm (½\" – 10\")",
      material: "Ductile Iron, Cast Steel, SS with Lining",
      connection: "Flanged / Sanitary Clamp",
      pressure: "Up to 10 Bar",
      temperature: "-10°C to +175°C",
      operation: "Handwheel / Actuator",
      standard: "BS EN 13397",
    },
    dimensions: [
      { dn: "25", nps: "1\"", l: "127", h: "115", weight: "3.2" },
      { dn: "50", nps: "2\"", l: "190", h: "155", weight: "8.5" },
      { dn: "80", nps: "3\"", l: "254", h: "225", weight: "16.0" },
    ],
  },

  // ---- 8. Safety Relief Valve ----
  {
    slug: "safety-relief-valve",
    name: "Safety Relief Valve",
    tagline: "Overpressure protection safety device",
    description: "Essential for equipment security, S3 Safety Relief Valves instantly open at predetermined pressures to vent destructive overpressure and protect your infrastructure.",
    image: "/images/products/safetyvalue.png",
    features: [
      "Spring-loaded pop-action",
      "Adjustable blowdown",
      "High integrity sealing"
    ],
    applications: ["Boilers", "Pressure Vessels", "Gas Systems"],
    specs: {
      sizeRange: "25mm – 200mm (1\" – 8\")",
      material: "Cast Steel, Stainless Steel",
      connection: "Flanged / Threaded",
      pressure: "Up to 400 Bar",
      temperature: "-196°C to +500°C",
      operation: "Spring Loaded",
      standard: "ASME Section VIII, API 526",
    },
    dimensions: [
      { dn: "25", nps: "1\"", l: "114", h: "310", weight: "12.0" },
      { dn: "50", nps: "2\"", l: "130", h: "450", weight: "25.0" },
      { dn: "100", nps: "4\"", l: "180", h: "600", weight: "55.0" },
    ],
  },

  // ---- 9. Strainer ----
  {
    slug: "strainer",
    name: "Strainer",
    tagline: "Pipeline debris protection",
    description: "S3 Strainers protect valves, pumps, meters, and downstream equipment by filtering scale, weld slag, and solid particles from process lines. Built for reliable service and easy screen cleaning, they help maintain steady flow and reduce maintenance downtime.",
    image: "/images/products/strainer.png",
    features: [
      "Y-type and basket type options",
      "Removable stainless steel screen",
      "Low pressure drop flow path",
      "Easy drain and maintenance access"
    ],
    applications: ["Water Treatment", "Chemical Processing", "Oil & Gas", "Pump Protection"],
    specs: {
      sizeRange: "15mm – 300mm (1/2\" – 12\")",
      material: "WCB, SS304, SS316, Cast Iron",
      connection: "Flanged / Threaded / Socket Weld",
      pressure: "PN10 – PN40 / Class 150–300",
      temperature: "-20°C to +250°C",
      operation: "Removable Screen",
      standard: "ASME B16.34, ANSI, DIN",
    },
    dimensions: [
      { dn: "25", nps: "1\"", l: "120", h: "110", weight: "3.0" },
      { dn: "50", nps: "2\"", l: "180", h: "160", weight: "8.0" },
      { dn: "80", nps: "3\"", l: "260", h: "220", weight: "16.0" },
      { dn: "100", nps: "4\"", l: "300", h: "260", weight: "24.0" },
    ],
  },

  // ---- 10. Pinch Valve ----
  {
    slug: "pinch-valve",
    name: "Pinch Valve",
    tagline: "Rubber sleeve abrasive flow valve",
    description: "Driven by specialized flexible elastomer sleeves, S3 Pinch Valves isolate flow mechanism from gritty slurries ensuring remarkable wear-life without jamming.",
    image: "/images/products/pinch-valve.png",
    features: [
      "Full port unobstructed flow",
      "Easy sleeve replacement",
      "No internal packing"
    ],
    applications: ["Mining Slurries", "Waste Water", "Pneumatic Conveying"],
    specs: {
      sizeRange: "25mm – 300mm (1\" – 12\")",
      material: "Aluminum, Cast Iron with Rubber Sleeve",
      connection: "Flanged",
      pressure: "Up to 16 Bar",
      temperature: "-30°C to +120°C",
      operation: "Pneumatic / Manual",
      standard: "ISA 75.08",
    },
    dimensions: [
      { dn: "50", nps: "2\"", l: "165", h: "280", weight: "10.0" },
      { dn: "100", nps: "4\"", l: "228", h: "350", weight: "24.0" },
      { dn: "150", nps: "6\"", l: "292", h: "440", weight: "45.0" },
    ],
  },

  // ---- 11. Sight Glass ----
  {
    slug: "sight-glass",
    name: "Sight Glass",
    tagline: "Clear inline flow observation",
    description: "S3 Sight Glass units provide direct visual monitoring of liquid flow, color, clarity, and process condition in pipelines. Built with durable viewing glass and rugged bodies, they support quick inspection without interrupting operation.",
    image: "/images/products/sight glasss.png",
    features: [
      "360-degree inline visual inspection",
      "Toughened glass viewing window",
      "Low pressure drop design",
      "Easy installation and maintenance"
    ],
    applications: ["Chemical Processing", "Water Treatment", "Food & Beverage", "Pharmaceutical"],
    specs: {
      sizeRange: "15mm - 200mm (1/2\" - 8\")",
      material: "SS304, SS316, WCB, Cast Iron",
      connection: "Flanged / Threaded / Tri-Clamp",
      pressure: "PN10 - PN16 / Class 150",
      temperature: "-10°C to +180°C",
      operation: "Visual Inspection",
      standard: "ASME B16.34, DIN, ANSI",
    },
    dimensions: [
      { dn: "25", nps: "1\"", l: "120", h: "95", weight: "2.5" },
      { dn: "50", nps: "2\"", l: "150", h: "130", weight: "5.8" },
      { dn: "80", nps: "3\"", l: "200", h: "165", weight: "10.5" },
      { dn: "100", nps: "4\"", l: "230", h: "190", weight: "16.0" },
    ],
  },

  // ---- 12. Sight Glass with NRV ----
  {
    slug: "sight-glass-with-nrv",
    name: "Sight Glass with NRV",
    tagline: "Visual flow check with backflow protection",
    description: "S3 Sight Glass with NRV combines clear inline flow visibility with non-return valve protection in one compact assembly. It helps operators verify flow condition while automatically preventing reverse flow, making it suitable for pump discharge lines, process pipelines, and utility systems.",
    image: "/images/products/sight glasss.png",
    features: [
      "Integrated sight glass and non-return valve",
      "Clear visual flow monitoring",
      "Automatic backflow prevention",
      "Compact inline installation"
    ],
    applications: ["Pump Discharge", "Water Treatment", "Chemical Processing", "Utility Lines"],
    specs: {
      sizeRange: "15mm - 200mm (1/2\" - 8\")",
      material: "SS304, SS316, WCB, Cast Iron",
      connection: "Flanged / Threaded",
      pressure: "PN10 - PN16 / Class 150",
      temperature: "-10°C to +180°C",
      operation: "Visual Inspection / Automatic NRV",
      standard: "ASME B16.34, DIN, ANSI",
    },
    dimensions: [
      { dn: "25", nps: "1\"", l: "150", h: "110", weight: "3.5" },
      { dn: "50", nps: "2\"", l: "190", h: "145", weight: "7.2" },
      { dn: "80", nps: "3\"", l: "250", h: "185", weight: "13.5" },
      { dn: "100", nps: "4\"", l: "290", h: "215", weight: "20.0" },
    ],
  }
];
