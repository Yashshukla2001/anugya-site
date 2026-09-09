import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, MapPin, Navigation, Star, Camera } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { contactFormWhatsAppLink, bookingBarWhatsAppLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { useSeo } from "@/hooks/useSeo";
import { glowButton } from "@/lib/buttonStyles";

/**
 * Redesigned per feedback that it looked plain/text-heavy: contact
 * details now sit in icon-badged rows on a glass panel, and the
 * directions/reviews/Instagram links became real animated buttons
 * (lift + glow on hover) instead of underlined text.
 */
export function Contact() {
  useSeo({
    title: "Contact",
    description: "Get in touch with Anugya Hotel & Boutique, Indore — phone, WhatsApp, email, and directions.",
    path: "/contact",
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [enquiryType, setEnquiryType] = useState("General enquiry");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const href = contactFormWhatsAppLink({ name, phone, email, enquiryType, message });
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="relative overflow-hidden px-6 pb-24 pt-36 lg:px-10">
      <AmbientGlow />
      <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm tracking-wide2 text-charcoal-700/70">Connect</p>
          <h1 className="mt-2 font-display text-display-lg text-charcoal-900">Contact</h1>

          <div className="mt-10 space-y-4 rounded-lg border border-white/40 bg-white/40 p-6 shadow-glass backdrop-blur-md">
            <ContactRow icon={Phone} label="Phone" href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} value={siteConfig.contact.phone} />
            <ContactRow icon={MessageCircle} label="WhatsApp" href={bookingBarWhatsAppLink()} value={siteConfig.contact.phone} external />
            {/* <ContactRow icon={Mail} label="Email" href={`mailto:${siteConfig.contact.email}`} value={siteConfig.contact.email} /> */}
            <ContactRow icon={MapPin} label="Address" value={siteConfig.contact.address} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={siteConfig.social.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={glassLinkButton}>
              <Navigation size={15} aria-hidden="true" />
              Get directions
            </a>
            <a href={siteConfig.social.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className={glassLinkButton}>
              <Star size={15} aria-hidden="true" />
              Google reviews
            </a>
            <a href={siteConfig.social.instagramUrl} target="_blank" rel="noopener noreferrer" className={glassLinkButton}>
              <Camera size={15} aria-hidden="true" />
              Instagram
            </a>
          </div>

          <Link to="/rooms" className={`mt-8 inline-block ${glowButton}`}>
            Book your stay
          </Link>
        </Reveal>

        <Reveal
          as="form"
          onSubmit={handleSubmit}
          delay={0.1}
          className="space-y-5 rounded-lg border border-white/40 bg-white/40 p-8 shadow-glass backdrop-blur-md"
        >
          <FormField label="Name">
            <input required value={name} onChange={(e) => setName(e.target.value)} className="input" />
          </FormField>
          <FormField label="Phone">
            <input required value={phone} onChange={(e) => setPhone(e.target.value)} className="input" />
          </FormField>
          <FormField label="Email">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
          </FormField>
          <FormField label="Enquiry type">
            <select value={enquiryType} onChange={(e) => setEnquiryType(e.target.value)} className="input">
              {["General enquiry", "Booking", "Group / event", "Feedback"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Message">
            <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="input resize-none" />
          </FormField>
          <button type="submit" className={`w-full ${glowButton}`}>
            Send enquiry
          </button>
          <p className="text-center text-xs text-charcoal-700/60">Opens WhatsApp with your details pre-filled.</p>
        </Reveal>
      </div>
    </div>
  );
}

const glassLinkButton =
  "flex items-center gap-2 rounded-full border border-white/40 bg-white/50 px-4 py-2.5 text-sm tracking-wide2 text-charcoal-900 shadow-glass backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-glow";

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex items-center gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
        <Icon size={17} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-charcoal-700/60">{label}</p>
        <p className="truncate text-charcoal-900">{value}</p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="block transition-opacity hover:opacity-70">
      {content}
    </a>
  );
}

function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-charcoal-700/60">{label}</span>
      {children}
    </label>
  );
}
