/**
 * Soft blurred gradient orbs that drift slowly in the background of a
 * section. Purely decorative — `pointer-events-none`, `aria-hidden`, and
 * gated by `prefers-reduced-motion` via the animation utility itself
 * being skipped globally (see index.css). Gives glass panels something
 * with color/depth to blur, instead of a flat surface.
 */
export function AmbientGlow({ variant = "default" }: { variant?: "default" | "reverse" }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className={[
          "absolute h-[36rem] w-[36rem] rounded-full bg-gold-400/20 blur-[100px]",
          variant === "reverse" ? "-right-40 top-0 animate-float-slow" : "-left-40 top-0 animate-float",
        ].join(" ")}
      />
      <div
        className={[
          "absolute h-[30rem] w-[30rem] rounded-full bg-taupe-400/20 blur-[100px]",
          variant === "reverse" ? "-left-32 bottom-0 animate-float" : "-right-32 bottom-0 animate-float-slow",
        ].join(" ")}
      />
    </div>
  );
}
