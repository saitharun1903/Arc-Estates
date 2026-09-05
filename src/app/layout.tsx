import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/data-service";
import LayoutClientWrapper from "./layout-client-wrapper";
import { ThemeProvider } from "@/context/theme-context";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://lunor.co.in"),
  title: "ARC AVENUE | Real Estate Builders & Construction Company — Hyderabad",
  description:
    "ARC Avenue is a premier real estate builder and construction studio in Bahadurpally, Hyderabad. Specializing in high-rise residences, courtyard villas, and architectural landmarks.",
  keywords: [
    "ARC Avenue",
    "Real Estate Hyderabad",
    "Builders Bahadurpally",
    "Construction Company Hyderabad",
    "Luxury Apartments Bahadurpally",
    "Villas Hyderabad",
    "Doolapally Road Real Estate",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ARC AVENUE | Architectural Real Estate & Construction",
    description: "Building spaces that move people. Luxury residences and villas in Bahadurpally, Hyderabad.",
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://lunor.co.in",
    siteName: "ARC AVENUE",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARC AVENUE | Real Estate Builders & Construction Company",
    description: "Building spaces that move people. Luxury residences and villas in Bahadurpally, Hyderabad.",
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  const serializedSettings = {
    companyName: settings?.companyName || "ARC AVENUE",
    tagline: settings?.tagline || "Real Estate Builders & Construction Company",
    address: settings?.address || "HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043",
    phone: settings?.phone || "080085 32333",
    whatsapp: settings?.whatsapp || "+918008532333",
    email: settings?.email || "connect@arcavenue.in",
    googleRating: settings?.googleRating || "5.0",
    googleReviewsCount: settings?.googleReviewsCount || "14",
    heroHeadline: settings?.heroHeadline || "BUILDING SPACES THAT MOVE PEOPLE.",
    heroSubhead: settings?.heroSubhead || "Real Estate Builders & Construction Company — Bahadurpally, Hyderabad",
  };

  return (
    <html
      lang="en"
      className={`dark ${cormorant.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('arc-avenue-theme')||localStorage.getItem('arc-theme');var t=(s==='light'||s==='dark')?s:'dark';document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;if(t==='light'){document.documentElement.classList.add('light');document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-background text-foreground min-h-screen flex flex-col antialiased selection:bg-accent selection:text-accent-foreground transition-colors duration-300">
        <ThemeProvider>
          <LayoutClientWrapper settings={serializedSettings}>
            {children}
          </LayoutClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
