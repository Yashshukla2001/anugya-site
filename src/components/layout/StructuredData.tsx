import { useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";

/**
 * schema.org LodgingBusiness structured data (brief §38). Values pull from
 * siteConfig, so this activates correctly the moment the PLACEHOLDER
 * fields there are replaced with real data — nothing here needs to change
 * separately.
 */
export function StructuredData() {
  useEffect(() => {
    const data = {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      name: siteConfig.hotelName,
      description: siteConfig.seo.defaultDescription,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location,
        addressCountry: "IN",
        streetAddress: siteConfig.contact.address,
      },
      telephone: siteConfig.contact.phone,
      // email: siteConfig.contact.email,
      sameAs: [siteConfig.social.instagramUrl].filter(Boolean),
    };

    let el = document.head.querySelector<HTMLScriptElement>('script[data-seo="lodging-business"]');
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.dataset.seo = "lodging-business";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  }, []);

  return null;
}
