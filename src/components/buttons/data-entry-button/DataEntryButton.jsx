import MiniButton from '../mini-button/MiniButton';
import { OVERLAY_TYPES } from 'common/constants';
import clsx from 'clsx';
import { deleteWordAction } from 'data/api';
import { findObjectIndex } from 'common/utils';
import styles from './DataEntryButton.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useState } from 'react';

const DataEntryButton = ({
  mainCellData,
  secondaryCellData,
  color,
  onClickF,
  expandAreaText,
  wordId
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { EDIT_WORD } = OVERLAY_TYPES;

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
    console.log('word deleted', wordId);

    deleteWordAction(jwt, wordId).then(() => {
      const wordArrayIndex = findObjectIndex(wordData, wordId);
      const modifiedWordData = [...wordData];
      modifiedWordData.splice(wordArrayIndex, 1);
      setWordData(modifiedWordData);
    });
  };

  const getColor = (color) => {
    switch (color) {
      case 'orange':
        return styles.textButton_accent2;
      case 'mint':
        return styles.textButton_accent3;
      default:
        return styles.textButton_accent1;
    }
  };

  return (
    <div className={styles.wrapper}>
      <button className={clsx(styles.textButton, getColor(color))} onClick={onClickHandler}>
        <span className={styles.mainCell}>{mainCellData}</span>
        <span className={styles.secondaryCell}>{secondaryCellData}</span>
      </button>
      {isExpanded && (
        <div className={styles.wordUi}>
          <div className={styles.buttonContainer}>
            <MiniButton onClickF={() => setOverlay({ type: EDIT_WORD, metadata: wordId })} />
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
