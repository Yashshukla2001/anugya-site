import { useState, type FormEvent } from "react";
import { siteConfig } from "@/config/siteConfig";
import { Reveal } from "@/components/ui/Reveal";
import { useSeo } from "@/hooks/useSeo";
import { glowButton } from "@/lib/buttonStyles";
import { contactFormWhatsAppLink } from "@/lib/whatsapp";

/**
 * Brief §26: general Indore context, verified facts only. The one
 * time-sensitive claim below (cleanest city ranking) was checked against
 * current search results before being written. Everything else is
 * long-stable general city knowledge, not a claim about this hotel's
 * proximity to anything.
 *
 * MAP EMBED: uses the standard unauthenticated `output=embed` query
 * trick. Worth knowing — I can't personally verify this renders end to
 * end from here: my sandbox's network egress blocks google.com domains
 * outright (confirmed the earlier "403" was that block, not Google
 * rejecting the request), so I can't screenshot the live result myself.
 * This is a very widely used technique and should render an interactive
 * map for real visitors on a normal connection — please check this
 * specifically when you test.
 */
export function Location() {
  useSeo({
    title: "Location",
    description: "Find Anugya A Boutique Hotel in Indore, Madhya Pradesh — directions, map, and city context.",
    path: "/location",
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    window.open(contactFormWhatsAppLink({ name, phone, message }), "_blank", "noopener,noreferrer");
  }

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.contact.address)}&output=embed`;

  return (
    <div className="px-6 pb-24 pt-36 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm tracking-wide2 text-charcoal-700/70">Discover</p>
          <h1 className="mt-2 font-display text-display-lg text-charcoal-900">Location</h1>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <Reveal className="overflow-hidden rounded-lg border border-white/40 shadow-glass">
            <iframe
              title="Anugya A Boutique Hotel location"
              src={mapSrc}
              className="h-80 w-full border-0 lg:h-full lg:min-h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-between gap-8 rounded-lg border border-white/40 bg-white/40 p-8 shadow-glass backdrop-blur-md">
            <div>
              <p className="text-charcoal-800">{siteConfig.contact.address}</p>
              <a href={siteConfig.social.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={`mt-5 inline-block ${glowButton}`}>
                Get directions
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 border-t border-charcoal-900/10 pt-6">
              <p className="text-sm tracking-wide2 text-charcoal-700/70">Ask us anything</p>
              <label className="block">
                <span className="mb-1.5 block text-xs text-charcoal-700/60">Your name</span>
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Yash Sharma" className="input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs text-charcoal-700/60">Phone number</span>
                <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 98765 43210" className="input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs text-charcoal-700/60">Message</span>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What would you like to know?"
                  className="input resize-none"
                />
              </label>
              <button type="submit" className={`w-full ${glowButton}`}>
                Send via WhatsApp
              </button>
            </form>
          </Reveal>
        </div>

        {/* ABOUT INDORE */}
        <div className="mt-24 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <p className="text-sm tracking-wide2 text-charcoal-700/70">The city</p>
            <h2 className="mt-2 font-display text-display-sm text-charcoal-900">Staying in Indore</h2>
            <p className="mt-5 max-w-prose text-charcoal-700">
              Indore is Madhya Pradesh's largest city and its commercial hub, and has been ranked India's
              cleanest city eight years running in the government's Swachh Survekshan survey. It's also
              known for its food culture — Sarafa Bazaar's night food market and the Chappan Dukan food
              street are two of the city's better-known draws.
            </p>
          </Reveal>
          <Reveal y={32} delay={0.1} className="aspect-[4/3] overflow-hidden rounded-md">
            <img
              src="/assets/rooms/executive-suite/02.jpg"
              alt="A room at Anugya A Boutique Hotel"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
