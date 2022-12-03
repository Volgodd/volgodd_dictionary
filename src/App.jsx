import './index.scss';

import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from 'react-router-dom';

import AddWordPage from './pages/add-word';
import MainPage from './pages/main';
import { ROUTES } from './common/constants';

const { MAIN_PAGE, ADD_WORD_PAGE } = ROUTES;

function App() {
  return (

    <BrowserRouter>
      {/* <Link to={MAIN_PAGE}>Main Page</Link>
      <Link to={ADD_WORD_PAGE}>Add word</Link> */}
      <Routes>
        <Route path={MAIN_PAGE} element={<MainPage />} />
        <Route path={ADD_WORD_PAGE} element={<AddWordPage />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
