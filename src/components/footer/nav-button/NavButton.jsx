import clsx from 'clsx';
import styles from './NavButton.module.scss';


const NavButton = ({ name, onClickF, additionalStyles }) => {
  if (!onClickF && !name) {
    return <input type="submit" className={styles.button} value="Save"></input>;
  }

  return (
    <button onClick={onClickF} className={clsx(styles.button, additionalStyles)}>
      <span>{name}</span>
    </button>
  );
};

export default NavButton;
