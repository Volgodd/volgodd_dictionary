import React, { useEffect, useState } from 'react';

import Header from 'components/header/Header';
import LearnButton from 'components/buttons/learn-button/LearnButton';
import MiniButton from 'components/buttons/mini-button/MiniButton';
import { chooseRandomWord } from './utils';
import clsx from 'clsx';
import styles from './Flashcard.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';

const Flashcard = () => {
  const { themesArrayForLearnMode, wordData } = useGlobalContext();
  const [translateVisibility, setTranslateVisibility] = useState(false);
  const [themeIdArr, setThemeIdArr] = useState([]);
  const [wordListArr, setWordListArr] = useState([]);
  const [currentWord, setCurrentWord] = useState();

  useEffect(() => {
    const newThemeIdArr = themesArrayForLearnMode
      ? themesArrayForLearnMode.map((theme) => theme.id)
      : [];

    setThemeIdArr(newThemeIdArr);
  }, [themesArrayForLearnMode]);

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

  console.log({ themesArrayForLearnMode, wordData, themeIdArr, wordListArr });

  const knowButtonF = () => {
    const currentWordId = currentWord.id;
    const newWordListArray = wordListArr.filter((wordEntry) => wordEntry.id !== currentWordId);
    setWordListArr(newWordListArray);

    setCurrentWord(chooseRandomWord(wordListArr));

    if (wordListArr.length === 0) {
    }
  };

  const dontKnowButtonF = () => {
    setCurrentWord(chooseRandomWord(wordListArr));
  };

  console.log('CURRENT WORD', currentWord);

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
            <LearnButton
              additionalStyles={styles.button}
              name={'Still learning'}
              onClickF={dontKnowButtonF}
            />
            <LearnButton additionalStyles={styles.button} name={'Know'} onClickF={knowButtonF} />
          </div>
        </div>
      )}

      {wordListArr.length === 0 && <div className={styles.alertWrapper}></div>}
    </>
  );
};

export default Flashcard;
