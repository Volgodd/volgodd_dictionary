import NavButton from './nav-button/NavButton';
import { OVERLAY_TYPES } from 'overlays/constants';
import styles from './Footer.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';

const { ADD_WORD, ADD_THEME } = OVERLAY_TYPES;

const Footer = () => {
  const { setOverlayType, murmur } = useGlobalContext();

  return (
    <div className={styles.footerWrapper}>
      <NavButton name={'Add a theme'} onClickF={() => setOverlayType(ADD_THEME)} />
      <NavButton name={'Learn mode'} />
      <NavButton name={'Add a word'} onClickF={() => setOverlayType(ADD_WORD)} />
    </div>
  );
};
export default Footer;
