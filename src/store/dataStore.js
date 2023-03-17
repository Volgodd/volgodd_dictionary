import { create } from 'zustand';
import { getData } from 'data/api';
import { parseThemeData } from 'data/utils';

const defaultDataStore = { wordData: undefined, themeData: undefined }; // null if does not exist

const useDataStore = create((set) => ({
  ...defaultDataStore,
  getAndSetData: async (jwt) => {
    const data = await getData(jwt);

    if (data) {
      const { wordData, themeData } = data;

      set((state) => {
        const actualWordData = wordData || state.wordData;

        const parsedThemeData = parseThemeData({ themeData, wordData: actualWordData });

        return { wordData, themeData: parsedThemeData };
      });
    }
  },
  setThemeData: (themeData) => {
    set((state) => {
      const parsedThemeData = parseThemeData({ themeData, wordData: state.wordData });

      return { themeData: parsedThemeData };
    });
  },
  setWordData: (wordData) => set({ wordData }),
  resetData: () => set(defaultDataStore)
}));

export default useDataStore;
