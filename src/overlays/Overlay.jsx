import AddThemeOverlay from './AddThemeOverlay';
import AddWordOverlay from './AddWordOverlay';
import MiniButton from 'components/buttons/mini-button/MiniButton';
import { OVERLAY_TYPES } from './constants';
import SearchOverlay from './SearchOverlay';
import styles from './Overlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';

const getOverlayType = (overlayType) => {
  switch (overlayType) {
    case OVERLAY_TYPES.ADD_WORD:
      return <AddWordOverlay heading={'Add a word'} />;
    case OVERLAY_TYPES.ADD_THEME:
      return <AddThemeOverlay heading={'Add a word'} />;
    case OVERLAY_TYPES.SEARCH:
      return <SearchOverlay heading={'Search'} />;
    default:
      return <></>;
  }
};

const Overlay = () => {
  const { overlayType, setOverlayType } = useGlobalContext();
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
    default:
      <></>;
  }

  return (
    <div className={styles.overlayWrapper}>
      <div className={styles.overlayFrame}>
        <div className={styles.overlayHeader}>
          {headerString}
          <MiniButton
            type={'closeIcon'}
            onClickF={setOverlayType}
            additionalStyles={styles.closeButton}
          />
        </div>

        {getOverlayType(overlayType)}

        <div className="overlayFooter">
          {/* <NavButton name={'Close'} styles={styles.closeButton}/> */}
          {/* <button onClick={() => setOverlayType()}>Close</button> */}
        </div>
      </div>
      <div className={styles.overlayShade} onClick={() => setOverlayType()} />
    </div>
  );
};

export default Overlay;

//close button закрывает оверлей потому, что в setOverlayType в скобках стоит undefined, а по дефолтному значению в свитч  рендерится пустой дом
