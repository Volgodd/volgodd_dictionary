import DataEntryButton from 'components/buttons/data-entry-button/DataEntryButton';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import MetaTags from 'common/MetaTags';
import { ROUTES } from 'common/constants';
import React from 'react';
import styles from './Flashcard.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useNavigate } from 'react-router-dom';

const { WORDS } = ROUTES;

const Flashcard = () => {
  const { themesArrForLearnMode } = useGlobalContext();

  return <div className={styles.flashcardWrapper}></div>;
};

export default Flashcard;
