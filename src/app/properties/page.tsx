import { getProperties } from "@/lib/data-service";
import PropertiesClient from "./properties-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Property Discovery & Inventory | ARC AVENUE Hyderabad",
  description:
    "Explore individual available residences, sky suites, and villas in Bahadurpally, Hyderabad with real-time floor plans and pricing.",
};

export default async function PropertiesPage() {
  const propertiesRaw = await getProperties();

  const properties = propertiesRaw.map((p) => ({
    id: p.id,
    title: p.title,
    unitNumber: p.unitNumber,
    propertyType: p.propertyType,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    areaSqFt: p.areaSqFt,
    price: p.price,
    status: p.status,
    floor: p.floor,
    facing: p.facing,
    featuredImage: p.featuredImage,
    project: p.project,
    demo: p.demo,
  }));

  return <PropertiesClient initialProperties={properties} />;
}
