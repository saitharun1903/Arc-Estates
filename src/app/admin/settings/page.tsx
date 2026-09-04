import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import SettingsClient from "./settings-client";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const session = getAdminSession();
  if (!session) redirect("/admin/login");

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "default" },
  });

  const initialSettings = {
    companyName: settings?.companyName || "ARC AVENUE",
    tagline: settings?.tagline || "Real Estate Builders & Construction Company",
    address:
      settings?.address ||
      "HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043",
    phone: settings?.phone || "080085 32333",
    whatsapp: settings?.whatsapp || "+918008532333",
    email: settings?.email || "connect@arcavenue.in",
    googleRating: settings?.googleRating || "5.0",
    googleReviewsCount: settings?.googleReviewsCount || "14",
    instagramUrl: settings?.instagramUrl,
    linkedinUrl: settings?.linkedinUrl,
    facebookUrl: settings?.facebookUrl,
    youtubeUrl: settings?.youtubeUrl,
  };

  return <SettingsClient initialSettings={initialSettings} />;
}
