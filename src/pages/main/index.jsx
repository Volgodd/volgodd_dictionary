import BurgerButton from "../../components/buttons/BurgerButton";
import Search from "../../icons/Search";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <BurgerButton additionalClasses={styles.burgerButton}/>
        <h2>Suomen kurssi</h2>
        <div>
          <Search additionalClasses={styles.searchIcon}/>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
