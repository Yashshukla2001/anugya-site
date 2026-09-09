import { rooms } from "@/data/rooms";
import { RoomCard } from "@/components/rooms/RoomCard";
import { Reveal } from "@/components/ui/Reveal";
import { useSeo } from "@/hooks/useSeo";

export function Rooms() {
  useSeo({
    title: "Rooms",
    description: "Six room types at Anugya Hotel & Boutique, Indore — Deluxe, Executive, Premium, Family Suite, Presidential Suite, and Executive Suite.",
    path: "/rooms",
  });

  return (
    <div className="px-6 pb-24 pt-36 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-sm tracking-wide2 text-charcoal-700/70">Stay</p>
          <h1 className="mt-2 font-display text-display-lg text-charcoal-900">Rooms</h1>
          <p className="mt-4 max-w-prose text-charcoal-700">
            Six room types, each photographed as it actually is. Prices are per night as
            supplied by the property.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {rooms.map((room, i) => (
            <Reveal key={room.slug} delay={i * 0.06}>
              <RoomCard room={room} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
