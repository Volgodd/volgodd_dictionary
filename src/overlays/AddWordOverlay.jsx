import { copyFromClipboard, copyFromClipboardOld } from 'common/utils';

import MiniButton from 'components/buttons/mini-button/MiniButton';
import NavButton from 'components/footer/nav-button/NavButton';
import React from 'react';
import SelectMenu from 'components/lists/SelectMenu';
import styles from './Overlay.module.scss';
import { useState } from 'react';

const selectMenuData = [
  { value: 'kat1', text: 'Katya 1' },
  { value: 'kat2', text: 'Katya 2' },
  { value: 'kat3', text: 'Katya 3' }
];

const AddWordOverlay = () => {
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');
  const [theme, setTheme] = useState(selectMenuData[0]);

  const submitHandler = (e) => {
    e.preventDefault();
    // if (!text) {
    //   alert('please fill in foreign language field');
    //   return;
    // }

    // if (!translation) {
    //   alert('please fill in native language field');
    //   return;
    // }

    console.log({ text, translation, theme });
    //здесь будет ф по отправке данных на сервер
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
    <form onSubmit={submitHandler}>
      <div className={styles.inputButtonFlex}>
        <input
          type="text"
          placeholder="Word"
          className={styles.inputField}
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <MiniButton type="buffer" onClick={(e) => handleBufferButtonClick('word')} />
      </div>
      <div className={styles.inputButtonFlex}>
        <input
          type="text"
          placeholder="Tanslation / meaning"
          className={styles.inputField}
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          required
        />
        <MiniButton type="buffer" onClick={(e) => handleBufferButtonClick('translation')} />
      </div>
      <div>
        <SelectMenu
          additionalStyles={styles.dropdown}
          data={selectMenuData}
          onSelect={handleSelectMenu}
        />
      </div>
      <NavButton name={'Save'} styles={styles.saveButton} />
    </form>
  );
};
export default AddWordOverlay;
