import BurgerButton from "components/buttons/BurgerButton";
import Search from "icons/Search";
import styles from './Header.module.scss';

const Header = ({props}) => {
  return (
    <div className={styles.wrapper}>
        <BurgerButton additionalClasses={styles.burgerButton}/>
        <h2>{props}</h2>
        <button>
          <Search additionalClasses={styles.searchIcon}/>
        </button>
      </div>
  )
}

export default Header;