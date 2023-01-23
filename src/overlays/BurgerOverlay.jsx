import { OVERLAY_TYPES } from 'common/constants';
import styles from './BurgerOverlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';

const BurgerOverlay = () => {

  const { burgerOverlay, setBurgerOverlay } = useGlobalContext();

  if (burgerOverlay) {

  return <div className={styles.burgerOverlayWrapper}>fsgsregergsergserg</div>;
  }
};
export default BurgerOverlay;
