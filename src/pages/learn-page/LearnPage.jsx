import { ALERT_OVERLAY_TYPES, LEARN_MODES } from 'common/constants';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Flashcard from 'components/flashcards-holder/Flashcard';
import styles from './LearnPage.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';

const { FLASH_CARDS } = LEARN_MODES;
const { WORDS_LEARNT } = ALERT_OVERLAY_TYPES;

const LearnPage = () => {
  const { learnModeId } = useParams();
  console.log({ learnModeId });
  const { themesArrayForLearnMode, alertOverlay, setAlertOverlay } = useGlobalContext();
  const navigate = useNavigate();

  const [allWordsLearnt, setAllWordsLearnt] = useState(undefined);

  useEffect(() => {
    if (!themesArrayForLearnMode) {
      navigate('/');
    }

    if (allWordsLearnt) {
      setAlertOverlay({ type: WORDS_LEARNT });
    }
    console.log('allWordsLearnt', allWordsLearnt, '=======', 'alertOverlay', alertOverlay);
  }, [themesArrayForLearnMode, navigate, allWordsLearnt, alertOverlay, setAlertOverlay]);

  if (!themesArrayForLearnMode) {
    return null;
  }

  console.log('|||', { themesArrayForLearnMode });

  return (
    <>
      {/* ты привязала сетСтейт не к тому аррэю, в нем всегда будет одна ТЕМА */}
      {/* {themesArrayForLearnMode.length === 0 && setAllWordsLearnt(true)} */}
      <div className={styles.main}>{learnModeId === FLASH_CARDS && <Flashcard />}</div>
    </>
  );
};
export default LearnPage;
