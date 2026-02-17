"use client";

import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { PageBlock } from "@buildernet/utils";
import type { BlockComponentProps } from "@buildernet/blocks";
import { cn } from "@buildernet/ui";

interface CanvasBlockProps {
  block: PageBlock;
  theme?: Record<string, unknown>;
  selected?: boolean;
  onSelect: () => void;
  onUpdate: (config: Partial<PageBlock["config"]>) => void;
  onDelete: () => void;
  BlockRender: React.ComponentType<BlockComponentProps>;
}

export function CanvasBlock({
  block,
  theme,
  selected = false,
  onSelect,
  onUpdate,
  onDelete,
  BlockRender,
}: CanvasBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const config = block.config || {};
  const rawWidth = (config.width as string) || "100%";
  const widthMap: Record<string, string> = {
    full: "100%",
    half: "50%",
    third: "33.333%",
    quarter: "25%",
  };
  const width = widthMap[rawWidth] ?? rawWidth;
  const height = (config.height as string) || undefined;

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    width,
    minWidth: 0,
    flexShrink: 0,
    ...(height && height !== "auto" ? { minHeight: height } : {}),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative rounded-lg transition-shadow flex-shrink-0",
        selected && "ring-2 ring-slate-400 ring-offset-2",
        isDragging && "opacity-50 z-50"
      )}
      onClick={onSelect}
    >
      {/* Toolbar when selected */}
      {selected && (
        <div
          className="absolute -top-10 left-0 right-0 flex items-center justify-center gap-1 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="rounded bg-slate-800 text-white px-2 py-1 text-xs hover:bg-slate-700"
            {...listeners}
            {...attributes}
          >
            ⋮⋮ Move
          </button>
          <button
            type="button"
            className="rounded bg-red-600 text-white px-2 py-1 text-xs hover:bg-red-700"
            onClick={() => onDelete()}
          >
            Delete
          </button>
        </div>
      )}
      <div onClick={onSelect} className="h-full">
        <BlockRender block={block} theme={theme} isEditor />
      </div>
    </div>
  );
}
