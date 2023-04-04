import ActionButton from '../buttons/action-button/ActionButton';
import { OVERLAY_TYPES } from 'common/constants';
import styles from './Footer.module.scss';
import useOverlayStore from 'store/overlayStore';

const { ADD_WORD, ADD_THEME, LEARN_MODE } = OVERLAY_TYPES;

const Footer = () => {
  const openOverlay = useOverlayStore((state) => state.openOverlay);

  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerContent}>
        <ActionButton name="Add a theme" onClickF={() => openOverlay({ overlayType: ADD_THEME })} />
        <ActionButton name="Learn mode" onClickF={() => openOverlay({ overlayType: LEARN_MODE })} />
        <ActionButton name="Add a word" onClickF={() => openOverlay({ overlayType: ADD_WORD })} />
      </div>
    </div>
  );
};
export default Footer;
