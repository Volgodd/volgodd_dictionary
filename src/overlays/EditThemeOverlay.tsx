import { deleteThemeAction, editThemeAction } from 'data/api';

import ActionButton from 'components/buttons/action-button/ActionButton';
import { findObjectIndex } from 'common/utils';
import { getNonNullable } from 'types/utils';
import { shallow } from 'zustand/shallow';
import styles from './EditThemeOverlay.module.scss';
import useDataStore from 'store/dataStore';
import useOverlayStore from 'store/overlayStore';
import { useState } from 'react';
import useUserStorage from 'store/userStore';
import Input from 'components/input/Input';

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

  const { wordData, themeData, setThemeData } = useDataStore(
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

  // const { themeIdList } = wordData;

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
    const alertMessage =
      'Are your sure you want to delete theme? All words in current theme will be deleted';
    if (confirm(alertMessage) === true) {
      deleteThemeAction({ jwt, id: themeId }).then(() => {
        const themeDataCopy = [...themeData];
        themeDataCopy.splice(themeIndex, 1);
        setThemeData(themeDataCopy);
        closeOverlay();
      });
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.addThemeInterface}>
        <div className={styles.addThemeInterfaceRow}>
          <Input
            onChangeF={(e:  React.ChangeEvent<HTMLInputElement>) =>  setTheme(e.target.value)}
            customValue={theme}
          />
        </div>
        <div className={styles.buttonContainer}>
          <ActionButton name="Save" additionalStyles={styles.button} />
        </div>
      </form>
      <div className={styles.deleteButtonWrapper}>
        <ActionButton
          name="Delete"
          additionalStyles={styles.deleteButton}
          onClickF={() => deleteTheme()}
        />
      </div>
    </>
  );
};
export default EditThemeOverlay;
