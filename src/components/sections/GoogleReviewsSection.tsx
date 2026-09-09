import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { demoGoogleRating, demoReviews, googleRating, isDemoData, reviews } from "@/data/reviews";
import { siteConfig } from "@/config/siteConfig";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const AUTO_ADVANCE_MS = 4500;

/** Google "G" mark — used two ways below: full colour inside the CTA
 * button's avatar bubble, and desaturated/dimmed as the small corner
 * watermark on each review card. Standard four-colour Google icon, kept
 * as a single inline component so both usages stay pixel-identical. */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20c11.045 0 20-8.955 20-20 0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

/**
 * Genuine auto-advancing carousel per client reference — not just a
 * manually-swipeable row. Advances on a timer, pauses on hover/touch,
 * dot indicators track position and are clickable to jump directly.
 * Disabled entirely under prefers-reduced-motion (auto-rotating content
 * is a real vestibular-motion concern for some users; falls back to
 * plain manual swipe with no timer).
 *
 * Real reviews (src/data/reviews.ts → `reviews`) ship empty until the
 * client supplies actual Google data. Until then, if `isDemoData` is on,
 * this falls back to `demoReviews` purely so the section previews with
 * content instead of sitting empty — and stamps a visible "Sample data"
 * watermark on the section the whole time demo content is showing, so it
 * can't quietly slip into production. Never edit `demoReviews` to look
 * like real guest feedback with the watermark removed.
 */
export function GoogleReviewsSection() {
  const hasRealReviews = reviews.length > 0 && googleRating.value !== null;
  const usingDemoData = !hasRealReviews && isDemoData;
  const displayReviews = hasRealReviews ? reviews : usingDemoData ? demoReviews : reviews;
  const displayRating = hasRealReviews ? googleRating : usingDemoData ? demoGoogleRating : googleRating;
  const hasReviews = displayReviews.length > 0 && displayRating.value !== null;

  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!hasReviews || paused || reducedMotion) return;
    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % displayReviews.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(t);
  }, [hasReviews, paused, reducedMotion, displayReviews.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[active] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: reducedMotion ? "auto" : "smooth" });
  }, [active, reducedMotion]);

  return (
    <section className="bg-charcoal-900 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
      

        <Reveal className="flex items-end justify-between">
          <div>
            <p className="text-sm tracking-wide2 text-stone-400">Guest voices</p>
            <h2 className="mt-2 font-display text-display-sm text-stone-50">What guests say</h2>
          </div>
          {hasReviews && (
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex text-gold-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                ))}
              </div>
              <span className="text-sm text-stone-300">
                {displayRating.value} · {displayRating.count} reviews
              </span>
            </div>
          )}
        </Reveal>

        {hasReviews ? (
          <>
            {/* Edge-to-edge peeking carousel: neighbouring cards stay
               partially visible and fade toward the container edges via
               the mask below, rather than cropping hard. */}
            <div
              ref={trackRef}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              className="reviews-edge-fade mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-4 [&::-webkit-scrollbar]:hidden"
            >
              {displayReviews.map((review) => (
                <div
                  key={review.author}
                  className="relative w-[300px] shrink-0 snap-start rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:bg-white/[0.06]"
                >
                 
                  <div className="flex items-center justify-between">
                    <div className="flex text-gold-500">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                      ))}
                    </div>
                    <GoogleG className="h-5 w-5 opacity-40 grayscale" />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-stone-200">"{review.text}"</p>
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-walnut-700 text-xs font-medium text-gold-300">
                        {review.author
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </span>
                      <span className="text-sm text-stone-300">{review.author}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 flex justify-center gap-2" role="tablist" aria-label="Review pagination">
              {displayReviews.map((review, i) => (
                <button
                  key={review.author}
                  role="tab"
                  aria-selected={active === i}
                  aria-label={`Show review from ${review.author}`}
                  onClick={() => setActive(i)}
                  className={["h-1.5 rounded-full transition-all duration-300", active === i ? "w-6 bg-gold-500" : "w-1.5 bg-stone-100/25"].join(" ")}
                />
              ))}
            </div>
          </>
        ) : (
          <Reveal className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-14 text-center">
            <div className="flex items-center justify-center gap-1 text-stone-100/20">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} strokeWidth={1.5} aria-hidden="true" />
              ))}
            </div>
            <p className="mx-auto mt-5 max-w-md text-stone-300">
              Our Google reviews are connecting soon — in the meantime, read them directly on Google.
            </p>
          </Reveal>
        )}

        <Reveal
          delay={0.1}
          className="mt-6 flex flex-col items-start justify-between gap-8 rounded-2xl border border-white/10 bg-charcoal-800 px-8 py-10 sm:flex-row sm:items-center sm:px-10"
        >
          <div>
            <p className="text-xs tracking-wide3 text-stone-400">Enjoyed your experience?</p>
            <p className="mt-3 font-display text-2xl text-stone-50 sm:text-3xl">Share it with others.</p>
            <p className="mt-2 max-w-sm text-sm text-stone-400">
              A minute of your time helps another guest in {siteConfig.location} find us. Reviews are posted through Google.
            </p>
          </div>
          <a
            href={siteConfig.social.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2.5 rounded-full bg-stone-300 py-3 pl-3 pr-5 text-sm font-medium text-charcoal-900 shadow-glass transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-200 hover:shadow-glow"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-50">
              <GoogleG className="h-4 w-4" />
            </span>
            Leave a Google Review
            <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
