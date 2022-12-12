import MiniButton from '../../components/buttons/mini-button/MiniButton';
import React from 'react'
import SelectMenu from 'components/lists/SelectMenu';
import styles from './AddWord.module.scss'

const AddWordPage = () => {
  return (
    <div className={styles.addWordPage}>
    <span>Add a word</span> 
    <MiniButton type={'changeColor'} additionalStyles={styles.rightPositioning}/>
    <input className={styles.inputField}/>
    <MiniButton type={'dictionary'}/>
    <MiniButton type={'buffer'}/>
    <input className={styles.inputField}/> 
    <MiniButton type={'buffer'} additionalStyles={styles.rightPositioning}/>
    <SelectMenu additionalStyles={styles.span3}/>
    <span>Cancel</span>
    <span>Done</span>
    <span>Add details</span>
    </div>
 )
}
export default AddWordPage;