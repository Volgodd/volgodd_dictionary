import './index.scss';

import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from 'react-router-dom';

import AddWordOverlay from 'pages/add-word/AddWord';
import AddWordPage from './pages/add-word/AddWord';
import { GlobalContextProvider } from 'providers/GlobalContext';
import MainPage from './pages/main/MainPage';
import {OVERLAY_TYPES} from 'overlays/constants'
import Overlay from './overlays/Overlay'
import { ROUTES } from './common/constants';
import React from 'react'
import { useState } from 'react';

const { MAIN_PAGE, ADD_WORD_PAGE } = ROUTES;

navigator.clipboard
  .readText()
  .then(
    (clipText) => ( console.log(clipText))
  );

function App() {
  const [overlayType, setOverlayType] = useState()

  const globalContextData = {
    overlayType,
    setOverlayType,
    murmur: "!!!!!!!!!!!!"
  }

  return (
    <BrowserRouter>
      <GlobalContextProvider data={globalContextData}>
      
        {/* <Link to={MAIN_PAGE}>Main Page</Link>
        <Link to={ADD_WORD_PAGE}>Add word</Link> */}
        {overlayType && <Overlay />}
        <Routes>
          <Route path={MAIN_PAGE} element={<MainPage />} />
          <Route path={ADD_WORD_PAGE} element={<AddWordPage />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

export default App;
