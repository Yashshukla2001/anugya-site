import { Link } from "react-router-dom";
import { footerNav } from "@/data/navigation";
import { siteConfig } from "@/config/siteConfig";
import { sisterHotels } from "@/data/sisterHotels";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-walnut-700 px-6 py-16 text-stone-100 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <img src="/assets/logo-mark.png" alt="Anugya" className="h-12 w-auto rounded bg-stone-50/95 p-1.5" />
          <p className="mt-4 font-display text-2xl">Anugya Hotel & Boutique</p>
          <p className="mt-1 text-sm tracking-wide2 text-stone-300">{siteConfig.location}</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-stone-300">{siteConfig.tagline}</p>
          <p className="mt-6 max-w-xs text-xs leading-relaxed text-stone-400">
            Also nearby: {sisterHotels.map((h) => h.name).join(" · ")}.{" "}
            <Link to="/#hotels" className="underline underline-offset-2 hover:text-gold-400">
              Ask us
            </Link>
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm text-stone-400">Explore</p>
          <ul className="space-y-3">
            {footerNav.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="text-sm text-stone-200 hover:text-gold-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm text-stone-400">Contact</p>
          <ul className="space-y-3 text-sm text-stone-200">
            <li>{siteConfig.contact.phone}</li>
            {/* <li>{siteConfig.contact.email}</li> */}
            <li className="max-w-[220px]">{siteConfig.contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-stone-100/10 pt-6 text-xs text-stone-400 lg:flex-row lg:items-center">
        <p>© {year} Anugya Hotel & Boutique. All rights reserved.</p>
        <p>Built by Exsora - under India's Business Digitization Mission</p>
      </div>
    </footer>
  );
}
