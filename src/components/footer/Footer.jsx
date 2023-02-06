import NavButton from './nav-button/NavButton';
import { OVERLAY_TYPES } from 'common/constants';
import styles from './Footer.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';

const { ADD_WORD, ADD_THEME, EDIT_THEME } = OVERLAY_TYPES;

const Footer = ({themePage, wordPage}) => {
  const { setOverlay } = useGlobalContext();

  return (
      <div className={styles.footerWrapper}>
        {themePage && 
        <div className={styles.footerContent}>
         <NavButton name='Add a theme' onClickF=  {() => setOverlay({ type: ADD_THEME })} />
          <NavButton name='Learn mode' />
          <NavButton name='Add a word' onClickF={() => setOverlay({ type: ADD_WORD })} />
        </div>}

        {wordPage &&
        <div className={styles.footerContent}>
        <NavButton name='Edit theme' onClickF={() => setOverlay({ type: EDIT_THEME })}/>
         <NavButton name='Learn mode' />
         <NavButton name='Delete theme' additionalStyles={styles.deleteButton} />
       </div>
        }
      </div>

  )
    

};
export default Footer;
