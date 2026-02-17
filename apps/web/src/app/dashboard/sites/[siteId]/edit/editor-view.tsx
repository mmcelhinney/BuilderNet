"use client";

import { useCallback, useState } from "react";
import { PageBuilder } from "@buildernet/editor";
import type { PageBlock } from "@buildernet/utils";
import { Button } from "@buildernet/ui";

interface EditorViewProps {
  siteId: string;
  pageId: string | null;
  initialBlocks: PageBlock[];
}

export function EditorView({ siteId, pageId, initialBlocks }: EditorViewProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [blocks, setBlocks] = useState<PageBlock[]>(() => initialBlocks);

  const save = useCallback(async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/pages/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId, pageId, blocks }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }, [siteId, pageId, blocks]);

  const openPreview = useCallback(() => {
    const key = `buildernet_preview_${siteId}`;
    try {
      sessionStorage.setItem(key, JSON.stringify({ blocks }));
    } catch {
      // ignore
    }
    window.open(`/dashboard/sites/${siteId}/preview`, "_blank", "noopener,noreferrer");
  }, [siteId, blocks]);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-end gap-2 mb-2">
        <Button variant="outline" onClick={openPreview}>
          Preview
        </Button>
        <Button variant="outline" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
        {saved && <span className="text-sm text-green-600">Saved</span>}
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        <PageBuilder
          initialBlocks={initialBlocks}
          onBlocksChange={setBlocks}
          showPalette
          showHistory
        />
      </div>
    </div>
  );
}
