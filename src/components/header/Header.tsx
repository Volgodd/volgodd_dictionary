import { OVERLAY_TYPE, ROUTE } from 'common/constants';
import { useLocation, useNavigate } from 'react-router-dom';

import MiniButton from 'components/buttons/mini-button/MiniButton';
import clsx from 'clsx';
import styles from './Header.module.scss';
import useOverlayStore from 'store/overlayStore';

const { SEARCH, EDIT_THEME } = OVERLAY_TYPE;
const { WORDS, MAIN_PAGE, LEARN_MODE } = ROUTE;

type HeaderProps = {
  title?: string;
  themeId?: string;
};

const Header: React.FC<HeaderProps> = ({ title, themeId }) => {
  const openOverlay = useOverlayStore((state) => state.openOverlay);

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const isMainPage = pathname === MAIN_PAGE;
  const isWordsPage = pathname.includes(WORDS);
  const isLearnPage = pathname.includes(LEARN_MODE);

  return (
    <div
      className={clsx(
        styles.wrapper,
        isMainPage && styles.wrapper_mainPage,
        isLearnPage && styles.wrapper_learnPage
      )}>
      {!isMainPage && (
        <div className={styles.backButtonContainer}>
          <MiniButton
            type="backIcon"
            additionalStyles={styles.backButton}
            onClickF={() => navigate(MAIN_PAGE)}
          />
        </div>
      )}

      <div>
        <h2 className={clsx(styles.headerText, isMainPage && styles.headerText_padded)}>{title}</h2>
      </div>

      {isWordsPage && (
        <div>
          <MiniButton
            onClickF={() => openOverlay({ overlayType: EDIT_THEME, overlayMetadata: themeId })}
            type="settingsIcon"
          />
        </div>
      )}

      <MiniButton onClickF={() => openOverlay({ overlayType: SEARCH })} type="searchIcon" />
    </div>
  );
};

export default Header;
