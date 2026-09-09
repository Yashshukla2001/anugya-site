/**
 * Central configuration for Anugya Hotel & Boutique.
 *
 * IMPORTANT — READ BEFORE LAUNCH
 * --------------------------------
 * Real as of the latest client message: phone/WhatsApp, address, Google
 * Maps link, Instagram. Still `PLACEHOLDER`, still needs the client:
 *
 *   - Email (phone/WhatsApp number reused as a stand-in contact channel;
 *     no separate email was supplied)
 *   - Google review rating, count, and testimonials (kept OUT of this
 *     file entirely — see src/data/reviews.ts, which ships with no
 *     invented rating rather than a fake one)
 *   - Check-in / check-out times
 *
 * The client sent one phone number, not separate phone/WhatsApp numbers
 * — both fields below use it. Split them if that's wrong.
 */

export const isPlaceholderData = true; // flip to false once email + reviews + check-in/out are in

export const siteConfig = {
  hotelName: "Anugya Hotel & Boutique",
  location: "Indore",
  tagline: "Quiet, considered hospitality in the heart of Indore.",

  contact: {
    phone: "+91 91111 99307",
    whatsapp: "919111199307", // digits only, country code first, no "+" (wa.me format)
    // email: "stay@anugyahotel.example", // PLACEHOLDER — no email supplied yet
    address: "Anugya - A Boutique Hotel, Ratna Lok Colony Rd, Ratna Lok Colony, Indore, Madhya Pradesh 452011",
  },

  hours: {
    checkIn: "12:00 pm", // PLACEHOLDER — typically 12:00 or 14:00, confirm with property
    checkOut: "10:00 am", // PLACEHOLDER — typically 10:00 or 11:00, confirm with property
  },

  social: {
    instagramHandle: "@anugyaaboutiquehotel1",
    instagramUrl: "https://www.instagram.com/anugyaaboutiquehotel1",
    googleMapsUrl: "https://share.google/dhduDALTFeabCqnMg",
    googleReviewsUrl: "https://www.google.com/maps/place/Anugya+-+A+Boutique+Hotel/@22.748824,75.8965865,17z/data=!4m11!3m10!1s0x3962fd5537635809:0x354013a9fb9e5c86!5m2!4m1!1i2!8m2!3d22.7488191!4d75.8991668!9m1!1b1!16s%2Fg%2F11yfzgmspk?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D", // PLACEHOLDER
  },

  seo: {
    defaultTitle: "Anugya Hotel & Boutique — Indore",
    defaultDescription:
      "A boutique stay in Indore: considered rooms, warm service, and an easy walk to the city's business and shopping districts.",
  },
} as const;

/** Builds a wa.me deep link from a plain-text message. Central place so the
 * number only ever needs to change in one spot. */
export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encoded}`;
}
