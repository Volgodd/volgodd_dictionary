import { DEFAULT_OVERLAY_STATE } from 'common/constants';
import NavButton from 'components/footer/nav-button/NavButton';
import React from 'react';
import styles from './LearnModeOverlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { findObjectIndex, findObjectIndexByIdList} from 'common/utils';
import Input from 'components/input/Input';
import LearnButton from 'components/buttons/learn-button/LearnButton';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';

const LearnModeOverlay = () => {
  const { jwt, setOverlay, themeData, overlay, setRawThemeData, wordData, setWordData } = useGlobalContext();

  const { themeIdList } = wordData;

  const { name } = themeData;

  const submitHandler = (e) => {
    e.preventDefault();

  };

  const checkedThemesArray = [];

  const testThemeArr = [];

  testThemeArr.push(themeData[2])

  console.log(testThemeArr)


  const addThemesIfChecked = ({checked, index}) => {
    if (checked) {
      checkedThemesArray.push(themeData[index])
    } 

    console.log(checked, index)
    // console.log(checkedThemesArray)
  }

  return (
    <>
    <form onSubmit={submitHandler} className={styles.formWrapper}>
       <span className={styles.headerSpan}>Select themes to learn:</span>
       <div className={styles.inputContainer}>

        {themeData.map((theme) => {
          const { name, id } = theme;

          const themeIndex = findObjectIndex(themeData, id)
          
          console.log(name, id, themeIndex)

          return (
            <Input 
              value={name}
              key={id}
              id={id}
              onChangeF={(e)=> addThemesIfChecked({checked: e.target.checked}, themeIndex)}
              // onChangeF={(e)=> console.log(e.target.checked)}
              />
          )
         }
        )
        }
      </div>
      <div className={styles.buttonContainer}>
      <LearnButton name={'Flashcards'} onClickF={() => submitHandler()}/>
      </div>
    </form>
    </>
  );
};
export default LearnModeOverlay;
