import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Flashcard from 'components/flashcards-holder/Flashcard';
import { LEARN_MODES } from 'common/constants';
import styles from './LearnPage.module.scss';
import useLearnModeStore from 'store/learnModeStore';

const { FLASH_CARDS } = LEARN_MODES;

const LearnPage = () => {
  const { learnModeId } = useParams();
  const navigate = useNavigate();

  const themesForLearnMode = useLearnModeStore((state) => state.themesForLearnMode);

  useEffect(() => {
    if (!themesForLearnMode || themesForLearnMode.length === 0) {
      navigate('/');
    }
  }, [navigate, themesForLearnMode]);

  return (
    <>
      <div className={styles.main}>{learnModeId === FLASH_CARDS && <Flashcard />}</div>
    </>
  );
};
export default LearnPage;
