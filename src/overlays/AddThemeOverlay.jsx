import { DEFAULT_OVERLAY_STATE } from 'common/constants';
import NavButton from 'components/footer/nav-button/NavButton';
import React from 'react';
import { addThemeAction } from 'data/api';
import styles from './AddThemeOverlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useState } from 'react';

const AddThemeOverlay = () => {
  const [theme, setTheme] = useState('');

  const { jwt, setOverlay, themeData, setRawThemeData } = useGlobalContext();

  const submitHandler = (e) => {
    e.preventDefault();

    const newThemeData = {
      name: theme
    };

    console.log({ jwt, data: newThemeData });

    addThemeAction(jwt, newThemeData).then(({ data }) => {
      console.log('theme added', data);

      const newRawThemeData = [...themeData, newThemeData];
      setRawThemeData(newRawThemeData);
      setOverlay(DEFAULT_OVERLAY_STATE);
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
      <NavButton name="Save" styles={styles.saveButton} />
    </form>
  );
};
export default AddThemeOverlay;
