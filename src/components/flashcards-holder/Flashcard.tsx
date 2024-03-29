import type { DataId, Word } from 'types/data-types';
import { useEffect, useState } from 'react';

import Header from 'components/header/Header';
import LearnButton from 'components/buttons/learn-button/LearnButton';
import MiniButton from 'components/buttons/mini-button/MiniButton';
import { chooseRandomWord } from './utils';
import clsx from 'clsx';
import { getNonNullable } from 'types/utils';
import { shallow } from 'zustand/shallow';
import styles from './Flashcard.module.scss';
import useDataStore from 'store/dataStore';
import useLearnModeStore from 'store/learnModeStore';

const Flashcard = () => {
  const wordData = useDataStore((state) => getNonNullable(state.wordData));
  const { themesForLearnMode, translationFirst } = useLearnModeStore(
    (state) => ({
      themesForLearnMode: state.themesForLearnMode,
      translationFirst: state.translationFirst
    }),
    shallow
  );

  const [translateVisibility, setTranslateVisibility] = useState<boolean>(false);
  const [themeIdArr, setThemeIdArr] = useState<DataId[]>([]);
  const [wordListArr, setWordListArr] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<Word | undefined>();

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
    const currentWordId = currentWord && currentWord.id;
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
      <Header title="Flashcards mode" />
      {wordListArr.length !== 0 && (
        <div className={styles.flashcardWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.firstLineWrapper}>
              <span>{translationFirst ? currentWord?.native : currentWord?.foreign}</span>
            </div>
            <div className={styles.secondLineWrapper}>
              <MiniButton
                onClickF={() => setTranslateVisibility(!translateVisibility)}
                type="visibilityIcon"
                additionalStyles={translateVisibility ? 'active' : undefined}
                bigger={true}
              />
              <div className={clsx(styles.secondLine, translateVisibility && 'active')}>
                {translationFirst ? currentWord?.foreign : currentWord?.native}
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <LearnButton name="Still learning" onClickF={dontKnowButtonF} />
            <LearnButton name="Know" onClickF={knowButtonF} />
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
