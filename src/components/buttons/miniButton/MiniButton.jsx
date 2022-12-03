import styles from './MiniButton.module.scss';

const MiniButton = ({icon}) => {
  return (
    <button className={styles.miniButton}>
      {icon}
    </button>
  )
}

export default MiniButton;