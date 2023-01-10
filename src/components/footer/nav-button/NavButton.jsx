import styles from './NavButton.module.scss';

const NavButton = ({ name, onClickF }) => {
  if (!onClickF && !name) {
    return <input type="submit" className={styles.button} value="Save"></input>;
  }

  return (
    <button onClick={onClickF} className={styles.button}>
      <span>{name}</span>
    </button>
  );
};

export default NavButton;
