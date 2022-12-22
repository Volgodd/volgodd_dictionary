import clsx from 'clsx';
import styles from './SelectMenu.module.scss';

const SelectMenu = ({ data, onSelect, additionalStyles }) => {
  if (!data) {
    return <>No SelectMenu data</>;
  }

  return (
    <div className={clsx(styles.selectMenuForm, additionalStyles)}>
      <label htmlFor="theme">Theme:</label>
      <select name="theme" id="theme" onChange={(e) => onSelect(e.target.value)}>
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
