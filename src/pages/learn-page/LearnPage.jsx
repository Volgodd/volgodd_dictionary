import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Flashcard from 'components/flashcards-holder/Flashcard';
import { LEARN_MODES } from 'common/constants';
import styles from './LearnPage.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';

const { FLASH_CARDS } = LEARN_MODES;

const LearnPage = () => {
  const { learnModeId } = useParams();
  console.log({ learnModeId });
  const { themesArrayForLearnMode } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!themesArrayForLearnMode) {
      navigate('/');
    }
  }, [themesArrayForLearnMode, navigate]);

  if (!themesArrayForLearnMode) {
    return null;
  }

  return <div className={styles.main}>{learnModeId === FLASH_CARDS && <Flashcard />}</div>;
};
export default LearnPage;
