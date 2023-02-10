import { DEFAULT_OVERLAY_STATE } from 'common/constants';
import NavButton from 'components/footer/nav-button/NavButton';
import React from 'react';
import styles from './LearnModeOverlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useState } from 'react';
import { findObjectIndex, findObjectIndexByIdList} from 'common/utils';
import InputLearnMode from 'components/input/InputLearnMode';

const LearnModeOverlay = () => {
  const { jwt, setOverlay, themeData, overlay, setRawThemeData, wordData, setWordData } = useGlobalContext()




  const { themeIdList } = wordData;

  const submitHandler = (e) => {
    e.preventDefault();

    
  };

 

  return (
    <>
    <form onSubmit={submitHandler} className={styles.wrapper}>
       <span>Select themes to learn:</span>
       <div className={styles.inputWrapper}>
        <InputLearnMode value={'test theme'} themeName={'theme 1'}/>
        <InputLearnMode value={'test theme'} themeName={'theme 2'}/>
        <InputLearnMode value={'test theme'} themeName={'theme 3'}/>
        <InputLearnMode value={'test theme'} themeName={'theme 4'}/>
      </div>
      <div className={styles.buttonContainer}>
      <NavButton name="Save" additionalStyles={styles.button}/>
      </div>
    </form>
    </>
  );
};
export default LearnModeOverlay;
