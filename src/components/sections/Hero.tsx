import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { glowButton, glassButton } from "@/lib/buttonStyles";

gsap.registerPlugin(ScrollTrigger);

/**
 * Concept A — "Full-bleed, text floats" (approved), plus Concept C —
 * "Layered Depth" (cursor parallax + radial vignette + bigger branding,
 * unchanged below — see prior notes in git history / README).
 *
 * Scroll-exit revised per feedback: the curtain-split ("screen
 * splitting") read as too showy, not premium. Removed entirely. What's
 * left is quieter and more editorial — the text still recedes (fades,
 * scales down) as before, and the photo now simply continues its own
 * slow zoom a little further while darkening toward black, so the hero
 * settles into the page rather than tearing apart. Both still scrubbed
 * directly to scroll position, not timed, and both still skip entirely
 * under prefers-reduced-motion.
 *
 * "A Boutique Hotel" subtitle: was a single static line. Now flanked by
 * two thin drawn-in rules and given its own slow continuous
 * letter-spacing breathe (same technique as the "Anugya" title's, offset
 * so they're not moving in lockstep) — reads as considered rather than
 * just present. Top spacing from the title is unchanged.
 */
const HERO_IMAGES = [
  "/assets/rooms/presidential-suite/03.jpg",
  "/assets/rooms/executive-suite/02.jpg",
  "/assets/rooms/deluxe/04.jpg",
];

