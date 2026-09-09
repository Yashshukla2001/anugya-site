/**
 * Gallery images. All sourced from the client's own uploaded photography
 * (public/assets/rooms/**) — no stock or AI-generated images, per brief §21.
 * Category labels are provisional in the same way room assignment is; see
 * src/data/rooms.ts. Ordered so the strongest, verified shots lead — this
 * feeds both /gallery and the homepage Instagram teaser (first 6).
 */

export interface GalleryImage {
  src: string;
  category: "rooms" | "suites" | "interiors";
  alt: string;
}

export const galleryImages: GalleryImage[] = [
  { src: "/assets/rooms/presidential-suite/03.jpg", category: "suites", alt: "Presidential suite private terrace" },
  { src: "/assets/rooms/family-suite/03.jpg", category: "rooms", alt: "Family suite room with seating" },
  { src: "/assets/rooms/executive-suite/02.jpg", category: "suites", alt: "Executive suite bed with terrace view" },
  { src: "/assets/rooms/executive/02.jpg", category: "rooms", alt: "Executive room bed with balcony" },
  { src: "/assets/rooms/presidential-suite/01.jpg", category: "suites", alt: "Presidential suite bed" },
  { src: "/assets/rooms/deluxe/04.jpg", category: "rooms", alt: "Deluxe room bed" },
  { src: "/assets/rooms/premium/01.jpg", category: "rooms", alt: "Premium room bed" },
  { src: "/assets/rooms/family-suite/02.jpg", category: "rooms", alt: "Family suite room bed and seating" },
  { src: "/assets/rooms/executive-suite/03.jpg", category: "suites", alt: "Executive suite bed detail" },
  { src: "/assets/rooms/deluxe/05.jpg", category: "rooms", alt: "Deluxe room workspace" },
  { src: "/assets/rooms/family-suite/05.jpg", category: "rooms", alt: "Family suite twin beds" },
  { src: "/assets/rooms/executive/04.jpg", category: "rooms", alt: "Executive room seating corner" },
  { src: "/assets/rooms/deluxe/02.jpg", category: "interiors", alt: "Welcome amenity kit" },
  { src: "/assets/rooms/presidential-suite/02.jpg", category: "interiors", alt: "Bathroom with bathtub" },
  { src: "/assets/rooms/deluxe/01.jpg", category: "interiors", alt: "Bathroom marble detail" },
  { src: "/assets/rooms/executive-suite/01.jpg", category: "interiors", alt: "Bathroom with dark tile accent" },
  { src: "/assets/rooms/family-suite/07.jpg", category: "rooms", alt: "Family suite room, alternate angle" },
  { src: "/assets/rooms/premium/03.jpg", category: "interiors", alt: "Workspace detail" },
];
