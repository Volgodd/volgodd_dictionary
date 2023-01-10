/* eslint-disable no-restricted-globals */

import { DEFAULT_OVERLAY_STATE, OVERLAY_TYPES } from 'common/constants';

import AddThemeOverlay from './AddThemeOverlay';
import AddWordOverlay from './AddWordOverlay';
import BurgerOverlay from './BurgerOverlay';
import EditDataOverlay from './EditDataOverlay';
import Login from './Login';
import MiniButton from 'components/buttons/mini-button/MiniButton';
import SearchOverlay from './SearchOverlay';
import styles from './Overlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';

const getOverlayType = (overlayType) => {
  switch (overlayType) {
    case OVERLAY_TYPES.ADD_WORD:
      return <AddWordOverlay />;
    case OVERLAY_TYPES.ADD_THEME:
      return <AddThemeOverlay />;
    case OVERLAY_TYPES.SEARCH:
      return <SearchOverlay />;
    case OVERLAY_TYPES.EDIT_WORD:
      return <EditDataOverlay />;
    case OVERLAY_TYPES.MENU:
      return <BurgerOverlay />;
    case OVERLAY_TYPES.LOGIN:
      return <Login />;
    default:
      return <></>;
  }
};

const Overlay = () => {
  const { overlay, setOverlay, wordData, themeData } = useGlobalContext();
  let headerString = 'Overlay header text';

  switch (overlay.type) {
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
    default:
      headerString = 'Edit theme';
  }

  const closeSafeguard = () => {
    const alertMessage = 'Are your sure you want to close? All unsave data will be missing';

    // if (wordData || themeData || )
    if (confirm(alertMessage) === true) {
      setOverlay(DEFAULT_OVERLAY_STATE);
    } else return;
  };

  return (
    <div className={styles.overlayWrapper}>
      <div className={styles.overlayFrame}>
        <div className={styles.overlayHeader}>
          {headerString}
          <MiniButton
            type={'closeIcon'}
            onClickF={() => setOverlay(DEFAULT_OVERLAY_STATE)}
            additionalStyles={styles.closeButton}
            transparent={true}
          />
        </div>
        <div className={styles.overlayContent}>{getOverlayType(overlay.type)}</div>

        <div className="overlayFooter">
          {/* <NavButton name={'Close'} styles={styles.closeButton}/> */}
          {/* <button onClick={() => setOverlayType()}>Close</button> */}
        </div>
      </div>
      <div className={styles.overlayShade} onClick={() => overlay.type !== 'login' && setOverlay(DEFAULT_OVERLAY_STATE)} />
    </div>
  );
};

export default Overlay;

//close button закрывает оверлей потому, что в setOverlayType в скобках стоит undefined, а по дефолтному значению в свитч  рендерится пустой дом
