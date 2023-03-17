import type { LearnModeStore } from 'types/store-types';
import { create } from 'zustand';

const defaultLearnModeStore = { themesForLearnMode: [] };

const useLearnModeStore = create<LearnModeStore>((set) => ({
  ...defaultLearnModeStore,
  resetLearnModeStore: () => set(defaultLearnModeStore),
  setThemesForLearnMode: ({ themesForLearnMode }) => set({ themesForLearnMode })
}));

export default useLearnModeStore;
