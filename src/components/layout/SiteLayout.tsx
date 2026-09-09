import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingContactButtons } from "./FloatingContactButtons";
import { BackToTop } from "./BackToTop";
import { SocialProofPopup } from "./SocialProofPopup";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { StructuredData } from "./StructuredData";

export function SiteLayout() {
  const { pathname, hash } = useLocation();

  // Scroll to top on route change, or to the hash target if one was given
  // (e.g. the footer's "/#hotels" link from another page). Lenis needs
  // this nudged manually either way.
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // Give the page a tick to mount before measuring its position.
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
      });
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <SmoothScrollProvider>
      <StructuredData />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-sm bg-gold-500 px-4 py-2 text-sm text-charcoal-900 transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="min-h-screen bg-stone-100">
        <Navbar />
        <main id="main-content">
          <Outlet />
        </main>
        <Footer />
        <FloatingContactButtons />
        <BackToTop />
        <SocialProofPopup />
      </div>
    </SmoothScrollProvider>
  );
}
