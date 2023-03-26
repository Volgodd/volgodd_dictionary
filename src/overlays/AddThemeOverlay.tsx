import ActionButton from 'components/buttons/action-button/ActionButton';
import React from 'react';
import { addThemeAction } from 'data/api';
import { getNonNullable } from 'types/utils';
import { shallow } from 'zustand/shallow';
import styles from './AddThemeOverlay.module.scss';
import useDataStore from 'store/dataStore';
import useOverlayStore from 'store/overlayStore';
import { useState } from 'react';
import useUserStorage from 'store/userStore';

const AddThemeOverlay = () => {
  const jwt = useUserStorage((state) => getNonNullable(state.jwt));
  const [theme, setTheme] = useState<string>('');

  const closeOverlay = useOverlayStore((state) => state.closeOverlay);
  const { themeData, setThemeData } = useDataStore(
    (state) => ({ themeData: getNonNullable(state.themeData), setThemeData: state.setThemeData }),
    shallow
  );

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newThemeData = {
      name: theme
    };

    addThemeAction({ jwt, data: newThemeData }).then((rawData) => {
      console.log('theme added', rawData);

      const newThemeData = [...themeData, rawData];
      setThemeData(newThemeData);
      closeOverlay();
    });
  };

  return (
    <form onSubmit={submitHandler} className={styles.addThemeInterface}>
      <div className={styles.addThemeInterfaceRow}>
        <input
          type="text"
          placeholder="Theme name"
          className="inputElement"
          onChange={(e) => setTheme(e.target.value)}
          value={theme}
          required
        />
      </div>
      <ActionButton name="Save" additionalStyles={styles.saveButton} />
    </form>
  );
};

export default AddThemeOverlay;
