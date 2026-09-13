import { useEffect, useRef, useState } from "react";
import { galleryImages } from "@/data/gallery";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { X } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";

const categories = [
  { id: "all", label: "All" },
  { id: "rooms", label: "Rooms" },
  { id: "suites", label: "Suites" },
  { id: "interiors", label: "Interiors" },
] as const;

export function Gallery() {
  useSeo({
    title: "Gallery",
    description: "Real photography from Anugya A Boutique Hotel, Indore — rooms, suites, and interiors.",
    path: "/gallery",
  });

  const [active, setActive] = useState<(typeof categories)[number]["id"]>("all");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const visible = active === "all" ? galleryImages : galleryImages.filter((g) => g.category === active);

  function openLightbox(src: string) {
    lastFocusedRef.current = document.activeElement as HTMLElement;
    setLightbox(src);
    requestAnimationFrame(() => setLightboxVisible(true));
  }

  function closeLightbox() {
    setLightboxVisible(false);
    window.setTimeout(() => setLightbox(null), 250);
    lastFocusedRef.current?.focus();
  }

  useEffect(() => {
    if (!lightbox) return;
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeLightbox();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <div className="pb-24 pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="text-sm tracking-wide2 text-charcoal-700/70">Discover</p>
          <h1 className="mt-2 font-display text-display-lg text-charcoal-900">Gallery</h1>
        </Reveal>

        <div className="mt-8 flex gap-6">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={[
                "text-sm tracking-wide2 transition-colors",
                active === c.id ? "text-charcoal-900 underline underline-offset-8" : "text-charcoal-700/60",
              ].join(" ")}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div key={active} className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {visible.map((img, i) => (
            <Reveal key={img.src} delay={(i % 6) * 0.05} y={16}>
              <button
                onClick={() => openLightbox(img.src)}
                className="group block w-full overflow-hidden rounded-md"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-105"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <ClosingCTA />

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className={[
            "fixed inset-0 z-50 flex items-center justify-center bg-charcoal-900/95 p-6 transition-opacity duration-250",
            lightboxVisible ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={closeLightbox}
        >
          <button ref={closeButtonRef} aria-label="Close" className="absolute right-6 top-6 text-stone-50" onClick={closeLightbox}>
            <X size={28} aria-hidden="true" />
          </button>
          <img
            src={lightbox}
            alt=""
            className={[
              "max-h-full max-w-full rounded-md object-contain transition-transform duration-250",
              lightboxVisible ? "scale-100" : "scale-95",
            ].join(" ")}
          />
        </div>
      )}
    </div>
  );
}
