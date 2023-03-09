import './index.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DEFAULT_ALERT_OVERLAY_STATE, OVERLAY_TYPES, ROUTES } from './common/constants';
import React, { useEffect, useState } from 'react';

import AlertOverLay from 'overlays/AlertOverlay';
import BurgerOverlay from 'overlays/BurgerOverlay';
import { GlobalContextProvider } from 'providers/GlobalContext';
import LearnPage from 'pages/learn-page/LearnPage';
import Overlay from './overlays/Overlay';
import ThemePage from 'pages/theme-page/ThemePage';
import WordsPage from 'pages/words-page/WordsPage';
import { getData } from './data/api';
import { shallow } from 'zustand/shallow';
import useDataStore from 'store/dataStore';
import useOverlayStore from 'store/overlayStore';
import useUserStorage from 'store/userStore';

const { MAIN_PAGE, WORDS, LEARN_MODE } = ROUTES;

function App() {
  const [alertOverlay, setAlertOverlay] = useState(DEFAULT_ALERT_OVERLAY_STATE);

  const [burgerOverlay, setBurgerOverlay] = useState(false);
  const [themesArrayForLearnMode, setThemesArrayForLearnMode] = useState(undefined);

  const jwt = useUserStorage((state) => state.jwt);

  const { openOverlay, overlayType } = useOverlayStore(
    (state) => ({
      openOverlay: state.openOverlay,
      overlayType: state.overlayType
    }),
    shallow
  );

  // const {openOverlay, type} = useOverlayStore((state) => {
  //   return {openOverlay: state.openOverlay, type: state.type}
  // });

  const { wordData, themeData, setData } = useDataStore(
    (state) => ({
      wordData: state.wordData,
      themeData: state.themeData,
      setData: state.setData
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
      getData(jwt).then(({ wordData, themeData }) => {
        setData({ wordData, themeData });
      });
    }
  }, [jwt, setData]);

  const globalContextData = {
    alertOverlay,
    setAlertOverlay,
    burgerOverlay,
    setBurgerOverlay,
    themesArrayForLearnMode,
    setThemesArrayForLearnMode
  };

  if (jwt && (!wordData || !themeData)) {
    return <div>Loading data</div>;
  }

  return (
    <BrowserRouter>
      <GlobalContextProvider data={globalContextData}>
        {/* <Link to={MAIN_PAGE}>Main Page</Link>
        <Link to={ADD_WORD_PAGE}>Add word</Link> */}
        {overlayType && <Overlay />}
        {burgerOverlay && <BurgerOverlay />}
        {alertOverlay.type && <AlertOverLay />}
        {jwt && (
          <Routes>
            <Route path={MAIN_PAGE} element={<ThemePage />} />
            <Route path={`${WORDS}/:themeIdUrlParam`} element={<WordsPage />} />
            <Route path={WORDS} element={<WordsPage />} />
            <Route path={`${LEARN_MODE}/:learnModeId`} element={<LearnPage />} />
            {/* <Route path="*" element={<div>404</div>} /> */}
          </Routes>
        )}
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

export default App;
