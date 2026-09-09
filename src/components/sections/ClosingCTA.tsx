import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { bookingBarWhatsAppLink } from "@/lib/whatsapp";
import { glowButton, glassButton } from "@/lib/buttonStyles";

export function ClosingCTA() {
  return (
    <Reveal className="mx-auto mt-24 max-w-7xl px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-walnut-700 px-8 py-14 text-center shadow-glass">
        <AmbientGlow />
        <p className="relative font-display text-display-sm text-stone-50">Ready to stay at Anugya?</p>
        <div className="relative mt-7 flex flex-wrap items-center justify-center gap-4">
          <Link to="/rooms" className={glowButton}>
            Explore rooms
          </Link>
          <a href={bookingBarWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={glassButton}>
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </Reveal>
  );
}
