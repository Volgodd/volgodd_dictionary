import { copyFromClipboard, copyFromClipboardOld } from 'common/utils';

import { DEFAULT_OVERLAY_STATE } from 'common/constants';
import MiniButton from 'components/buttons/mini-button/MiniButton';
import NavButton from 'components/footer/nav-button/NavButton';
import React from 'react';
import SelectMenu from 'components/selectMenu/SelectMenu';
import { addWordAction } from 'data/api';
import clsx from 'clsx';
import styles from './AddWordOverlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useState } from 'react';

const AddWordOverlay = () => {
  const { jwt, setOverlay, wordData, setWordData, themeData } = useGlobalContext();
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');
  const [theme, setTheme] = useState(themeData[0].id);
  const [examples, setExamples] = useState('');

  const selectMenuData = themeData.map((themeDataEntry) => {
    return { value: themeDataEntry.id, text: themeDataEntry.name };
  });

  const submitHandler = (e) => {
    e.preventDefault();

    console.log({ text, translation, theme, examples });
    //здесь будет ф по отправке данных на сервер

    const newWordData = {
      foreign: text,
      native: translation,
      examples: examples,
      themeIdList: [theme]
    };

    console.log({ newWordData });
    // addWordAction(jwt, newWordData).then(({ data }) => {
    //   console.log('word added', data);
    //   const newWordData = [data, ...wordData];
    //   setWordData(newWordData);
    //   setOverlay(DEFAULT_OVERLAY_STATE);
    // });

    console.log(theme, newWordData.themeIdList);
  };

  const handleSelectMenu = (value) => {
    setTheme(value);
  };

  const handleBufferButtonClick = async (inputType) => {
    const buffer = await copyFromClipboard();

    switch (inputType) {
      case 'word':
        setText(buffer);
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
          value={text}
          onChange={(e) => setText(e.target.value)}
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
