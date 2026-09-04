import { ChatMessage, ConsultantContext, IAIProvider, AIProviderResponse } from "./types";
import { buildPropertyContextForGemini, getVerifiedProjects, getCompanyKnowledge } from "./knowledge";

export class GeminiAIProvider implements IAIProvider {
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || "";
    this.model = process.env.GEMINI_MODEL || "gemini-3.6-flash";
  }

  async processChat(
    history: ChatMessage[],
    userMessage: string,
    context?: ConsultantContext
  ): Promise<AIProviderResponse> {
    if (!this.apiKey) {
      return {
        message:
          "Gemini API key is not configured. Please set GEMINI_API_KEY in your .env.local file to activate live AI property advisory.",
        suggestAction: "whatsapp",
      };
    }

    try {
      const [propertyContext, allProjects, company] = await Promise.all([
        buildPropertyContextForGemini(userMessage),
        getVerifiedProjects(),
        getCompanyKnowledge(),
      ]);

      const systemInstruction = `You are ARC Avenue Concierge, the premier architectural and property advisor for ARC Avenue, a luxury real-estate builder and civil engineering company based in Bahadurpally, Hyderabad, Telangana.

YOUR CORE DIRECTIVES:
1. Grounding & Factual Restraint:
   - Only supply verified facts present in the ARC Avenue property dossier below.
   - You ONLY represent ARC Avenue's four developments: ARC Vista, ARC Haven, ARC Terrace, and ARC Origin.
   - NEVER invent or hallucinate property names, prices, unit counts, square footages, approvals, RERA numbers, or amenities.
   - If a visitor asks about something not in the supplied data (e.g. weather, outside real-estate, unrelated queries, or unverified claims), clearly state that you only have verified information for ARC Avenue developments, and offer to connect them with the human team.

2. Tone & Architectural Brand:
   - Speak with quiet luxury, architectural intelligence, clarity, and precision.
   - Be concise, direct, helpful, and polite. Never sound like a generic customer service bot.
   - Highlight civil integrity, daylight orientation, structural rigor, and prime location (7 mins from ORR Exit 5, Bahadurpally elevation 580M).

3. Natural Lead Qualification & Guidance:
   - Understand requirements naturally (budget, 2/3/4/5 BHK, villa vs apartment, ready-to-move vs ongoing).
   - If user wants a site visit or wants to see/walk through the property, warmly offer to schedule a site inspection.
   - If user asks to speak with a human or call/WhatsApp, offer the direct WhatsApp connection.
   - Extract visitor details (name, phone, budget, bedrooms, propertyType) when provided.

ARC AVENUE VERIFIED DOSSIER:
${propertyContext}
`;

      // Build multi-turn history for Gemini
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      // Filter out system greetings or empty messages from history
      const relevantHistory = history
        .slice(-8)
        .filter((m) => m.content && m.content.trim().length > 0);

      for (const msg of relevantHistory) {
        contents.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        });
      }

      // Add the latest user message
      contents.push({
        role: "user",
        parts: [{ text: userMessage }],
      });

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent`;

      const requestPayload = {
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        contents,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              message: {
                type: "STRING",
                description: "The primary helpful response to the visitor.",
              },
              recommendedProjectSlugs: {
                type: "ARRAY",
                items: { type: "STRING" },
                description: "Slugs of matching ARC Avenue projects: 'arc-vista', 'arc-haven', 'arc-terrace', 'arc-origin'. Empty if none specifically apply.",
              },
              suggestAction: {
                type: "STRING",
                enum: ["book_site_visit", "whatsapp_handoff", "none"],
                description: "Suggested next action based on visitor intent.",
              },
              actionProjectSlug: {
                type: "STRING",
                description: "Project slug associated with site visit request, e.g. 'arc-haven'.",
              },
              extractedLead: {
                type: "OBJECT",
                properties: {
                  name: { type: "STRING" },
                  phone: { type: "STRING" },
                  budget: { type: "STRING" },
                  bedrooms: { type: "STRING" },
                  propertyType: { type: "STRING" },
                  interest: { type: "STRING" },
                },
              },
            },
            required: ["message", "recommendedProjectSlugs", "suggestAction"],
          },
          temperature: 0.3,
          maxOutputTokens: 1024,
        },
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": this.apiKey,
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini API returned HTTP ${response.status}:`, errorText);
        throw new Error(`Gemini API Error: ${response.status}`);
      }

      const responseData = await response.json();
      const rawJson = responseData.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawJson) {
        throw new Error("No text content returned from Gemini model");
      }

      let parsed: {
        message: string;
        recommendedProjectSlugs?: string[];
        suggestAction?: "book_site_visit" | "whatsapp_handoff" | "none";
        actionProjectSlug?: string;
        extractedLead?: {
          name?: string;
          phone?: string;
          budget?: string;
          bedrooms?: string;
          propertyType?: string;
          interest?: string;
        };
      };

      try {
        parsed = JSON.parse(rawJson);
      } catch (parseErr) {
        console.error("Failed to parse Gemini JSON output:", rawJson);
        return {
          message: rawJson,
        };
      }

      // Hydrate recommended projects against verified database records
      const validSlugs = new Set(allProjects.map((p) => p.slug));
      const filteredSlugs = (parsed.recommendedProjectSlugs || []).filter((slug) =>
        validSlugs.has(slug)
      );

      const recommendedProjects = filteredSlugs.map((slug) => {
        const project = allProjects.find((p) => p.slug === slug)!;
        return {
          id: project.id,
          name: project.name,
          slug: project.slug,
          tagline: project.tagline,
          priceRange: project.priceRange,
          bedrooms: project.bedrooms,
          heroImage: project.heroImage,
          location: project.location,
          status: project.status,
        };
      });

      // Map action to client type
      let suggestAction: "book_site_visit" | "whatsapp" | undefined;
      if (parsed.suggestAction === "book_site_visit") {
        suggestAction = "book_site_visit";
      } else if (parsed.suggestAction === "whatsapp_handoff") {
        suggestAction = "whatsapp";
      }

      // Extract phone from text if Gemini missed it
      const fallbackPhoneMatch = userMessage.match(/(\+?91[\s-]?)?[6-9]\d{9}/);
      const phone = parsed.extractedLead?.phone || (fallbackPhoneMatch ? fallbackPhoneMatch[0] : undefined);

      return {
        message: parsed.message,
        recommendedProjects: recommendedProjects.length > 0 ? recommendedProjects : undefined,
        suggestAction,
        actionProjectSlug: parsed.actionProjectSlug || (recommendedProjects[0]?.slug) || undefined,
        extractedLead: {
          name: parsed.extractedLead?.name,
          phone,
          budget: parsed.extractedLead?.budget,
          bedrooms: parsed.extractedLead?.bedrooms,
          propertyType: parsed.extractedLead?.propertyType,
          interest: parsed.extractedLead?.interest || userMessage,
        },
      };
    } catch (error: any) {
      console.error("Gemini AI Provider Error:", error?.message || error);
      return {
        message:
          "ARC Concierge is temporarily unavailable. You can still explore our verified developments below or connect directly with our advisory desk in Bahadurpally.",
        suggestAction: "whatsapp",
      };
    }
  }
}
