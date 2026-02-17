"use client";

import * as React from "react";
import { BlockWrapper } from "./block-wrapper";
import type { PageBlock } from "@buildernet/utils";

type AccordionItem = { id: string; title: string; content: string };

export function AccordionBlock({
  block,
  theme,
  isEditor,
}: {
  block: PageBlock;
  theme?: Record<string, unknown>;
  isEditor?: boolean;
}) {
  const config = (block.config || {}) as { title?: string; items?: AccordionItem[] };
  const items = config.items ?? [];
  const [openId, setOpenId] = React.useState<string | null>(items[0]?.id ?? null);

  return (
    <BlockWrapper blockId={block.id} animation={block.animation} isEditor={isEditor}>
      <div className="max-w-2xl mx-auto">
        {config.title && <h2 className="text-2xl font-semibold mb-4">{config.title}</h2>}
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-slate-200 rounded-lg overflow-hidden bg-white"
            >
              <button
                type="button"
                className="w-full flex justify-between items-center px-4 py-3 text-left font-medium hover:bg-slate-50"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              >
                {item.title}
                <span className="text-slate-500">{openId === item.id ? "−" : "+"}</span>
              </button>
              {openId === item.id && (
                <div className="px-4 py-3 border-t border-slate-100 text-slate-600">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </BlockWrapper>
  );
}
