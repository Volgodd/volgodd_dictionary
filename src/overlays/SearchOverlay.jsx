import React, { useEffect, useMemo } from 'react';

import DataEntryButton from 'components/buttons/data-entry-button/DataEntryButton';
import NavButton from 'components/footer/nav-button/NavButton';
import clsx from 'clsx';
import styles from './SearchOverlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useState } from 'react';

const SearchOverlay = () => {
  const [searchingItem, setSearchingItem] = useState('');
  const [sortedWordData, setSortedWordData] = useState([]);
  const { wordData } = useGlobalContext();

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const performSearch = setTimeout(() => {
      if (searchingItem) {
        const sortedData = wordData.filter((item) => {
          const formattedSearch = searchingItem.toLowerCase().replace(/\s\s+/g, ' ').trim();

          return (
            item.foreign.toLowerCase().includes(formattedSearch) ||
            item.native.toLowerCase().includes(formattedSearch)
          );
        });
        setSortedWordData(sortedData);
      } else setSortedWordData([]);
    }, 300);

    return () => clearTimeout(performSearch);
  }, [searchingItem, wordData]);

  return (
    <form onSubmit={submitHandler} className={styles.searchInterface}>
      <div className={styles.searchInterfaceRow}>
        <input
          autoFocus
          type="text"
          placeholder=""
          className="inputElement"
          onChange={(e) => {
            setSearchingItem(e.target.value);
          }}
          value={searchingItem}
          required
        />
      </div>

      <NavButton name="Search" styles={clsx(styles.saveButton, styles.addWordButton)} />
      <div className={styles.searchedContentWrapper}>
        {sortedWordData?.map((sortedItem) => {
          return (
            <DataEntryButton
              mainCellData={sortedItem.foreign}
              secondaryCellData={sortedItem.native}
              key={sortedItem.id}
            />
          );
        })}
      </div>
    </form>
  );
};
export default SearchOverlay;
