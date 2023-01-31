import { DEFAULT_OVERLAY_STATE } from 'common/constants';
import NavButton from 'components/footer/nav-button/NavButton';
import React from 'react';
import { editThemeAction } from 'data/api';
import styles from './EditThemeOverlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useState } from 'react';
import { findObjectIndex } from 'components/utils';

const EditThemeOverlay = () => {
  const { jwt, setOverlay, themeData, overlay, setRawThemeData } = useGlobalContext()

  const themeId = overlay.metadata;
  const themeIndex = findObjectIndex(themeData, themeId);
  const themeName = themeData[themeIndex].name;

  const [theme, setTheme] = useState(themeName);

  console.log(themeId, '==========', themeIndex, '++++++++++', themeData[themeIndex].name); 


  const submitHandler = (e) => {
    e.preventDefault();

    const newThemeData = {
      name: theme,
      id: themeId
    };

    console.log({ jwt, data: newThemeData });

    editThemeAction(jwt, newThemeData, themeId).then(({ data }) => {
      console.log('theme edited', data);

      const newThemeDataWithId = {...newThemeData, themeId};
      const themeDataCopy = [...themeData];

      themeDataCopy.splice(themeIndex, 1, newThemeDataWithId);

      setRawThemeData(themeDataCopy);

      setOverlay(DEFAULT_OVERLAY_STATE);
    });
  };

  return (
    <form onSubmit={submitHandler} className={styles.addThemeInterface}>
      <div className={styles.addThemeInterfaceRow}>
        <input
          type="text"
          className="inputElement"
          onChange={(e) => setTheme(e.target.value)}
          value={theme}
          required
        />
      </div>
      <div className={styles.buttonContainer}>
      <NavButton name="Save" additionalStyles={styles.button}/>
      <NavButton name="Delete" additionalStyles={styles.deleteButton}/>
      </div>
    </form>
  );
};
export default EditThemeOverlay;
