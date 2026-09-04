import { getFAQs, getSiteSettings } from "@/lib/data-service";
import FAQClient from "./faq-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "FAQs & Architectural Clearances | ARC AVENUE Hyderabad",
  description:
    "Explore answers regarding construction quality protocols, site visits, and project details at ARC Avenue Bahadurpally.",
};

export default async function FAQPage() {
  const [faqsRaw, settings] = await Promise.all([
    getFAQs(),
    getSiteSettings(),
  ]);

  const faqs = faqsRaw.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category,
  }));

  return (
    <FAQClient
      faqs={faqs}
      phone={settings?.phone || "080085 32333"}
      whatsapp={settings?.whatsapp || "+918008532333"}
    />
  );
}
