import { Link } from "react-router-dom";
import { rooms } from "@/data/rooms";
import { RoomCard } from "@/components/rooms/RoomCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Replaces the pinned horizontal room showcase per client request — no
 * scroll-jacking, a straightforward two-column grid instead, with the
 * same premium animated RoomCard used on /rooms so the two stay
 * consistent with each other.
 */
export function RoomsGrid() {
  return (
    <section className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="text-sm tracking-wide2 text-charcoal-700/70">Stay</p>
            <h2 className="mt-2 font-display text-display-sm text-charcoal-900">Rooms</h2>
          </div>
          <Link to="/rooms" className="hidden text-sm tracking-wide2 text-charcoal-900 underline underline-offset-4 sm:block">
            View all rooms
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {rooms.map((room, i) => (
            <Reveal key={room.slug} delay={i * 0.06}>
              <RoomCard room={room} />
            </Reveal>
          ))}
        </div>

        <Link to="/rooms" className="mt-8 inline-block text-sm tracking-wide2 text-charcoal-900 underline underline-offset-4 sm:hidden">
          View all rooms
        </Link>
      </div>
    </section>
  );
}
