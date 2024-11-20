import './App.css';
import '../../wwwroot/css/site.css';
import { Provider } from './components/ui/provider';
import MainPage from './Pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import ResultPage from './Pages/ResultPage';
import { useState } from 'react';
import AuthPage from './Pages/AuthPage';
import FavoriteTracksPage from './Pages/FavoriteTracksPage';
import { TrackManagerContext } from './contexts/TrackManagerContext';
import TrackManager from '../../wwwroot/js/trackManager';

function App() {
  const [searchResults, setSearchResults] = useState(null);

  const trackManager = new TrackManager();
  return (
    <>
      <TrackManagerContext.Provider value={trackManager}>
        <Routes>
          <Route path="/" element={<MainPage onChange={setSearchResults} />} />
          <Route
            path="Result/:quearySearch"
            element={<ResultPage results={searchResults} />}
          />
          <Route path="Auth" element={<AuthPage />}></Route>
          <Route path="Favorites" element={<FavoriteTracksPage />}></Route>
        </Routes>
      </TrackManagerContext.Provider>
    </>
  );
}

export default App;
