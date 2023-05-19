import type { DataId, Word } from 'types/data-types';
import { chooseRandomWord, splitedString } from '../flashcards-holder/utils';
import { useEffect, useState } from 'react';

import Header from 'components/header/Header';
import Input from 'components/input/Input';
import LearnButton from 'components/buttons/learn-button/LearnButton';
import MiniButton from 'components/buttons/mini-button/MiniButton';
import clsx from 'clsx';
import { getNonNullable } from 'types/utils';
import { shallow } from 'zustand/shallow';
import styles from './WritingModeLearn.module.scss';
import useDataStore from 'store/dataStore';
import useLearnModeStore from 'store/learnModeStore';

const WritingModeLearn = () => {
  const { themesForLearnMode, translationFirst } = useLearnModeStore(
    (state) => ({
      themesForLearnMode: state.themesForLearnMode,
      translationFirst: state.translationFirst
    }),
    shallow
  );

  const wordData = useDataStore((state) => getNonNullable(state.wordData));

  const [translateVisibility, setTranslateVisibility] = useState<boolean>(false);
  const [themeIdArr, setThemeIdArr] = useState<DataId[]>([]);
  const [wordListArr, setWordListArr] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<Word | undefined>();
  const [userTyping, setUserTyping] = useState<string>('');
  const [answerIsCorrect, setAnswerIsCorrect] = useState<boolean>(true);

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

  const isTypingCorrect = () => {
    const clearedUserTyping = splitedString(userTyping);
    const clearedNative = splitedString(currentWord?.native);
    const clearedForeign = splitedString(currentWord?.foreign);

    if (translationFirst && clearedUserTyping === clearedForeign) {
      return true;
    }

    if (!translationFirst && clearedUserTyping === clearedNative) {
      return true;
    }

    return false;
  };

  const checkUserInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    isTypingCorrect() ? correctUserAnswerF() : incorrectUserAnswerF();
  };

  const correctUserAnswerF = () => {
    const currentWordId = currentWord && currentWord.id;
    const newWordListArray = wordListArr.filter((wordEntry) => wordEntry.id !== currentWordId);
    setWordListArr(newWordListArray);
    setTranslateVisibility(false);
    setUserTyping('');
    setAnswerIsCorrect(true);
  };

  const incorrectUserAnswerF = () => {
    setTranslateVisibility(true);
    setUserTyping('');

    setAnswerIsCorrect(false);
  };

  const addActiveClass = () => {
    if (translateVisibility) {
      return 'active';
    }
  };

  return (
    <>
      <Header title="Writing mode" />
      {wordListArr.length > 0 && (
        <form onSubmit={checkUserInput}>
          <div className={clsx(styles.flashcardWrapper, !answerIsCorrect && 'active')}>
            <div className={styles.mainContent}>
              <div className={styles.firstLineWrapper}>
                <span className={styles.firstLine}>
                  {translationFirst ? currentWord?.native : currentWord?.foreign}
                </span>
              </div>
              <span className={styles.spanElement}>Type the translation below:</span>
              <Input
                onChangeF={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserTyping(e.target.value)
                }
                customValue={userTyping}
              />
            </div>
            <div className={styles.secondLineWrapper}>
              <MiniButton
                title="click here to see a tip"
                onClickF={() => setTranslateVisibility(!translateVisibility)}
                type={'visibilityIcon'}
                additionalStyles={addActiveClass()}
                bigger={true}
              />
              <div className={clsx(styles.secondLine, translateVisibility && 'active')}>
                {translationFirst ? currentWord?.foreign : currentWord?.native}
              </div>
            </div>
            <LearnButton name={'check'} />
          </div>
        </form>
      )}

      {wordListArr.length === 0 && (
        <div className={styles.learntWrapper}>
          <h1>Great! You've learnt everything</h1>
        </div>
      )}
    </>
  );
};
export default WritingModeLearn;
