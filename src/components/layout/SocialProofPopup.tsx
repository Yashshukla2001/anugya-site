import { useEffect, useRef, useState } from "react";
import { Camera, Star, X } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Shows 3s after every real page load — deliberately plain component
 * state, not localStorage/sessionStorage, so it reappears on reload as
 * requested rather than "once per session" (the more common pattern, but
 * not what was asked for here). Lives in SiteLayout, which doesn't
 * remount on in-app navigation, so it fires once per browser load/reload
 * rather than once per page click within the site.
 *
 * Rebuilt as a true centered modal per client reference (was a small
 * corner pill) — genuine modal semantics this time: backdrop, focus
 * moves to the close button on open and returns to whatever had focus
 * before on close, Escape and backdrop-click both dismiss.
 */
export function SocialProofPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const reducedMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 3000);
    return () => window.clearTimeout(t);
  }, []);

  const show = visible && !dismissed;

  useEffect(() => {
    if (!show) return;
    lastFocusedRef.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  function dismiss() {
    setDismissed(true);
    lastFocusedRef.current?.focus();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="social-proof-heading"
      className={[
        "fixed inset-0 z-[70] flex items-center justify-center p-6",
        reducedMotion ? "transition-opacity duration-200" : "transition-opacity duration-400 ease-cinematic",
        show ? "opacity-100 pointer-events-auto" : "pointer-events-none opacity-0",
      ].join(" ")}
      inert={!show}
    >
      <div className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm" onClick={dismiss} aria-hidden="true" />

      <div
        className={[
          "relative w-full max-w-sm rounded-lg border border-white/40 bg-stone-50 p-7 shadow-glass",
          reducedMotion ? "transition-transform duration-200" : "transition-transform duration-400 ease-cinematic",
          show ? "scale-100" : "scale-95",
        ].join(" ")}
      >
        <button
          ref={closeButtonRef}
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 text-charcoal-700/50 transition-colors hover:text-charcoal-900"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <p className="text-xs tracking-wide3 text-gold-600">Enjoying Anugya?</p>
        <h2 id="social-proof-heading" className="mt-2 font-display text-2xl text-charcoal-900">
          Stay connected with us.
        </h2>
        <p className="mt-3 text-sm text-charcoal-700/80">
          A review helps others find us, and following keeps you close to what's new.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href={siteConfig.social.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-charcoal-900 px-5 py-3 text-sm tracking-wide2 text-stone-50 transition-colors hover:bg-charcoal-800"
          >
            <Star size={15} fill="currentColor" strokeWidth={0} aria-hidden="true" />
            Leave a Google Review
          </a>
          <a
            href={siteConfig.social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-charcoal-900/20 px-5 py-3 text-sm tracking-wide2 text-charcoal-900 transition-colors hover:border-charcoal-900/40"
          >
            <Camera size={15} aria-hidden="true" />
            Follow on Instagram
          </a>
        </div>

        <button
          onClick={dismiss}
          className="mt-5 block w-full text-center text-sm text-charcoal-700/60 underline-offset-4 hover:underline"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
