import prisma from "@/lib/db";
import { ChatMessage, ConsultantContext, IAIProvider, AIProviderResponse } from "./types";

export class DemoAIProvider implements IAIProvider {
  async processChat(
    history: ChatMessage[],
    userMessage: string,
    context?: ConsultantContext
  ): Promise<AIProviderResponse> {
    const text = userMessage.toLowerCase();

    // Fetch active projects from database for real-time recommendations
    const allProjects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        tagline: true,
        priceRange: true,
        bedrooms: true,
        heroImage: true,
        projectType: true,
        location: true,
        status: true,
      },
    });

    // 1. Phone number extraction
    const phoneMatch = userMessage.match(/(\+?91[\s-]?)?[6-9]\d{9}/);
    const phone = phoneMatch ? phoneMatch[0] : undefined;

    // 2. Budget extraction
    let budget: string | undefined;
    if (text.includes("cr") || text.includes("crore") || text.includes("lakh") || text.includes("budget")) {
      const budgetMatch = userMessage.match(/(\d+(\.\d+)?\s*(cr|crore|lakhs?|l))/i);
      if (budgetMatch) budget = budgetMatch[0];
    }

    // 3. Typology / BHK extraction
    let bedrooms: string | undefined;
    if (text.includes("3 bhk") || text.includes("3bhk")) bedrooms = "3 BHK";
    else if (text.includes("4 bhk") || text.includes("4bhk")) bedrooms = "4 BHK";
    else if (text.includes("2 bhk") || text.includes("2bhk")) bedrooms = "2 BHK";
    else if (text.includes("5 bhk") || text.includes("5bhk")) bedrooms = "5 BHK";

    let propertyType: string | undefined;
    if (text.includes("villa")) propertyType = "Villa";
    else if (text.includes("apartment") || text.includes("flat") || text.includes("high-rise")) propertyType = "Apartment";
    else if (text.includes("commercial") || text.includes("office") || text.includes("retail")) propertyType = "Commercial";

    // Matching logic
    let matchedProjects = allProjects;
    if (propertyType === "Villa") {
      matchedProjects = allProjects.filter((p) => p.name.toLowerCase().includes("haven") || p.projectType.toLowerCase().includes("villa"));
    } else if (propertyType === "Commercial") {
      matchedProjects = allProjects.filter((p) => p.name.toLowerCase().includes("origin") || p.projectType.toLowerCase().includes("commercial"));
    } else if (propertyType === "Apartment") {
      matchedProjects = allProjects.filter((p) => p.name.toLowerCase().includes("vista") || p.name.toLowerCase().includes("terrace"));
    }

    // Determine conversational state
    if (phone) {
      return {
        message: `Thank you for sharing your contact number (${phone}). Our Senior Architectural Property Advisor will contact you within 15 minutes to share tailored floor plans and discuss your timeline. Would you like to schedule a private on-site inspection in Bahadurpally this week?`,
        extractedLead: {
          phone,
          budget: budget || context?.budget,
          propertyType: propertyType || context?.typology,
          bedrooms: bedrooms || context?.bedrooms,
          interest: userMessage,
        },
        suggestAction: "book_site_visit",
      };
    }

    if (text.includes("visit") || text.includes("inspect") || text.includes("appointment") || text.includes("book")) {
      return {
        message: `We would be delighted to host you for a private structural walk-through at our Bahadurpally site (beside KNR Apartments, Doolapally Road). Our engineers can walk you through the ongoing RCC construction, sample finishes, and floor layouts. Would you like to proceed with booking a site visit slot?`,
        suggestAction: "book_site_visit",
        recommendedProjects: matchedProjects.slice(0, 2),
      };
    }

    if (text.includes("villa") || text.includes("haven")) {
      const haven = allProjects.find((p) => p.name.toLowerCase().includes("haven")) || allProjects[0];
      return {
        message: `For luxury private living, ARC Haven in Bahadurpally offers G+2 Courtyard Villas (4 & 5 BHK, 3,800 to 5,200 sq.ft) starting at ₹3.40 Cr. Each villa centers around an open-to-sky courtyard with private temperature-controlled plunge pool options and 5kW rooftop solar net-metering. Would you like me to reserve a site visit or connect via WhatsApp?`,
        recommendedProjects: haven ? [haven] : [],
        suggestAction: "whatsapp",
      };
    }

    if (text.includes("vista") || text.includes("high-rise") || text.includes("sky")) {
      const vista = allProjects.find((p) => p.name.toLowerCase().includes("vista")) || allProjects[0];
      return {
        message: `ARC Vista is our flagship high-rise residential development located on Doolapally Road, Bahadurpally. It features 3 & 4 BHK sky residences with expansive cantilevered balconies and high thermal-efficiency facade design. Prices range from ₹1.85 Cr to ₹3.10 Cr with handover in December 2026. What bedroom configuration best suits your family?`,
        recommendedProjects: vista ? [vista] : [],
        suggestAction: "talk_sales",
      };
    }

    if (text.includes("terrace") || text.includes("ready to move") || text.includes("ready")) {
      const terrace = allProjects.find((p) => p.name.toLowerCase().includes("terrace")) || allProjects[0];
      return {
        message: `ARC Terrace is our boutique low-density residential community near Tech Mahindra Bahadurpally, and it is 100% Ready to Move. It features 2 & 3 BHK residences (1,450 to 2,200 sq.ft) with private step-gardens, starting from ₹95 Lakhs. Would you like to schedule an immediate physical inspection?`,
        recommendedProjects: terrace ? [terrace] : [],
        suggestAction: "book_site_visit",
      };
    }

    if (text.includes("commercial") || text.includes("origin") || text.includes("office") || text.includes("shop")) {
      const origin = allProjects.find((p) => p.name.toLowerCase().includes("origin")) || allProjects[0];
      return {
        message: `ARC Origin is an iconic mixed-use commercial and retail landmark positioned right at Doolapally Main Junction, Bahadurpally. Designed with triple-height atrium lobbies and DGU acoustic curtain glass, units range from 850 to 4,500 sq.ft. Would you like to speak with our commercial leasing desk?`,
        recommendedProjects: origin ? [origin] : [],
        suggestAction: "talk_sales",
      };
    }

    if (text.includes("location") || text.includes("where") || text.includes("address") || text.includes("directions")) {
      return {
        message: `ARC Avenue is headquartered at HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043. We are strategically situated 7 minutes from ORR Exit 5, offering rapid connectivity to Tech Mahindra, Gandimaisamma, and Hitec City. You can reach our front desk directly at 080085 32333.`,
        suggestAction: "whatsapp",
      };
    }

    if (bedrooms || budget) {
      return {
        message: `Based on your preference for ${bedrooms || "spacious layouts"} ${budget ? `within ${budget}` : ""}, we have premium residential options at ARC Vista and ARC Haven. Both feature earthquake-resistant RCC structures, Italian marble flooring, and 24/7 power backup. What is your preferred contact number so we can share detailed architectural floor plans?`,
        recommendedProjects: matchedProjects.slice(0, 2),
        extractedLead: {
          bedrooms,
          budget,
          propertyType,
          interest: userMessage,
        },
      };
    }

    // Default conversational response
    return {
      message: `Welcome to ARC Avenue. We specialize in architecturally distinct residential high-rises, courtyard villas, and commercial landmarks in Bahadurpally, Hyderabad. Are you exploring a high-rise apartment, a private luxury villa, or ready-to-move residences?`,
      recommendedProjects: allProjects.slice(0, 3),
      suggestAction: "explore_projects",
    };
  }
}
