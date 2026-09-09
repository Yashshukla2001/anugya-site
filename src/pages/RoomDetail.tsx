import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getRoomBySlug, rooms } from "@/data/rooms";
import { siteConfig } from "@/config/siteConfig";
import { roomWhatsAppLink } from "@/lib/whatsapp";
import { RoomCard } from "@/components/rooms/RoomCard";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { useSeo } from "@/hooks/useSeo";
import { glowButton } from "@/lib/buttonStyles";

export function RoomDetail() {
  const { slug } = useParams();
  const room = getRoomBySlug(slug ?? "");

  // Hooks must run unconditionally (before the not-found early return
  // below), so these guard internally for a missing room rather than being
  // skipped — the values are moot once <Navigate> fires anyway.
  useSeo({
    title: room?.name ?? "Room not found",
    description: room ? `${room.name} at ${siteConfig.hotelName} — ${room.priceDisplay} per night. ${room.shortDescription}` : undefined,
    path: room ? `/rooms/${room.slug}` : undefined,
    image: room?.images[0],
  });

  useEffect(() => {
    if (!room) return;
    const data = {
      "@context": "https://schema.org",
      "@type": "HotelRoom",
      name: room.name,
      description: room.shortDescription,
      amenityFeature: room.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a })),
      offers: { "@type": "Offer", price: room.price, priceCurrency: "INR" },
    };
    let el = document.head.querySelector<HTMLScriptElement>('script[data-seo="hotel-room"]');
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.dataset.seo = "hotel-room";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
    return () => {
      el?.remove();
    };
  }, [room]);

  if (!room) return <Navigate to="/rooms" replace />;

  const related = rooms.filter((r) => r.slug !== room.slug).slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="relative flex h-[70vh] min-h-[480px] items-end overflow-hidden bg-charcoal-900">
        <img src={room.images[0]} alt={room.name} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/85 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          <p className="text-sm tracking-wide2 text-stone-200">Anugya Hotel & Boutique</p>
          <h1 className="mt-3 font-display text-display-lg text-stone-50">{room.name}</h1>
          <p className="mt-2 text-lg text-stone-200">{room.priceDisplay} / night</p>
          <a
            href={roomWhatsAppLink({ roomName: room.name, price: room.priceDisplay })}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 inline-block ${glowButton}`}
          >
            Book Now
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        {/* INTRO */}
        <Reveal className="max-w-prose">
          <p className="text-charcoal-700">{room.shortDescription}</p>
        </Reveal>

        {/* GALLERY */}
        {room.images.length > 1 && (
          <Reveal className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {room.images.slice(1).map((src) => (
              <img key={src} src={src} alt={room.name} loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" />
            ))}
          </Reveal>
        )}

        {/* FACILITIES */}
        <Reveal className="mt-16">
          <h2 className="font-display text-display-sm text-charcoal-900">Room facilities</h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-charcoal-700 sm:grid-cols-3 lg:grid-cols-4">
            {room.amenities.map((a) => (
              <li key={a} className="border-b border-charcoal-900/10 pb-2">
                {a}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* STAY DETAILS */}
        <Reveal className="mt-16 grid gap-8 border-t border-charcoal-900/10 pt-10 sm:grid-cols-3">
          <div>
            <p className="text-xs text-charcoal-700/60">Check-in</p>
            <p className="mt-1 text-charcoal-900">{siteConfig.hours.checkIn}</p>
          </div>
          <div>
            <p className="text-xs text-charcoal-700/60">Check-out</p>
            <p className="mt-1 text-charcoal-900">{siteConfig.hours.checkOut}</p>
          </div>
          <div>
            <p className="text-xs text-charcoal-700/60">Rate</p>
            <p className="mt-1 text-charcoal-900">{room.priceDisplay} per night</p>
          </div>
        </Reveal>

        {/* BOOKING CTA */}
        <Reveal className="relative mt-16 overflow-hidden rounded-lg border border-white/10 bg-walnut-700 px-8 py-12 text-center shadow-glass">
          <AmbientGlow variant="reverse" />
          <p className="relative font-display text-display-sm text-stone-50">Ready to stay at Anugya?</p>
          <a
            href={roomWhatsAppLink({ roomName: room.name, price: room.priceDisplay })}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative mt-6 inline-block ${glowButton}`}
          >
            Book Now
          </a>
        </Reveal>

        {/* RELATED ROOMS */}
        <div className="mt-20">
          <h2 className="font-display text-display-sm text-charcoal-900">Other rooms</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <RoomCard key={r.slug} room={r} />
            ))}
          </div>
          <Link to="/rooms" className="mt-8 inline-block text-sm tracking-wide2 text-charcoal-900 underline underline-offset-4">
            View all rooms
          </Link>
        </div>
      </div>
    </div>
  );
}
