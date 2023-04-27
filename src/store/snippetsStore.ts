import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Snippet {
  name: string;
  code: string | null;
}

interface SnippetState {
  snippetsNames: string[];
  selectedSnippet: Snippet | null;
  addSnippetName: (name: string) => void;
  setSnippetsNames: (names: string[]) => void;
  removeSnippetName: (name: string) => void;
  setSelectedSnippet: (snippet: Snippet | null) => void;
}

export const useSnippetStore = create<SnippetState>()(
  devtools((set) => ({
    snippetsNames: [],
    selectedSnippet: null,
    addSnippetName: (name) =>
      set((state) => ({ snippetsNames: [...state.snippetsNames, name] })),
    setSnippetsNames: (names) => set({ snippetsNames: names }),
    removeSnippetName: (name) =>
      set((state) => ({
        snippetsNames: state.snippetsNames.filter((n) => n !== name),
      })),
    setSelectedSnippet: (snippet) => set({ selectedSnippet: snippet }),
  }))
);
