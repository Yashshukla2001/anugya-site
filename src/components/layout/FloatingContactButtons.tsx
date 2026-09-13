import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { bookingBarWhatsAppLink } from "@/lib/whatsapp";

/**
 * Two stacked circular actions, bottom-right, on every page. WhatsApp
 * stays in the original (lower, most thumb-reachable) position since the
 * brief names it the primary conversion channel; Call sits directly
 * above it.
 *
 * A "Book Now" button briefly sat between these two — that was a
 * misreading of the request for "a call-to-action button just above
 * WhatsApp," which meant the Call button itself belongs there, not a
 * third new button. Removed.
 */
export function FloatingContactButtons() {
  const telHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3 lg:bottom-8 lg:right-8">
      <a
        href={telHref}
        aria-label="Call Anugya A Boutique Hotel"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-charcoal-900 text-stone-50 shadow-lg transition-transform duration-300 ease-cinematic hover:scale-105"
      >
        <Phone size={22} aria-hidden="true" />
      </a>
      <a
        href={bookingBarWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enquire on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-charcoal-900 text-stone-50 shadow-lg transition-transform duration-300 ease-cinematic hover:scale-105"
      >
        <MessageCircle size={24} aria-hidden="true" />
      </a>
    </div>
  );
}
