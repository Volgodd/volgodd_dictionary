import BurgerButton from "components/buttons/BurgerButton";
import MiniButton from "components/buttons/mini-button/MiniButton";
import styles from './Header.module.scss';

const Header = ({props}) => {
  return (
    <div className={styles.wrapper}>
        <BurgerButton additionalClasses={styles.burgerButton}/>
        <h2>{props}</h2>
        <MiniButton type={'searchIcon'}/>
      </div>
  )
}

export default Header;