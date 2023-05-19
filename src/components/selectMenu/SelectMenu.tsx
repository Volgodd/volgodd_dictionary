import clsx from 'clsx';
import styles from './SelectMenu.module.scss';

export type SelectMenuData = {
  value: string;
  text: string;
}[];

type SelectMenuProps = {
  data: SelectMenuData;
  onSelect: (value: string) => void;
  additionalStyles?: string;
  defaultValue?: string;
};

const SelectMenu: React.FC<SelectMenuProps> = ({
  data,
  onSelect,
  additionalStyles,
  defaultValue
}) => {
  if (!data) {
    return <>No SelectMenu data</>;
  }

  return (
    <div className={clsx(styles.selectMenu, additionalStyles)}>
      <label className={styles.label} htmlFor="theme">
        Theme:
      </label>
      <select
        name="theme"
        id="theme"
        onChange={(e) => onSelect(e.target.value)}
        className={clsx('inputElement', styles.select)}
        defaultValue={defaultValue}>
        {data.map((entry, index) => {
          const { value, text } = entry;

          return (
            <option key={index} value={value}>
              {text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectMenu;
