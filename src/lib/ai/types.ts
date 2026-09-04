export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
  metadata?: {
    recommendedProjects?: Array<{
      id: string;
      name: string;
      slug: string;
      tagline?: string;
      priceRange: string;
      bedrooms: string;
      heroImage: string;
      location?: string;
      status?: string;
    }>;
    suggestAction?: "book_site_visit" | "talk_sales" | "whatsapp" | "explore_projects";
    actionProjectSlug?: string;
  };
}

export interface ConsultantContext {
  visitorName?: string;
  visitorPhone?: string;
  budget?: string;
  typology?: string;
  bedrooms?: string;
  timeline?: string;
}

export interface AIProviderResponse {
  message: string;
  extractedLead?: {
    name?: string;
    phone?: string;
    budget?: string;
    propertyType?: string;
    bedrooms?: string;
    interest?: string;
  };
  recommendedProjects?: Array<{
    id: string;
    name: string;
    slug: string;
    tagline?: string;
    priceRange: string;
    bedrooms: string;
    heroImage: string;
    location?: string;
    status?: string;
  }>;
  suggestAction?: "book_site_visit" | "talk_sales" | "whatsapp" | "explore_projects";
  actionProjectSlug?: string;
}

export interface IAIProvider {
  processChat(
    history: ChatMessage[],
    userMessage: string,
    context?: ConsultantContext
  ): Promise<AIProviderResponse>;
}
