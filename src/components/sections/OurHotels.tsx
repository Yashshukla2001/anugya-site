import { Link } from "react-router-dom";
import { Building2, MapPin } from "lucide-react";
import { sisterHotels } from "@/data/sisterHotels";
import { Reveal } from "@/components/ui/Reveal";

export function OurHotels() {
  return (
    <section id="hotels" className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-sm tracking-wide2 text-charcoal-700/70">Also in Indore</p>
          <h2 className="mt-2 font-display text-display-sm text-charcoal-900">More stays nearby</h2>
          <p className="mt-3 max-w-prose text-charcoal-700">
            Anugya is one of a few properties we look after in Indore. Ask us about these too.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {sisterHotels.map((hotel, i) => (
            <Reveal
              key={hotel.name}
              delay={i * 0.08}
              className="flex items-start gap-4 rounded-lg border border-white/40 bg-white/40 p-6 shadow-glass backdrop-blur-md"
            >
              <Building2 size={22} className="mt-1 shrink-0 text-gold-600" aria-hidden="true" />
              <div>
                <p className="font-display text-lg text-charcoal-900">
                  {hotel.name}
                  {hotel.altName && <span className="text-base text-charcoal-700/60"> ({hotel.altName})</span>}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-charcoal-700/70">
                  <MapPin size={14} aria-hidden="true" />
                  {hotel.area}
                </p>
                <Link to="/contact" className="mt-3 inline-block text-sm tracking-wide2 text-gold-600 underline underline-offset-4">
                  Ask us about this stay
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
