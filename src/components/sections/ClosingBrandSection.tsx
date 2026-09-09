import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { glowButton, glassButton } from "@/lib/buttonStyles";
import { bookingBarWhatsAppLink } from "@/lib/whatsapp";

gsap.registerPlugin(ScrollTrigger);

/**
 * A closing bookend to the hero — same cross-dissolve technique (still no
 * real video, three real photos instead), but deliberately blurred this
 * time rather than sharp, so it reads as a distinct "closing" moment, not
 * a repeat of the opening one. The blur also means the centered wordmark
 * is the only sharp thing on screen, which is what actually makes it pop.
 *
 * Second pass, per feedback that it read as too static: "Anugya" is now
 * full hero size (was one step smaller), a gold rule and eyebrow entrance
 * play as the section scrolls into view (was mount-only, invisible on
 * first load since this sits below the fold), and the continuous breathe
 * has more range plus a slow-pulsing glow behind the wordmark so it
 * genuinely reads as alive, not just present.
 */
const IMAGES = [
  "/assets/rooms/family-suite/03.jpg",
  "/assets/rooms/presidential-suite/01.jpg",
  "/assets/rooms/executive/02.jpg",
];

export function ClosingBrandSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const slides = gsap.utils.toArray<HTMLElement>(slidesRef.current?.children ?? []);
      if (slides.length === 0) return;

      if (reducedMotion) {
        gsap.set(slides, { opacity: (i) => (i === 0 ? 1 : 0) });
        gsap.set([ruleRef.current, eyebrowRef.current, titleRef.current, subtitleRef.current, taglineRef.current, ctaRef.current], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(slides, { opacity: (i) => (i === 0 ? 1 : 0), scale: 1.1 });

      const HOLD = 5;
      const FADE = 2;
      const STEP = HOLD + FADE;
      const cycle = gsap.timeline({ repeat: -1 });
      slides.forEach((slide, i) => {
        const next = slides[(i + 1) % slides.length];
        const at = i * STEP + HOLD;
        cycle.to(slide, { opacity: 0, duration: FADE, ease: "sine.inOut" }, at);
        cycle.to(next, { opacity: 1, duration: FADE, ease: "sine.inOut" }, at);
      });

      gsap.to(slidesRef.current, {
        scale: 1.18,
        duration: STEP * slides.length,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });

      // Entrance plays once, as the section scrolls into view — it sits
      // below the fold, so a mount-time entrance would never be seen.
      gsap.set([ruleRef.current, eyebrowRef.current, titleRef.current, subtitleRef.current, taglineRef.current, ctaRef.current], { opacity: 0 });
      gsap.set(ruleRef.current, { scaleX: 0 });
      gsap.set(titleRef.current, { scale: 0.85, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.to(ruleRef.current, { opacity: 1, scaleX: 1, duration: 0.7, ease: "power2.inOut" })
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.15)
        .to(titleRef.current, { opacity: 1, scale: 1, y: 0, duration: 1.3, ease: "back.out(1.4)" }, 0.3)
        .to(subtitleRef.current, { opacity: 1, duration: 0.7 }, 1.1)
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.3)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.5);

      // Continuous life once settled: a fuller breathe on the wordmark and
      // a slow-pulsing gold glow behind it.
      gsap.to(titleRef.current, { scale: 1.05, duration: 5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2 });
      gsap.to(glowRef.current, { opacity: 0.55, scale: 1.25, duration: 4.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2 });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={sectionRef} className="relative flex h-[85vh] min-h-[560px] items-center justify-center overflow-hidden bg-charcoal-900">
      <div ref={slidesRef} className="absolute inset-0">
        {IMAGES.map((src) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-md"
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-charcoal-900/55" />

      <div ref={glowRef} className="absolute h-[28rem] w-[28rem] rounded-full bg-gold-400/25 opacity-0 blur-[110px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <div ref={ruleRef} className="mx-auto h-px w-14 bg-gold-400" aria-hidden="true" />
        <p ref={eyebrowRef} className="mt-5 text-sm tracking-wide3 text-stone-300">
          Your stay in Indore starts here
        </p>
        <h2
          ref={titleRef}
          className="mt-4 font-display text-display-xl"
          style={{ color: "#F7ECD6", textShadow: "0 2px 0 rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.4), 0 22px 60px rgba(0,0,0,0.6)" }}
        >
          Anugya
        </h2>
        <p ref={subtitleRef} className="mt-1 text-sm tracking-wide3 text-gold-300/90">
          Hotel & Boutique
        </p>
        <p ref={taglineRef} className="mx-auto mt-6 max-w-md text-stone-300">
          Quiet, considered hospitality — book your stay in a few taps.
        </p>
        <div ref={ctaRef} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href={bookingBarWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={glowButton}>
            Book Now
          </a>
          <Link to="/rooms" className={glassButton}>
            Explore Rooms
          </Link>
        </div>
      </div>
    </section>
  );
}
