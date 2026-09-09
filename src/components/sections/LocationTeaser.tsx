import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { Reveal } from "@/components/ui/Reveal";
import { glowButton } from "@/lib/buttonStyles";

/**
 * The real map now sits behind the text as atmosphere, not as a second
 * functional map — the dedicated interactive one lives on /location, and
 * "Get directions" already covers wayfinding here. Kept non-interactive
 * (pointer-events-none) on purpose: an interactive map behind scrolling
 * content would intercept mouse-wheel input as map-zoom instead of page
 * scroll, which is a common, genuinely annoying embed mistake.
 */
export function LocationTeaser() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.contact.address)}&output=embed`;

  return (
    <section className="relative overflow-hidden bg-charcoal-900 px-6 py-28 lg:px-10">
      <iframe
        title=""
        aria-hidden="true"
        tabIndex={-1}
        src={mapSrc}
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full border-0 opacity-40 grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/85 to-charcoal-900/70" />

      <Reveal className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <MapPin size={22} className="text-gold-400" aria-hidden="true" />
        <h2 className="font-display text-display-sm text-stone-50">Find us in {siteConfig.location}</h2>
        <p className="max-w-prose text-stone-300">{siteConfig.contact.address}</p>
        <a href={siteConfig.social.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={glowButton}>
          Get directions
        </a>
      </Reveal>
    </section>
  );
}
