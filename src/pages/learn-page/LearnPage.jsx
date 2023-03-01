import { LEARN_MODES, ROUTES } from 'common/constants';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DataEntryButton from 'components/buttons/data-entry-button/DataEntryButton';
import Flashcard from 'components/flashcards-holder/Flashcard';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import MetaTags from 'common/MetaTags';
import styles from './LearnPage.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';

const { FLASH_CARDS } = LEARN_MODES;

const LearnPage = () => {
  const { learnModeId } = useParams();
  console.log({ learnModeId });
  const { themesArrayForLearnMode } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('@@@@@@@@@@@@@@@', themesArrayForLearnMode);
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
