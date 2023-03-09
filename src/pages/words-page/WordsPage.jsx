import DataEntryButton from 'components/buttons/data-entry-button/DataEntryButton';
import Header from 'components/header/Header';
import React from 'react';
import clsx from 'clsx';
import { findObjectIndex } from 'common/utils';
import { shallow } from 'zustand/shallow';
import styles from './WordsPage.module.scss';
import useDataStore from 'store/dataStore';
import { useParams } from 'react-router-dom';

const WordsPage = () => {
  const { themeIdUrlParam } = useParams();
  const { wordData, themeData } = useDataStore(
    (state) => ({
      wordData: state.wordData,
      themeData: state.themeData
    }),
    shallow
  );

  const themeIndex = findObjectIndex(themeData, themeIdUrlParam);

  return (
    <div className={clsx(styles.main, 'dark:bg-slate-800')}>
      <Header title={themeData[themeIndex].name} themeId={themeIdUrlParam} />
      <div className={styles.mainContent}>
        {wordData.length !== 0 &&
          wordData
            .filter((wordObject) => {
              const { themeIdList } = wordObject;
              if (!themeIdUrlParam && themeIdList.length === 0) {
                return true;
              }
              if (themeIdList.indexOf(themeIdUrlParam) > -1) {
                return true;
              }
              return false;
            })
            .map((wordObject) => {
              const { native, foreign, id, examples } = wordObject;

              return (
                <DataEntryButton
                  dataArray={wordData}
                  key={id}
                  wordId={id}
                  mainCellData={foreign}
                  secondaryCellData={native}
                  expandAreaText={examples}
                  color={'mint'}
                />
              );
            })}
      </div>
    </div>
  );
};

//ф фильтр фильтрует арэй по определенним критериям, она не возвращает из себя объект, а возвращает булеан значение по принципу проходишь/не проходишь

// a map всегда что-то возвращает, обязана иметь return, она модифицирует арэй в реальном времени

export default WordsPage;
