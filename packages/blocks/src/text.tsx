"use client";

import * as React from "react";
import { BlockWrapper } from "./block-wrapper";
import type { PageBlock } from "@buildernet/utils";

export function TextBlock({
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
    alignment?: "left" | "center" | "right";
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    color?: string;
    fontSize?: "small" | "medium" | "large";
    fontFamily?: string;
  };
  const content = config.content ?? "";
  const alignment = config.alignment ?? "left";
  const bold = config.bold ?? false;
  const italic = config.italic ?? false;
  const underline = config.underline ?? false;
  const color = config.color ?? undefined;
  const fontSize = config.fontSize ?? "medium";
  const fontFamily = config.fontFamily ?? undefined;

  const sizeMap = { small: "0.875rem", medium: "1rem", large: "1.25rem" };

  const style: React.CSSProperties = {
    textAlign: alignment,
    fontWeight: bold ? "bold" : undefined,
    fontStyle: italic ? "italic" : undefined,
    textDecoration: underline ? "underline" : undefined,
    color: color || undefined,
    fontSize: sizeMap[fontSize],
    fontFamily: fontFamily || undefined,
  };

  return (
    <BlockWrapper blockId={block.id} animation={block.animation} isEditor={isEditor}>
      <div
        className="prose prose-slate max-w-none"
        style={style}
        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br />") }}
      />
    </BlockWrapper>
  );
}
