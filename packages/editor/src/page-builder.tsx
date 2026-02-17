"use client";

import * as React from "react";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  useDroppable,
  PointerSensor,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { blockComponents, type BlockComponentProps } from "@buildernet/blocks";
import type { PageBlock } from "@buildernet/utils";
import { createBlockId } from "@buildernet/utils";
import { BlockPalette } from "./block-palette";
import { BlockSettings } from "./block-settings";
import { useEditorHistory } from "./history";
import { CanvasBlock } from "./canvas-block";
import { cn } from "@buildernet/ui";

export type EditorBlock = PageBlock;

const CANVAS_DROP_ID = "canvas-drop-zone";

function CanvasDropZone({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: CANVAS_DROP_ID });
  return (
    <div
      ref={setNodeRef}
      className={className}
      style={isOver ? { backgroundColor: "rgb(241 245 249)" } : undefined}
    >
      {children}
    </div>
  );
}

const defaultCarouselImages = [
  { id: "img1", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800", alt: "Slide 1" },
  { id: "img2", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800", alt: "Slide 2" },
  { id: "img3", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", alt: "Slide 3" },
];

const defaultConfigByType: Record<string, Record<string, unknown>> = {
  hero: { title: "Welcome", subtitle: "Add your message here", overlay: true },
  background: { backgroundImage: "", overlayOpacity: 0.3, minHeight: "100vh" },
  logo: { imageUrl: "", alt: "Logo", linkUrl: "", size: "medium", alignment: "left" },
  text: { content: "Add your text here.", alignment: "left", fontSize: "medium", fontFamily: "" },
  textImage: { content: "", imageUrl: "", layout: "left" },
  richText: { html: "<p>Rich content here.</p>" },
  accordion: { title: "FAQ", items: [] },
  pricing: { title: "Pricing", tiers: [] },
  carousel: { images: defaultCarouselImages, autoplaySpeed: 5, behavior: "smooth" },
  form: { formTemplate: "contact", formTitle: "Get in touch", submitLabel: "Submit", successMessage: "Thanks for your message!" },
  social: { links: [], alignment: "center" },
};

export interface PageBuilderProps {
  initialBlocks?: PageBlock[];
  theme?: Record<string, unknown>;
  onBlocksChange?: (blocks: PageBlock[]) => void;
  className?: string;
  showPalette?: boolean;
  showHistory?: boolean;
  showSettings?: boolean;
}

export function PageBuilder({
  initialBlocks = [],
  theme,
  onBlocksChange,
  className,
  showPalette = true,
  showHistory = true,
  showSettings = true,
}: PageBuilderProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const { blocks, setBlocks, undo, redo, canUndo, canRedo } = useEditorHistory(initialBlocks);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const selectedBlock = React.useMemo(
    () => blocks.find((b) => b.id === selectedId) ?? null,
    [blocks, selectedId]
  );
  const activeBlock = React.useMemo(
    () => blocks.find((b) => b.id === activeId),
    [blocks, activeId]
  );

  // When dragging from palette, activeId is like "palette-hero" – build a fake block for overlay
  const overlayBlock = React.useMemo(() => {
    if (!activeId) return null;
    if (activeBlock) return activeBlock;
    if (String(activeId).startsWith("palette-")) {
      const type = String(activeId).replace("palette-", "");
      return {
        id: "overlay",
        type: type as PageBlock["type"],
        config: defaultConfigByType[type] ?? {},
        animation: "fade" as const,
      } satisfies PageBlock;
    }
    return null;
  }, [activeId, activeBlock]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  React.useEffect(() => {
    onBlocksChange?.(blocks);
  }, [blocks, onBlocksChange]);

  const handleDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id));
  const handleDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = e;

    const activeData = active.data.current as { type?: string; fromPalette?: boolean } | undefined;

    // Dropping from palette: add new block (append) even if over is null (empty canvas or drop on padding)
    if (activeData?.fromPalette && activeData?.type) {
      const newBlock: PageBlock = {
        id: createBlockId(),
        type: activeData.type as PageBlock["type"],
        config: defaultConfigByType[activeData.type] ?? {},
        animation: "fade",
      };
      setBlocks([...blocks, newBlock]);
      return;
    }

    // Reordering existing blocks
    if (!over) return;
    const activeIndex = blocks.findIndex((b) => b.id === active.id);
    const overIndex = blocks.findIndex((b) => b.id === over.id);
    if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) return;
    const next = [...blocks];
    const [removed] = next.splice(activeIndex, 1);
    next.splice(overIndex, 0, removed);
    setBlocks(next);
  };

  const updateBlock = React.useCallback(
    (id: string, config: Partial<PageBlock["config"]>) => {
      setBlocks(
        blocks.map((b) =>
          b.id === id ? { ...b, config: { ...b.config, ...config } } : b
        )
      );
    },
    [blocks, setBlocks]
  );

  const handleSelectBlock = React.useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  const deleteBlock = React.useCallback(
    (id: string) => {
      setBlocks(blocks.filter((b) => b.id !== id));
    },
    [blocks, setBlocks]
  );

  // Defer DndContext until after mount to avoid hydration mismatch (dnd-kit generates
  // different aria-describedby IDs on server vs client).
  if (!isMounted) {
    return (
      <div className={cn("flex gap-6 h-full", className)}>
        {showPalette && (
          <aside className="w-56 shrink-0 border-r border-slate-200 bg-slate-50/50 p-4 overflow-auto">
            <div className="text-sm text-slate-500">Loading blocks…</div>
          </aside>
        )}
        <div className="flex-1 min-w-0 flex flex-col">
          {showHistory && (
            <div className="flex items-center gap-2 mb-4">
              <button type="button" disabled className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm opacity-50">
                Undo
              </button>
              <button type="button" disabled className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm opacity-50">
                Redo
              </button>
            </div>
          )}
          <div className="flex flex-wrap gap-4 items-start rounded-xl border-2 border-dashed border-slate-200 bg-white p-6 min-h-[400px]">
            {blocks.length === 0 ? (
              <div className="text-center py-16 text-slate-500 w-full">Drag blocks here to build your page</div>
            ) : (
              blocks.map((block) => {
                const C = blockComponents[block.type];
                if (!C) return null;
                return (
                  <div key={block.id} className="rounded-lg border border-slate-200 bg-white p-4">
                    <C block={block} theme={theme} isEditor />
                  </div>
                );
              })
            )}
          </div>
        </div>
        {showSettings && (
          <aside className="w-72 shrink-0 border-l border-slate-200 bg-slate-50/50 overflow-auto">
            <div className="p-4 text-sm text-slate-500">Select a block to edit its settings</div>
          </aside>
        )}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={cn("flex gap-6 h-full", className)}>
        {showPalette && (
          <aside className="w-56 shrink-0 border-r border-slate-200 bg-slate-50/50 p-4 overflow-auto">
            <BlockPalette />
          </aside>
        )}
        <div className="flex-1 min-w-0 flex flex-col">
          {showHistory && (
            <div className="flex items-center gap-2 mb-4">
              <button
                type="button"
                onClick={undo}
                disabled={!canUndo}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm disabled:opacity-50 hover:bg-slate-100"
              >
                Undo
              </button>
              <button
                type="button"
                onClick={redo}
                disabled={!canRedo}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm disabled:opacity-50 hover:bg-slate-100"
              >
                Redo
              </button>
            </div>
          )}
          <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            <CanvasDropZone className="flex flex-wrap gap-4 items-start rounded-xl border-2 border-dashed border-slate-200 bg-white p-6 min-h-[400px]">
              {blocks.length === 0 && (
                <div className="text-center py-16 text-slate-500">
                  Drag blocks here to build your page
                </div>
              )}
              {blocks.map((block) => (
                <CanvasBlock
                  key={block.id}
                  block={block}
                  theme={theme}
                  selected={selectedId === block.id}
                  onSelect={() => handleSelectBlock(block.id)}
                  onUpdate={(config) => updateBlock(block.id, config)}
                  onDelete={() => deleteBlock(block.id)}
                  BlockRender={blockComponents[block.type]}
                />
              ))}
            </CanvasDropZone>
          </SortableContext>
        </div>
        {showSettings && (
          <aside className="w-72 shrink-0 border-l border-slate-200 bg-slate-50/50 overflow-auto">
            <BlockSettings
              block={selectedBlock}
              onUpdate={(config) => selectedId && updateBlock(selectedId, config)}
            />
          </aside>
        )}
      </div>

      <DragOverlay>
        {overlayBlock ? (
          <div className="rounded-lg border-2 border-slate-300 bg-white shadow-lg p-4 opacity-95">
            {(() => {
              const C = blockComponents[overlayBlock.type];
              if (!C) return <span className="text-slate-500">Block</span>;
              return <C block={overlayBlock} theme={theme} isEditor />;
            })()}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
