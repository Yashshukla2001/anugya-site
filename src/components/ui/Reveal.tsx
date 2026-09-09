import { useRef, type PropsWithChildren, type ElementType } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealProps {
  as?: ElementType;
  className?: string;
  /** Stagger delay for this reveal relative to siblings, in seconds. */
  delay?: number;
  /** Distance the element travels in, in pixels. Keep small — restraint over spectacle. */
  y?: number;
  /** Passed straight through to the rendered tag (onSubmit for as="form", etc). */
  [key: string]: unknown;
}

/**
 * Premium entrance used across the site: opacity + a short vertical drift
 * + a subtle scale-in, eased with the site's cinematic curve. The scale is
 * intentionally small (0.96→1) — enough to read as alive, not a bounce.
 * Reduces to a plain opacity fade under prefers-reduced-motion.
 */
export function Reveal({ as, className, delay = 0, y = 24, children, ...rest }: PropsWithChildren<RevealProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const Tag = (as ?? "div") as ElementType;

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.fromTo(
        ref.current,
        { opacity: 0, y: reducedMotion ? 0 : y, scale: reducedMotion ? 1 : 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: reducedMotion ? 0.3 : 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
