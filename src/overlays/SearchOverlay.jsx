import React, { useEffect } from 'react';

import DataEntryButton from 'components/buttons/data-entry-button/DataEntryButton';
import NavButton from 'components/footer/nav-button/NavButton';
import { OVERLAY_TYPES } from 'common/constants';
import clsx from 'clsx';
import styles from './SearchOverlay.module.scss';
import useDataStore from 'store/dataStore';
import useOverlayStore from 'store/overlayStore';
import { useState } from 'react';

const { ADD_WORD } = OVERLAY_TYPES;

const SearchOverlay = () => {
  const [searchingItem, setSearchingItem] = useState('');
  const [sortedWordData, setSortedWordData] = useState([]);

  const wordData = useDataStore((state) => state.wordData);

  const openOverlay = useOverlayStore((state) => state.openOverlay);

  console.log(sortedWordData);

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
    <div className={styles.searchInterface}>
      <div className={styles.searchInterfaceRow}>
        <input
          autoFocus
          type="text"
          placeholder=""
          className="inputElement"
          onChange={(e) => setSearchingItem(e.target.value)}
          value={searchingItem}
          required
        />
      </div>
      <NavButton
        name="Add a word"
        onClickF={() => openOverlay({ overlayType: ADD_WORD, overlayMetadata: searchingItem })}
      />

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
    </div>
  );
};
export default SearchOverlay;
