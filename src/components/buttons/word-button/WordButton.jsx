import styles from './WordButton.module.scss';

const WordButton = ({ word, translation, onClickF }) => {
  return (
    <button className={styles.textButton} onClick={(e) => onClickF()}>
      <span>{word}</span>
      <span>{translation}</span>
    </button>
  );
};

export default WordButton;
