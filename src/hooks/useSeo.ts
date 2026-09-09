import { useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";

interface SeoOptions {
  title: string;
  description?: string;
  path?: string; // e.g. "/rooms/deluxe" — defaults to current path
  image?: string;
}

const SITE_URL_PLACEHOLDER = "https://www.anugyahotel.example"; // PLACEHOLDER — replace once the real domain is live

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets per-page title/description/canonical/OG tags on mount (brief §38).
 * Caveat worth flagging to the client: this is a client-rendered SPA, so
 * these tags are only visible to crawlers that execute JavaScript
 * (Googlebot does; not every crawler does). True SSR/prerendering would
 * guarantee correct tags on first byte for every crawler, but that's a
 * bigger architectural change than Phase 8 polish — worth considering
 * before launch if SEO is a priority, and noted in the README.
 */
export function useSeo({ title, description, path, image }: SeoOptions) {
  useEffect(() => {
    const fullTitle = `${title} | ${siteConfig.hotelName}`;
    document.title = fullTitle;

    const desc = description ?? siteConfig.seo.defaultDescription;
    setMeta("name", "description", desc);

    const url = `${SITE_URL_PLACEHOLDER}${path ?? window.location.pathname}`;
    setCanonical(url);

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", siteConfig.hotelName);
    if (image) setMeta("property", "og:image", `${SITE_URL_PLACEHOLDER}${image}`);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);
  }, [title, description, path, image]);
}
