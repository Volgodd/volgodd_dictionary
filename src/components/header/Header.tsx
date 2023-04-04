import { useLocation, useNavigate } from 'react-router-dom';

import MiniButton from 'components/buttons/mini-button/MiniButton';
import { OVERLAY_TYPES } from 'common/constants';
import styles from './Header.module.scss';
import useOverlayStore from 'store/overlayStore';

const { SEARCH, EDIT_THEME } = OVERLAY_TYPES;

type HeaderProps = {
  title?: string 
  themeId?: string
}
const Header: React.FC<HeaderProps> = ({ title, themeId }) => {
  const openOverlay = useOverlayStore((state) => state.openOverlay);

  let navigate = useNavigate();
  const urlLocation = useLocation();
  const { pathname } = urlLocation;

  return (
    <div className={styles.wrapper}>
      <div className={styles.backButtonContainer}>
        {pathname !== '/' && (
          <MiniButton
            type={'backIcon'}
            additionalStyles={styles.backButton}
            onClickF={() => navigate(-1)}
          />
        )}
      </div>
      <h2>{title}</h2>
      <div>
        {pathname !== '/' && (
          <MiniButton
            onClickF={() => openOverlay({ overlayType: EDIT_THEME, overlayMetadata: themeId })}
            type={'settingsIcon'}
          />
        )}
      </div>
      <MiniButton onClickF={() => openOverlay({ overlayType: SEARCH })} type={'searchIcon'} />
    </div>
  );
};

export default Header;
