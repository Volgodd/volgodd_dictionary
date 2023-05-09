import ActionButton from 'components/buttons/action-button/ActionButton';
import type { DataId } from 'types/data-types';
import MiniButton from 'components/buttons/mini-button/MiniButton';
import React from 'react';
import SelectMenu from 'components/selectMenu/SelectMenu';
import { addWordAction } from 'data/api';
import clsx from 'clsx';
import { copyFromClipboard } from 'common/utils';
import { getNonNullable } from 'types/utils';
import { shallow } from 'zustand/shallow';
import styles from './AddWordOverlay.module.scss';
import useDataStore from 'store/dataStore';
import { useEffect } from 'react';
import useOverlayStore from 'store/overlayStore';
import { useState } from 'react';
import useUserStorage from 'store/userStore';
import { parseThemeData } from 'data/utils';

const AddWordOverlay = () => {
  const jwt = useUserStorage((state) => getNonNullable(state.jwt));
  const [addWordData, setAddWordData] = useState<string>('');

  const { closeOverlay, overlayMetadata } = useOverlayStore(
    (state) => ({
      closeOverlay: state.closeOverlay,
      overlayMetadata: state.overlayMetadata
    }),
    shallow
  );

  useEffect(() => {
    if (overlayMetadata) {
      setAddWordData(overlayMetadata);
    }
  }, [overlayMetadata, setAddWordData]);

  const { wordData, setWordData, themeData, setThemeData } = useDataStore(
    (state) => ({
      wordData: getNonNullable(state.wordData),
      setWordData: state.setWordData,
      themeData: getNonNullable(state.themeData),
      setThemeData: state.setThemeData
    }),
    shallow
  );

  const [translation, setTranslation] = useState<string>('');
  const [theme, setTheme] = useState<DataId>(themeData[0].id);
  const [examples, setExamples] = useState<string>('');

  const selectMenuData = themeData.map((themeDataEntry) => {
    return { value: themeDataEntry.id, text: themeDataEntry.name };
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newWordData = {
      foreign: addWordData,
      native: translation,
      examples: examples,
      themeIdList: [theme]
    };

    addWordAction({ jwt, data: newWordData }).then((data) => {
      console.log('word added', data);
      const newWordData = [data, ...wordData];
      setWordData(newWordData);

      setThemeData(themeData);

      closeOverlay();
      setAddWordData('');
    });
  };

  const handleSelectMenu = (value: string) => {
    setTheme(value);
  };

  const handleBufferButtonClick = async (inputType: string) => {
    const buffer = await copyFromClipboard();

    if (!buffer) {
      return;
    }
    switch (inputType) {
      case 'word':
        setAddWordData(buffer);
        break;
      case 'translation':
        setTranslation(buffer);
        break;
      case 'examples':
        setExamples(buffer);
        break;
      default:
        return;
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.addWordInterface}>
      <div className={clsx(styles.addWordInterfaceRow, styles.addWordInterfaceRow_withButton)}>
        <input
          type="text"
          placeholder="Word"
          className="inputElement"
          value={addWordData}
          onChange={(e) => setAddWordData(e.target.value)}
          required
        />
        <MiniButton type="buffer" onClickF={() => handleBufferButtonClick('word')} />
      </div>
      <div className={clsx(styles.addWordInterfaceRow, styles.addWordInterfaceRow_withButton)}>
        <input
          type="text"
          placeholder="Tanslation / meaning"
          className="inputElement"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          required
        />
        <MiniButton type="buffer" onClickF={() => handleBufferButtonClick('translation')} />
      </div>
      <div className={clsx(styles.addWordInterfaceRow, styles.addWordInterfaceRow_withButton)}>
        <textarea
          className={clsx(styles.addWordTextarea, 'inputElement inputElement_textArea')}
          placeholder="Examples"
          defaultValue={examples}
          onChange={(e) => setExamples(e.target.value)}
        />
        <MiniButton type="buffer" onClickF={() => handleBufferButtonClick('examples')} />
      </div>
      <SelectMenu data={selectMenuData} onSelect={handleSelectMenu} />
      <ActionButton name={'Save'} />
    </form>
  );
};
export default AddWordOverlay;
