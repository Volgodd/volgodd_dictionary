import DataEntryButton from 'components/buttons/data-entry-button/DataEntryButton';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import MetaTags from 'common/MetaTags';
import { ROUTES } from 'common/constants';
import React from 'react';
import styles from './ThemePage.module.scss';
import useDataStore from 'store/dataStore';
import { useNavigate } from 'react-router-dom';

const { WORDS } = ROUTES;

const ThemePage = () => {
  const themeData = useDataStore((state) => state.themeData);

  const navigate = useNavigate();

  return (
    <div className={styles.main}>
      <MetaTags />
      <Header title="Suomen - venäjän" />
      <div className={styles.mainContent}>
        {themeData.map((theme, index) => {
          const { name, wordCount, id } = theme;

          const btnFunction = () => navigate(`${WORDS}/${id}`);

          return (
            <DataEntryButton
              type="themes"
              key={index}
              mainCellData={name}
              secondaryCellData={wordCount}
              onClickF={btnFunction}
              color={'orange'}
            />
          );
        })}
      </div>

      <Footer themePage={true} />
    </div>
  );
};

export default ThemePage;
