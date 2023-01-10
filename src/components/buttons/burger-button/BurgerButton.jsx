import styles from './BurgerButton.module.scss';

const BurgerButton = ({ onClickF }) => {
  return (
    <button onClick={() => onClickF()} className={styles.burgerButton}>
      <span></span>
    </button>
  );
};

export default BurgerButton;
