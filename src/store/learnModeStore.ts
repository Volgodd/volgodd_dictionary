import type { LearnModeStore } from 'types/store-types';
import { create } from 'zustand';

const defaultLearnModeStore = { themesForLearnMode: [],   translationFirst: true};

const useLearnModeStore = create<LearnModeStore>((set) => ({
  ...defaultLearnModeStore,
  resetLearnModeStore: () => set(defaultLearnModeStore),
  setThemesForLearnMode: ( themesForLearnMode  ) => set({ themesForLearnMode}),
  setTranslationFirst: (translationFirst) => set ({translationFirst})
}));

export default useLearnModeStore;
