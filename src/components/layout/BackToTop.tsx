import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
      aria-label="Back to top"
      className={[
        "fixed bottom-6 left-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-charcoal-900 text-stone-50 shadow-lg transition-all duration-300 ease-cinematic hover:scale-105 lg:bottom-8 lg:left-8",
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0 translate-y-2",
      ].join(" ")}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
