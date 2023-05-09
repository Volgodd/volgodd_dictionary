import styles from './ToggleSwitch.module.scss';

type ToggleSwitchProps = {
  defaultCheckedValue: boolean;
  onChangeF: (checked: boolean) => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ defaultCheckedValue, onChangeF }) => {
  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    onChangeF(checked);
  };

  return (
    <label className={styles.switch}>
      <input defaultChecked={defaultCheckedValue} type="checkbox" onChange={checkboxHandler} />
      <span className={styles.slider} />
    </label>
  );
};

export default ToggleSwitch;
