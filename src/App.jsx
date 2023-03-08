import './index.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  DEFAULT_ALERT_OVERLAY_STATE,
  DEFAULT_OVERLAY_STATE,
  OVERLAY_TYPES,
  ROUTES
} from './common/constants';
import React, { useEffect, useRef, useState } from 'react';
import { getJWTFromLocalStorage, setJWTFromLocalStorage } from 'common/local-storage';

import AlertOverLay from 'overlays/AlertOverlay';
import BurgerOverlay from 'overlays/BurgerOverlay';
import { GlobalContextProvider } from 'providers/GlobalContext';
import LearnPage from 'pages/learn-page/LearnPage';
import Overlay from './overlays/Overlay';
import ThemePage from 'pages/theme-page/ThemePage';
import WordsPage from 'pages/words-page/WordsPage';
import { countThemeWords } from 'data/utils';
import { getData } from './data/api';
import { jwtIsExpired } from 'common/utils';

const { MAIN_PAGE, WORDS, LEARN_MODE } = ROUTES;

function App() {
  const [jwt, setJWT] = useState(getJWTFromLocalStorage());
  const [overlay, setOverlay] = useState(DEFAULT_OVERLAY_STATE);
  const [alertOverlay, setAlertOverlay] = useState(DEFAULT_ALERT_OVERLAY_STATE);
  const [overlayMetaData, setOverlayMetaData] = useState();
  const [wordData, setWordData] = useState();
  const [rawThemeData, setRawThemeData] = useState();
  const [themeData, setThemeData] = useState();
  const [burgerOverlay, setBurgerOverlay] = useState(false);
  const [themesArrayForLearnMode, setThemesArrayForLearnMode] = useState(undefined);
  const [addWordData, setAddWordData] = useState('');

  useEffect(() => {
    if (rawThemeData) {
      // console.log('rtd pross', rawThemeData);
      setThemeData(countThemeWords({ wordData, themeData: rawThemeData }));
    }
  }, [rawThemeData, wordData]);

  useEffect(() => {
    if (!jwt || jwtIsExpired(jwt)) {
      setOverlay({ type: OVERLAY_TYPES.LOGIN });
    } else {
      setJWTFromLocalStorage(jwt);
    }
    // } else {
    //   localStorage.clear();
    //   setJWT(null);
    // }
  }, [jwt]);

  useEffect(() => {
    // FETCH DATA
    if (jwt) {
      getData(jwt).then(({ wordData, themeData }) => {
        setWordData(wordData);
        setRawThemeData(themeData);
      });
    }
  }, [jwt]);

  console.log(
    'GLOBAL STATE',
    { wordData, themeData },
    'themesArrayForLearnMode',
    themesArrayForLearnMode
  );

  const globalContextData = {
    wordData,
    setWordData,
    rawThemeData,
    setRawThemeData,
    themeData,
    overlay,
    setOverlay,
    alertOverlay,
    setAlertOverlay,
    burgerOverlay,
    setBurgerOverlay,
    overlayMetaData,
    setOverlayMetaData,
    setJWT,
    jwt,
    themesArrayForLearnMode,
    setThemesArrayForLearnMode,
    addWordData,
    setAddWordData
  };

  if (jwt && (!wordData || !themeData)) {
    return <div>Loading data</div>;
  }

  return (
    <BrowserRouter>
      <GlobalContextProvider data={globalContextData}>
        {/* <Link to={MAIN_PAGE}>Main Page</Link>
        <Link to={ADD_WORD_PAGE}>Add word</Link> */}
        {overlay.type && <Overlay />}
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
