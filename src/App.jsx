import './index.scss';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { DEFAULT_OVERLAY_STATE, OVERLAY_TYPES, ROUTES } from './common/constants';
import { getData, getThemesAction, getWordsAction } from './data/api';
import { getLocalJWT, setLocalJWT } from 'common/local-storage';
import { useEffect, useState } from 'react';

import { GlobalContextProvider } from 'providers/GlobalContext';
import Overlay from './overlays/Overlay';
import React from 'react';
import ThemePage from 'pages/theme-page/ThemePage';
import WordsPage from 'pages/words-page/WordsPage';

const { MAIN_PAGE, WORDS } = ROUTES;

// navigator.clipboard.readText().then((clipText) => console.log(clipText));

// katjazubova@gmail.com
// U9qWxNHd9uiHodsQx1gy

function App() {
  const [jwt, setJWT] = useState(getLocalJWT());
  const [overlay, setOverlay] = useState(DEFAULT_OVERLAY_STATE);
  const [overlayMetaData, setOverlayMetaData] = useState();
  const [wordData, setWordData] = useState();
  const [themeData, setThemeData] = useState();

  useEffect(() => {
    // LOGIN CHECK
    console.log('GLOBAL JWT OBJECT', jwt);
    if (!jwt) {
      setOverlay({ type: OVERLAY_TYPES.LOGIN });
    } else {
      setLocalJWT(jwt);
    }
  }, [jwt]);

  useEffect(() => {
    // FETCH DATA

    if (jwt) {
      getData(jwt).then(({ wordData, themeData }) => {
        setWordData(wordData);
        setThemeData(themeData);
      });
    }
  }, [jwt]);

  console.log('GLOBAL STATE', { wordData, themeData });

  const globalContextData = {
    wordData,
    themeData,
    overlay,
    setOverlay,
    overlayMetaData,
    setOverlayMetaData,
    setJWT,
    jwt
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
        {jwt && (
          <Routes>
            <Route path={MAIN_PAGE} element={<ThemePage />} />
            <Route path={`${WORDS}/:themeIdUrlParam`} element={<WordsPage />} />
            <Route path={WORDS} element={<WordsPage />} />
            {/* <Route path="*" element={<div>404</div>} /> */}
          </Routes>
        )}
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

export default App;
