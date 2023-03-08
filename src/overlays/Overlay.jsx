/* eslint-disable no-restricted-globals */

import AddThemeOverlay from './AddThemeOverlay';
import AddWordOverlay from './AddWordOverlay';
import EditDataOverlay from './EditDataOverlay';
import EditThemeOverlay from './EditThemeOverlay';
import LearnModeOverlay from './LearnModeOverlay';
import Login from './Login';
import MiniButton from 'components/buttons/mini-button/MiniButton';
import { OVERLAY_TYPES } from 'common/constants';
import SearchOverlay from './SearchOverlay';
import { shallow } from 'zustand/shallow';
import styles from './Overlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import useOverlayStore from 'store/overlayStore';

const getOverlayTypeContent = (overlayType) => {
  switch (overlayType) {
    case OVERLAY_TYPES.ADD_WORD:
      return <AddWordOverlay />;
    case OVERLAY_TYPES.ADD_THEME:
      return <AddThemeOverlay />;
    case OVERLAY_TYPES.SEARCH:
      return <SearchOverlay />;
    case OVERLAY_TYPES.EDIT_WORD:
      return <EditDataOverlay />;
    // case OVERLAY_TYPES.MENU:
    //   return <BurgerOverlay />;
    case OVERLAY_TYPES.LOGIN:
      return <Login />;
    case OVERLAY_TYPES.EDIT_THEME:
      return <EditThemeOverlay />;
    case OVERLAY_TYPES.LEARN_MODE:
      return <LearnModeOverlay />;
    default:
      return <></>;
  }
};

const Overlay = () => {
  const { openOverlay, overlayType, closeOverlay } = useOverlayStore(
    (state) => ({
      openOverlay: state.openOverlay,
      overlayType: state.overlayType,
      closeOverlay: state.closeOverlay
    }),
    shallow
  );

  const { setAddWordData } = useGlobalContext();
  let headerString = 'Overlay header text';

  switch (overlayType) {
    case OVERLAY_TYPES.ADD_WORD:
      headerString = 'Add a word';
      break;
    case OVERLAY_TYPES.ADD_THEME:
      headerString = 'Add a theme';
      break;
    case OVERLAY_TYPES.SEARCH:
      headerString = 'Search';
      break;
    case OVERLAY_TYPES.EDIT_WORD:
      headerString = 'Edit word';
      break;
    case OVERLAY_TYPES.MENU:
      headerString = 'Menu';
      break;
    case OVERLAY_TYPES.LOGIN:
      headerString = 'Login';
      break;
    case OVERLAY_TYPES.EDIT_THEME:
      headerString = 'Edit theme';
      break;
    case OVERLAY_TYPES.LEARN_MODE:
      headerString = 'Learn mode';
      break;
    default:
      headerString = '';
  }

  return (
    <div className={styles.overlayWrapper}>
      <div className={styles.overlayFrame}>
        <div className={styles.overlayHeader}>
          {headerString}
          {overlayType !== 'login' && (
            <MiniButton
              type={'closeIcon'}
              onClickF={() => {
                closeOverlay();
                setAddWordData('');
              }}
              additionalStyles={styles.closeButton}
              transparent={true}
            />
          )}
        </div>
        <div className={styles.overlayContent}>{getOverlayTypeContent(overlayType)}</div>
      </div>
      <div
        className={styles.overlayShade}
        onClick={() => {
          if (overlayType !== 'login') {
            closeOverlay();
            setAddWordData('');
          }
        }}
      />
    </div>
  );
};

export default Overlay;
