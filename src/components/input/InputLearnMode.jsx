import styles from './InputLearnMode.module.scss';

const InputLearnMode = ({value, themeName}) => {

  return (
  <div className={styles.inputWrapper}>
    <input
      type="checkbox"
      // className="inputElement"
      // onChange={(e) => setTheme(e.target.value)}
      value={value}
      id={themeName}/>
      <label for={themeName}>{themeName}</label>
  </div>
  
  
  )
}

export default InputLearnMode;