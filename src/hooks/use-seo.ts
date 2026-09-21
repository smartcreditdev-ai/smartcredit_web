import { useEffect } from "react";

/**
 * SEO dinámico para páginas de la SPA distintas del Home.
 *
 * index.html define la metadata global del Home (title, description,
 * canonical, og:*). Este hook la sobreescribe mientras el componente que lo
 * usa está montado, y restaura exactamente los valores previos al desmontar
 * — así el SEO del Home queda intacto al volver a "/".
 *
 * No usa react-helmet ni ninguna dependencia nueva: sólo DOM APIs + useEffect.
 */

interface SeoOptions {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
}

const OG_TYPE = "website";
const OG_SITE_NAME = "SmartCredit";

interface MetaHandle {
  el: HTMLMetaElement;
  existed: boolean;
  previousContent: string | null;
}

interface LinkHandle {
  el: HTMLLinkElement;
  existed: boolean;
  previousHref: string | null;
}

const getOrCreateMeta = (attr: "name" | "property", key: string): MetaHandle => {
  const selector = `meta[${attr}="${key}"]`;
  const existingEl = document.querySelector<HTMLMetaElement>(selector);
  const existed = existingEl !== null;
  const previousContent = existingEl?.getAttribute("content") ?? null;

  let el = existingEl;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }

  return { el, existed, previousContent };
};

const getOrCreateCanonicalLink = (): LinkHandle => {
  const existingEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const existed = existingEl !== null;
  const previousHref = existingEl?.getAttribute("href") ?? null;

  let el = existingEl;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }

  return { el, existed, previousHref };
};

const restoreMeta = ({ el, existed, previousContent }: MetaHandle) => {
  if (!existed) {
    el.remove();
    return;
  }
  if (previousContent !== null) {
    el.setAttribute("content", previousContent);
  } else {
    el.removeAttribute("content");
  }
};

const restoreCanonical = ({ el, existed, previousHref }: LinkHandle) => {
  if (!existed) {
    el.remove();
    return;
  }
  if (previousHref !== null) {
    el.setAttribute("href", previousHref);
  } else {
    el.removeAttribute("href");
  }
};

export const useSeo = ({ title, description, canonical, ogTitle, ogDescription, ogUrl }: SeoOptions) => {
  useEffect(() => {
    const previousTitle = document.title;

    const descriptionMeta = getOrCreateMeta("name", "description");
    const ogTitleMeta = getOrCreateMeta("property", "og:title");
    const ogDescriptionMeta = getOrCreateMeta("property", "og:description");
    const ogUrlMeta = getOrCreateMeta("property", "og:url");
    const ogTypeMeta = getOrCreateMeta("property", "og:type");
    const ogSiteNameMeta = getOrCreateMeta("property", "og:site_name");
    const canonicalLink = getOrCreateCanonicalLink();

    document.title = title;
    descriptionMeta.el.setAttribute("content", description);
    ogTitleMeta.el.setAttribute("content", ogTitle);
    ogDescriptionMeta.el.setAttribute("content", ogDescription);
    ogUrlMeta.el.setAttribute("content", ogUrl);
    ogTypeMeta.el.setAttribute("content", OG_TYPE);
    ogSiteNameMeta.el.setAttribute("content", OG_SITE_NAME);
    canonicalLink.el.setAttribute("href", canonical);

    return () => {
      document.title = previousTitle;
      restoreMeta(descriptionMeta);
      restoreMeta(ogTitleMeta);
      restoreMeta(ogDescriptionMeta);
      restoreMeta(ogUrlMeta);
      restoreMeta(ogTypeMeta);
      restoreMeta(ogSiteNameMeta);
      restoreCanonical(canonicalLink);
    };
  }, [title, description, canonical, ogTitle, ogDescription, ogUrl]);
};
