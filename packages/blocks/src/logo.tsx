"use client";

import * as React from "react";
import { BlockWrapper } from "./block-wrapper";
import type { PageBlock } from "@buildernet/utils";

const SIZE_CLASSES = {
  small: "max-h-8 w-auto",
  medium: "max-h-12 w-auto",
  large: "max-h-16 w-auto",
} as const;

export function LogoBlock({
  block,
  theme,
  isEditor,
}: {
  block: PageBlock;
  theme?: Record<string, unknown>;
  isEditor?: boolean;
}) {
  const config = (block.config || {}) as {
    imageUrl?: string;
    alt?: string;
    linkUrl?: string;
    size?: "small" | "medium" | "large" | "custom";
    widthPx?: string | number;
    heightPx?: string | number;
    alignment?: "left" | "center" | "right";
  };
  const imageUrl = config.imageUrl ?? "";
  const alt = config.alt ?? "Logo";
  const linkUrl = config.linkUrl ?? "";
  const size = config.size ?? "medium";
  const alignment = config.alignment ?? "left";
  const isCustomSize = size === "custom";
  const widthPx = config.widthPx != null ? String(config.widthPx) : "120";
  const heightPx = config.heightPx != null ? String(config.heightPx) : "40";

  const imgStyle: React.CSSProperties = isCustomSize
    ? { width: widthPx.includes("px") ? widthPx : `${widthPx}px`, height: heightPx.includes("px") ? heightPx : `${heightPx}px`, objectFit: "contain" }
    : { maxHeight: size === "small" ? "2rem" : size === "medium" ? "3rem" : "4rem" };

  if (isEditor) {
    return (
      <BlockWrapper blockId={block.id} animation={block.animation} isEditor>
        <div
          className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-6 px-4 flex items-center justify-center"
          style={{ justifyContent: alignment === "left" ? "flex-start" : alignment === "right" ? "flex-end" : "center" }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={alt}
              className={!isCustomSize ? SIZE_CLASSES[size as keyof typeof SIZE_CLASSES] : "w-auto h-auto"}
              style={imgStyle}
            />
          ) : (
            <span className="text-slate-500 text-sm">Add logo image in settings</span>
          )}
        </div>
      </BlockWrapper>
    );
  }

  if (!imageUrl) return null;

  const img = (
    <img
      src={imageUrl}
      alt={alt}
      className={!isCustomSize ? SIZE_CLASSES[size as keyof typeof SIZE_CLASSES] : "w-auto h-auto"}
      style={imgStyle}
      loading="eager"
    />
  );

  return (
    <BlockWrapper blockId={block.id} animation={block.animation} isEditor={false}>
      <div
        className="flex w-full py-2"
        style={{ justifyContent: alignment === "left" ? "flex-start" : alignment === "right" ? "flex-end" : "center" }}
      >
        {linkUrl ? (
          <a href={linkUrl} className="inline-block" aria-label={alt}>
            {img}
          </a>
        ) : (
          img
        )}
      </div>
    </BlockWrapper>
  );
}
