import { siteConfig } from "@/config/siteConfig";

/**
 * Every answer here is either (a) directly backed by real data already
 * on the site (address, amenities, room types) or (b) an honest redirect
 * to WhatsApp where the real answer isn't confirmed yet (check-in/out
 * times, exact meal inclusions). Never invents a policy, time, or
 * facility that isn't already established elsewhere in this codebase —
 * see src/config/siteConfig.ts and src/data/rooms.ts for what's real.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "How do I book a room?",
    answer:
      "The fastest way is WhatsApp — tap any \"Book Now\" button on the site, or message us directly, and we'll confirm availability and pricing right away.",
  },
  {
    question: "Where is Anugya located?",
    answer: `${siteConfig.contact.address}. See the Location page for directions and a map.`,
  },
  {
    question: "What time is check-in and check-out?",
    answer: "Times are confirmed directly with the property — message us on WhatsApp before your stay and we'll share the details.",
  },
  {
    question: "Is breakfast included?",
    answer: "Breakfast is available at the property — message us on WhatsApp to confirm exactly what's included with your room rate.",
  },
  {
    question: "Is parking available?",
    answer: "Yes, on-site car parking is available.",
  },
  {
    question: "Do you offer airport transfers?",
    answer: "Yes — airport transfers and a pickup/drop facility are available. Ask us on WhatsApp to arrange one.",
  },
  {
    question: "Do you have rooms for families or larger groups?",
    answer: "Yes — the Family Suite and Executive Suite are both built for that, with more space and additional beds. See the Rooms page for details.",
  },
  {
    question: "Can I reach you by phone as well as WhatsApp?",
    answer: "Yes — call or WhatsApp us any time, both go straight to the property. Numbers are on the Contact page.",
  },
];
