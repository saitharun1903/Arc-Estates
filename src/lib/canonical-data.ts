export interface CanonicalFloorPlan {
  id: string;
  name: string;
  bhk: string;
  areaSqFt: string;
  facing: string;
  imageUrl: string;
  description?: string | null;
  demo?: boolean;
}

export interface CanonicalProject {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  location: string;
  status: string;
  projectType: string;
  heroImage: string;
  galleryImages: string;
  areaRange: string;
  bedrooms: string;
  totalUnits: string;
  priceRange: string;
  completionYear: string;
  featured: boolean;
  demo: boolean;
  constructionProgress: number;
  amenities: string;
  specifications: string;
  progressMilestones?: string | null;
  floorPlans: CanonicalFloorPlan[];
  brochures?: Array<{ id: string; title: string; fileUrl: string; fileSize?: string | null }>;
}

export interface CanonicalProperty {
  id: string;
  title: string;
  unitNumber?: string | null;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  price: string;
  status: string;
  floor?: string | null;
  facing?: string | null;
  featuredImage: string;
  demo: boolean;
  project?: {
    name: string;
    slug: string;
    location: string;
  } | null;
}

export interface CanonicalFAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CanonicalSettings {
  companyName: string;
  tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  googleRating: string;
  googleReviewsCount: string;
  heroHeadline: string;
  heroSubhead: string;
  aboutSnippet: string;
  whyArcPoints?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
}

export const CANONICAL_SETTINGS: CanonicalSettings = {
  companyName: "ARC AVENUE",
  tagline: "Real Estate Builders & Construction Company",
  address: "HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043",
  phone: "080085 32333",
  whatsapp: "+918008532333",
  email: "connect@arcavenue.in",
  googleRating: "5.0",
  googleReviewsCount: "14",
  heroHeadline: "BUILDING SPACES THAT MOVE PEOPLE.",
  heroSubhead: "Real Estate Builders & Construction Company — Bahadurpally, Hyderabad",
  aboutSnippet: "At ARC Avenue, architectural precision converges with structural integrity. We engineer enduring residential environments rooted in timeless design, verified craftsmanship, and unwavering transparency.",
  whyArcPoints: JSON.stringify([
    {
      title: "Architectural Integrity",
      description: "Every layout is designed around natural illumination, cross-ventilation, and structural longevity, eliminating dead spatial zones.",
      number: "01",
    },
    {
      title: "Precision Craftsmanship",
      description: "Rigorous 120-point structural inspection protocol spanning seismic grade rebar testing, M-sand quality, and premium waterproofing.",
      number: "02",
    },
    {
      title: "Transparent Milestone Delivery",
      description: "Zero hidden clauses. Real-time construction telemetry, digital timeline tracking, and scheduled site inspections at every milestone.",
      number: "03",
    },
    {
      title: "Strategic Growth Corridor",
      description: "Located in Hyderabad’s prime northern growth corridor near Outer Ring Road (ORR Exit 5), offering generational asset appreciation.",
      number: "04",
    },
  ]),
  instagramUrl: "https://instagram.com/arcavenue.in",
  linkedinUrl: "https://linkedin.com/company/arcavenue",
  facebookUrl: "https://facebook.com/arcavenue",
  youtubeUrl: "https://youtube.com/@arcavenue",
};

