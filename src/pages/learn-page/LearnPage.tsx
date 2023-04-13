import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Flashcard from 'components/flashcards-holder/Flashcard';
import { LEARN_MODES } from 'common/constants';
import styles from './LearnPage.module.scss';
import useLearnModeStore from 'store/learnModeStore';
import WritingModeLearn from 'components/writing-mode-holder/WritingModeLearn';

const { FLASH_CARDS, WRITING_MODE } = LEARN_MODES;

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
      <div className={styles.main}>{learnModeId === FLASH_CARDS && <Flashcard />}
      {learnModeId ===  WRITING_MODE && <WritingModeLearn/>}
      </div>
    </>
  );
};
export default LearnPage;
