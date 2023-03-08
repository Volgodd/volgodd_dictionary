import DictionaryButton from 'components/buttons/dictionary-button/DictionaryButton';
import MiniButton from 'components/buttons/mini-button/MiniButton';
import clsx from 'clsx';
import { fakeDictionaryNamesData } from 'data/fake-data';
import { findObjectIndex } from 'common/utils';
import { shallow } from 'zustand/shallow';
import { stringToSubstring } from 'common/utils';
import styles from './BurgerOverlay.module.scss';
import useDataStore from 'store/dataStore';
import useGlobalContext from 'hooks/useGlobalContext';
import { useLocation } from '../../node_modules/react-router-dom/dist/index';

const BurgerOverlay = () => {
  const { burgerOverlay, setBurgerOverlay } = useGlobalContext();

  const { wordData, themeData } = useDataStore(
    (state) => ({
      wordData: state.wordData,
      themeData: state.themeData
    }),
    shallow
  );

  // const { id: themeId, name } = themeData;
  // const { id: wordId } = wordData;

  const urlLocation = useLocation();
  const themeIdRaw = urlLocation.pathname;

  const themeName = () => {
    const idFromPathname = stringToSubstring(themeIdRaw, 'word', 7);
    const index = findObjectIndex(themeData, idFromPathname);

    if (index >= 0) {
      return themeData[index].name;
    }
  };

  if (burgerOverlay) {
    return (
      <div className={clsx(styles.overlayWrapper, styles.active)}>
        <div className={styles.overlayFrame}>
          <div className={styles.overlayHeader}>
            <span>Menu</span>
            <MiniButton
              type={'closeIcon'}
              onClickF={() => setBurgerOverlay(false)}
              additionalStyles={styles.closeButton}
              transparent={true}
            />
          </div>
          <div className={styles.overlayContent}>
            <span>Dictionaries:</span>
            {fakeDictionaryNamesData.map((string) => {
              return <DictionaryButton title={string} dictionaryIcon={true} />;
            })}
            {themeName() !== undefined && <DictionaryButton title={themeName()} />}
          </div>
        </div>
        <div className={styles.overlayShade} onClick={() => setBurgerOverlay(false)} />
      </div>
    );
  }
};
export default BurgerOverlay;