export const CANONICAL_PROJECTS: CanonicalProject[] = [
  {
    id: "p1-arc-vista",
    name: "ARC Vista",
    slug: "arc-vista",
    tagline: "High-Rise Architectural Sky Residences",
    description: "ARC Vista is a towering testament to modern structural elegance in Bahadurpally. Designed with expansive cantilevered balconies and high thermal-efficiency facades, Vista offers panoramic vistas of the northern greenery while connecting seamlessly to Hyderabad’s major tech corridors.",
    location: "Doolapally Road, Near KNR Apartments, Bahadurpally, Hyderabad",
    status: "Ongoing",
    projectType: "Residential High-Rise",
    heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=85",
    galleryImages: JSON.stringify([
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ]),
    areaRange: "2,150 - 3,450 sq.ft",
    bedrooms: "3 & 4 BHK",
    totalUnits: "72 Ultra-Spacious Units",
    priceRange: "₹1.85 Cr - ₹3.10 Cr",
    completionYear: "December 2026",
    featured: true,
    demo: true,
    constructionProgress: 65,
    amenities: JSON.stringify([
      "Infinity Rooftop Pool",
      "Double-Height Grand Lobby",
      "EV Charging Bays at Every Parking",
      "Sky Fitness & Wellness Studio",
      "Acoustic Private Screening Lounge",
      "Landscaped Zen Courtyard",
      "24/7 Monitored Access Control",
    ]),
    specifications: JSON.stringify([
      { category: "Superstructure", items: ["RCC Shear Wall framed structure designed for high seismic compliance (Zone II)."] },
      { category: "Flooring", items: ["Italian Botticino marble in living & dining areas", "Laminated hardwood flooring in Master Suite", "Anti-skid vitrified tiles in utility and balconies."] },
      { category: "Joinery & Openings", items: ["8-foot engineered Teak wood main door with biometric smart lock", "UPVC/High-gauge aluminum sliding acoustic windows with double-glazing."] },
      { category: "Sanitary & Electrical", items: ["Grohe/Kohler concealed diverters and wall-hung EWCs", "Schneider/Legrand modular switches with smart automation wiring."] },
    ]),
    progressMilestones: JSON.stringify([
      { phase: "Substructure & Foundation", status: "Completed", date: "Q1 2025" },
      { phase: "Superstructure (18 Floors)", status: "Completed", date: "Q3 2025" },
      { phase: "Brickwork & MEP Rough-in", status: "In Progress (80%)", date: "Current" },
      { phase: "Facade Glazing & Plastering", status: "In Progress (45%)", date: "Q1 2026" },
      { phase: "Interior Finishes & Handover", status: "Scheduled", date: "Q4 2026" },
    ]),
    floorPlans: [
      {
        id: "fp-1",
        name: "Plan 3A — 3 BHK Sky Residence",
        bhk: "3 BHK",
        areaSqFt: "2,150 sq.ft",
        facing: "East Facing",
        imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        description: "Three ensuite bedrooms with expansive open-plan living, extended 8-ft wide sunset terrace, and dedicated maid quarters.",
        demo: true,
      },
      {
        id: "fp-2",
        name: "Plan 4B — 4 BHK Signature Penthouse",
        bhk: "4 BHK",
        areaSqFt: "3,450 sq.ft",
        facing: "North-East Corner Facing",
        imageUrl: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",
        description: "Palatial 4-bedroom dual-aspect penthouse with double-height living foyer, private sky deck, and separate family study.",
        demo: true,
      },
    ],
  },
  {
    id: "p2-arc-haven",
    name: "ARC Haven",
    slug: "arc-haven",
    tagline: "Private Courtyard Luxury Villas",
    description: "ARC Haven redefines privacy and serene architectural living in Bahadurpally. Conceived as standalone courtyard estates, each villa centers around an open-to-sky central atrium that draws fresh air and zenith daylight into every floor.",
    location: "Bahadurpally - Gundlapochampally Link Road, Hyderabad",
    status: "Ongoing",
    projectType: "Luxury Gated Villas",
    heroImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=85",
    galleryImages: JSON.stringify([
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ]),
    areaRange: "3,800 - 5,200 sq.ft",
    bedrooms: "4 & 5 BHK",
    totalUnits: "36 Private Estates",
    priceRange: "₹3.40 Cr - ₹4.95 Cr",
    completionYear: "August 2026",
    featured: true,
    demo: true,
    constructionProgress: 40,
    amenities: JSON.stringify([
      "Private Temperature-Controlled Plunge Pool",
      "Central Landscaped Courtyard with Water Feature",
      "Private Elevators in Every Villa",
      "Clubhouse with Squash & Tennis Courts",
      "Solar Net-Metering Equipped Rooftops",
      "Underground Cabling & Concealed Storm Drains",
    ]),
    specifications: JSON.stringify([
      { category: "Foundation & Framing", items: ["Isolated RCC column footings with high-performance solid concrete blocks."] },
      { category: "Energy & Automation", items: ["Pre-installed 5kW Solar Photovoltaic rooftop array", "Full home automation hub with climate and lighting scenes."] },
      { category: "Finishes", items: ["Handcrafted exposed architectural concrete feature walls", "Imported Greek Thassos marble and natural teak parquet."] },
    ]),
    progressMilestones: JSON.stringify([
      { phase: "Land Development & Earthworks", status: "Completed", date: "Q4 2024" },
      { phase: "Villa Foundations & Plinths", status: "Completed", date: "Q2 2025" },
      { phase: "Structural Framing & Slabs", status: "In Progress (60%)", date: "Current" },
      { phase: "Architectural Enclosures & Masonry", status: "In Progress (20%)", date: "Q1 2026" },
      { phase: "Final Handover", status: "Scheduled", date: "Q3 2026" },
    ]),
    floorPlans: [
      {
        id: "fp-3",
        name: "Haven Villa — Type Alpha (4 BHK)",
        bhk: "4 BHK",
        areaSqFt: "3,800 sq.ft",
        facing: "East Facing",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        description: "Triplex courtyard villa featuring ground-level water court, second-floor master deck, and private terrace lounge.",
        demo: true,
      },
    ],
  },
  {
    id: "p3-arc-terrace",
    name: "ARC Terrace",
    slug: "arc-terrace",
    tagline: "Boutique Terraced Residences",
    description: "ARC Terrace exemplifies low-density, human-scale architecture. Situated near Tech Mahindra Bahadurpally, each home features stepped cantilevered terraces creating private hanging gardens.",
    location: "Near Tech Mahindra Campus, Bahadurpally, Hyderabad",
    status: "Ready to Move",
    projectType: "Boutique Residences",
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85",
    galleryImages: JSON.stringify([
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ]),
    areaRange: "1,450 - 2,200 sq.ft",
    bedrooms: "2 & 3 BHK",
    totalUnits: "28 Exclusive Residences",
    priceRange: "₹95 L - ₹1.55 Cr",
    completionYear: "Completed (Ready to Move)",
    featured: true,
    demo: true,
    constructionProgress: 100,
    amenities: JSON.stringify([
      "Rooftop Community Herb & Flower Garden",
      "Fitness Studio with Pilates Reformers",
      "100% DG Power Backup for All Units",
      "Rainwater Harvesting with Filtration",
    ]),
    specifications: JSON.stringify([
      { category: "Structure", items: ["Earthquake resistant RCC framed structure with external aerated concrete blockwork."] },
      { category: "Doors & Windows", items: ["Main door: Premium teak wood frame with designer flush shutter.", "Windows: Three-track UPVC with mosquito mesh provision."] },
    ]),
    progressMilestones: JSON.stringify([
      { phase: "Full Construction & Handover", status: "Completed & Occupancy Certified", date: "2024" },
    ]),
    floorPlans: [
      {
        id: "fp-4",
        name: "Terrace Suite — 3 BHK",
        bhk: "3 BHK",
        areaSqFt: "1,980 sq.ft",
        facing: "North Facing",
        imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        description: "Spacious 3 BHK with 22-foot long stepping terrace garden and custom timber pergolas.",
        demo: true,
      },
    ],
  },
  {
    id: "p4-arc-origin",
    name: "ARC Origin",
    slug: "arc-origin",
    tagline: "Prime Commercial & Retail Landmark",
    description: "ARC Origin marks ARC Avenue’s flagship mixed-use retail and corporate workspace development on the prime Doolapally arterial route in Bahadurpally. Designed with an iconic double-skin glass curtain wall and wide pedestrian colonnades.",
    location: "Doolapally Main Junction, Bahadurpally, Hyderabad",
    status: "Upcoming",
    projectType: "Commercial & Retail",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85",
    galleryImages: JSON.stringify([
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    ]),
    areaRange: "850 - 4,500 sq.ft",
    bedrooms: "Office Suites & Retail Bays",
    totalUnits: "32 Commercial Bays",
    priceRange: "₹1.15 Cr - ₹4.80 Cr",
    completionYear: "Launching Q1 2026",
    featured: false,
    demo: true,
    constructionProgress: 15,
    amenities: JSON.stringify([
      "Triple-Height Atrium with Cafeteria",
      "High-Speed Schindler Destination Elevators",
      "BMS (Building Management System) Automation",
      "Two-Level Dedicated Basement Parking",
    ]),
    specifications: JSON.stringify([
      { category: "Curtain Wall", items: ["Acoustically insulated DGU glass with solar heat reduction coefficient."] },
    ]),
    progressMilestones: JSON.stringify([
      { phase: "Architectural Approval & RERA Registration", status: "In Process", date: "Q4 2025" },
      { phase: "Excavation & Shoring", status: "Scheduled", date: "Q1 2026" },
    ]),
    floorPlans: [],
  },
];

