import styles from './BurgerOverlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import MiniButton from 'components/buttons/mini-button/MiniButton';
import clsx from 'clsx';
import DictionaryButton from 'components/buttons/dictionary-button/DictionaryButton';
import { fakeDictionaryNamesData } from 'data/fake-data';
import { useLocation } from '../../node_modules/react-router-dom/dist/index';
import { findObjectIndex } from 'components/buttons/utils';
import { stringToSubstring } from 'components/buttons/utils';

const BurgerOverlay = () => {
  const { burgerOverlay, setBurgerOverlay, wordData, themeData } = useGlobalContext();

  // const { id: themeId, name } = themeData;
  // const { id: wordId } = wordData;

  const urlLocation= useLocation();
  const themeIdRaw = urlLocation.pathname;


  const themeName = () => {
    const idFromPathname = stringToSubstring(themeIdRaw, 'word', 7);
    const index = findObjectIndex(themeData, idFromPathname);

    if(index >= 0) {
    return themeData[index].name}
  }

  if (burgerOverlay) {

  return <div className={clsx(styles.overlayWrapper, styles.active)}>
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
          {fakeDictionaryNamesData.map((string)=> {
            return <DictionaryButton title={string} dictionaryIcon={true} />
          })}
          { themeName() !== undefined  && 

            <DictionaryButton title={themeName()} />
          
          }
        </div>
      </div>
      <div className={styles.overlayShade} onClick={() => setBurgerOverlay(false)} />
    </div>
  }
};
export default BurgerOverlay;
