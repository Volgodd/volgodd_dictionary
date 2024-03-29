import type { DataId, ParsedTheme, RawTheme, Word } from 'types/data-types';

/**
 * Inject word count into theme data
 * @param themeData: raw theme data
 * @param wordData: raw word data
 * @returns themeData with injected wordCount
 */

type ParseThemeDataProps = {
  themeData: (RawTheme | ParsedTheme)[] | undefined;
  wordData: Word[] | undefined;
};

export const parseThemeData = ({
  themeData,
  wordData
}: ParseThemeDataProps): ParsedTheme[] | undefined => {
  if (!themeData || !wordData) {
    return undefined;
  }

  let wordCountForThemeIdsCollection: Record<DataId, number> = {};

  wordData.forEach(({ themeIdList }) => {
    themeIdList.forEach((themeId) => {
      if (!wordCountForThemeIdsCollection[themeId]) {
        wordCountForThemeIdsCollection = { [themeId]: 1, ...wordCountForThemeIdsCollection };
      } else {
        wordCountForThemeIdsCollection[themeId] = wordCountForThemeIdsCollection[themeId] + 1;
      }
    });
  });

  const themeDataWithInjections: ParsedTheme[] = themeData.map((theme) => {
    //safeguard для случая, если тема отсутствует (в нашем случае нет темы 8)

    const { id, name } = theme;

    return { id, name, wordCount: wordCountForThemeIdsCollection[id] ?? 0 };
  });

  return themeDataWithInjections;
};

export const deleteItemFromArr = <T extends Array<any>>(dataArr: T, index: number): T => {
  let part1 = [];
  let part2 = [];

  if (index === 0) {
    part1 = dataArr.slice(1, dataArr.length);
  } else {
    part1 = dataArr.slice(0, index);
    part2 = dataArr.slice(index + 1, dataArr.length);
  }

  return [...part1, ...part2] as T;
};
