import { useEffect, useRef, useState } from "react";
import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { primaryNav } from "@/data/navigation";
import { MobileMenu } from "./MobileMenu";

// Pages whose very top is a full-bleed dark photo — everywhere else has a
// plain light background at the top, so a transparent white-text navbar
// there is invisible against it, not just "less premium." This is the fix
// for that: only these routes get the transparent-at-top treatment.
function hasDarkHeroTop(pathname: string) {
  return pathname === "/" || /^\/rooms\/[^/]+$/.test(pathname);
}

export function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const transparentEligible = hasDarkHeroTop(location.pathname);
  const solid = scrolled || !transparentEligible;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sliding active-tab underline — measures the current link's position
  // and animates the indicator to it, including across route changes, so
  // it reads as one indicator moving rather than appearing/disappearing.
  useEffect(() => {
    const activeLink = linkRefs.current[location.pathname];
    const underline = underlineRef.current;
    const nav = navRef.current;
    if (!activeLink || !underline || !nav) {
      gsap.to(underline, { opacity: 0, duration: 0.2 });
      return;
    }
    const navBox = nav.getBoundingClientRect();
    const linkBox = activeLink.getBoundingClientRect();
    gsap.to(underline, {
      opacity: 1,
      x: linkBox.left - navBox.left,
      width: linkBox.width,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [location.pathname, scrolled]);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-cinematic",
          solid
            ? "border-b border-white/40 bg-white/80 shadow-glass backdrop-blur-xl"
            : "border-b border-white/10 bg-white/5 backdrop-blur-xs",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex items-center gap-2.5">
            <img
              src="/assets/logo-mark.png"
              alt=""
              aria-hidden="true"
              className={[
                "h-10 w-auto transition-all duration-500",
                solid ? "" : "drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]",
              ].join(" ")}
            />
            <span className="flex flex-col leading-tight">
              <span
                className={[
                  "font-display text-xl tracking-wide2 transition-colors",
                  solid ? "text-charcoal-900" : "text-stone-50",
                ].join(" ")}
              >
                <span className="inline-block transition-transform duration-300 group-hover:scale-[1.03]">Anugya</span>
              </span>
              <span
                className={[
                  "text-[10px] tracking-wide3 transition-colors",
                  solid ? "text-gold-600" : "text-gold-300",
                ].join(" ")}
              >
                A Boutique Hotel 
              </span>
            </span>
          </Link>

          <nav ref={navRef} className="relative hidden items-center gap-8 lg:flex">
            {primaryNav.map((link) => (
              <RouterNavLink
                key={link.href}
                to={link.href}
                ref={(el) => {
                  linkRefs.current[link.href] = el;
                }}
                className={({ isActive }) =>
                  [
                    "text-sm tracking-wide2 transition-colors",
                    solid
                      ? isActive
                        ? "text-gold-600"
                        : "text-charcoal-700 hover:text-charcoal-900"
                      : isActive
                        ? "text-gold-400"
                        : "text-stone-100/90 hover:text-stone-50",
                  ].join(" ")
                }
              >
                {link.label}
              </RouterNavLink>
            ))}
            <div
              ref={underlineRef}
              className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-500 opacity-0"
              aria-hidden="true"
            />
            <Link
              to="/contact"
              className="rounded-sm bg-gold-500 px-5 py-2.5 text-sm tracking-wide2 text-charcoal-900 shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-glow-lg"
            >
              Book your stay
            </Link>
          </nav>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className={["lg:hidden", solid ? "text-charcoal-900" : "text-stone-50"].join(" ")}
          >
            <Menu size={26} aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="fixed right-6 top-5 z-[60] text-stone-50 lg:hidden"
        >
          <X size={28} aria-hidden="true" />
        </button>
      )}
    </>
  );
}
