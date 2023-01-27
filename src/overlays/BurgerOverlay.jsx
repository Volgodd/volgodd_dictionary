import { OVERLAY_TYPES } from 'common/constants';
import styles from './BurgerOverlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import MiniButton from 'components/buttons/mini-button/MiniButton';
import clsx from 'clsx';
import DictionaryButton from 'components/buttons/dictionary-button/DictionaryButton';
import { fakeDictionaryNamesData } from 'data/fake-data';

const BurgerOverlay = () => {

  const { burgerOverlay, setBurgerOverlay } = useGlobalContext();

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
          {fakeDictionaryNamesData.map((string)=> {
            return <DictionaryButton title={string}/>
          })}
    
        </div>
      </div>
      <div className={styles.overlayShade} onClick={() => setBurgerOverlay(false)} />
    </div>
  }
};
export default BurgerOverlay;
