import clsx from 'clsx';
import styles from './Input.module.scss';
import { useState } from 'react';

const Input = ({ value, id, onChangeF }) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkboxHandler = (e) => {
    const { checked } = e.target;
    setIsChecked(checked);
    onChangeF(checked);
  };

  return (
    <div className={clsx(styles.inputWrapper, isChecked && styles.inputWrapper_active)}>
      <input type="checkbox" value={value} id={id} name={id} onChange={checkboxHandler} />
      <label htmlFor={id}>
        <span className={styles.labelSpan}> {value} </span>
      </label>
    </div>
  );
};

export default Input;
