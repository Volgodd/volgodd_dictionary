import DataEntryButton from 'components/buttons/data-entry-button/DataEntryButton';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { ROUTE } from 'common/constants';
import styles from './ThemePage.module.scss';
import useDataStore from 'store/dataStore';
import { useNavigate } from 'react-router-dom';

const { WORDS } = ROUTE;

const ThemePage = () => {
  const themeData = useDataStore((state) => state.themeData);

  const navigate = useNavigate();

  return (
    <div className={styles.main}>
      <Header title="Suomen - venäjän" />
      <div className={styles.mainContent}>
        {themeData?.map((theme, index) => {
          const { name, wordCount, id } = theme;

          const wordsAmount = wordCount.toString();

          const btnFunction = () => navigate(`${WORDS}/${id}`);

          return (
            <DataEntryButton
              key={index}
              mainCellData={name}
              secondaryCellData={wordsAmount}
              onClickF={btnFunction}
              color={'orange'}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default ThemePage;
