import { DEFAULT_OVERLAY_STATE } from 'common/constants';
import NavButton from 'components/footer/nav-button/NavButton';
import React from 'react';
import SelectMenu from 'components/selectMenu/SelectMenu';
import { copyFromClipboard } from 'common/utils';
import { editWordAction } from 'data/api';
import { findObjectIndex } from 'components/buttons/utils';
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

const {id, themeIdList} = wordData[wordArrayIndex]

    console.log({ text, translation, theme });
    //здесь будет ф по отправке данных на сервер

    const newWordData = {
      foreign: text,
      native: translation,
      examples,
      themeIdList
    };

    // ранее было examples: examples, themeIdList: themeIdList, если ключ и значение совпадают по названию, JS пойдет выше по скоупу и найдет значение для ключа

    console.log(wordData[wordArrayIndex], id, '========================', wordArrayIndex);

    console.log(newWordData.themeIdList);

    //найти newWordDatd по id и заменить значение на новую дейту 

   

    editWordAction(jwt, newWordData, id).then(({ data }) => {
      console.log('word edited', data);

      const newWordDataWithId = {...newWordData, id};
      //id сдесь существует для локального стейта, чтобы консоль не ругалась на неуникальный key
 
      const wordDataCopy = [...wordData];

      wordDataCopy.splice(wordArrayIndex, 1, newWordDataWithId)
   
      setWordData(wordDataCopy);

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