export const CANONICAL_PROPERTIES: CanonicalProperty[] = [
  {
    id: "prop-1",
    title: "ARC Vista - Unit 602 (East Facing 3 BHK)",
    unitNumber: "V-602",
    propertyType: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 2150,
    price: "₹1.85 Cr",
    status: "Available",
    floor: "6th Floor",
    facing: "East",
    featuredImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    demo: true,
    project: {
      name: "ARC Vista",
      slug: "arc-vista",
      location: "Doolapally Road, Near KNR Apartments, Bahadurpally, Hyderabad",
    },
  },
  {
    id: "prop-2",
    title: "ARC Vista - Unit 1201 (Corner 4 BHK)",
    unitNumber: "V-1201",
    propertyType: "Apartment",
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: 3150,
    price: "₹2.70 Cr",
    status: "Available",
    floor: "12th Floor",
    facing: "North-East",
    featuredImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    demo: true,
    project: {
      name: "ARC Vista",
      slug: "arc-vista",
      location: "Doolapally Road, Near KNR Apartments, Bahadurpally, Hyderabad",
    },
  },
  {
    id: "prop-3",
    title: "ARC Vista - Penthouse 1801",
    unitNumber: "V-1801",
    propertyType: "Penthouse",
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 3450,
    price: "₹3.10 Cr",
    status: "Reserved",
    floor: "18th Floor (Top)",
    facing: "North",
    featuredImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    demo: true,
    project: {
      name: "ARC Vista",
      slug: "arc-vista",
      location: "Doolapally Road, Near KNR Apartments, Bahadurpally, Hyderabad",
    },
  },
  {
    id: "prop-4",
    title: "ARC Haven - Villa 07 (Courtyard Estate)",
    unitNumber: "H-07",
    propertyType: "Villa",
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 3800,
    price: "₹3.45 Cr",
    status: "Available",
    floor: "G+2 Triplex",
    facing: "East",
    featuredImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    demo: true,
    project: {
      name: "ARC Haven",
      slug: "arc-haven",
      location: "Bahadurpally - Gundlapochampally Link Road, Hyderabad",
    },
  },
  {
    id: "prop-5",
    title: "ARC Haven - Villa 14 (Corner Villa with Plunge Pool)",
    unitNumber: "H-14",
    propertyType: "Villa",
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 4900,
    price: "₹4.35 Cr",
    status: "Available",
    floor: "G+2 Triplex",
    facing: "North-East",
    featuredImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    demo: true,
    project: {
      name: "ARC Haven",
      slug: "arc-haven",
      location: "Bahadurpally - Gundlapochampally Link Road, Hyderabad",
    },
  },
  {
    id: "prop-6",
    title: "ARC Terrace - Suite 204 (Terrace 3 BHK)",
    unitNumber: "T-204",
    propertyType: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 1980,
    price: "₹1.42 Cr",
    status: "Available",
    floor: "2nd Floor",
    facing: "North",
    featuredImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    demo: true,
    project: {
      name: "ARC Terrace",
      slug: "arc-terrace",
      location: "Near Tech Mahindra Campus, Bahadurpally, Hyderabad",
    },
  },
  {
    id: "prop-7",
    title: "ARC Terrace - Suite 401 (Step-Garden 2 BHK)",
    unitNumber: "T-401",
    propertyType: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1450,
    price: "₹98 Lakhs",
    status: "Available",
    floor: "4th Floor",
    facing: "East",
    featuredImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    demo: true,
    project: {
      name: "ARC Terrace",
      slug: "arc-terrace",
      location: "Near Tech Mahindra Campus, Bahadurpally, Hyderabad",
    },
  },
];

