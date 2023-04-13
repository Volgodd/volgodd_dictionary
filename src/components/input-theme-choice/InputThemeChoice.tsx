import clsx from 'clsx';
import styles from './InputThemeChoice.module.scss';
import { useState } from 'react';
import type { DataId } from 'types/data-types';

type InputThemeChoiceProps = {
  value: string
   id: DataId
   onChangeF: (checked: boolean) => void
}
const InputThemeChoice: React.FC<InputThemeChoiceProps> = ({ value, id, onChangeF }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsChecked(checked);
    onChangeF(checked);
  };

  return (
    <div className={clsx(styles.inputWrapper, isChecked && styles.inputWrapper_active)}>
      <input type="checkbox" value={value} id={id} name={id} onChange={checkboxHandler}/>
      <label htmlFor={id}>
        <span className={styles.labelSpan}> {value} </span>
      </label>
    </div>
  );
};

export default InputThemeChoice;