const HOLD = 4.5; // seconds each photo stays fully visible
const FADE = 1.8; // seconds each cross-dissolve takes
const STEP = HOLD + FADE;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const exitDarkenRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);
  const contentGroupRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const subtitleLineLeftRef = useRef<HTMLDivElement>(null);
  const subtitleLineRightRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const hasFinePointer = useMediaQuery("(pointer: fine)");

  useGSAP(
    () => {
      const els = [ruleRef.current, eyebrowRef.current, titleRef.current, subtitleRef.current, taglineRef.current, ctaRef.current, scrollCueRef.current];
      const slides = gsap.utils.toArray<HTMLElement>(slidesRef.current?.children ?? []);
      if (els.some((el) => !el) || slides.length === 0) return;

      if (reducedMotion) {
        gsap.set(els, { opacity: 1, y: 0, scaleX: 1 });
        gsap.set(slides, { opacity: (i) => (i === 0 ? 1 : 0) });
        gsap.set([subtitleLineLeftRef.current, subtitleLineRightRef.current], { scaleX: 1, opacity: 1 });
        return;
      }

      gsap.set(slides, { opacity: (i) => (i === 0 ? 1 : 0), scale: 1.06 });
      gsap.set(ruleRef.current, { scaleX: 0 });
      gsap.set([subtitleLineLeftRef.current, subtitleLineRightRef.current], { scaleX: 0, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(slides[0], { opacity: 0 }, { opacity: 1, duration: 1.8, ease: "power3.out" })
        .to(ruleRef.current, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 0.4)
        .fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, 0.6)
        .fromTo(titleRef.current, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.6 }, 0.9)
        .fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.9)
        .to([subtitleLineLeftRef.current, subtitleLineRightRef.current], { scaleX: 1, opacity: 1, duration: 0.6, ease: "power2.inOut" }, 2.0)
        .fromTo(taglineRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, 2.1)
        .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, 2.3)
        .fromTo(scrollCueRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 2.7)
        .fromTo(flareRef.current, { opacity: 0 }, { opacity: 1, duration: 1.4 }, 1.2);

      gsap.to(titleRef.current, {
        letterSpacing: "0.012em",
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 3.0,
      });

      // Same breathe technique as the title, offset in both timing and
      // range so the two lines don't move in obvious lockstep.
      gsap.to(subtitleRef.current, {
        letterSpacing: "0.22em",
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 3.8,
      });

      const cycle = gsap.timeline({ repeat: -1, delay: 3.0 });
      slides.forEach((slide, i) => {
        const next = slides[(i + 1) % slides.length];
        const at = i * STEP + HOLD;
        cycle.to(slide, { opacity: 0, duration: FADE, ease: "sine.inOut" }, at);
        cycle.to(next, { opacity: 1, duration: FADE, ease: "sine.inOut" }, at);
      });

      gsap.to(slidesRef.current, {
        scale: 1.12,
        duration: STEP * slides.length,
        ease: "none",
        repeat: -1,
        yoyo: true,
        delay: 3.0,
      });

      // Layered depth: cursor-driven parallax, desktop-with-a-real-pointer
      // only. Three rates — background slowest, text a little more,
      // foreground flare the most — is what actually sells "depth" here.
      let removeMouseListener: (() => void) | undefined;
      if (hasFinePointer && sectionRef.current) {
        const xBg = gsap.quickTo(slidesRef.current, "x", { duration: 0.9, ease: "power3" });
        const yBg = gsap.quickTo(slidesRef.current, "y", { duration: 0.9, ease: "power3" });
        const xContent = gsap.quickTo(contentGroupRef.current, "x", { duration: 0.7, ease: "power3" });
        const yContent = gsap.quickTo(contentGroupRef.current, "y", { duration: 0.7, ease: "power3" });
        const xFlare = gsap.quickTo(flareRef.current, "x", { duration: 0.5, ease: "power3" });
        const yFlare = gsap.quickTo(flareRef.current, "y", { duration: 0.5, ease: "power3" });

        const onMove = (e: MouseEvent) => {
          const rect = sectionRef.current!.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          xBg(relX * 12);
          yBg(relY * 8);
          xContent(relX * 10);
          yContent(relY * 6);
          xFlare(relX * -46);
          yFlare(relY * -34);
        };
        sectionRef.current.addEventListener("mousemove", onMove);
        removeMouseListener = () => sectionRef.current?.removeEventListener("mousemove", onMove);
      }

      // Scroll-driven exit — quieter than before: text still recedes
      // (fade + scale down), and the photo continues its own zoom a
      // little further while darkening toward black, rather than
      // splitting apart. Scrubbed to the hero's own scroll range.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.4,
        onUpdate: (self) => {
          const p = self.progress;

          const textP = Math.min(1, p / 0.4);
          gsap.set(contentGroupRef.current, {
            opacity: 1 - textP,
            scale: 1 - textP * 0.08,
          });

          gsap.set(slidesRef.current, { scale: 1.06 + p * 0.14 });
          gsap.set(exitDarkenRef.current, { opacity: p });
        },
      });

      return () => removeMouseListener?.();
    },
    { scope: sectionRef, dependencies: [reducedMotion, hasFinePointer] },
  );

  return (
    <section ref={sectionRef} className="relative flex h-[92vh] min-h-[640px] items-center justify-center overflow-hidden bg-charcoal-900">
      <div ref={slidesRef} className="absolute inset-0">
        {HERO_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === 0 ? "A suite at Anugya A Boutique Hotel, Indore" : ""}
            fetchPriority={i === 0 ? "high" : undefined}
            loading={i === 0 ? undefined : "eager"}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ))}
      </div>

      {/* Flat + linear wash for text legibility, then a radial vignette on
          top to darken the edges/corners specifically. */}
      <div className="absolute inset-0 bg-charcoal-900/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-transparent to-transparent" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 38%, rgba(10,9,8,0.62) 100%)" }}
        aria-hidden="true"
      />
      {/* Scroll-exit darken — fades in as you scroll past, settling the
          hero into black rather than splitting it apart. */}
      <div ref={exitDarkenRef} className="absolute inset-0 bg-charcoal-900 opacity-0" aria-hidden="true" />

      {/* Foreground bokeh flare — the "closest to the viewer" parallax
          layer. Soft-light blend so it reads as light interacting with
          the scene, not a flat circle pasted on top. */}
      <div
        ref={flareRef}
        className="pointer-events-none absolute right-[12%] top-[18%] h-72 w-72 rounded-full opacity-0 blur-[70px]"
        style={{ background: "radial-gradient(circle, rgba(232,211,160,0.55), transparent 70%)", mixBlendMode: "soft-light" }}
        aria-hidden="true"
      />

      <div ref={contentGroupRef} className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <div ref={ruleRef} className="mx-auto h-px w-12 bg-gold-400" aria-hidden="true" />
        <p ref={eyebrowRef} className="mt-5 text-sm tracking-wide3 text-stone-200">
          Indore, Madhya Pradesh
        </p>
        <h1
          ref={titleRef}
          className="mt-4 font-display text-[clamp(4.5rem,11vw,10.5rem)] leading-[0.92]"
          style={{
            color: "#F7ECD6",
            textShadow: "0 2px 0 rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.4), 0 22px 60px rgba(0,0,0,0.6)",
          }}
        >
          Anugya
        </h1>
        <p ref={subtitleRef} className="mt-3 flex items-center justify-center gap-3 text-base tracking-wide3 text-gold-300/90">
          <span ref={subtitleLineLeftRef} className="h-px w-6 origin-right bg-gold-400/70" aria-hidden="true" />
          A Boutique Hotel
          <span ref={subtitleLineRightRef} className="h-px w-6 origin-left bg-gold-400/70" aria-hidden="true" />
        </p>
        <p ref={taglineRef} className="mx-auto mt-7 max-w-md font-display text-lg italic text-stone-200">
          Quiet, considered hospitality in the heart of Indore.
        </p>
        <div ref={ctaRef} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact" className={glowButton}>
            Book your stay
          </Link>
          <a href="#rooms" className={glassButton}>
            Explore rooms
          </a>
        </div>
      </div>

      <div ref={scrollCueRef} className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <div className="h-10 w-px origin-top animate-scroll-cue bg-stone-100/50" aria-hidden="true" />
      </div>
    </section>
  );
}