export const CANONICAL_FAQS: CanonicalFAQ[] = [
  {
    id: "faq-1",
    question: "Where is the ARC Avenue registered office and site located?",
    answer: "Our main office is located on Doolapally Road, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043. All our ongoing developments are centered within the flourishing Bahadurpally and North Hyderabad growth corridor.",
    category: "General",
  },
  {
    id: "faq-2",
    question: "What quality testing protocols does ARC Avenue follow during construction?",
    answer: "We employ a 120-point engineering QA protocol across all active phases. This includes ultrasonic testing of RCC pour joints, standardized compressive cube tests for concrete, slump tests, seismic ductility certification for steel reinforcement, and pressurized multi-layer waterproofing trials.",
    category: "Construction",
  },
  {
    id: "faq-3",
    question: "How can I schedule a personal site visit to ARC Avenue projects?",
    answer: "You can easily book a site visit online through our website booking portal, via our interactive AI Property Consultant, or by sending a direct WhatsApp message to +91 80085 32333. Our engineering team arranges a private on-site briefing at your requested time slot.",
    category: "Booking",
  },
  {
    id: "faq-4",
    question: "What legal and regulatory approvals do ARC Avenue developments carry?",
    answer: "All ARC Avenue developments undergo clear-title legal vetting by senior high-court advocates and secure complete statutory clearances from local urban authorities (GHMC / HMDA). RERA registrations and fire safety clearances are published transparently for every active phase.",
    category: "Legal",
  },
];
