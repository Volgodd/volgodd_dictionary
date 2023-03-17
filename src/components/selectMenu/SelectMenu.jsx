import clsx from 'clsx';
import styles from './SelectMenu.module.scss';

const SelectMenu = ({ data, onSelect, additionalStyles, defaultValue }) => {
  if (!data) {
    return <>No SelectMenu data</>;
  }

  return (
    <div className={clsx(styles.selectMenu, additionalStyles)}>
      <label htmlFor="theme">Theme:</label>
      <select
        name="theme"
        id="theme"
        onChange={(e) => onSelect(e.target.value)}
        className="inputElement"
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
