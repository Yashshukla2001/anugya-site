import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BedDouble, Clock, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Redesigned per feedback that it looked plain/static: added a gold rule
 * + eyebrow, a small real-facts row (real data only — room count, the
 * confirmed 24/7 front desk amenity, the city), a second overlapping
 * photo for editorial depth instead of one flat rectangle, and a
 * scroll-linked scale on the main image (not just a mount-time fade).
 */
export function IntroSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion || !imgRef.current) return;
    gsap.fromTo(
      imgRef.current,
      { scale: 1.15 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: imgRef.current, start: "top bottom", end: "top 40%", scrub: true },
      },
    );
  }, [reducedMotion]);

  return (
    <section className="relative mx-auto grid max-w-7xl gap-14 overflow-hidden px-6 py-28 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10">
      <AmbientGlow />
      <Reveal>
        <div className="h-px w-12 bg-gold-400" aria-hidden="true" />
        <p className="mt-5 text-sm tracking-wide2 text-charcoal-700/70">The Anugya way</p>
        <h2 className="mt-3 font-display text-display-md text-charcoal-900">
          A considered stay, built around comfort rather than spectacle.
        </h2>
        <p className="mt-6 max-w-prose text-charcoal-700">
          Anugya sits in Indore with rooms designed for an easy stay — warm materials, quiet service,
          and everything a guest actually needs close at hand.
        </p>

        <div className="mt-8 flex flex-wrap gap-6 border-t border-charcoal-900/10 pt-6">
          <Fact icon={MapPin} label="Indore, Madhya Pradesh" />
          <Fact icon={BedDouble} label="6 room types" />
          <Fact icon={Clock} label="24-hour front desk" />
        </div>
      </Reveal>

      <Reveal y={32} delay={0.1} className="relative">
        <div ref={imgRef} className="aspect-[4/5] overflow-hidden rounded-md shadow-glass lg:aspect-[3/4]">
          <img
            src="/assets/rooms/presidential-suite/01.jpg"
            alt="A room at Anugya A Boutique Hotel"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute -bottom-8 -left-8 hidden aspect-[4/3] w-2/5 overflow-hidden rounded-md border-4 border-stone-50 shadow-glass sm:block">
          <img
            src="/assets/rooms/deluxe/02.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}

function Fact({ icon: Icon, label }: { icon: typeof MapPin; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-charcoal-700">
      <Icon size={16} className="text-gold-600" aria-hidden="true" />
      {label}
    </div>
  );
}
