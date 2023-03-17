import styles from './LearnButton.module.scss';

const LearnButton = ({ name, onClickF }) => {
  if (!onClickF && !name) {
    return <input type="submit" className={styles.button} value="Save"></input>;
  }

  return (
    <button onClick={onClickF} className={styles.button}>
      <span>{name}</span>
    </button>
  );
};
export default LearnButton;
