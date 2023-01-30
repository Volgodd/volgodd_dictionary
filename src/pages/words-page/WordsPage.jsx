import DataEntryButton from 'components/buttons/data-entry-button/DataEntryButton';
import Header from 'components/header/Header';
import React from 'react';
import clsx from 'clsx';
import styles from './WordsPage.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useParams } from 'react-router-dom';
import Footer from 'components/footer/Footer';

const WordsPage = () => {
  const { themeIdUrlParam } = useParams();
  const { wordData } = useGlobalContext();
  
  return (
    <div className={clsx(styles.main, 'dark:bg-slate-800')}>
      <Header props="Words" />

      <div className={styles.mainContent}>
        {/* {test} */}
        {wordData
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
              />
            );
          })}
      </div>
      <Footer wordPage={true}/>
    </div>
  );
};

//ф фильтр фильтрует арэй по определенним критериям, она не возвращает из себя объект, а возвращает булеан значение по принципу проходишь/не проходишь

// a map всегда что-то возвращает, обязана иметь return, она модифицирует арэй в реальном времени

export default WordsPage;
