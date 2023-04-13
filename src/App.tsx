import './index.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DEFAULT_ALERT_OVERLAY_STATE, OVERLAY_TYPES, ROUTES } from './common/constants';
import { useEffect, useState } from 'react';

import AlertOverLay from 'overlays/AlertOverlay';
import { GlobalContextProvider } from 'providers/GlobalContext';
import LearnPage from 'pages/learn-page/LearnPage';
import Overlay from './overlays/Overlay';
import ThemePage from 'pages/theme-page/ThemePage';
import WordsPage from 'pages/words-page/WordsPage';
import { shallow } from 'zustand/shallow';
import useDataStore from 'store/dataStore';
import useOverlayStore from 'store/overlayStore';
import useUserStorage from 'store/userStore';

const { MAIN_PAGE, WORDS, LEARN_MODE } = ROUTES;

function App() {
  const [alertOverlay, setAlertOverlay] = useState(DEFAULT_ALERT_OVERLAY_STATE);

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
      openOverlay({ overlayType: OVERLAY_TYPES.LOGIN });
    }
  }, [jwt, openOverlay]);

  useEffect(() => {
    if (jwt) {
      getAndSetData(jwt);
    }
  }, [jwt, getAndSetData]);

  const globalContextData = {
    //alertOverlay  сейчас не используется, globalContextData оставлена для примера глобального контекста без zustand
    alertOverlay,
    setAlertOverlay
  };

  if (jwt && (!wordData || !themeData)) {
    return <div>Loading data</div>;
  }

  // console.log(wordData, themeData);

  return (
    <BrowserRouter>
      <GlobalContextProvider data={globalContextData}>
        {/* <Link to={MAIN_PAGE}>Main Page</Link>
        <Link to={ADD_WORD_PAGE}>Add word</Link> */}
        {overlayType && <Overlay />}
        {alertOverlay.type && <AlertOverLay />}
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
