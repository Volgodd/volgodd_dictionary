import NavButton from 'components/buttons/NavButton';
import React from 'react';
import styles from './Overlay.module.scss';

const AddThemeOverlay = () => {
  return (
    <>
      <div className={styles.inputButtonFlex}>
        <input type={'text'} placeholder={'Theme name'} className={styles.inputField}/>
      </div>
      <NavButton name={'Save'} styles={styles.saveButton}/>
    </>
 )
}
export default AddThemeOverlay;