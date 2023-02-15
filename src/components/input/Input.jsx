import styles from './Input.module.scss';

const Input = ({value, id, onChangeF}) => {

  return (
  <div className={styles.inputWrapper}>
   <label>
    <input
      type="checkbox"
      // className="inputElement"
      // onChange={(e) => setTheme(e.target.value)}
      value={value}
      id={id}
      onChange={onChangeF}
      />
      {value}
      </label>
      {/* <label htmlFor={id}>{value}</label> */}
  </div>
  
  
  )
}

export default Input;