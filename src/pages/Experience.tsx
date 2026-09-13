import { Reveal } from "@/components/ui/Reveal";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { useSeo } from "@/hooks/useSeo";

/**
 * Brief §20 calls for a "visual hotel experience page" using photography
 * wherever possible — the Phase 2 version of this page was text-only,
 * which doesn't meet that bar. Rewritten for Phase 5 with real photography
 * per beat, alternating layout so it doesn't read as a repetitive list.
 *
 * Photo choices are mood-appropriate real property photography, not literal
 * documentation of each beat (there's no dedicated "arrival lobby" or
 * "shuttle" shot in the source photos) — consistent with how the rest of
 * the site uses imagery, and never captioned as depicting something it
 * isn't.
 */
const beats = [
  {
    title: "Arrival",
    copy: "A private check-in, no counter queue — your room is ready when you are.",
    image: "/assets/rooms/deluxe/02.jpg",
  },
  {
    title: "Stay",
    copy: "Rooms built around quiet comfort: soft lighting, warm materials, nothing over-styled.",
    image: "/assets/rooms/presidential-suite/01.jpg",
  },
  {
    title: "Comfort",
    copy: "Considered details throughout — from bedding to lighting to the small things guests actually notice.",
    image: "/assets/rooms/executive-suite/02.jpg",
  },
  {
    title: "Dining",
    copy: "Breakfast and in-room dining, kept simple and reliable.",
    image: "/assets/rooms/deluxe/03.jpg",
  },
  {
    title: "Service",
    copy: "24-hour front desk and housekeeping — help is never far off.",
    image: "/assets/rooms/premium/02.jpg",
  },
  {
    title: "Relaxation",
    copy: "Common seating and a fitness corner for slower moments between plans.",
    image: "/assets/rooms/family-suite/03.jpg",
  },
  {
    title: "Convenience",
    copy: "Airport transfers and shuttle service, arranged directly with the front desk.",
    image: "/assets/rooms/executive/05.jpg",
  },
];

export function Experience() {
  useSeo({
    title: "The Experience",
    description: "What staying at Anugya A Boutique Hotel in Indore feels like, from arrival to check-out.",
    path: "/experience",
  });

  return (
    <div className="pb-24 pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="text-sm tracking-wide2 text-charcoal-700/70">Discover</p>
          <h1 className="mt-2 font-display text-display-lg text-charcoal-900">The Anugya experience</h1>
          <p className="mt-4 max-w-prose text-charcoal-700">
            What staying here actually feels like, in {beats.length} parts.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 space-y-4">
        {beats.map((b, i) => (
          <section key={b.title} className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10">
            <Reveal
              y={32}
              className={[
                "aspect-[4/3] overflow-hidden rounded-md",
                i % 2 === 1 ? "lg:order-2" : "",
              ].join(" ")}
            >
              <img src={b.image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </Reveal>
            <Reveal delay={0.1} className={i % 2 === 1 ? "lg:order-1" : ""}>
              <p className="font-display text-display-sm text-charcoal-900">{b.title}</p>
              <p className="mt-4 max-w-prose text-charcoal-700">{b.copy}</p>
            </Reveal>
          </section>
        ))}
      </div>

      <ClosingCTA />
    </div>
  );
}
