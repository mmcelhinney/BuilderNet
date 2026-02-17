"use client";

import * as React from "react";
import type { PageBlock } from "@buildernet/utils";

/** Background block: full-bleed background image. Does not render as a box; used as first block so following blocks sit on top. */
export function BackgroundBlock({
  block,
  theme,
  isEditor,
}: {
  block: PageBlock;
  theme?: Record<string, unknown>;
  isEditor?: boolean;
}) {
  const config = (block.config || {}) as {
    backgroundImage?: string;
    overlayOpacity?: number;
    minHeight?: string;
  };
  const backgroundImage = config.backgroundImage ?? "";
  const overlayOpacity = config.overlayOpacity ?? 0;
  const minHeight = config.minHeight ?? "100vh";

  if (isEditor) {
    return (
      <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-100 p-6 text-center">
        <p className="text-slate-600 font-medium">Background layer</p>
        <p className="text-sm text-slate-500 mt-1">
          {backgroundImage ? "Image set – blocks below sit on top" : "Add background image in settings"}
        </p>
      </div>
    );
  }

  return null;
}
