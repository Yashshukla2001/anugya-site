import { Link } from "react-router-dom";
import type { Room } from "@/data/rooms";
import { roomWhatsAppLink } from "@/lib/whatsapp";

/**
 * Premium animated card: hover reveals a second real photo (crossfade,
 * not a fabricated one) where available, a gradient info panel lifts
 * into view, and both a prominent "Book Now" (WhatsApp) and a secondary
 * "Explore in detail" link sit together — not just a photo with a caption.
 */
export function RoomCard({ room }: { room: Room }) {
  const highlights = room.amenities.slice(0, 4);
  const secondImage = room.images[1];

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-white/40 bg-white/40 shadow-glass backdrop-blur-md transition-all duration-500 ease-cinematic hover:-translate-y-1.5 hover:border-gold-400/60 hover:shadow-glow-lg">
      <Link to={`/rooms/${room.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.name}
          loading="lazy"
          className={[
            "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-cinematic group-hover:scale-110",
            secondImage ? "group-hover:opacity-0" : "",
          ].join(" ")}
        />
        {secondImage && (
          <img
            src={secondImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-opacity duration-700 ease-cinematic group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute right-3 top-3 rounded-full border border-white/40 bg-white/30 px-3 py-1 text-xs tracking-wide2 text-stone-50 backdrop-blur-md">
          {room.priceDisplay}
        </span>
        <ul className="absolute inset-x-0 bottom-0 flex flex-wrap gap-x-3 gap-y-1 p-4 text-xs text-stone-100 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {highlights.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl text-charcoal-900">{room.name}</h3>
        <p className="mt-2 text-sm text-charcoal-700/80">{room.shortDescription}</p>

        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-charcoal-700/70">
          {highlights.slice(0, 3).map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={roomWhatsAppLink({ roomName: room.name, price: room.priceDisplay })}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold-500 px-5 py-2.5 text-sm tracking-wide2 text-charcoal-900 shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-glow-lg"
          >
            Book Now
          </a>
          <Link to={`/rooms/${room.slug}`} className="text-sm tracking-wide2 text-charcoal-900 underline underline-offset-4">
            Explore in detail
          </Link>
        </div>
      </div>
    </div>
  );
}
