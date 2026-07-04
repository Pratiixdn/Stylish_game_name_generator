"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/utils";

/**
 * Google AdSense ad unit. Replace ADSENSE_CLIENT_ID and the per-position
 * slot IDs below with your real values from the AdSense dashboard before
 * going live. Until then this renders an empty reserved-space placeholder
 * so layout/CLS is correct either way.
 *
 * Position -> recommended ad format:
 *   top       - horizontal banner, below navbar
 *   hero      - horizontal banner, below hero section
 *   content   - in-content rectangle, between major sections
 *   sidebar   - vertical unit, desktop sidebar only
 *   article   - in-article fluid unit, inside blog posts
 *   bottom    - horizontal banner, above footer
 */

const ADSENSE_CLIENT_ID = "ca-pub-XXXXXXXXXXXXXXXX"; // TODO: replace with your AdSense publisher ID

const SLOT_IDS: Record<AdSlotProps["position"], string> = {
  top: "0000000001",
  hero: "0000000002",
  content: "0000000003",
  sidebar: "0000000004",
  article: "0000000005",
  bottom: "0000000006",
};

const MIN_HEIGHT: Record<AdSlotProps["position"], string> = {
  top: "90px",
  hero: "100px",
  content: "120px",
  sidebar: "600px",
  article: "120px",
  bottom: "90px",
};

interface AdSlotProps {
  position: "top" | "hero" | "content" | "sidebar" | "article" | "bottom";
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({ position, className }: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense script not loaded (e.g. dev environment, ad blocker) - no-op
    }
  }, []);

  return (
    <div
      className={cn("w-full flex items-center justify-center overflow-hidden", className)}
      style={{ minHeight: MIN_HEIGHT[position] }}
      data-ad-position={position}
    >
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={SLOT_IDS[position]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
