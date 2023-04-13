import { LEARN_MODES, ROUTES } from 'common/constants';
import { useState } from 'react';

import InputThemeChoice from 'components/input-theme-choice/InputThemeChoice';
import LearnButton from 'components/buttons/learn-button/LearnButton';
import { findObjectIndex } from 'common/utils';
import { shallow } from 'zustand/shallow';
import styles from './LearnModeOverlay.module.scss';
import useDataStore from 'store/dataStore';
import useLearnModeStore from 'store/learnModeStore';
import { useNavigate } from 'react-router-dom/dist/index';
import useOverlayStore from 'store/overlayStore';
import type { ParsedTheme, DataId } from 'types/data-types';
import { getNonNullable } from 'types/utils';
import ToggleSwitch from 'components/toggle-switch/ToggleSwitch';

const { LEARN_MODE } = ROUTES;
const { FLASH_CARDS, WRITING_MODE } = LEARN_MODES;

const LearnModeOverlay = () => {
  const [checkedThemes, setCheckedThemes] = useState<ParsedTheme[]>([]);
  const closeOverlay = useOverlayStore((state) => state.closeOverlay);
  const navigate = useNavigate();

  const {setThemesForLearnMode, setTranslationFirst, translationFirst} = useLearnModeStore(
    (state) => ({
      setThemesForLearnMode: state.setThemesForLearnMode,
      setTranslationFirst: state.setTranslationFirst,
      translationFirst: state.translationFirst
  }), shallow )

  const { themeData } = useDataStore(
    (state) => ({
      wordData: getNonNullable(state.wordData),
      themeData: getNonNullable(state.themeData)
    }), shallow )

  const submitHandler = (type: string) => {

    
    if (checkedThemes.length !== 0) {
      if (type === 'flash-cards') 
        { 
          navigate(`${LEARN_MODE}/${FLASH_CARDS}`)
        } else if (type === 'writing-mode') {
          navigate(`${LEARN_MODE}/${WRITING_MODE}`)
        }
      closeOverlay();
      setThemesForLearnMode(checkedThemes);
    }
  };

  type addThemesIfCheckedProps = {
    checked: boolean
    themeIndex: number
    themeId: DataId
  }
  const addThemesIfChecked = ({ checked, themeIndex, themeId }: addThemesIfCheckedProps) => {
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
    <div  className={styles.formWrapper}>
      <span className={styles.headerSpan}>Select themes to learn:</span>
      <div className={styles.scrollPadContainer}>
        <div className={styles.scrollPad}>
          {themeData.map((theme) => {
            const { name, id } = theme;
            const themeIndex = findObjectIndex(themeData, id);
            return (
              <InputThemeChoice
                value={name}
                key={id}
                id={id}
                onChangeF={(checked: boolean) => addThemesIfChecked({ checked, themeIndex, themeId: id })}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.toggleContainer}>
        <span>Translation first:</span>
        <ToggleSwitch defaultCheckedValue={translationFirst} onChangeF={(checked: boolean)  => setTranslationFirst(checked)}/>
      </div>
      <div className={styles.buttonContainer}>
        <LearnButton name={'Flashcards'}  onClickF={() => submitHandler(FLASH_CARDS)}/>
        <LearnButton name={'Writing mode'} onClickF={()=> submitHandler(WRITING_MODE)} />
      </div>
    </div>
  );
};

export default LearnModeOverlay;
