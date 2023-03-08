import { copyFromClipboard, copyFromClipboardOld } from 'common/utils';

import MiniButton from 'components/buttons/mini-button/MiniButton';
import NavButton from 'components/footer/nav-button/NavButton';
import React from 'react';
import SelectMenu from 'components/selectMenu/SelectMenu';
import { addWordAction } from 'data/api';
import clsx from 'clsx';
import styles from './AddWordOverlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import useOverlayStore from 'store/overlayStore';
import { useState } from 'react';
import useUserStorage from 'store/userStore';

const AddWordOverlay = () => {
  const closeOverlay = useOverlayStore((state) => state.closeOverlay);
  const jwt = useUserStorage((state) => state.jwt);
  const { wordData, setWordData, themeData, addWordData, setAddWordData } = useGlobalContext();
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');
  const [theme, setTheme] = useState(themeData[0].id);
  const [examples, setExamples] = useState('');

  const selectMenuData = themeData.map((themeDataEntry) => {
    return { value: themeDataEntry.id, text: themeDataEntry.name };
  });

  console.log({ addWordData, translation, theme, examples });

  const submitHandler = (e) => {
    e.preventDefault();

    console.log({ addWordData, translation, theme, examples });
    //здесь будет ф по отправке данных на сервер

    const newWordData = {
      foreign: addWordData,
      native: translation,
      examples: examples,
      themeIdList: [theme]
    };

    // console.log({ newWordData });

    addWordAction(jwt, newWordData).then(({ data }) => {
      console.log('word added', data);
      const newWordData = [data, ...wordData];
      setWordData(newWordData);
      closeOverlay();
      setAddWordData();
    });

    console.log(theme, newWordData.themeIdList);
  };

  const handleSelectMenu = (value) => {
    setTheme(value);
  };

  const handleBufferButtonClick = async (inputType) => {
    const buffer = await copyFromClipboard();

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
        <></>;
    }
  };

  const handleBufferButtonClickOld = () => {
    const callbackFunctionMyaff = (clipboardValue) => {
      setText(clipboardValue);
    };

    copyFromClipboardOld(callbackFunctionMyaff);
  };
  //ф handleSelectMenu получает от select menu значение из инпута

  //написать утилиту, кот будет возвращать список тем

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
        <MiniButton type="buffer" onClickF={(e) => handleBufferButtonClick('word')} />
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
        <MiniButton type="buffer" onClickF={(e) => handleBufferButtonClick('translation')} />
      </div>
      <div className={clsx(styles.addWordInterfaceRow, styles.addWordInterfaceRow_withButton)}>
        <textarea
          className={clsx(styles.addWordTextarea, 'inputElement inputElement_textArea')}
          placeholder="Examples"
          defaultValue={examples}
          onChange={(e) => setExamples(e.target.value)}></textarea>
        <MiniButton type="buffer" onClickF={(e) => handleBufferButtonClick('examples')} />
      </div>
      <SelectMenu additionalStyles={''} data={selectMenuData} onSelect={handleSelectMenu} />
      <NavButton name={'Save'} styles={''} />
    </form>
  );
};
export default AddWordOverlay;
