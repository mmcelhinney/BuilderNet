"use client";

import * as React from "react";
import { blockComponents } from "@buildernet/blocks";
import type { PageBlock } from "@buildernet/utils";

const WIDTH_MAP: Record<string, string> = {
  full: "100%",
  half: "50%",
  third: "33.333%",
  quarter: "25%",
};

function getBlockWidth(block: PageBlock): string {
  const w = (block.config?.width as string) || "100%";
  return WIDTH_MAP[w] ?? w;
}

function getBlockHeight(block: PageBlock): string | undefined {
  const h = (block.config?.height as string) || undefined;
  return h && h !== "auto" ? h : undefined;
}

export function BlockRenderer({
  blocks,
  theme,
}: {
  blocks: PageBlock[];
  theme: Record<string, unknown>;
}) {
  if (blocks.length === 0) return null;

  const first = blocks[0];
  const isBackgroundFirst = first.type === "background";
  const contentBlocks = isBackgroundFirst ? blocks.slice(1) : blocks;
  const bgConfig = isBackgroundFirst
    ? (first.config as { backgroundImage?: string; overlayOpacity?: number; minHeight?: string })
    : null;

  const content = (
    <div className="flex flex-wrap gap-4 items-start w-full max-w-4xl mx-auto">
      {contentBlocks.map((block) => {
        const Component = blockComponents[block.type];
        if (!Component) return null;
        const width = getBlockWidth(block);
        const height = getBlockHeight(block);
        return (
          <div
            key={block.id}
            style={{
              width,
              minWidth: 0,
              flexShrink: 0,
              ...(height ? { minHeight: height } : {}),
            }}
          >
            <Component block={block} theme={theme} isEditor={false} />
          </div>
        );
      })}
    </div>
  );

  if (isBackgroundFirst && bgConfig?.backgroundImage) {
    const minHeight = bgConfig.minHeight ?? "100vh";
    const overlayOpacity = bgConfig.overlayOpacity ?? 0;
    return (
      <div className="relative min-h-full">
        <div className="relative" style={{ minHeight }}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgConfig.backgroundImage})` }}
          />
          {overlayOpacity > 0 && (
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: overlayOpacity }}
            />
          )}
          <div className="relative z-10 pt-8 pb-8 px-4">{content}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-white py-6 px-4">
      {content}
    </div>
  );
}
