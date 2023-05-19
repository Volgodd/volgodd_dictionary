import { useNavigate, useParams } from 'react-router-dom';

import Flashcard from 'components/flashcards-holder/Flashcard';
import { LEARN_PAGE } from 'common/constants';
import WritingModeLearn from 'components/writing-mode-holder/WritingModeLearn';
import styles from './LearnPage.module.scss';
import { useEffect } from 'react';
import useLearnModeStore from 'store/learnModeStore';

const { FLASH_CARDS, WRITING_MODE } = LEARN_PAGE;

const LearnPage = () => {
  const { learnModeId } = useParams();
  const navigate = useNavigate();

  const themesForLearnMode = useLearnModeStore((state) => state.themesForLearnMode);

  useEffect(() => {
    if (!themesForLearnMode || themesForLearnMode.length === 0) {
      //в конст есть , убрать стринг
      navigate('/');
    }
  }, [navigate, themesForLearnMode]);

  return (
    <>
      <div className={styles.main}>
        {learnModeId === FLASH_CARDS && <Flashcard />}
        {learnModeId === WRITING_MODE && <WritingModeLearn />}
      </div>
    </>
  );
};
export default LearnPage;
