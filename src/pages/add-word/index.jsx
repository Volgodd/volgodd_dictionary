import BufferIcon from '../../icons/BufferIcon';
import MiniButton from '../../components/buttons/miniButton/MiniButton';
import styles from './AddWord.module.scss'

const AddWordPage = () => {
  return (
    <div className={styles.addWordPage}>
    <span>Add a word</span> 
    <MiniButton icon={BufferIcon}/>
    <BufferIcon/>

    
    {/* <input/>
    <MiniButton/>
    <MiniButton/>
    <input/> 
    <MiniButton/> */}


    </div>
  
 )
}

export default AddWordPage;