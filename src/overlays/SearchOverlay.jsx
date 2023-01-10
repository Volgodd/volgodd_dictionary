import NavButton from 'components/footer/nav-button/NavButton';
import React from 'react';
import clsx from 'clsx';
import styles from './SearchOverlay.module.scss';
import { useState } from 'react';

const SearchOverlay = () => {
  const [theme, setTheme] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    // if (!text) {
    //   alert('please fill in foreign language field');
    //   return;
    // }

    // if (!translation) {
    //   alert('please fill in native language field');
    //   return;
    // }

    console.log({ theme });
    //здесь будет ф по отправке данных на сервер
  };

  return (
    <form onSubmit={submitHandler} className={styles.searchInterface}>
      <div className={styles.searchInterfaceRow}>
        <input
          type="text"
          placeholder=""
          className="inputElement"
          onChange={(e) => setTheme(e.target.value)}
          value={theme}
          required
        />
      </div>
      <NavButton name="Search" styles={clsx(styles.saveButton, styles.addWordButton)} />
    </form>
  );
};
export default SearchOverlay;
