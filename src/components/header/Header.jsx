import BurgerButton from 'components/buttons/burger-button/BurgerButton';
import MiniButton from 'components/buttons/mini-button/MiniButton';
import { OVERLAY_TYPES } from 'common/constants';
import styles from './Header.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';

const { SEARCH, MENU } = OVERLAY_TYPES;

const Header = ({ props }) => {
  const { setOverlay } = useGlobalContext();

  return (
    <div className={styles.wrapper}>
      <BurgerButton onClickF={() => setOverlay({ type: MENU })} />
      <h2>{props}</h2>
      <MiniButton onClickF={() => setOverlay({ type: SEARCH })} type={'searchIcon'} />
    </div>
  );
};

export default Header;
