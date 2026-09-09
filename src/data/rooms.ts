/**
 * Room data — names, prices, and amenities are copied verbatim from the
 * client brief (§7) and must not be altered without new client input.
 *
 * `images` and `imagesConfirmed`:
 * The 47 uploaded photos cluster into three visual styles, not six, and
 * nothing in the photo set self-labels which room it belongs to. Phase 4
 * expanded each room's gallery using photos independently verified to
 * match that room's cluster (see the Phase 3→4 chat summary), but the
 * fundamental ambiguity remains: I cannot visually tell Deluxe, Executive,
 * and Premium apart beyond their primary bed photo, since they share the
 * same décor style. `imagesConfirmed: false` is a real flag, not
 * decoration — components should be able to key off it (e.g. to show a
 * small "photos pending confirmation" note in an admin/staging build).
 *
 * A handful of photos (indices 22, 23, 34 in `reference-photos/`) show a fourth
 * headboard style I couldn't confidently match to any of the six rooms
 * above — left unassigned rather than guessed. All 47 originals remain in
 * `reference-photos/` (repo root, not shipped to the site) for reconciliation.
 */

export interface RoomAmenity {
  label: string;
}

export interface Room {
  slug: string;
  name: string;
  price: number;
  priceSuffix: string; // e.g. "EP" or ""
  priceDisplay: string; // exact string as supplied by client, do not recompute
  amenities: string[];
  shortDescription: string;
  images: string[];
  imagesConfirmed: boolean;
}

export const rooms: Room[] = [
  {
    slug: "deluxe",
    name: "Deluxe Room",
    price: 1800,
    priceSuffix: "EP",
    priceDisplay: "₹1,800/- EP",
    amenities: ["TV", "Fridge", "AC", "Geyser", "Tea set", "Toiletries", "Towel", "Open cupboard"],
    shortDescription: "A calm, considered room for an easy stay in Indore.",
    images: ["/assets/rooms/deluxe/04.jpg", "/assets/rooms/deluxe/01.jpg", "/assets/rooms/deluxe/02.jpg", "/assets/rooms/deluxe/03.jpg", "/assets/rooms/deluxe/05.jpg"],
    imagesConfirmed: false,
  },
  {
    slug: "executive",
    name: "Executive Room",
    price: 2000,
    priceSuffix: "EP",
    priceDisplay: "₹2,000/- EP",
    amenities: ["TV", "Fridge", "AC", "Geyser", "Tea set", "Toiletries", "Towel", "Open cupboard", "Balcony view"],
    shortDescription: "The Deluxe experience, with a balcony view of the city.",
    images: ["/assets/rooms/executive/02.jpg", "/assets/rooms/executive/01.jpg", "/assets/rooms/executive/03.jpg", "/assets/rooms/executive/04.jpg", "/assets/rooms/executive/05.jpg"],
    imagesConfirmed: false,
  },
  {
    slug: "premium",
    name: "Premium Room",
    price: 2700,
    priceSuffix: "",
    priceDisplay: "₹2,700/-",
    amenities: ["One sofa cum bed", "Balcony view", "TV", "Fridge", "AC", "Geyser", "Tea set", "Toiletries", "Towel", "Open cupboard"],
    shortDescription: "Extra room to spread out, with a sofa cum bed and balcony view.",
    images: ["/assets/rooms/premium/01.jpg", "/assets/rooms/premium/02.jpg", "/assets/rooms/premium/03.jpg", "/assets/rooms/premium/04.jpg", "/assets/rooms/premium/05.jpg"],
    imagesConfirmed: false,
  },
  {
    slug: "family-suite",
    name: "Family Suite Room",
    price: 3800,
    priceSuffix: "",
    priceDisplay: "₹3,800/-",
    amenities: ["Two sofa cum beds", "TV", "Fridge", "AC", "Geyser", "Tea set", "Toiletries", "Towel", "Open cupboard", "Locker"],
    shortDescription: "Built for families — space for everyone, without compromise.",
    images: ["/assets/rooms/family-suite/03.jpg", "/assets/rooms/family-suite/02.jpg", "/assets/rooms/family-suite/01.jpg", "/assets/rooms/family-suite/04.jpg", "/assets/rooms/family-suite/05.jpg", "/assets/rooms/family-suite/06.jpg", "/assets/rooms/family-suite/07.jpg"],
    imagesConfirmed: false,
  },
  {
    slug: "presidential-suite",
    name: "Presidential Suite Room",
    price: 4000,
    priceSuffix: "",
    priceDisplay: "₹4,000/-",
    amenities: ["Bathtub", "Personal terrace", "City view", "TV", "Fridge", "AC", "Geyser", "Tea set", "Toiletries", "Towel", "Personal cupboard", "Locker"],
    shortDescription: "A private terrace and city view — Anugya at its most spacious.",
    images: ["/assets/rooms/presidential-suite/03.jpg", "/assets/rooms/presidential-suite/01.jpg", "/assets/rooms/presidential-suite/02.jpg"],
    imagesConfirmed: false,
  },
  {
    slug: "executive-suite",
    name: "Executive Suite Room",
    price: 4300,
    priceSuffix: "",
    priceDisplay: "₹4,300/-",
    // NOTE: identical to Presidential Suite per client brief §7 — this is
    // expected, not a data-entry error. Differentiation is meant to come
    // from name, photography, and pricing until the client says otherwise.
    amenities: ["Bathtub", "Personal terrace", "City view", "TV", "Fridge", "AC", "Geyser", "Tea set", "Toiletries", "Towel", "Personal cupboard", "Locker"],
    shortDescription: "Anugya's most complete stay, with a private terrace and city view.",
    images: ["/assets/rooms/executive-suite/02.jpg", "/assets/rooms/executive-suite/03.jpg", "/assets/rooms/executive-suite/01.jpg", "/assets/rooms/executive-suite/04.jpg"],
    imagesConfirmed: false,
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug);
}
