import { DEFAULT_OVERLAY_STATE, ROUTES } from 'common/constants';

import Input from 'components/input/Input';
import LearnButton from 'components/buttons/learn-button/LearnButton';
import React from 'react';
import { findObjectIndex } from 'common/utils';
import styles from './LearnModeOverlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useNavigate } from 'react-router-dom/dist/index';

const { FLASHCARDS } = ROUTES;

const LearnModeOverlay = () => {
  const { themeData, themesArrForLearnMode, setOverlay } = useGlobalContext();

  const navigate = useNavigate();

  themesArrForLearnMode.current = [];

  console.log(themesArrForLearnMode.current);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('navigate to learn');
    navigate(FLASHCARDS);
    setOverlay(DEFAULT_OVERLAY_STATE);
  };

  const addThemesIfChecked = ({ checked, themeIndex, themeId }) => {
    const localCheckedThemeArr = [...themesArrForLearnMode.current];

    if (checked) {
      localCheckedThemeArr.push(themeData[themeIndex]);
    } else {
      const currentIndex = findObjectIndex(localCheckedThemeArr, themeId);
      localCheckedThemeArr.splice(currentIndex);
    }

    themesArrForLearnMode.current = [...localCheckedThemeArr];
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.formWrapper}>
        <span className={styles.headerSpan}>Select themes to learn:</span>
        <div className={styles.inputContainer}>
          {themeData.map((theme) => {
            const { name, id } = theme;
            const themeIndex = findObjectIndex(themeData, id);

            return (
              <Input
                value={name}
                key={id}
                onChangeF={(e) =>
                  addThemesIfChecked({ checked: e.target.checked, themeIndex, themeId: id })
                }
                // onChangeF={(e)=> console.log(e.target.checked)}
              />
            );
          })}
        </div>
        <div className={styles.buttonContainer}>
          <LearnButton name={'Flashcards'} />
        </div>
      </form>
    </>
  );
};
export default LearnModeOverlay;
