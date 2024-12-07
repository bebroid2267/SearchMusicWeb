import './App.css';
import '../../wwwroot/css/site.css';
import MainPage from './Pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import ResultPage from './Pages/ResultPage';
import { useState } from 'react';
import AuthPage from './Pages/AuthPage';
import FavoriteTracksPage from './Pages/FavoriteTracksPage';
import { TrackManagerContext } from './contexts/TrackManagerContext';
import TrackManager from '../src/managers/trackManager';
import MusicPanel from './customComponents/musicPanel';
import ArtistPage from './Pages/ArtistPage';

function App() {
  const [searchResults, setSearchResults] = useState(null);

  const trackManager = new TrackManager();
  return (
      <TrackManagerContext.Provider value={trackManager}>
      <MusicPanel />
        <Routes>
          <Route path="/" element={<MainPage onChange={setSearchResults} />} />
          <Route
            path="Result/:quearySearch"
            element={<ResultPage results={searchResults} />}
          />
          <Route path="Auth" element={<AuthPage />}></Route>
          <Route path="Favorites" element={<FavoriteTracksPage />}></Route>
          <Route path='Artist' element={<ArtistPage />}></Route>
        </Routes>
      </TrackManagerContext.Provider>
  );
}

export default App;
