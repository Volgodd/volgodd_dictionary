import { deleteThemeAction, editThemeAction } from 'data/api';
import { useRef, useState } from 'react';

import ActionButton from 'components/buttons/action-button/ActionButton';
import Input from 'components/input/Input';
import { findObjectIndex } from 'common/utils';
import { getNonNullable } from 'types/utils';
import { shallow } from 'zustand/shallow';
import styles from './EditThemeOverlay.module.scss';
import useDataStore from 'store/dataStore';
import useOverlayStore from 'store/overlayStore';
import useUserStorage from 'store/userStore';

// eslint-disable-line no-alert
/* eslint-disable no-restricted-globals */

const EditThemeOverlay = () => {
  const { overlayMetadata, closeOverlay } = useOverlayStore(
    (state) => ({
      closeOverlay: state.closeOverlay,
      overlayMetadata: getNonNullable(state.overlayMetadata)
    }),
    shallow
  );

  const jwt = useUserStorage((state) => getNonNullable(state.jwt));

  const { themeData, setThemeData } = useDataStore(
    (state) => ({
      wordData: getNonNullable(state.wordData),
      setWordData: state.setWordData,
      themeData: getNonNullable(state.themeData),
      setThemeData: state.setThemeData
    }),
    shallow
  );

  const themeId = overlayMetadata;
  const themeIndex = findObjectIndex(themeData, themeId);
  const themeName = themeData[themeIndex].name;

  const [theme, setTheme] = useState<string>(themeName);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newThemeData = {
      name: theme,
      id: themeId,
      wordCount: 0
    };

    // console.log({ jwt, data: newThemeData }, '====', newThemeData);

    editThemeAction({ jwt, data: newThemeData, id: themeId }).then((data) => {
      console.log('theme edited', data);

      // const newThemeDataWithId = { ...newThemeData, themeId };
      // const themeDataCopy = [...themeData];

      // themeDataCopy.splice(themeIndex, 1, newThemeData);

      const themeDataCopy = themeData.map((themeDataEntry, index) => {
        if (index === themeIndex) {
          return newThemeData;
        }

        return themeDataEntry;
      });

      setThemeData(themeDataCopy);
      closeOverlay();
    });
  };

  const deleteTheme = () => {
    deleteThemeAction({ jwt, id: themeId }).then(() => {
      const themeDataCopy = [...themeData];
      themeDataCopy.splice(themeIndex, 1);
      setThemeData(themeDataCopy);
      dialogRef.current && dialogRef.current.close();
      closeOverlay();
    });

    console.log('theme deleted');
  };

  const openModal = () => {
    console.log('show M');
    dialogRef.current && dialogRef.current.showModal();
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.addThemeInterface}>
        <div className={styles.addThemeInterfaceRow}>
          <Input
            onChangeF={(e: React.ChangeEvent<HTMLInputElement>) => setTheme(e.target.value)}
            customValue={theme}
          />
        </div>
        <div className={styles.buttonContainer}>
          <ActionButton name="Save" additionalStyles={styles.button} />
        </div>
      </form>
      <div className={styles.redButtonWrapper}>
        <ActionButton
          name="Delete"
          additionalStyles={styles.redButton}
          onClickF={() => openModal()}
        />
      </div>
      {/* dialog был отдельным компонентом, но при этом пропадал ::backdrop и top-layer, позиционирование сбивалось */}
      <dialog ref={dialogRef} className={styles.dialog}>
        <div className={styles.dialogWrapper}>
          <div className={styles.dialogText}>
            Are your sure you want to delete theme? All words in current theme will be deleted
          </div>
          <ActionButton
            name="Yes"
            additionalStyles={styles.button}
            onClickF={() => deleteTheme()}
          />
          <ActionButton
            name="Cancel"
            additionalStyles={styles.redButton}
            onClickF={() => dialogRef.current?.close()}
          />
        </div>
      </dialog>
    </>
  );
};
export default EditThemeOverlay;
