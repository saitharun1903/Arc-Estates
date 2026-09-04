import { getSiteSettings } from "@/lib/data-service";
import ContactClient from "./contact-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact Desk & Office Location | ARC AVENUE Hyderabad",
  description:
    "Get in touch with ARC Avenue. Visit our registered office on Doolapally Road, Bahadurpally, Hyderabad or start a WhatsApp chat.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <ContactClient
      settings={{
        companyName: settings?.companyName || "ARC AVENUE",
        address:
          settings?.address ||
          "HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043",
        phone: settings?.phone || "080085 32333",
        whatsapp: settings?.whatsapp || "+918008532333",
        email: settings?.email || "connect@arcavenue.in",
      }}
    />
  );
}
