import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import gsap from "gsap";
import { faqs } from "@/data/faqs";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function FaqRow({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    if (!panel || !inner) return;
    gsap.to(panel, {
      height: open ? inner.scrollHeight : 0,
      duration: reducedMotion ? 0.15 : 0.55,
      ease: reducedMotion ? "none" : "back.out(1.2)",
    });
  }, [open, reducedMotion]);

  return (
    <div className="overflow-hidden rounded-lg border border-white/40 bg-white/40 shadow-glass backdrop-blur-md">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-lg text-charcoal-900">{question}</span>
        <Plus size={18} className={["shrink-0 text-gold-600 transition-transform duration-300", open ? "rotate-45" : ""].join(" ")} aria-hidden="true" />
      </button>
      <div ref={panelRef} id={`faq-panel-${index}`} role="region" className="h-0 overflow-hidden">
        <div ref={innerRef} className="px-6 pb-6 text-sm leading-relaxed text-charcoal-700">
          {answer}
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section className="relative px-6 py-24 lg:px-10">
      <AmbientGlow variant="reverse" />
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-sm tracking-wide2 text-charcoal-700/70">Good to know</p>
          <h2 className="mt-2 font-display text-display-sm text-charcoal-900">Questions, answered</h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 0.05}>
              <FaqRow question={faq.question} answer={faq.answer} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
