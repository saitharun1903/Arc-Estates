export interface OfficeLocation {
  name: string;
  tagline: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  cleanPhone: string;
  whatsapp: string;
  cleanWhatsApp: string;
  email: string;
  googleMapsDirectionsUrl: string;
  googleMapsEmbedUrl: string;
  getEmbedUrlForAddress: (addr: string) => string;
  getDirectionsUrlForAddress: (addr: string) => string;
}

export const officeLocation: OfficeLocation = {
  name: "ARC AVENUE",
  tagline: "Corporate & Project Office",
  address: "HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043",
  locality: "Bahadurpally",
  city: "Hyderabad",
  state: "Telangana",
  pincode: "500043",
  phone: "080085 32333",
  cleanPhone: "08008532333",
  whatsapp: "+918008532333",
  cleanWhatsApp: "918008532333",
  email: "connect@arcavenue.in",
  googleMapsDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    "HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043"
  )}`,
  googleMapsEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(
    "HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043"
  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`,
  getEmbedUrlForAddress: (addr: string) =>
    `https://maps.google.com/maps?q=${encodeURIComponent(addr)}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
  getDirectionsUrlForAddress: (addr: string) =>
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addr)}`,
};
