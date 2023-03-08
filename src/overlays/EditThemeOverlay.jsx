import { deleteThemeAction, deleteWordAction, editThemeAction } from 'data/api';
import { findObjectIndex, findObjectIndexByIdList } from 'common/utils';

import { DEFAULT_OVERLAY_STATE } from 'common/constants';
import NavButton from 'components/footer/nav-button/NavButton';
import React from 'react';
import { findEntriesInArray } from 'common/utils';
import styles from './EditThemeOverlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useState } from 'react';

const EditThemeOverlay = () => {
  const { jwt, setOverlay, themeData, overlay, setRawThemeData, wordData, setWordData } =
    useGlobalContext();

  const themeId = overlay.metadata;
  const themeIndex = findObjectIndex(themeData, themeId);
  const themeName = themeData[themeIndex].name;

  const [theme, setTheme] = useState(themeName);

  const { themeIdList } = wordData;

  const submitHandler = (e) => {
    e.preventDefault();

    const newThemeData = {
      name: theme,
      id: themeId
    };

    console.log({ jwt, data: newThemeData }, '====', newThemeData);

    editThemeAction(jwt, newThemeData, themeId).then(({ data }) => {
      console.log('theme edited', data);

      // const newThemeDataWithId = { ...newThemeData, themeId };
      const themeDataCopy = [...themeData];

      themeDataCopy.splice(themeIndex, 1, newThemeData);

      setRawThemeData(themeDataCopy);
      setOverlay(DEFAULT_OVERLAY_STATE);
    });
  };

  const deleteThemeAndWords = () => {
    // удаление  темы работает, но консоль ругается, что в хедере name undefined, т.к. аррэй с темами пуст

    deleteThemeAction(jwt, themeId).then(() => {
      const themeDataCopy = [...themeData];
      themeDataCopy.splice(themeIndex, 1);
      setRawThemeData(themeDataCopy);
      setOverlay(DEFAULT_OVERLAY_STATE);
    });

    // wordData.themeIdList.toString()

    // const words = findObjectIndexByIdList(wordData, themeId);
    // console.log(words)

    // wordData.map((wordData) => findObjectIndexByIdList (wordData, themeId))

    const filteredWordData = wordData.filter((i) => i.themeIdList == themeId);
    //возвращает арэй из объетов, содержащих айди темы

    // const wordsToDelete = [16546046840, 146545610];

    function deleteWordSequence(wordIdArray) {
      const wordsToDelete = [...wordIdArray];

      console.log(wordsToDelete, '======', filteredWordData);

      const deleteSingleWord = (wordObject) => {
        const wordId = wordObject.id;

        console.log(wordId);

        //   deleteWordAction(jwt, wordId).then(() => {
        //     const nextWordIndex = wordsToDelete.indexOf(wordObject) + 1

        //     if (nextWordIndex < wordsToDelete.length) {
        //       deleteSingleWord(wordsToDelete[nextWordIndex].id)
        //     } else {
        //       alert('All words have been deleted')
        //     }
        //   })
      };

      deleteSingleWord(wordsToDelete[0]);
    }

    deleteWordSequence(filteredWordData);

    // эта функция работает некорректно, сервер выдает ошибку 500
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.addThemeInterface}>
        <div className={styles.addThemeInterfaceRow}>
          <input
            type="text"
            className="inputElement"
            onChange={(e) => setTheme(e.target.value)}
            value={theme}
            required
          />
        </div>
        <div className={styles.buttonContainer}>
          <NavButton name="Save" additionalStyles={styles.button} />
        </div>
      </form>
      <div className={styles.deleteButtonWrapper}>
        <NavButton
          name="Delete"
          additionalStyles={styles.deleteButton}
          onClickF={() => deleteThemeAndWords()}
        />
      </div>
    </>
  );
};
export default EditThemeOverlay;
