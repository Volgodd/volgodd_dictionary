import { DEFAULT_OVERLAY_STATE, LEARN_MODES, ROUTES } from 'common/constants';
import React, { useState } from 'react';

import Input from 'components/input/Input';
import LearnButton from 'components/buttons/learn-button/LearnButton';
import { findObjectIndex } from 'common/utils';
import styles from './LearnModeOverlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useNavigate } from 'react-router-dom/dist/index';

const { LEARN_MODE } = ROUTES;
const { FLASH_CARDS } = LEARN_MODES;

const LearnModeOverlay = () => {
  const [checkedThemes, setCheckedThemes] = useState([]);

  const { themeData, setThemesArrayForLearnMode, setOverlay } = useGlobalContext();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setThemesArrayForLearnMode(checkedThemes);
    navigate(`${LEARN_MODE}/${FLASH_CARDS}`);
    setOverlay(DEFAULT_OVERLAY_STATE);
  };

  const addThemesIfChecked = ({ checked, themeIndex, themeId }) => {
    const newCheckedThemes = [...checkedThemes];

    if (checked) {
      newCheckedThemes.push(themeData[themeIndex]);
    } else {
      const currentIndex = findObjectIndex(newCheckedThemes, themeId);
      newCheckedThemes.splice(currentIndex);
    }

    setCheckedThemes(newCheckedThemes);
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
