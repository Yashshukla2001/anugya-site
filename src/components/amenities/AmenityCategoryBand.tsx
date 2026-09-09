import { useEffect, useRef } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AmenityCategoryBandProps {
  id: string;
  title: string;
  count: number;
  items: string[];
  icon: LucideIcon;
  image: string;
  open: boolean;
  onToggle: () => void;
}

/**
 * Closed: full-width band, real photo backdrop at low opacity behind the
 * name/count — never captioned as depicting that specific category, same
 * rule as the rest of the site's mood photography.
 *
 * Open: springs open with a slight overshoot ("back" ease, kept subtle —
 * a drawer with a little give, not a bounce), revealing items as pills on
 * a light panel. Height is measured and animated directly rather than
 * relying on CSS `height: auto` transitions, which don't animate.
 */
export function AmenityCategoryBand({ id, title, count, items, icon: Icon, image, open, onToggle }: AmenityCategoryBandProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    if (!panel || !inner) return;

    const targetHeight = open ? inner.scrollHeight : 0;

    gsap.to(panel, {
      height: targetHeight,
      duration: reducedMotion ? 0.15 : 0.6,
      ease: reducedMotion ? "none" : "back.out(1.3)",
    });
  }, [open, reducedMotion]);

  return (
    <div className="overflow-hidden rounded-lg border border-white/40 shadow-glass">
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`amenity-panel-${id}`}
        className="relative flex w-full items-center justify-between overflow-hidden px-6 py-6 text-left"
      >
        <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/75 via-charcoal-900/50 to-charcoal-900/60" />
        <span className="relative flex items-center gap-3">
          <Icon size={20} className="text-gold-400" aria-hidden="true" />
          <span className="font-display text-lg text-stone-50 sm:text-xl">{title}</span>
        </span>
        <span className="relative flex items-center gap-3">
          <span className="text-sm text-stone-200/80">{count} amenities</span>
          <ChevronDown
            size={18}
            className={["text-stone-200 transition-transform duration-300", open ? "rotate-180" : ""].join(" ")}
            aria-hidden="true"
          />
        </span>
      </button>

      <div ref={panelRef} id={`amenity-panel-${id}`} role="region" aria-label={`${title} amenities`} className="h-0 overflow-hidden bg-stone-50">
        <div ref={innerRef} className="flex flex-wrap gap-2 px-6 py-6">
          {items.map((item) => (
            <span key={item} className="rounded-full border border-charcoal-900/10 bg-white px-3.5 py-1.5 text-sm text-charcoal-700">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
