"use client";

import * as React from "react";
import { BlockWrapper } from "./block-wrapper";
import type { PageBlock } from "@buildernet/utils";
import type { HeroBlockConfig } from "@buildernet/utils";

export type { HeroBlockConfig };

export function HeroBlock({
  block,
  theme,
  isEditor,
}: {
  block: PageBlock;
  theme?: Record<string, unknown>;
  isEditor?: boolean;
}) {
  const config = (block.config || {}) as HeroBlockConfig;
  const backgroundType = config.backgroundType ?? "image";
  const overlay = config.overlay ?? true;
  const overlayOpacity = config.overlayOpacity ?? 0.4;

  return (
    <BlockWrapper blockId={block.id} animation={block.animation} isEditor={isEditor}>
      <section className="relative min-h-[60vh] flex items-center justify-center text-center overflow-hidden rounded-xl">
        {/* Background */}
        {backgroundType === "video" && config.backgroundVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src={config.backgroundVideo}
          />
        ) : (
          config.backgroundImage && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${config.backgroundImage})` }}
            />
          )
        )}
        {overlay && (
          <div
            className="absolute inset-0 bg-black transition-opacity"
            style={{ opacity: overlayOpacity }}
          />
        )}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
          {config.title && (
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {config.title}
            </h1>
          )}
          {config.subtitle && (
            <p className="text-xl text-white/90 mb-8 drop-shadow">
              {config.subtitle}
            </p>
          )}
          <div className="flex flex-wrap gap-4 justify-center">
            {config.ctaPrimary && (
              <a
                href={config.ctaPrimaryUrl || "#"}
                className="inline-flex items-center justify-center h-11 px-8 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-100 transition-colors"
              >
                {config.ctaPrimary}
              </a>
            )}
            {config.ctaSecondary && (
              <a
                href={config.ctaSecondaryUrl || "#"}
                className="inline-flex items-center justify-center h-11 px-8 rounded-lg border border-white text-white font-medium hover:bg-white/10 transition-colors"
              >
                {config.ctaSecondary}
              </a>
            )}
          </div>
        </div>
      </section>
    </BlockWrapper>
  );
}
