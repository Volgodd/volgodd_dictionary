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

  const longThemeNameSafeguard = (name) => {
    const wordArray = name.split(' ');
    const threeDots = '...';

    const checkedWords = wordArray.map((item) => {
      if (item.length <= 13) {
        return item;
      } else return item.slice(0, 11).concat(threeDots);
    });

    return checkedWords.toString().replaceAll(',', ' ');

    // console.log(checkedWords, checkedWords.toString().replaceAll(',', ' '));
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.formWrapper}>
        <span className={styles.headerSpan}>Select themes to learn:</span>
        <div className={styles.scrollPadContainer}>
          <div className={styles.scrollPad}>
            {themeData.map((theme) => {
              const { name, id } = theme;
              const themeIndex = findObjectIndex(themeData, id);

              const themeNameWithDots = longThemeNameSafeguard(name);

              return (
                <Input
                  value={name}
                  key={id}
                  id={id}
                  onChangeF={(checked) => addThemesIfChecked({ checked, themeIndex, themeId: id })}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <LearnButton name={'Flashcards'} />
        </div>
      </form>
    </>
  );
};
export default LearnModeOverlay;
