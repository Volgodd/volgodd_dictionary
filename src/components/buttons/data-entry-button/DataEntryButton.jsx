import styles from './DataEntryButton.module.scss';
import { useState } from 'react';

const DataEntryButton = ({ mainCellData, secondaryCellData, color, onClickF, expandAreaText }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const onClickHandler = () => {
    if (onClickF) {
      onClickF();
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const textAreaIsNotEmpty = () => {};

  //else здесь нужен потому, что в if нет return, следовательно, выполнение ф не прерывается, если if false, и isExpanded менялось бы всегда
  // запись !isExpanded означает возьми значение isExpanded и поменяй на противоположное

  return (
    <div className={styles.wrapper}>
      <button className={styles.textButton} onClick={onClickHandler}>
        <span className={styles.mainCell}>{mainCellData}</span>
        <span className={styles.secondaryCell}>{secondaryCellData}</span>
      </button>
      {isExpanded && (
        <div className={styles.wordUi}>
          <div className={styles.buttonContainer}></div>
          <div className={styles.description}>{expandAreaText || 'No word usage examples'}</div>
        </div>
      )}
    </div>
  );
};

export default DataEntryButton;
