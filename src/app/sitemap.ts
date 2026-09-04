import { MetadataRoute } from "next";
import { getProjects } from "@/lib/data-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lunor.co.in";

  let projectUrls: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();

    projectUrls = projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // fallback if error
  }

  const staticPages = [
    "",
    "/projects",
    "/properties",
    "/about",
    "/construction",
    "/site-visit",
    "/contact",
    "/faq",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.7,
  }));

  return [...staticPages, ...projectUrls];
}
