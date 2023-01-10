import NavButton from 'components/footer/nav-button/NavButton';
import React from 'react';
import SelectMenu from 'components/selectMenu/SelectMenu';
import { copyFromClipboard } from 'common/utils';
import { findObjectIndex } from 'components/buttons/utils';
import styles from './EditDataOverlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useState } from 'react';

const selectMenuData = [
  { value: 'kat1', text: 'Katya 1' },
  { value: 'kat2', text: 'Katya 2' },
  { value: 'kat3', text: 'Katya 3' }
];

const EditDataOverlay = () => {
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');
  const [theme, setTheme] = useState(selectMenuData[0]);

  const { overlay, wordData } = useGlobalContext();

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

  const wordArrayIndex = findObjectIndex(wordData, overlay.metadata);

  //ф handleSelectMenu получает от select menu значение из инпута

  //написать утилиту, кот будет возвращать список тем

  return (
    <form onSubmit={submitHandler} className={styles.editWordInterface}>
      <div className={styles.editWordInterfaceRow}>
        <input
          value={wordData[wordArrayIndex].native}
          type="text"
          placeholder="Word"
          className="inputElement"
          // value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <div className={styles.editWordInterfaceRow}>
        <input
          value={wordData[wordArrayIndex].foreign}
          type="text"
          placeholder="Tanslation / meaning"
          className="inputElement"
          // value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          required
        />
      </div>
      <div className={styles.textareaContainer}>
        <textarea
          className="inputElement inputElement_textArea"
          defaultValue={wordData[wordArrayIndex].examples}></textarea>
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
export default EditDataOverlay;
