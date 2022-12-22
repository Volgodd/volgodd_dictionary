import BurgerButton from 'components/buttons/BurgerButton';
import MiniButton from 'components/buttons/mini-button/MiniButton';
import { OVERLAY_TYPES } from 'overlays/constants';
import styles from './Header.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';

const { SEARCH } = OVERLAY_TYPES;

const Header = ({ props }) => {
  const { setOverlayType } = useGlobalContext();

  return (
    <div className={styles.wrapper}>
      <BurgerButton additionalClasses={styles.burgerButton} />
      <h2>{props}</h2>
      <MiniButton onClickF={() => setOverlayType(SEARCH)} type={'searchIcon'} />
    </div>
  );
};

export default Header;
