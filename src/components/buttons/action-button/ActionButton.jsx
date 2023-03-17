import clsx from 'clsx';
import styles from './ActionButton.module.scss';

const ActionButton = ({ name, onClickF, additionalStyles }) => {
  if (!onClickF && !name) {
    return <input type="submit" className={styles.button} value="Save"></input>;
  }

  return (
    <button onClick={onClickF} className={clsx(styles.button, additionalStyles)}>
      <span>{name}</span>
    </button>
  );
};

export default ActionButton;
