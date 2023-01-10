import DataEntryButton from 'components/buttons/data-entry-button/DataEntryButton';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import MetaTags from 'common/MetaTags';
import { ROUTES } from 'common/constants';
import React from 'react';
import styles from './ThemePage.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useNavigate } from 'react-router-dom';

const { WORDS } = ROUTES;

const ThemePage = () => {
  const { themeData } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <div className={styles.main}>
      <MetaTags />
      <Header props="Suomen kurssi" />
      <div className={styles.mainContent}>
        {themeData.map((theme, index) => {
          const { name, wordCount, id } = theme;

          const btnFunction = () => navigate(`${WORDS}/${id}`);

          return (
            <DataEntryButton
              key={index}
              mainCellData={name}
              secondaryCellData={wordCount}
              onClickF={btnFunction}
            />
          );
        })}
      </div>

      <Footer />
    </div>
  );
};

export default ThemePage;
