import { Link } from "react-router-dom";
import { amenityCategories, totalAmenityCount } from "@/data/amenities";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientGlow } from "@/components/ui/AmbientGlow";

export function AmenitiesTeaser() {
  return (
    <section className="relative px-6 py-24 lg:px-10">
      <AmbientGlow variant="reverse" />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="font-display text-display-sm text-charcoal-900">Amenities</h2>
          <p className="mt-3 max-w-prose text-charcoal-700">
            {totalAmenityCount} amenities across the property, organized so you can actually find what
            you're looking for.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {amenityCategories.slice(0, 8).map((cat, i) => (
            <Reveal
              key={cat.id}
              delay={i * 0.05}
              className="rounded-lg border border-white/40 bg-white/40 p-6 shadow-glass backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-glow"
            >
              <p className="font-display text-lg text-charcoal-900">{cat.title}</p>
              <p className="mt-1 text-sm text-charcoal-700/70">{cat.items.length} amenities</p>
            </Reveal>
          ))}
        </div>
        <Link to="/amenities" className="mt-8 inline-block text-sm tracking-wide2 text-charcoal-900 underline underline-offset-4">
          See every amenity
        </Link>
      </div>
    </section>
  );
}
