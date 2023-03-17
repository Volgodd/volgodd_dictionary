/**
 * Inject word count into theme data
 * @param themeData: raw theme data
 * @param wordData: raw word data
 * @returns themeData with injected wordCount
 */
export const parseThemeData = ({ themeData, wordData }) => {
  if (!themeData || !wordData) {
    return undefined;
  }

  let dump = {};

  wordData.forEach(({ themeIdList }) => {
    themeIdList.forEach((themeId) => {
      if (!dump[themeId]) {
        // const test = { [themeId]: 1 };

        // dump = { ...dump, ...test };
        // dump = { ...dump, ...{ [themeId]: 1 } };

        dump = { [themeId]: 1, ...dump };

        // dump[themeId] = 1;
        //это идентично по значению, но приводит к ошибкам, т.к. мутирует старый объект. что нужно избегать. наша записаь создает новый объект, куда разворачивается существующий объект dump, а потом перезаписываем его значение
      } else {
        // dump.theme1 = dump.theme1 + 1
        dump[themeId] = dump[themeId] + 1;
      }
    });
  });

  // console.log('++++++++++++', dump);

  const themeDataWithEnjections = themeData.map((theme) => {
    //safeguard для случая, если тема отсутствует (в нашем случае нет темы 8)

    const { id } = theme;

    return { ...theme, wordCount: dump[id] ?? 0 };
  });

  return themeDataWithEnjections;
};
