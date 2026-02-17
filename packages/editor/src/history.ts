import { useCallback, useRef, useState } from "react";
import type { PageBlock } from "@buildernet/utils";

const MAX_HISTORY = 50;

export function useEditorHistory(initialBlocks: PageBlock[]) {
  const [blocks, setBlocks] = useState<PageBlock[]>(initialBlocks);
  const historyRef = useRef<PageBlock[][]>([initialBlocks]);
  const indexRef = useRef(0);

  const push = useCallback((next: PageBlock[]) => {
    setBlocks(next);
    const history = historyRef.current;
    const i = indexRef.current;
    const trimmed = history.slice(0, i + 1);
    trimmed.push(JSON.parse(JSON.stringify(next)));
    if (trimmed.length > MAX_HISTORY) trimmed.shift();
    else indexRef.current = trimmed.length - 1;
    historyRef.current = trimmed;
  }, []);

  const undo = useCallback(() => {
    const history = historyRef.current;
    const i = indexRef.current;
    if (i <= 0) return;
    indexRef.current = i - 1;
    setBlocks(JSON.parse(JSON.stringify(history[i - 1])));
  }, []);

  const redo = useCallback(() => {
    const history = historyRef.current;
    const i = indexRef.current;
    if (i >= history.length - 1) return;
    indexRef.current = i + 1;
    setBlocks(JSON.parse(JSON.stringify(history[i + 1])));
  }, []);

  const canUndo = indexRef.current > 0;
  const canRedo = indexRef.current < historyRef.current.length - 1;

  return { blocks, setBlocks: push, undo, redo, canUndo, canRedo };
}
