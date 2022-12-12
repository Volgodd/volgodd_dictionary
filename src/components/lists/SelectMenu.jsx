import clsx from 'clsx';
import {fakeData} from 'data/fake-data';
import styles from './SelectMenu.module.scss';

const SelectMenu = ({additionalStyles}) => {
  return (
    <form className={clsx(styles.selectMenuForm,additionalStyles)}>
      <label htmlFor='theme'>Theme: </label>
        <select name="theme" id='theme'>
          {fakeData.map((word, index) => {
          const { foreign, level } = word;
          return (<option key={index} value={foreign}>{foreign}</option>);
      })}
        </select>
  </form>

 )
}
export default SelectMenu;
