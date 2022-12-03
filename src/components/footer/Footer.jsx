import NavButton from '../buttons/NavButton'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <NavButton name={'Add a theme'} styles={styles.navButton}/>
      <NavButton name={'Learn mode'} styles={styles.navButton}/>
      <NavButton name={'Add a word'} styles={styles.navButton}/>
    </div>
  )
}
export default Footer;