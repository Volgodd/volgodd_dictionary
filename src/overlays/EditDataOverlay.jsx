import { DEFAULT_OVERLAY_STATE } from 'common/constants';
import NavButton from 'components/footer/nav-button/NavButton';
import React from 'react';
import SelectMenu from 'components/selectMenu/SelectMenu';
import { editWordAction } from 'data/api';
import { findObjectIndex } from 'common/utils';
import styles from './EditDataOverlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useState } from 'react';

const EditDataOverlay = () => {
  const { jwt, overlay, setOverlay, wordData, setWordData, themeData } = useGlobalContext();
  const wordArrayIndex = findObjectIndex(wordData, overlay.metadata);
  const [text, setText] = useState(wordData[wordArrayIndex].foreign);
  const [translation, setTranslation] = useState(wordData[wordArrayIndex].native);
  const [theme, setTheme] = useState(themeData[0].id);
  const [examples, setExamples] = useState(wordData[wordArrayIndex].examples);

  const selectMenuData = themeData.map((themeDataEntry) => {
    return { value: themeDataEntry.id, text: themeDataEntry.name };
  });

  const submitHandler = (e) => {
    e.preventDefault();

    console.log({ text, translation, theme });
    //здесь будет ф по отправке данных на сервер

    const newWordData = {
      foreign: text,
      native: translation,
      examples: examples,
      themeIdList: wordData[wordArrayIndex].themeIdList
    };

    console.log(wordData[wordArrayIndex], wordData[wordArrayIndex].id);

    console.log(newWordData.themeIdList);

    //найти newWordDatd по id и заменить значение на новую дейту

    editWordAction(jwt, newWordData, wordData[wordArrayIndex].id).then(({ data }) => {
      console.log('word edited', data);
      wordData[wordArrayIndex] = newWordData;
      setWordData(newWordData);
      setOverlay(DEFAULT_OVERLAY_STATE);
    });
  };

  const handleSelectMenu = (value) => {
    setTheme(value);
  };

  //ф handleSelectMenu получает от select menu значение из инпута

  //написать утилиту, кот будет возвращать список тем

  return (
    <form onSubmit={submitHandler} className={styles.editWordInterface}>
      <div className={styles.editWordInterfaceRow}>
        <input
          // value={wordData[wordArrayIndex].foreign}
          type="text"
          placeholder="Word"
          className="inputElement"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <div className={styles.editWordInterfaceRow}>
        <input
          // value={wordData[wordArrayIndex].native}
          type="text"
          placeholder="Tanslation / meaning"
          className="inputElement"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          required
        />
      </div>
      <div className={styles.textareaContainer}>
        <textarea
          className="inputElement inputElement_textArea"
          // defaultValue={wordData[wordArrayIndex].examples}
          defaultValue={examples}
          onChange={(e) => setExamples(e.target.value)}></textarea>
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
