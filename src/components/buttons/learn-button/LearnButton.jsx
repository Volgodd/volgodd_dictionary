import clsx from 'clsx';
import styles from './LearnButton.module.scss';


const LearnButton = ({ name, onClickF, additionalStyles }) => {
  if (!onClickF && !name) {
    return <input type="submit" className={styles.button} value="Save"></input>;
  }

  return (
    <button onClick={onClickF} className={clsx(styles.button, additionalStyles)}>
      <span>{name}</span>
    </button>
  );
};

export default LearnButton;
