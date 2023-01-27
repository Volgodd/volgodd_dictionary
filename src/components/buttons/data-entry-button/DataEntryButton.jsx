import MiniButton from '../mini-button/MiniButton';
import { deleteLocalDataFromArray } from 'components/buttons/utils';
import styles from './DataEntryButton.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useState } from 'react';
import { deleteWordAction } from 'data/api';
import { findObjectIndex } from 'components/buttons/utils';

const DataEntryButton = ({
  mainCellData,
  secondaryCellData,
  color,
  onClickF,
  expandAreaText,
  wordId,
  dataArray, 
  type
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { jwt, setOverlay, wordData, setWordData } = useGlobalContext();

  const onClickHandler = () => {
    if (onClickF) {
      onClickF();
    } else {
      setIsExpanded(!isExpanded);
    }
  };
  //else здесь нужен потому, что в if нет return, следовательно, выполнение ф не прерывается, если if false, и isExpanded менялось бы всегда
  // запись !isExpanded означает возьми значение isExpanded и поменяй на противоположное

  const examplesExist = () => {
    if (expandAreaText && expandAreaText.split(' ').join('').length > 0) {
      return true;
    } else return false;
  };

  const deleteWord = (wordId) => {
    // deleteLocalDataFromArray(dataArray, wordId);
    console.log('word deleted', wordId)

    deleteWordAction(jwt, wordId).then(() => {
      console.log('+++++++++++')

      const wordArrayIndex = findObjectIndex(wordData, wordId);
  
      const modifiedWordData = [...wordData];

     
      modifiedWordData.splice(wordArrayIndex, 1);

      setWordData(modifiedWordData);
    })
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.textButton} onClick={onClickHandler}>
        <span className={styles.mainCell}>{mainCellData}</span>
        <span className={styles.secondaryCell}>{secondaryCellData}</span>
      </button>
      {isExpanded && (
        <div className={styles.wordUi}>
          <div className={styles.buttonContainer}>
            <MiniButton onClickF={() => setOverlay({ type: 'editWord', metadata: wordId })} />
            <MiniButton type="deleteIcon" onClickF={() => deleteWord(wordId)} />
          </div>
          <div className={styles.description}>
            {examplesExist() ? expandAreaText : 'Examples not found'}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataEntryButton;
