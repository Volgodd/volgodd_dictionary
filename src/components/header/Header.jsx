import MiniButton from 'components/buttons/mini-button/MiniButton';
import { OVERLAY_TYPES } from 'common/constants';
import styles from './Header.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useLocation } from '../../../node_modules/react-router-dom/dist/index';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import { findObjectIndex } from 'components/utils';

const { SEARCH, EDIT_THEME } = OVERLAY_TYPES;

const Header = ({ title, themeId }) => {
  const { setOverlay, themeData } = useGlobalContext();

  let navigate = useNavigate();
  const urlLocation = useLocation();
  const { pathname } = urlLocation;

  const themeIndex = findObjectIndex(themeData, );

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
        {pathname !== '/' && 
        <MiniButton onClickF={()=> setOverlay({type: EDIT_THEME, metadata: themeId })} type={'settingsIcon'}/>
        }
      </div>
      <MiniButton onClickF={() => setOverlay({ type: SEARCH })} type={'searchIcon'} />
    </div>
  );
};

export default Header;
