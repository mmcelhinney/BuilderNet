"use client";

import * as React from "react";
import { blockComponents } from "@buildernet/blocks";
import type { PageBlock } from "@buildernet/utils";

const PREVIEW_KEY_PREFIX = "buildernet_preview_";

interface PreviewFrameProps {
  siteId: string;
  theme: Record<string, unknown>;
}

export function PreviewFrame({ siteId, theme }: PreviewFrameProps) {
  const [blocks, setBlocks] = React.useState<PageBlock[] | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    try {
      const raw = sessionStorage.getItem(`${PREVIEW_KEY_PREFIX}${siteId}`);
      if (raw) {
        const { blocks: parsed } = JSON.parse(raw) as { blocks?: PageBlock[] };
        setBlocks(Array.isArray(parsed) ? parsed : null);
      } else {
        setBlocks(null);
      }
    } catch {
      setBlocks(null);
    }
  }, [siteId, mounted]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-500">
        Loading preview…
      </div>
    );
  }

  if (blocks === null || blocks.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-16 p-8 text-center rounded-xl bg-white border border-slate-200 shadow-sm">
        <p className="text-slate-600 mb-2">No preview data yet.</p>
        <p className="text-sm text-slate-500">
          In the editor, click <strong>Preview</strong> to see how your page will look.
        </p>
        <a
          href={`/dashboard/sites/${siteId}/edit`}
          className="inline-block mt-4 text-sm text-slate-700 underline hover:no-underline"
        >
          Back to editor
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-white">
      <div className="max-w-4xl mx-auto">
        {blocks.map((block) => {
          const Component = blockComponents[block.type];
          if (!Component) return null;
          return (
            <Component
              key={block.id}
              block={block}
              theme={theme}
              isEditor={false}
            />
          );
        })}
      </div>
    </div>
  );
}
