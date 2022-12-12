import NavButton from '../buttons/NavButton'
import { OVERLAY_TYPES } from 'overlays/constants'
import styles from './Footer.module.scss'
import useGlobalContext from 'hooks/useGlobalContext'

const {ADD_WORD, ADD_THEME} = OVERLAY_TYPES

const Footer = () => {
  const {setOverlayType, murmur} = useGlobalContext()

  return (
    <div className={styles.footerWrapper}>
      <NavButton name={'Add a theme'} onClickF={() => setOverlayType(ADD_THEME)} styles={styles.navButton}/>
      <NavButton name={'Learn mode'} styles={styles.navButton}/>
      <NavButton name={'Add a word'} onClickF={() => setOverlayType(ADD_WORD)} styles={styles.navButton}/>
    </div>
  )
}
export default Footer;