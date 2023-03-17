import React, { useEffect } from 'react';

import ActionButton from 'components/buttons/action-button/ActionButton';
import DataEntryButton from 'components/buttons/data-entry-button/DataEntryButton';
import { OVERLAY_TYPES } from 'common/constants';
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

  useEffect(() => {
    const performSearch = setTimeout(() => {
      if (searchingItem) {
        const sortedData = wordData.filter((item) => {
          const formattedSearch = searchingItem.toLowerCase().replace(/\s\s+/g, ' ').trim();
          //replace заменяет мультипробелы на один

          return (
            item.foreign.toLowerCase().includes(formattedSearch) ||
            item.native.toLowerCase().includes(formattedSearch)
          );
        });
        setSortedWordData(sortedData);
      } else setSortedWordData([]);
    }, 300);
    //при помощи setTimeout реализован debounce

    return () => clearTimeout(performSearch);
    //return в useEffect нужен для подчистки кода от неактуальных ф во избежание крашей
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
      <ActionButton
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
