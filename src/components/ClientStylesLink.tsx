"use client";

import { useEffect } from "react";

type Props = {
  href: string;
  rel?: string;
  /** initial media to avoid blocking (default 'print') */
  initialMedia?: string;
  /** final media to apply once loaded (default 'all') */
  loadedMedia?: string;
  onLoad?: () => void;
};

export default function ClientStylesLink({
  href,
  rel = "stylesheet",
  initialMedia = "print",
  loadedMedia = "all",
  onLoad,
}: Props) {
  useEffect(() => {
    try {
      const l = document.createElement("link");
      l.rel = rel;
      l.href = href;
      // start with a non-blocking media and swap to the final media on load
      l.media = initialMedia;
      l.onload = () => {
        try {
          l.media = loadedMedia;
        } catch (e) {
          // ignore
        }
        if (onLoad) onLoad();
      };
      document.head.appendChild(l);

      return () => {
        try {
          if (l.parentNode) l.parentNode.removeChild(l);
        } catch (e) {
          // ignore
        }
      };
    } catch (e) {
      // If DOM is not available or append fails, fail silently
      // (server rendering won't run this effect anyway)
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }, [href, rel, initialMedia, loadedMedia, onLoad]);

  return null;
}
