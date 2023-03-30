import AddThemeOverlay from './AddThemeOverlay';
import AddWordOverlay from './AddWordOverlay';
import EditDataOverlay from './EditDataOverlay';
import EditThemeOverlay from './EditThemeOverlay';
import LearnModeOverlay from './LearnModeOverlay';
import Login from './LoginOverlay';
import MiniButton from 'components/buttons/mini-button/MiniButton';
import { OVERLAY_TYPES } from 'common/constants';
import SearchOverlay from './SearchOverlay';
import { shallow } from 'zustand/shallow';
import styles from './Overlay.module.scss';
import useOverlayStore from 'store/overlayStore';
import { ReactElement } from 'react';

const getOverlayTypeContent = (overlayType: string | undefined): {header: string; overlayContent: ReactElement}  => {
  switch (overlayType) {
    case OVERLAY_TYPES.ADD_WORD:
      return {
        header: 'Add a word',
        overlayContent: <AddWordOverlay />
      };
    case OVERLAY_TYPES.ADD_THEME:
      return {
        header: 'Add a theme',
        overlayContent: <AddThemeOverlay />
      };
    case OVERLAY_TYPES.SEARCH:
      return {
        header: 'Search',
        overlayContent: <SearchOverlay />
      };
    case OVERLAY_TYPES.EDIT_WORD:
      return {
        header: 'Edit word',
        overlayContent: <EditDataOverlay />
      };
    case OVERLAY_TYPES.LOGIN:
      return {
        header: 'Login',
        overlayContent: <Login />
      };
    case OVERLAY_TYPES.EDIT_THEME:
      return {
        header: 'Edit theme',
        overlayContent: <EditThemeOverlay />
      };
    case OVERLAY_TYPES.LEARN_MODE:
      return {
        header: 'Learn mode',
        overlayContent: <LearnModeOverlay />
      };
    // case OVERLAY_TYPES.MENU:
    // return {
    //   header: '',
    //   overlayContent: <BurgerOverlay />
    // };
    default:
      return {
        header: 'Learn mode',
        overlayContent: <></>};
  }
};

const Overlay = () => {
  const { overlayType, closeOverlay } = useOverlayStore(
    (state) => ({
      overlayType: state.overlayType,
      closeOverlay: state.closeOverlay
    }),
    shallow
  );

  const { header, overlayContent } = getOverlayTypeContent(overlayType);

  return (
    <div className={styles.overlayWrapper}>
      <div className={styles.overlayFrame}>
        <div className={styles.overlayHeader}>
          {header}
          {overlayType !== 'login' && (
            <MiniButton
              type={'closeIcon'}
              onClickF={() => closeOverlay()}
              additionalStyles={styles.closeButton}
              transparent={true}
            />
          )}
        </div>
        <div className={styles.overlayContent}>{overlayContent}</div>
      </div>
      <div
        className={styles.overlayShade}
        onClick={() => {
          if (overlayType !== 'login') {
            closeOverlay();
          }
        }}
      />
    </div>
  );
};

export default Overlay;
