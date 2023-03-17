import { findObjectById, findObjectIndex } from 'common/utils';

import ActionButton from 'components/buttons/action-button/ActionButton';
import React from 'react';
import SelectMenu from 'components/selectMenu/SelectMenu';
import { editWordAction } from 'data/api';
import { shallow } from 'zustand/shallow';
import styles from './EditDataOverlay.module.scss';
import useDataStore from 'store/dataStore';
import useOverlayStore from 'store/overlayStore';
import { useState } from 'react';
import useUserStorage from 'store/userStore';

const EditDataOverlay = () => {
  const jwt = useUserStorage((state) => state.jwt);

  const { wordData, setWordData, themeData } = useDataStore(
    (state) => ({
      wordData: state.wordData,
      setWordData: state.setWordData,
      themeData: state.themeData
    }),
    shallow
  );

  const { overlayMetadata, closeOverlay } = useOverlayStore(
    (state) => ({ closeOverlay: state.closeOverlay, overlayMetadata: state.overlayMetadata }),
    shallow
  );

  const operatingWord = findObjectById(wordData, overlayMetadata);
  const { id, foreign, native, themeIdList, examples } = operatingWord;
  const wordIndex = findObjectIndex(wordData, overlayMetadata);

  const [editForeign, setEditForeign] = useState(foreign);
  const [editNative, setEditNative] = useState(native);
  const [editThemeIdArr, setEditThemeIdArr] = useState(themeIdList);
  const [editExamples, setEditExamples] = useState(examples);

  const selectMenuData = themeData.map((themeDataEntry) => {
    return { value: themeDataEntry.id, text: themeDataEntry.name };
  });

  const currentThemeName = () => {
    const index = selectMenuData.findIndex((x) => x.value === themeIdList.toString());
    return selectMenuData[index].value;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newWordData = {
      foreign: editForeign,
      native: editNative,
      examples: editExamples,
      themeIdList: editThemeIdArr
    };

    editWordAction({ jwt, data: newWordData, id }).then((data) => {
      console.log('word edited', data);

      const wordDataCopy = [...wordData];
      wordDataCopy.splice(wordIndex, 1, data);
      setWordData(wordDataCopy);
      closeOverlay();
    });
  };

  const handleSelectMenu = (value) => {
    setEditThemeIdArr([value]);
  };

  return (
    <form onSubmit={submitHandler} className={styles.editWordInterface}>
      <div className={styles.editWordInterfaceRow}>
        <input
          type="text"
          placeholder="Word"
          className="inputElement"
          value={editForeign}
          onChange={(e) => setEditForeign(e.target.value)}
          required
        />
      </div>
      <div className={styles.editWordInterfaceRow}>
        <input
          type="text"
          placeholder="Tanslation / meaning"
          className="inputElement"
          value={editNative}
          onChange={(e) => setEditNative(e.target.value)}
          required
        />
      </div>
      <div className={styles.textareaContainer}>
        <textarea
          className="inputElement inputElement_textArea"
          defaultValue={editExamples}
          onChange={(e) => setEditExamples(e.target.value)}></textarea>
      </div>
      <div>
        <SelectMenu
          additionalStyles={styles.dropdown}
          defaultValue={currentThemeName()}
          data={selectMenuData}
          onSelect={handleSelectMenu}
        />
      </div>
      <ActionButton name={'Save'} styles={styles.saveButton} />
    </form>
  );
};

export default EditDataOverlay;
