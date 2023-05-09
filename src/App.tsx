import './index.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OVERLAY_TYPE, ROUTE } from './common/constants';
import { useNavigate, useParams } from 'react-router-dom';

import { GlobalContextProvider } from 'providers/GlobalContext';
import LearnPage from 'pages/learn-page/LearnPage';
import Overlay from './overlays/Overlay';
import ThemePage from 'pages/theme-page/ThemePage';
import WordsPage from 'pages/words-page/WordsPage';
import { shallow } from 'zustand/shallow';
import useDataStore from 'store/dataStore';
import { useEffect } from 'react';
import useOverlayStore from 'store/overlayStore';
import useUserStorage from 'store/userStore';

const { MAIN_PAGE, WORDS, LEARN_MODE } = ROUTE;

function App() {
  const { learnModeId } = useParams();
  // const navigate = useNavigate();
  console.log(learnModeId);

  const jwt = useUserStorage((state) => state.jwt);

  const { openOverlay, overlayType } = useOverlayStore(
    (state) => ({
      openOverlay: state.openOverlay,
      overlayType: state.overlayType
    }),
    shallow
  );

  const { wordData, themeData, getAndSetData } = useDataStore(
    (state) => ({
      wordData: state.wordData,
      themeData: state.themeData,
      getAndSetData: state.getAndSetData
    }),
    shallow
  );

  useEffect(() => {
    if (!jwt) {
      openOverlay({ overlayType: OVERLAY_TYPE.LOGIN });
    }
  }, [jwt, openOverlay]);

  useEffect(() => {
    if (jwt) {
      getAndSetData(jwt);
    }
  }, [jwt, getAndSetData]);

  const globalContextData = {
    // оставлена для примера глобального контекста без zustand
  };

  if (jwt && (!wordData || !themeData)) {
    return <div>Loading data</div>;
  }

  console.log(ROUTE);

  return (
    <BrowserRouter>
      <GlobalContextProvider data={globalContextData}>
        {overlayType && <Overlay />}
        {jwt && (
          <Routes>
            <Route path={MAIN_PAGE} element={<ThemePage />} />
            <Route path={`${WORDS}/:themeIdUrlParam`} element={<WordsPage />} />
            <Route path={WORDS} element={<WordsPage />} />
            <Route path={`${LEARN_MODE}/:learnModeId`} element={<LearnPage />} />
          </Routes>
        )}
      </GlobalContextProvider>
    </BrowserRouter>
  );
}
export default App;
