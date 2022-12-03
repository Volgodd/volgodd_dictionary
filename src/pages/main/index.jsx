import AddWordPage from 'pages/add-word';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import MetaTags from 'common/MetaTags';
import TextButton from 'components/buttons/textButton/TextButton';
import { fakeData } from 'data/fake-data';
import styles from './MainPage.module.scss';

function MainPage() {
  return (
    <div className={styles.main}>
      <MetaTags />
      <Header props="Suomen kurssi" />
      <div className={styles.mainContent}>
        {fakeData.map((word, index) => {
          const { foreign, level } = word;
          return (<TextButton key={index} name={foreign} number={level} />);
        })}
      </div>

      {/* <AddWordPage /> */}
      <Footer />
    </div>
  );
}

export default MainPage;
