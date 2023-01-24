import BurgerButton from 'components/buttons/burger-button/BurgerButton';
import MiniButton from 'components/buttons/mini-button/MiniButton';
import { OVERLAY_TYPES } from 'common/constants';
import styles from './Header.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useLocation } from '../../../node_modules/react-router-dom/dist/index';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';

const { SEARCH, MENU } = OVERLAY_TYPES;

const Header = ({ props }) => {
  const { setOverlay, burgerOverlay, setBurgerOverlay } = useGlobalContext();

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
      <h2>{props}</h2>
      <MiniButton onClickF={() => setOverlay({ type: SEARCH })} type={'searchIcon'} />
      <BurgerButton onClickF={() => setBurgerOverlay(true)} />
    </div>
  );
};

export default Header;
