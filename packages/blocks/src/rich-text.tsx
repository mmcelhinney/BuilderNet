"use client";

import * as React from "react";
import { BlockWrapper } from "./block-wrapper";
import type { PageBlock } from "@buildernet/utils";

export function RichTextBlock({
  block,
  theme,
  isEditor,
}: {
  block: PageBlock;
  theme?: Record<string, unknown>;
  isEditor?: boolean;
}) {
  const config = (block.config || {}) as { html?: string };
  return (
    <BlockWrapper blockId={block.id} animation={block.animation} isEditor={isEditor}>
      <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: config.html ?? "" }} />
    </BlockWrapper>
  );
}
