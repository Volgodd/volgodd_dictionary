import { useLocation, useNavigate } from 'react-router-dom';

import MiniButton from 'components/buttons/mini-button/MiniButton';
import { OVERLAY_TYPES } from 'common/constants';
import clsx from 'clsx';
import styles from './Header.module.scss';
import useOverlayStore from 'store/overlayStore';

const { SEARCH, EDIT_THEME } = OVERLAY_TYPES;

type HeaderProps = {
  title?: string;
  themeId?: string;
};
const Header: React.FC<HeaderProps> = ({ title, themeId }) => {
  const openOverlay = useOverlayStore((state) => state.openOverlay);

  let navigate = useNavigate();
  const urlLocation = useLocation();
  const { pathname } = urlLocation;

  const isMainPage = pathname === '/';

  return (
    <div className={clsx(styles.wrapper, isMainPage && styles.wrapper_mainPage)}>
      {!isMainPage && (
        <div className={styles.backButtonContainer}>
          <MiniButton
            type={'backIcon'}
            additionalStyles={styles.backButton}
            onClickF={() => navigate(-1)}
          />
        </div>
      )}

    <div className={styles.headerTextContainer}>
      <h2 className={clsx(styles.headerText, isMainPage && styles.headerText_padded)}>{title}</h2>
    </div>

      {!isMainPage && (
        <div>
          <MiniButton
            onClickF={() => openOverlay({ overlayType: EDIT_THEME, overlayMetadata: themeId })}
            type={'settingsIcon'}
          />
        </div>
      )}

      <MiniButton onClickF={() => openOverlay({ overlayType: SEARCH })} type={'searchIcon'} />
    </div>
  );
};

export default Header;
