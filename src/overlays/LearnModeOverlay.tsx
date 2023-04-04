import { LEARN_MODES, ROUTES } from 'common/constants';
import { useState } from 'react';

import Input from 'components/input/Input';
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

const { LEARN_MODE } = ROUTES;
const { FLASH_CARDS } = LEARN_MODES;

const LearnModeOverlay = () => {
  ///// ошибка!
  const [checkedThemes, setCheckedThemes] = useState<ParsedTheme[]>([]);
  const closeOverlay = useOverlayStore((state) => state.closeOverlay);
  const navigate = useNavigate();
  const setThemesForLearnMode = useLearnModeStore((state) => state.setThemesForLearnMode);

  const { themeData } = useDataStore(
    (state) => ({
      wordData: getNonNullable(state.wordData),
      themeData: getNonNullable(state.themeData)
    }),
    shallow
  );

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (checkedThemes.length !== 0) {
      navigate(`${LEARN_MODE}/${FLASH_CARDS}`);
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

  const longThemeNameSafeguard = (name: string) => {
    const wordArray = name.split(' ');
    const threeDots = '...';

    const checkedWords = wordArray.map((item) => {
      if (item.length <= 13) {
        return item;
      } else return item.slice(0, 11).concat(threeDots);
    });

    return checkedWords.toString().replaceAll(',', ' ');
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
              // const themeNameWithDots = longThemeNameSafeguard(name);
              // решено при помощи css
              return (
                <Input
                  value={name}
                  key={id}
                  id={id}
                  onChangeF={(checked: boolean) => addThemesIfChecked({ checked, themeIndex, themeId: id })}
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
