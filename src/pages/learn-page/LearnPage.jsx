import DataEntryButton from 'components/buttons/data-entry-button/DataEntryButton';
import Flashcard from 'components/flashcards-holder/Flashcard';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import MetaTags from 'common/MetaTags';
import { ROUTES } from 'common/constants';
import React from 'react';
import styles from './LearnPage.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useNavigate } from 'react-router-dom';

const { WORDS } = ROUTES;

const LearnPage = () => {
  const { themeData, themesArrForLearnMode } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <div className={styles.main}>
      <Flashcard />
    </div>
  );
};

export default LearnPage;
