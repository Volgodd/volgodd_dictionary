import styles from './TextButton.module.scss';

const TextButton = ({name, number}) => {
  return (
    <button className={styles.textButton}>
     <span>{name}</span>
     <span>{number}</span>
    </button>
  )
}

export default TextButton;