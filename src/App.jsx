import './index.scss';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AddWordPage from './pages/add-word/AddWord';
import { GlobalContextProvider } from 'providers/GlobalContext';
import Overlay from './overlays/Overlay';
import { ROUTES } from './common/constants';
import React from 'react';
import ThemePage from 'pages/theme-page/ThemePage';
import WordsPage from 'pages/words-page/WordsPage';
import { getData } from './data/api';

const { MAIN_PAGE, ADD_WORD_PAGE, WORDS } = ROUTES;

// navigator.clipboard.readText().then((clipText) => console.log(clipText));

function App() {
  const [overlayType, setOverlayType] = useState();
  const [wordData, setWordData] = useState();
  const [themeData, setThemeData] = useState();

  useEffect(() => {
    console.log('APP LOADED. Data call');

    getData().then((data) => {
      const { wordData, themeData } = data;
      setWordData(wordData);
      setThemeData(themeData);
    });
  }, []);

  console.log('ROOT RENDER', { wordData, themeData });
  // const [createTheme, setCreateTheme] = useState({native:'', foreign: '', level:''});

  const globalContextData = {
    wordData,
    themeData,
    overlayType,
    setOverlayType,
    murmur: '!!!!!!!!!!!!'

    // createTheme,
    // setCreateTheme,
  };

  if (!wordData || !themeData) {
    return <div>Loading data</div>;
  }

  return (
    <BrowserRouter>
      <GlobalContextProvider data={globalContextData}>
        {/* <Link to={MAIN_PAGE}>Main Page</Link>
        <Link to={ADD_WORD_PAGE}>Add word</Link> */}
        {overlayType && <Overlay />}
        <Routes>
          <Route path={MAIN_PAGE} element={<ThemePage />} />
          <Route path={ADD_WORD_PAGE} element={<AddWordPage />} />
          <Route path={`${WORDS}/:themeIdUrlParam`} element={<WordsPage />} />
          <Route path={WORDS} element={<WordsPage />} />
          {/* <Route path="*" element={<div>404</div>} /> */}
        </Routes>
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

export default App;
