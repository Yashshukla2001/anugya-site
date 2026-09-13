import { galleryImages } from "@/data/gallery";
import { siteConfig } from "@/config/siteConfig";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Two-column layout with a simulated phone frame on the right, per
 * client reference. The 3x3 grid inside is real Anugya photography, and
 * the avatar is now the real brand logo (was a generic Camera icon
 * before the client supplied one). The phone chrome itself (frame,
 * notch) is still invented UI, not a real screenshot.
 */
export function InstagramSection() {
  const grid = galleryImages.slice(0, 9);

  return (
    <section className="overflow-hidden px-6 py-24 lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="text-sm tracking-wide2 text-charcoal-700/70">The Anugya story</p>
          <h2 className="mt-2 font-display text-display-md text-charcoal-900">Follow the journey.</h2>
          <p className="mt-4 max-w-sm text-charcoal-700">Real moments from the property, shared as they happen.</p>
          <a
            href={siteConfig.social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-charcoal-900 px-6 py-3 text-sm tracking-wide2 text-stone-50 shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg"
          >
            Follow on Instagram
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>

        <Reveal y={40} delay={0.1} className="mx-auto w-full max-w-xs">
          <div className="overflow-hidden rounded-[2.5rem] border-[10px] border-charcoal-900 bg-stone-50 shadow-glass">
            <div className="flex justify-center">
              <div className="h-5 w-24 rounded-b-2xl bg-charcoal-900" />
            </div>
            <div className="flex items-center gap-2.5 px-4 pb-3 pt-1">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/10 p-1">
                <img src="/assets/logo-mark.png" alt="" aria-hidden="true" className="h-full w-full object-contain" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-charcoal-900">{siteConfig.social.instagramHandle}</p>
                <p className="truncate text-[10px] text-charcoal-700/60">Anugya A Boutique Hotel</p>
              </div>
              <span className="shrink-0 rounded-full bg-charcoal-900 px-3 py-1 text-[10px] text-stone-50">Follow</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 bg-stone-50 p-3 pt-1">
              {grid.map((img) => (
                <div key={img.src} className="aspect-square overflow-hidden rounded-lg bg-stone-100">
                  <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
