import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import { useState, useEffect } from 'react';

export interface ListLine {
  id: string;
  categorySlug: string;
  subSlug: string;
  age?: string;
  qty: number;
  note?: string;
  styleId?: string;
}

export interface AddLineInput {
  categorySlug: string;
  subSlug: string;
  age?: string;
  qty?: number;
  note?: string;
  styleId?: string;
}

export interface AddSheetTarget {
  categorySlug: string;
  subSlug: string;
  styleId?: string;
  age?: string;
}

interface ListState {
  lines: ListLine[];
  isListOpen: boolean;
  addSheetTarget: AddSheetTarget | null;
  lastAddedAt: number | null;

  // Actions
  add: (input: AddLineInput) => boolean;
  remove: (lineId: string) => void;
  setQty: (lineId: string, qty: number) => void;
  setAge: (lineId: string, age: string) => void;
  setNote: (lineId: string, note: string) => void;
  clear: () => void;
  setListOpen: (open: boolean) => void;
  toggleList: () => void;
  openAddSheet: (target: AddSheetTarget) => void;
  closeAddSheet: () => void;
}

export const safeLocalStorage: StateStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(name, value);
    } catch {
      // Ignore storage write errors (e.g. private browsing quota exceeded)
    }
  },
  removeItem: (name: string): void => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(name);
    } catch {
      // Ignore
    }
  },
};

export const useListStore = create<ListState>()(
  persist(
    (set, get) => ({
      lines: [],
      isListOpen: false,
      addSheetTarget: null,
      lastAddedAt: null,

      add: (input: AddLineInput): boolean => {
        const state = get();
        const normalizedAge = input.age?.trim() || undefined;
        const normalizedQty = Math.max(1, Math.min(20, input.qty || 1));
        const normalizedNote = input.note ? input.note.trim().slice(0, 140) : undefined;

        // Check if an existing line matches categorySlug, subSlug, and age
        const existingIndex = state.lines.findIndex(
          (line) =>
            line.categorySlug === input.categorySlug &&
            line.subSlug === input.subSlug &&
            (line.age || '') === (normalizedAge || '')
        );

        if (existingIndex !== -1) {
          // Merge: add quantities (capped at 20)
          const updatedLines = [...state.lines];
          const existing = updatedLines[existingIndex];
          const newQty = Math.min(20, existing.qty + normalizedQty);

          updatedLines[existingIndex] = {
            ...existing,
            qty: newQty,
            note: normalizedNote || existing.note,
            styleId: input.styleId || existing.styleId,
          };

          set({ lines: updatedLines, lastAddedAt: Date.now() });
          return true;
        }

        // Enforce maximum 30 distinct lines
        if (state.lines.length >= 30) {
          return false;
        }

        const newLine: ListLine = {
          id: `${input.categorySlug}:${input.subSlug}:${normalizedAge || 'any'}:${Date.now()}:${Math.random().toString(36).slice(2, 7)}`,
          categorySlug: input.categorySlug,
          subSlug: input.subSlug,
          age: normalizedAge,
          qty: normalizedQty,
          note: normalizedNote,
          styleId: input.styleId,
        };

        set({ lines: [...state.lines, newLine], lastAddedAt: Date.now() });
        return true;
      },

      remove: (lineId: string) => {
        set((state) => ({
          lines: state.lines.filter((line) => line.id !== lineId),
        }));
      },

      setQty: (lineId: string, qty: number) => {
        const clampedQty = Math.max(1, Math.min(20, qty));
        set((state) => ({
          lines: state.lines.map((line) =>
            line.id === lineId ? { ...line, qty: clampedQty } : line
          ),
        }));
      },

      setAge: (lineId: string, age: string) => {
        const targetLine = get().lines.find((l) => l.id === lineId);
        if (!targetLine) return;

        const normalizedAge = age.trim() || undefined;

        // Check if another line now has the exact same category, sub, and age
        const duplicateIndex = get().lines.findIndex(
          (l) =>
            l.id !== lineId &&
            l.categorySlug === targetLine.categorySlug &&
            l.subSlug === targetLine.subSlug &&
            (l.age || '') === (normalizedAge || '')
        );

        if (duplicateIndex !== -1) {
          // Merge targetLine into duplicate line and remove targetLine
          const updatedLines = [...get().lines];
          const duplicate = updatedLines[duplicateIndex];
          updatedLines[duplicateIndex] = {
            ...duplicate,
            qty: Math.min(20, duplicate.qty + targetLine.qty),
            note: targetLine.note || duplicate.note,
          };
          set({ lines: updatedLines.filter((l) => l.id !== lineId) });
        } else {
          set((state) => ({
            lines: state.lines.map((line) =>
              line.id === lineId ? { ...line, age: normalizedAge } : line
            ),
          }));
        }
      },

      setNote: (lineId: string, note: string) => {
        const trimmedNote = note.trim().slice(0, 140);
        set((state) => ({
          lines: state.lines.map((line) =>
            line.id === lineId ? { ...line, note: trimmedNote || undefined } : line
          ),
        }));
      },

      clear: () => {
        set({ lines: [] });
      },

      setListOpen: (open: boolean) => {
        set({ isListOpen: open });
      },

      toggleList: () => {
        set((state) => ({ isListOpen: !state.isListOpen }));
      },

      openAddSheet: (target: AddSheetTarget) => {
        set({ addSheetTarget: target });
      },

      closeAddSheet: () => {
        set({ addSheetTarget: null });
      },
    }),
    {
      name: 'warden-list-v1',
      version: 1,
      storage: createJSONStorage(() => safeLocalStorage),
      partialize: (state) => ({ lines: state.lines }),
    }
  )
);

/**
 * Hydration-safe hook for rendering badge counts without SSR mismatch
 */
export function useListCount(): number {
  const [mounted, setMounted] = useState(false);
  const lines = useListStore((state) => state.lines);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? lines.length : 0;
}

/**
 * Hook to trigger the Add Sheet from any product or category card
 */
export function useAddToList() {
  const openAddSheet = useListStore((state) => state.openAddSheet);
  return { openAddSheet };
}
