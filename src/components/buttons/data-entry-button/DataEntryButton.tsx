import { useRef, useState } from 'react';

import ActionButton from '../action-button/ActionButton';
import type { DataId } from 'types/data-types';
import MiniButton from '../mini-button/MiniButton';
import { OVERLAY_TYPE } from 'common/constants';
import clsx from 'clsx';
import { deleteItemFromArr } from 'data/utils';
import { deleteWordAction } from 'data/api';
import { findObjectIndex } from 'common/utils';
import { getNonNullable } from 'types/utils';
import { shallow } from 'zustand/shallow';
import styles from './DataEntryButton.module.scss';
import useDataStore from 'store/dataStore';
import useOverlayStore from 'store/overlayStore';
import useUserStorage from 'store/userStore';

const { EDIT_WORD } = OVERLAY_TYPE;

enum COLOR {
  ORANGE = 'orange',
  MINT = 'mint'
}

const getColor = (color: string): string => {
  switch (color) {
    case COLOR.ORANGE:
      return styles.textButton_accent2;
    case COLOR.MINT:
      return styles.textButton_accent3;
    default:
      return styles.textButton_accent1;
  }
};

type DataEntryButtonProps = {
  mainCellData: string;
  secondaryCellData: string;
  color?: string;
  onClickF?: () => void;
  expandAreaText?: string;
  wordId?: DataId;
};

const DataEntryButton: React.FC<DataEntryButtonProps> = ({
  mainCellData,
  secondaryCellData,
  color,
  onClickF,
  expandAreaText,
  wordId
}) => {
  const jwt = useUserStorage((state) => getNonNullable(state.jwt));
  const openOverlay = useOverlayStore((state) => state.openOverlay);
  const { wordData, setWordData, themeData, setThemeData } = useDataStore(
    (state) => ({
      wordData: getNonNullable(state.wordData),
      setWordData: state.setWordData,
      themeData: getNonNullable(state.themeData),
      setThemeData: state.setThemeData
    }),
    shallow
  );

  const [isHidden, setIsHidden] = useState<boolean>(true);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const onClickHandler = () => {
    if (onClickF) {
      onClickF();
    } else {
      setIsHidden(!isHidden);
    }
  };
  //else здесь нужен потому, что в if нет return, следовательно, выполнение ф не прерывается, если if false, и isExpanded менялось бы всегда
  // запись !isExpanded означает возьми значение isExpanded и поменяй на противоположное

  const examplesExist = () => {
    if (expandAreaText && expandAreaText.split(' ').join('').length > 0) {
      return true;
    }

    return false;
  };

  const openModal = () => {
    dialogRef.current && dialogRef.current.showModal();
  };

  const deleteWord = (wordId: DataId) => {
    deleteWordAction({ jwt, id: wordId })
      .then((data) => {
        const wordArrayIndex = findObjectIndex(wordData, wordId);
        const modifiedWordData = deleteItemFromArr(wordData, wordArrayIndex);

        setWordData(modifiedWordData);
        setThemeData(themeData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={clsx(styles.textButton, color && getColor(color))}
        onClick={onClickHandler}>
        <span className={styles.mainCell}>{mainCellData}</span>
        <span className={styles.secondaryCell}>{secondaryCellData}</span>
      </button>
      <div className={styles.accordionContent} aria-hidden={isHidden}>
        <div className={styles.overflowClipper}>
          <div className={styles.wordUi}>
            <div className={styles.buttonContainer}>
              <MiniButton
                type="penIcon"
                onClickF={() => openOverlay({ overlayType: EDIT_WORD, overlayMetadata: wordId })}
              />
              <MiniButton type="deleteIcon" onClickF={() => openModal()} />
            </div>
            <div className={styles.description}>
              {examplesExist() ? expandAreaText : 'Examples not found'}
            </div>
          </div>
        </div>
      </div>
      <dialog ref={dialogRef} className={styles.dialog}>
        <div className={styles.dialogWrapper}>
          <div className={styles.dialogText}>Are your sure you want to delete word?</div>
          <ActionButton
            name="Yes"
            additionalStyles={styles.button}
            onClickF={() => wordId && deleteWord(wordId)}
          />
          <ActionButton
            name="Cancel"
            additionalStyles={styles.redButton}
            onClickF={() => dialogRef.current?.close()}
          />
        </div>
      </dialog>
    </div>
  );
};
export default DataEntryButton;
