"use client";

import * as React from "react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@buildernet/ui";

const BLOCK_TYPES = [
  { type: "hero", label: "Hero", icon: "🖼️" },
  { type: "text", label: "Text", icon: "📝" },
  { type: "textImage", label: "Text + Image", icon: "📄" },
  { type: "richText", label: "Rich Text", icon: "📃" },
  { type: "carousel", label: "Carousel", icon: "🎞️" },
  { type: "accordion", label: "Accordion (FAQ)", icon: "📋" },
  { type: "pricing", label: "Pricing", icon: "💰" },
  { type: "form", label: "Form", icon: "📧" },
  { type: "social", label: "Social links", icon: "🔗" },
] as const;

function DraggableBlockType({
  type,
  label,
  icon,
}: {
  type: string;
  label: string;
  icon: string;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { type, fromPalette: true },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white cursor-grab active:cursor-grabbing hover:bg-slate-50 transition-colors",
        isDragging && "opacity-50"
      )}
    >
      <span>{icon}</span>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
  );
}

export function BlockPalette() {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
        Blocks
      </p>
      {BLOCK_TYPES.map((b) => (
        <DraggableBlockType key={b.type} type={b.type} label={b.label} icon={b.icon} />
      ))}
    </div>
  );
}
