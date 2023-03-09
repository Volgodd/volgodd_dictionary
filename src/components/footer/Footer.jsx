import NavButton from './nav-button/NavButton';
import { OVERLAY_TYPES } from 'common/constants';
import styles from './Footer.module.scss';
import useOverlayStore from 'store/overlayStore';

const { ADD_WORD, ADD_THEME, EDIT_THEME, LEARN_MODE } = OVERLAY_TYPES;

const Footer = ({ themePage, wordPage }) => {
  const openOverlay = useOverlayStore((state) => state.openOverlay);

  return (
    <div className={styles.footerWrapper}>
      {themePage && (
        <div className={styles.footerContent}>
          <NavButton name="Add a theme" onClickF={() => openOverlay({ overlayType: ADD_THEME })} />
          <NavButton name="Learn mode" onClickF={() => openOverlay({ overlayType: LEARN_MODE })} />
          <NavButton name="Add a word" onClickF={() => openOverlay({ overlayType: ADD_WORD })} />
        </div>
      )}

      {wordPage && (
        <div className={styles.footerContent}>
          <NavButton name="Edit theme" onClickF={() => openOverlay({ overlayType: EDIT_THEME })} />
          <NavButton name="Learn mode" />
          <NavButton name="Delete theme" additionalStyles={styles.deleteButton} />
        </div>
      )}
    </div>
  );
};
export default Footer;
