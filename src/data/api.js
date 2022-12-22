import { fakeThemeData, fakeWordData } from 'data/fake-data';

import { countThemeWords } from './utils';

export const getData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const wordData = fakeWordData; // should be real data later
      const themeData = fakeThemeData;

      const processedThemeData = countThemeWords({ wordData, themeData });

      resolve({ wordData: fakeWordData, themeData: processedThemeData });
    }, 300);
  });
};
