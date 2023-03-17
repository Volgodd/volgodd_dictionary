import React, { useEffect, useState } from 'react';

import Header from 'components/header/Header';
import LearnButton from 'components/buttons/learn-button/LearnButton';
import MiniButton from 'components/buttons/mini-button/MiniButton';
import { chooseRandomWord } from './utils';
import clsx from 'clsx';
import styles from './Flashcard.module.scss';
import useDataStore from 'store/dataStore';
import useLearnModeStore from 'store/learnModeStore';

const Flashcard = () => {
  const { themesForLearnMode } = useLearnModeStore((state) => ({
    themesForLearnMode: state.themesForLearnMode
  }));

  const wordData = useDataStore((state) => state.wordData);

  const [translateVisibility, setTranslateVisibility] = useState(false);
  const [themeIdArr, setThemeIdArr] = useState([]);
  const [wordListArr, setWordListArr] = useState([]);
  const [currentWord, setCurrentWord] = useState();

  useEffect(() => {
    const newThemeIdArr = themesForLearnMode ? themesForLearnMode.map((theme) => theme.id) : [];

    setThemeIdArr(newThemeIdArr);
  }, [themesForLearnMode]);

  useEffect(() => {
    const newWordListArr = wordData.filter((wordEntryData) => {
      return wordEntryData.themeIdList.some((themeId) => themeIdArr.includes(themeId));
    });
    setWordListArr(newWordListArr);
  }, [themeIdArr, wordData]);

  useEffect(() => {
    if (wordListArr.length > 0) {
      setCurrentWord(chooseRandomWord(wordListArr));
    }
  }, [wordListArr]);

  const knowButtonF = () => {
    const currentWordId = currentWord.id;
    const newWordListArray = wordListArr.filter((wordEntry) => wordEntry.id !== currentWordId);
    setWordListArr(newWordListArray);
    setTranslateVisibility(false);
  };

  const dontKnowButtonF = () => {
    setCurrentWord(chooseRandomWord(wordListArr));
    setTranslateVisibility(false);
  };

  return (
    <>
      <Header />
      {wordListArr.length !== 0 && (
        <div className={styles.flashcardWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.foreign}>{currentWord?.foreign}</div>
            <div className={styles.nativeWrapper}>
              <MiniButton
                onClickF={() => setTranslateVisibility(!translateVisibility)}
                type={'visibilityIcon'}
                additionalStyles={translateVisibility && 'active'}
                bigger={true}
              />
              <div className={clsx(styles.native, translateVisibility && 'active')}>
                {currentWord?.native}
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <LearnButton name={'Still learning'} onClickF={dontKnowButtonF} />
            <LearnButton name={'Know'} onClickF={knowButtonF} />
          </div>
        </div>
      )}

      {wordListArr.length === 0 && (
        <div className={styles.learntWrapper}>
          <h1>Great! You've learnt everything</h1>
        </div>
      )}
    </>
  );
};
export default Flashcard;
