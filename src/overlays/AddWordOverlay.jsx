import MiniButton from 'components/buttons/mini-button/MiniButton';
import NavButton from 'components/buttons/NavButton';
import React from 'react';
import SelectMenu from 'components/lists/SelectMenu';
import styles from './Overlay.module.scss';

const AddWordOverlay = () => {
  return (
    <>
      <div className={styles.inputButtonFlex}>
        <input type={'text'} placeholder={'Word'} className={styles.inputField}/>
        <MiniButton type={'buffer'}/>
      </div>
      <div className={styles.inputButtonFlex}>
        <input type={'text'} placeholder={'Tanslation / meaning'} className={styles.inputField}/>
        <MiniButton type={'buffer'}/>
       </div>
        <div>
          <SelectMenu additionalStyles={styles.dropdown}/>
        </div>
      <NavButton name={'Save'} styles={styles.saveButton}/>
    </>
 )
}
export default AddWordOverlay;