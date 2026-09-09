import { useState } from "react";
import { amenityCategories, totalAmenityCount } from "@/data/amenities";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { AmenityCategoryBand } from "@/components/amenities/AmenityCategoryBand";
import { useSeo } from "@/hooks/useSeo";
import {
  BedDouble,
  Building2,
  Car,
  ConciergeBell,
  Dumbbell,
  ShieldCheck,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  ConciergeBell,
  BedDouble,
  UtensilsCrossed,
  Car,
  Dumbbell,
  Users,
  ShieldCheck,
  Building2,
};

// One real photo per category, purely atmospheric behind the collapsed
// band — never implies the photo depicts that specific amenity (there's
// no dedicated gym/parking/shuttle shot in the source set).
const categoryImages: Record<string, string> = {
  "guest-services": "/assets/rooms/deluxe/02.jpg",
  "room-comfort": "/assets/rooms/premium/01.jpg",
  dining: "/assets/rooms/deluxe/03.jpg",
  "transport-access": "/assets/rooms/executive/05.jpg",
  "wellness-fitness": "/assets/rooms/family-suite/03.jpg",
  "family-special-stays": "/assets/rooms/family-suite/02.jpg",
  "safety-security": "/assets/rooms/executive/04.jpg",
  "property-experience": "/assets/rooms/presidential-suite/03.jpg",
};

const heroStrip = [
  "/assets/rooms/presidential-suite/03.jpg",
  "/assets/rooms/family-suite/03.jpg",
  "/assets/rooms/executive-suite/02.jpg",
];

export function Amenities() {
  useSeo({
    title: "Amenities",
    description: `${totalAmenityCount} amenities at Anugya Hotel & Boutique, Indore — guest services, room comfort, dining, wellness, and more.`,
    path: "/amenities",
  });

  // Accordion: only one category open at a time. First one open by
  // default so the page doesn't look inert on arrival.
  const [openId, setOpenId] = useState<string | null>(amenityCategories[0]?.id ?? null);

  return (
    <div className="pb-24 pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="text-sm tracking-wide2 text-charcoal-700/70">Discover</p>
          <h1 className="mt-2 font-display text-display-lg text-charcoal-900">Amenities</h1>
          <p className="mt-4 max-w-prose text-charcoal-700">
            {totalAmenityCount} amenities across the property. Tap a category to see what's in it.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 grid grid-cols-3 gap-3">
          {heroStrip.map((src) => (
            <div key={src} className="aspect-[3/4] overflow-hidden rounded-md">
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </Reveal>

        <div className="mt-16 space-y-3">
          {amenityCategories.map((cat, i) => {
            const Icon = icons[cat.icon] ?? Building2;
            return (
              <Reveal key={cat.id} delay={i * 0.04}>
                <AmenityCategoryBand
                  id={cat.id}
                  title={cat.title}
                  count={cat.items.length}
                  items={cat.items}
                  icon={Icon}
                  image={categoryImages[cat.id]}
                  open={openId === cat.id}
                  onToggle={() => setOpenId((current) => (current === cat.id ? null : cat.id))}
                />
              </Reveal>
            );
          })}
        </div>
      </div>

      <ClosingCTA />
    </div>
  );
}
