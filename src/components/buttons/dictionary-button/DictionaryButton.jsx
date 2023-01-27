import DictionaryIcon from 'icons/DictionaryIcon';
import MiniButton from '../mini-button/MiniButton';
import styles from './DictionaryButton.module.scss'

const DictionaryButton = ({title, numberOfWords}) => {
  return (

    <button className={styles.buttonWrapper} onClick={()=> console.log('click')}>
      <div className={styles.svgContainer}>
      <DictionaryIcon/>
      </div>
      <div className={styles.title}>
        <span>{title}</span>
      </div>
    </button>

  )
}
export default DictionaryButton