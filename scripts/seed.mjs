import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Seeding ARC AVENUE Database ---');

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@arcavenue.in';
  const adminPassword = process.env.ADMIN_PASSWORD || 'arcavenue2025';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      name: 'ARC Avenue Executive',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  });
  console.log(`Admin user seeded: ${admin.email}`);

  // 2. Seed Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      companyName: 'ARC AVENUE',
      tagline: 'Real Estate Builders & Construction Company',
      address: 'HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043',
      phone: '080085 32333',
      whatsapp: '+918008532333',
      email: 'connect@arcavenue.in',
      googleRating: '5.0',
      googleReviewsCount: '14',
      heroHeadline: 'BUILDING SPACES THAT MOVE PEOPLE.',
      heroSubhead: 'Real Estate Builders & Construction Company — Bahadurpally, Hyderabad',
      aboutSnippet: 'At ARC Avenue, architectural precision converges with structural integrity. We engineer enduring residential environments rooted in timeless design, verified craftsmanship, and unwavering transparency.',
      whyArcPoints: JSON.stringify([
        {
          title: 'Architectural Integrity',
          description: 'Every layout is designed around natural illumination, cross-ventilation, and structural longevity, eliminating dead spatial zones.',
          number: '01'
        },
        {
          title: 'Precision Craftsmanship',
          description: 'Rigorous 120-point structural inspection protocol spanning seismic grade rebar testing, M-sand quality, and premium waterproofing.',
          number: '02'
        },
        {
          title: 'Transparent Milestone Delivery',
          description: 'Zero hidden clauses. Real-time construction telemetry, digital timeline tracking, and scheduled site inspections at every milestone.',
          number: '03'
        },
        {
          title: 'Strategic Growth Corridor',
          description: 'Located in Hyderabad’s prime northern growth corridor near Outer Ring Road (ORR Exit 5), offering generational asset appreciation.',
          number: '04'
        }
      ]),
      instagramUrl: 'https://instagram.com/arcavenue.in',
      linkedinUrl: 'https://linkedin.com/company/arcavenue',
      facebookUrl: 'https://facebook.com/arcavenue',
      youtubeUrl: 'https://youtube.com/@arcavenue'
    },
  });
  console.log('Site settings seeded.');

  // 3. Clear existing demo projects and cascade
  await prisma.project.deleteMany({});
  await prisma.property.deleteMany({});
  await prisma.lead.deleteMany({});
  await prisma.siteVisit.deleteMany({});
  await prisma.fAQ.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.media.deleteMany({});
  await prisma.brochure.deleteMany({});

  // 4. Seed Projects
  const project1 = await prisma.project.create({
    data: {
      name: 'ARC Vista',
      slug: 'arc-vista',
      tagline: 'High-Rise Architectural Sky Residences',
      description: 'ARC Vista is a towering testament to modern structural elegance in Bahadurpally. Designed with expansive cantilevered balconies and high thermal-efficiency facades, Vista offers panoramic vistas of the northern greenery while connecting seamlessly to Hyderabad’s major tech corridors.',
      location: 'Doolapally Road, Near KNR Apartments, Bahadurpally, Hyderabad',
      status: 'Ongoing',
      projectType: 'Residential High-Rise',
      heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=85',
      galleryImages: JSON.stringify([
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ]),
      areaRange: '2,150 - 3,450 sq.ft',
      bedrooms: '3 & 4 BHK',
      totalUnits: '72 Ultra-Spacious Units',
      priceRange: '₹1.85 Cr - ₹3.10 Cr',
      completionYear: 'December 2026',
      featured: true,
      demo: true,
      constructionProgress: 65,
      amenities: JSON.stringify([
        'Infinity Rooftop Pool',
        'Double-Height Grand Lobby',
        'EV Charging Bays at Every Parking',
        'Sky Fitness & Wellness Studio',
        'Acoustic Private Screening Lounge',
        'Landscaped Zen Courtyard',
        '24/7 Monitored Access Control'
      ]),
      specifications: JSON.stringify([
        { category: 'Superstructure', items: ['RCC Shear Wall framed structure designed for high seismic compliance (Zone II).'] },
        { category: 'Flooring', items: ['Italian Botticino marble in living & dining areas', 'Laminated hardwood flooring in Master Suite', 'Anti-skid vitrified tiles in utility and balconies.'] },
        { category: 'Joinery & Openings', items: ['8-foot engineered Teak wood main door with biometric smart lock', 'UPVC/High-gauge aluminum sliding acoustic windows with double-glazing.'] },
        { category: 'Sanitary & Electrical', items: ['Grohe/Kohler concealed diverters and wall-hung EWCs', 'Schneider/Legrand modular switches with smart automation wiring.'] }
      ]),
      progressMilestones: JSON.stringify([
        { phase: 'Substructure & Foundation', status: 'Completed', date: 'Q1 2025' },
        { phase: 'Superstructure (18 Floors)', status: 'Completed', date: 'Q3 2025' },
        { phase: 'Brickwork & MEP Rough-in', status: 'In Progress (80%)', date: 'Current' },
        { phase: 'Facade Glazing & Plastering', status: 'In Progress (45%)', date: 'Q1 2026' },
        { phase: 'Interior Finishes & Handover', status: 'Scheduled', date: 'Q4 2026' }
      ]),
      floorPlans: {
        create: [
          {
            name: 'Plan 3A — 3 BHK Sky Residence',
            bhk: '3 BHK',
            areaSqFt: '2,150 sq.ft',
            facing: 'East Facing',
            imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
            description: 'Three ensuite bedrooms with expansive open-plan living, extended 8-ft wide sunset terrace, and dedicated maid quarters.',
            demo: true
          },
          {
            name: 'Plan 4B — 4 BHK Signature Penthouse',
            bhk: '4 BHK',
            areaSqFt: '3,450 sq.ft',
            facing: 'North-East Corner Facing',
            imageUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80',
            description: 'Palatial 4-bedroom dual-aspect penthouse with double-height living foyer, private sky deck, and separate family study.',
            demo: true
          }
        ]
      }
    }
  });

  const project2 = await prisma.project.create({
    data: {
      name: 'ARC Haven',
      slug: 'arc-haven',
      tagline: 'Private Courtyard Luxury Villas',
      description: 'ARC Haven redefines privacy and serene architectural living in Bahadurpally. Conceived as standalone courtyard estates, each villa centers around an open-to-sky central atrium that draws fresh air and zenith daylight into every floor.',
      location: 'Bahadurpally - Gundlapochampally Link Road, Hyderabad',
      status: 'Ongoing',
      projectType: 'Luxury Gated Villas',
      heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=85',
      galleryImages: JSON.stringify([
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      ]),
      areaRange: '3,800 - 5,200 sq.ft',
      bedrooms: '4 & 5 BHK',
      totalUnits: '36 Private Estates',
      priceRange: '₹3.40 Cr - ₹4.95 Cr',
      completionYear: 'August 2026',
      featured: true,
      demo: true,
      constructionProgress: 40,
      amenities: JSON.stringify([
        'Private Temperature-Controlled Plunge Pool',
        'Central Landscaped Courtyard with Water Feature',
        'Private Elevators in Every Villa',
        'Clubhouse with Squash & Tennis Courts',
        'Solar Net-Metering Equipped Rooftops',
        'Underground Cabling & Concealed Storm Drains'
      ]),
      specifications: JSON.stringify([
        { category: 'Foundation & Framing', items: ['Isolated RCC column footings with high-performance solid concrete blocks.'] },
        { category: 'Energy & Automation', items: ['Pre-installed 5kW Solar Photovoltaic rooftop array', 'Full home automation hub with climate and lighting scenes.'] },
        { category: 'Finishes', items: ['Handcrafted exposed architectural concrete feature walls', 'Imported Greek Thassos marble and natural teak parquet.'] }
      ]),
      progressMilestones: JSON.stringify([
        { phase: 'Land Development & Earthworks', status: 'Completed', date: 'Q4 2024' },
        { phase: 'Villa Foundations & Plinths', status: 'Completed', date: 'Q2 2025' },
        { phase: 'Structural Framing & Slabs', status: 'In Progress (60%)', date: 'Current' },
        { phase: 'Architectural Enclosures & Masonry', status: 'In Progress (20%)', date: 'Q1 2026' },
        { phase: 'Final Handover', status: 'Scheduled', date: 'Q3 2026' }
      ]),
      floorPlans: {
        create: [
          {
            name: 'Haven Villa — Type Alpha (4 BHK)',
            bhk: '4 BHK',
            areaSqFt: '3,800 sq.ft',
            facing: 'East Facing',
            imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            description: 'Triplex courtyard villa featuring ground-level water court, second-floor master deck, and private terrace lounge.',
            demo: true
          }
        ]
      }
    }
  });

  const project3 = await prisma.project.create({
    data: {
      name: 'ARC Terrace',
      slug: 'arc-terrace',
      tagline: 'Boutique Terraced Residences',
      description: 'ARC Terrace exemplifies low-density, human-scale architecture. Situated near Tech Mahindra Bahadurpally, each home features stepped cantilevered terraces creating private hanging gardens.',
      location: 'Near Tech Mahindra Campus, Bahadurpally, Hyderabad',
      status: 'Ready to Move',
      projectType: 'Boutique Residences',
      heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
      galleryImages: JSON.stringify([
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ]),
      areaRange: '1,450 - 2,200 sq.ft',
      bedrooms: '2 & 3 BHK',
      totalUnits: '28 Exclusive Residences',
      priceRange: '₹95 L - ₹1.55 Cr',
      completionYear: 'Completed (Ready to Move)',
      featured: true,
      demo: true,
      constructionProgress: 100,
      amenities: JSON.stringify([
        'Rooftop Community Herb & Flower Garden',
        'Fitness Studio with Pilates Reformers',
        '100% DG Power Backup for All Units',
        'Rainwater Harvesting with Filtration'
      ]),
      specifications: JSON.stringify([
        { category: 'Structure', items: ['Earthquake resistant RCC framed structure with external aerated concrete blockwork.'] },
        { category: 'Doors & Windows', items: ['Main door: Premium teak wood frame with designer flush shutter.', 'Windows: Three-track UPVC with mosquito mesh provision.'] }
      ]),
      progressMilestones: JSON.stringify([
        { phase: 'Full Construction & Handover', status: 'Completed & Occupancy Certified', date: '2024' }
      ]),
      floorPlans: {
        create: [
          {
            name: 'Terrace Suite — 3 BHK',
            bhk: '3 BHK',
            areaSqFt: '1,980 sq.ft',
            facing: 'North Facing',
            imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
            description: 'Spacious 3 BHK with 22-foot long stepping terrace garden and custom timber pergolas.',
            demo: true
          }
        ]
      }
    }
  });

  const project4 = await prisma.project.create({
    data: {
      name: 'ARC Origin',
      slug: 'arc-origin',
      tagline: 'Prime Commercial & Retail Landmark',
      description: 'ARC Origin marks ARC Avenue’s flagship mixed-use retail and corporate workspace development on the prime Doolapally arterial route in Bahadurpally. Designed with an iconic double-skin glass curtain wall and wide pedestrian colonnades.',
      location: 'Doolapally Main Junction, Bahadurpally, Hyderabad',
      status: 'Upcoming',
      projectType: 'Commercial & Retail',
      heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85',
      galleryImages: JSON.stringify([
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      ]),
      areaRange: '850 - 4,500 sq.ft',
      bedrooms: 'Office Suites & Retail Bays',
      totalUnits: '32 Commercial Bays',
      priceRange: '₹1.15 Cr - ₹4.80 Cr',
      completionYear: 'Launching Q1 2026',
      featured: false,
      demo: true,
      constructionProgress: 15,
      amenities: JSON.stringify([
        'Triple-Height Atrium with Cafeteria',
        'High-Speed Schindler Destination Elevators',
        'BMS (Building Management System) Automation',
        'Two-Level Dedicated Basement Parking'
      ]),
      specifications: JSON.stringify([
        { category: 'Curtain Wall', items: ['Acoustically insulated DGU glass with solar heat reduction coefficient.'] }
      ]),
      progressMilestones: JSON.stringify([
        { phase: 'Architectural Approval & RERA Registration', status: 'In Process', date: 'Q4 2025' },
        { phase: 'Excavation & Shoring', status: 'Scheduled', date: 'Q1 2026' }
      ])
    }
  });

  console.log('Seeded 4 projects.');

  // 5. Seed Properties (Inventory Units)
  await prisma.property.createMany({
    data: [
      {
        projectId: project1.id,
        title: 'ARC Vista - Unit 602 (East Facing 3 BHK)',
        unitNumber: 'V-602',
        propertyType: 'Apartment',
        bedrooms: 3,
        bathrooms: 3,
        areaSqFt: 2150,
        price: '₹1.85 Cr',
        status: 'Available',
        floor: '6th Floor',
        facing: 'East',
        featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        demo: true
      },
      {
        projectId: project1.id,
        title: 'ARC Vista - Unit 1201 (Corner 4 BHK)',
        unitNumber: 'V-1201',
        propertyType: 'Apartment',
        bedrooms: 4,
        bathrooms: 4,
        areaSqFt: 3150,
        price: '₹2.70 Cr',
        status: 'Available',
        floor: '12th Floor',
        facing: 'North-East',
        featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        demo: true
      },
      {
        projectId: project1.id,
        title: 'ARC Vista - Penthouse 1801',
        unitNumber: 'V-1801',
        propertyType: 'Penthouse',
        bedrooms: 4,
        bathrooms: 5,
        areaSqFt: 3450,
        price: '₹3.10 Cr',
        status: 'Reserved',
        floor: '18th Floor (Top)',
        facing: 'North',
        featuredImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        demo: true
      },
      {
        projectId: project2.id,
        title: 'ARC Haven - Villa 07 (Courtyard Estate)',
        unitNumber: 'H-07',
        propertyType: 'Villa',
        bedrooms: 4,
        bathrooms: 5,
        areaSqFt: 3800,
        price: '₹3.45 Cr',
        status: 'Available',
        floor: 'G+2 Triplex',
        facing: 'East',
        featuredImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
        demo: true
      },
      {
        projectId: project2.id,
        title: 'ARC Haven - Villa 14 (Corner Villa with Plunge Pool)',
        unitNumber: 'H-14',
        propertyType: 'Villa',
        bedrooms: 5,
        bathrooms: 6,
        areaSqFt: 4900,
        price: '₹4.35 Cr',
        status: 'Available',
        floor: 'G+2 Triplex',
        facing: 'North-East',
        featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        demo: true
      },
      {
        projectId: project3.id,
        title: 'ARC Terrace - Suite 204 (Terrace 3 BHK)',
        unitNumber: 'T-204',
        propertyType: 'Apartment',
        bedrooms: 3,
        bathrooms: 3,
        areaSqFt: 1980,
        price: '₹1.42 Cr',
        status: 'Available',
        floor: '2nd Floor',
        facing: 'North',
        featuredImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        demo: true
      },
      {
        projectId: project3.id,
        title: 'ARC Terrace - Suite 401 (Step-Garden 2 BHK)',
        unitNumber: 'T-401',
        propertyType: 'Apartment',
        bedrooms: 2,
        bathrooms: 2,
        areaSqFt: 1450,
        price: '₹98 Lakhs',
        status: 'Available',
        floor: '4th Floor',
        facing: 'East',
        featuredImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
        demo: true
      }
    ]
  });
  console.log('Seeded properties.');

  // 6. Seed Leads
  await prisma.lead.createMany({
    data: [
      {
        name: 'Vikram Reddy',
        phone: '098480 12345',
        email: 'vikram.reddy@techfirm.com',
        interest: 'Looking for 3 BHK in ARC Vista with immediate ORR connectivity.',
        projectId: project1.id,
        budget: '₹2.0 - ₹2.5 Cr',
        propertyType: 'Apartment',
        bedrooms: '3 BHK',
        message: 'Need an east-facing unit on higher floor (above 8th). Kindly share the complete floor plan.',
        source: 'Website',
        status: 'Qualified',
        notes: 'Spoke with buyer. Works at Hitec City, looking to shift to quiet green corridor near Bahadurpally.'
      },
      {
        name: 'Dr. Ananya Rao',
        phone: '098850 98765',
        email: 'ananya.rao@hospital.org',
        interest: 'Interested in ARC Haven 4 BHK Courtyard Villa.',
        projectId: project2.id,
        budget: '₹3.5 - ₹4.0 Cr',
        propertyType: 'Villa',
        bedrooms: '4 BHK',
        message: 'Would like to visit the site this Saturday morning.',
        source: 'AI Assistant',
        status: 'Site Visit',
        notes: 'AI assistant captured requirement. Scheduled inspection for this weekend.'
      },
      {
        name: 'Rajesh Sharma',
        phone: '094400 45678',
        email: 'rajesh.sharma@investors.in',
        interest: 'Commercial suites at ARC Origin.',
        projectId: project4.id,
        budget: '₹1.5 Cr',
        propertyType: 'Commercial',
        bedrooms: 'Retail Bay',
        message: 'Inquiring about ground floor retail road-facing bay.',
        source: 'WhatsApp',
        status: 'New',
        notes: 'Follow up regarding pre-launch pricing.'
      },
      {
        name: 'Suresh Kumar',
        phone: '091770 33221',
        email: 'suresh.k@globalit.com',
        interest: 'Ready-to-move 3 BHK in ARC Terrace.',
        projectId: project3.id,
        budget: '₹1.2 - ₹1.5 Cr',
        propertyType: 'Apartment',
        bedrooms: '3 BHK',
        source: 'Contact Form',
        status: 'Contacted',
        notes: 'Sent brochure and scheduled callback.'
      },
      {
        name: 'Meera Nambiar',
        phone: '098490 66554',
        email: 'meera.nambiar@designstudio.com',
        interest: 'ARC Vista Sky Residence.',
        projectId: project1.id,
        budget: '₹2.8 Cr',
        propertyType: 'Apartment',
        bedrooms: '4 BHK',
        source: 'AI Assistant',
        status: 'Interested',
        notes: 'Impressed by the cantilevered terrace architecture.'
      }
    ]
  });
  console.log('Seeded leads.');

  // 7. Seed Site Visits
  await prisma.siteVisit.createMany({
    data: [
      {
        projectId: project1.id,
        visitorName: 'Dr. Ananya Rao',
        visitorPhone: '098850 98765',
        visitorEmail: 'ananya.rao@hospital.org',
        visitDate: '2026-09-08',
        visitTimeSlot: '11:00 AM - 12:30 PM',
        notes: 'Requested model apartment walk-through and structure briefing.',
        status: 'Confirmed'
      },
      {
        projectId: project2.id,
        visitorName: 'Karthik Varma',
        visitorPhone: '097010 44332',
        visitorEmail: 'karthik.varma@estate.in',
        visitDate: '2026-09-09',
        visitTimeSlot: '03:00 PM - 04:30 PM',
        notes: 'Interested in courtyard orientation and water feature details.',
        status: 'Pending'
      },
      {
        projectId: project3.id,
        visitorName: 'Pooja Agarwal',
        visitorPhone: '099890 88776',
        visitorEmail: 'pooja.agarwal@fintech.co',
        visitDate: '2026-09-05',
        visitTimeSlot: '10:00 AM - 11:30 AM',
        notes: 'Ready-to-move inspection of Suite 204.',
        status: 'Confirmed'
      }
    ]
  });
  console.log('Seeded site visits.');

  // 8. Seed FAQs
  await prisma.fAQ.createMany({
    data: [
      {
        question: 'Where is the ARC Avenue registered office and site located?',
        answer: 'Our main office is located on Doolapally Road, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043. All our ongoing developments are centered within the flourishing Bahadurpally and North Hyderabad growth corridor.',
        category: 'General',
        order: 1,
        active: true
      },
      {
        question: 'What quality testing protocols does ARC Avenue follow during construction?',
        answer: 'We employ a 120-point engineering QA protocol across all active phases. This includes ultrasonic testing of RCC pour joints, standardized compressive cube tests for concrete, slump tests, seismic ductility certification for steel reinforcement, and pressurized multi-layer waterproofing trials.',
        category: 'Construction',
        order: 2,
        active: true
      },
      {
        question: 'How can I schedule a personal site visit to ARC Avenue projects?',
        answer: 'You can easily book a site visit online through our website booking portal, via our interactive AI Property Consultant, or by sending a direct WhatsApp message to +91 80085 32333. Our engineering team arranges a private on-site briefing at your requested time slot.',
        category: 'Booking',
        order: 3,
        active: true
      },
      {
        question: 'Are all ARC Avenue projects approved by statutory authorities?',
        answer: 'Yes. All developments strictly adhere to municipal master plans, HMDA regulations, fire safety norms, environmental clearances, and state RERA guidelines.',
        category: 'Legal',
        order: 4,
        active: true
      },
      {
        question: 'Does ARC Avenue assist with home loan financing from leading institutions?',
        answer: 'Yes, our sales and legal advisory desk coordinates directly with premier banking institutions (SBI, HDFC Bank, ICICI Bank, Axis Bank) for pre-approved project loans and streamlined documentation.',
        category: 'General',
        order: 5,
        active: true
      }
    ]
  });
  console.log('Seeded FAQs.');

  // 9. Seed Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        clientName: 'G. K. Chari',
        role: 'Structural Consultant & Property Owner',
        content: 'As a civil engineer myself, what stands out with ARC Avenue is the uncompromising honesty in their construction. The thickness of slabs, the quality of shuttering, and the ventilation planning in Bahadurpally exceed mainstream builders.',
        rating: 5,
        projectMentioned: 'ARC Terrace',
        verified: true,
        demo: true
      },
      {
        clientName: 'Sunita & Pradeep Nair',
        role: 'Residents',
        content: 'From the initial blueprint consultation to final key handover, ARC Avenue treated us with absolute transparency. No hidden charges, no sudden changes in specifications. A rare and refreshing builder experience.',
        rating: 5,
        projectMentioned: 'ARC Vista',
        verified: true,
        demo: true
      },
      {
        clientName: 'Naveen Teja',
        role: 'Tech Executive & Homeowner',
        content: 'The architectural daylight design is remarkable. Our living room stays bright throughout the day without direct harsh heat. Truly built with architectural intelligence.',
        rating: 5,
        projectMentioned: 'ARC Haven',
        verified: true,
        demo: true
      }
    ]
  });
  console.log('Seeded testimonials.');

  // 10. Seed Brochures
  await prisma.brochure.createMany({
    data: [
      {
        projectId: project1.id,
        title: 'ARC Vista — Architectural Master Brochure (Demo Edition)',
        fileUrl: '/brochures/arc-vista-brochure.pdf',
        fileSize: '4.8 MB',
        downloadsCount: 142
      },
      {
        projectId: project2.id,
        title: 'ARC Haven — Villa Master Plan & Specifications (Demo Edition)',
        fileUrl: '/brochures/arc-haven-brochure.pdf',
        fileSize: '6.2 MB',
        downloadsCount: 89
      },
      {
        projectId: project3.id,
        title: 'ARC Terrace — Handover Dossier & Floor Plans (Demo Edition)',
        fileUrl: '/brochures/arc-terrace-brochure.pdf',
        fileSize: '3.1 MB',
        downloadsCount: 110
      }
    ]
  });
  console.log('Seeded brochures.');

  console.log('--- Database Seeding Complete! ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
