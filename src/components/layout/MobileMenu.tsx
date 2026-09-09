import { useEffect } from "react";
import { Link } from "react-router-dom";
import { primaryNav } from "@/data/navigation";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className={[
        "fixed inset-0 z-50 flex flex-col justify-center bg-charcoal-900 px-8 transition-[clip-path,opacity] duration-500 ease-cinematic lg:hidden",
        open
          ? "pointer-events-auto opacity-100 [clip-path:circle(150%_at_100%_0%)]"
          : "pointer-events-none opacity-0 [clip-path:circle(0%_at_100%_0%)]",
      ].join(" ")}
      inert={!open}
    >
      <nav className="flex flex-col gap-6">
        {primaryNav.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            onClick={onClose}
            className="font-display text-display-sm text-stone-50"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Link
        to="/contact"
        onClick={onClose}
        className="mt-10 inline-block w-fit rounded-sm bg-gold-500 px-6 py-3 text-sm tracking-wide2 text-charcoal-900"
      >
        Book your stay
      </Link>
    </div>
  );
}
