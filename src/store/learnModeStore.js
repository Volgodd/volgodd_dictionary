import { create } from 'zustand';

const defaultLearnModeStore = { themesForLearnMode: [] };

const useLearnModeStore = create((set) => ({
  ...defaultLearnModeStore,
  resetLearnModeStore: () => set(defaultLearnModeStore),
  setThemesForLearnMode: ({ themesForLearnMode }) => set({ themesForLearnMode })
}));

export default useLearnModeStore;
