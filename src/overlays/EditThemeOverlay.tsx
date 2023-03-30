import { deleteThemeAction, editThemeAction } from 'data/api';

import ActionButton from 'components/buttons/action-button/ActionButton';
import { ParsedTheme } from 'types/data-types';
import { findObjectIndex } from 'common/utils';
import { getNonNullable } from 'types/utils';
import { shallow } from 'zustand/shallow';
import styles from './EditThemeOverlay.module.scss';
import useDataStore from 'store/dataStore';
import useOverlayStore from 'store/overlayStore';
import { useState } from 'react';
import useUserStorage from 'store/userStore';

// eslint-disable-line no-alert
/* eslint-disable no-restricted-globals */

const EditThemeOverlay = () => {
  const { overlayMetadata, closeOverlay } = useOverlayStore(
    (state) => ({
      closeOverlay: state.closeOverlay,
      overlayMetadata: getNonNullable(state.overlayMetadata)
    }),
    shallow
  );

  const jwt = useUserStorage((state) => getNonNullable(state.jwt));

  const { wordData, themeData, setThemeData } = useDataStore(
    (state) => ({
      wordData: getNonNullable(state.wordData),
      setWordData: state.setWordData,
      themeData: getNonNullable(state.themeData),
      setThemeData: state.setThemeData
    }),
    shallow
  );

  const themeId = overlayMetadata;
  const themeIndex = findObjectIndex(themeData, themeId);
  const themeName = themeData[themeIndex].name;

  const [theme, setTheme] = useState(themeName);

  // const { themeIdList } = wordData;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newThemeData = {
      name: theme,
      id: themeId,
      wordCount: 0
    };

    console.log({ jwt, data: newThemeData }, '====', newThemeData);

    editThemeAction({ jwt, data: newThemeData, id: themeId }).then((data) => {
      console.log('theme edited', data);

      // const newThemeDataWithId = { ...newThemeData, themeId };
      // const themeDataCopy = [...themeData];

      // themeDataCopy.splice(themeIndex, 1, newThemeData);

      const themeDataCopy = themeData.map((themeDataEntry, index) => {
        if (index === themeIndex) {
          return newThemeData;
        }

        return themeDataEntry;
      });

      setThemeData(themeDataCopy);
      closeOverlay();
    });
  };

  const deleteThemeAndWords = () => {
    // удаление  темы работает, но консоль ругается, что в хедере name undefined, т.к. аррэй с темами пуст

    const alertMessage =
      'Are your sure you want to delete theme? All words in current theme will be deleted';
    if (confirm(alertMessage) === true) {
      deleteThemeAction({ jwt, id: themeId }).then(() => {
        const themeDataCopy = [...themeData];
        themeDataCopy.splice(themeIndex, 1);
        setThemeData(themeDataCopy);
        closeOverlay();
      });
    }
    // wordData.themeIdList.toString()

    // const words = findObjectIndexByIdList(wordData, themeId);
    // console.log(words)

    // wordData.map((wordData) => findObjectIndexByIdList (wordData, themeId))

    // const filteredWordData = wordData.filter((i) => i.themeIdList.includes(themeId));
    //возвращает арэй из объетов, содержащих айди темы

    // const wordsToDelete = [16546046840, 146545610];

    // function deleteWordSequence(wordIdArray) {
    //   const wordsToDelete = [...wordIdArray];

    //   console.log(wordsToDelete, '======', filteredWordData);

    //   const deleteSingleWord = (wordObject) => {
    //     const wordId = wordObject.id;

    //     console.log(wordId);

    //   deleteWordAction({jwt, id: wordId}).then(() => {
    //     const nextWordIndex = wordsToDelete.indexOf(wordObject) + 1

    //     if (nextWordIndex < wordsToDelete.length) {
    //       deleteSingleWord(wordsToDelete[nextWordIndex].id)
    //     } else {
    //       alert('All words have been deleted')
    //     }
    //   })
    // };

    //   deleteSingleWord(wordsToDelete[0]);
    // }

    // deleteWordSequence(filteredWordData);

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
          <ActionButton name="Save" additionalStyles={styles.button} />
        </div>
      </form>
      <div className={styles.deleteButtonWrapper}>
        <ActionButton
          name="Delete"
          additionalStyles={styles.deleteButton}
          onClickF={() => deleteThemeAndWords()}
        />
      </div>
    </>
  );
};
export default EditThemeOverlay;