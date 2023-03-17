import ActionButton from 'components/buttons/action-button/ActionButton';
import React from 'react';
import { addThemeAction } from 'data/api';
import { shallow } from 'zustand/shallow';
import styles from './AddThemeOverlay.module.scss';
import useDataStore from 'store/dataStore';
import useOverlayStore from 'store/overlayStore';
import { useState } from 'react';
import useUserStorage from 'store/userStore';

const AddThemeOverlay = () => {
  const [theme, setTheme] = useState('');

  const closeOverlay = useOverlayStore((state) => state.closeOverlay);
  const jwt = useUserStorage((state) => state.jwt);
  const { themeData, setThemeData } = useDataStore(
    (state) => ({ themeData: state.themeData, setThemeData: state.setThemeData }),
    shallow
  );

  const submitHandler = (e) => {
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
      <ActionButton name="Save" styles={styles.saveButton} />
    </form>
  );
};

export default AddThemeOverlay;
