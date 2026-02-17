"use client";

import * as React from "react";
import { BlockWrapper } from "./block-wrapper";
import type { PageBlock } from "@buildernet/utils";

export function TextImageBlock({
  block,
  theme,
  isEditor,
}: {
  block: PageBlock;
  theme?: Record<string, unknown>;
  isEditor?: boolean;
}) {
  const config = (block.config || {}) as {
    content?: string;
    imageUrl?: string;
    imageAlt?: string;
    layout?: "left" | "right";
  };
  const layout = config.layout ?? "left";

  return (
    <BlockWrapper blockId={block.id} animation={block.animation} isEditor={isEditor}>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {layout === "right" && (
          <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: config.content ?? "" }} />
        )}
        {config.imageUrl && (
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100">
            <img
              src={config.imageUrl}
              alt={config.imageAlt ?? ""}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
        )}
        {layout === "left" && (
          <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: config.content ?? "" }} />
        )}
      </div>
    </BlockWrapper>
  );
}
