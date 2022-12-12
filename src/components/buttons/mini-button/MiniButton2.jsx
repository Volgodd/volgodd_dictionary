import styles from './MiniButton.module.scss';

const MiniButton = ({icon, type}) => {
  
  // switch (type) {
  //   case 'buffer' 
  // }

  return (
    <button className={styles.miniButton}>
      
      {icon}
    </button>
  )
}

export default MiniButton;