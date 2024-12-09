import './App.css';
import '../../wwwroot/css/site.css';
import MainPage from './Pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import ResultPage from './Pages/ResultPage';
import { useState } from 'react';
import AuthPage from './Pages/AuthPage';
import FavoriteTracksPage from './Pages/FavoriteTracksPage';
import { ArtistManagerContext, TrackManagerContext } from './contexts/TrackManagerContext';
import TrackManager from '../src/managers/trackManager';
import MusicPanel from './customComponents/musicPanel';
import ArtistPage from './Pages/ArtistPage';
import ArtistManager from './managers/ArtistManager';
import MainPanel from './customComponents/mainPanel';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [artist, setArtist] = useState(null);

  const trackManager = new TrackManager();
  const artistManger = new ArtistManager();
  return (
      <TrackManagerContext.Provider value={trackManager}>
        <ArtistManagerContext.Provider value={artistManger}>
        <MusicPanel />
        <MainPanel />
          <Routes>
            <Route path="/" element={<MainPage onChange={setSearchResults} />} />
            <Route
              path="Result/:quearySearch"
              element={<ResultPage results={searchResults} onChangeArtist={setArtist}/>}
            />
            <Route path="Auth" element={<AuthPage />}></Route>
            <Route path="Favorites" element={<FavoriteTracksPage />}></Route>
            <Route path='Artist/:quearySearch' element={<ArtistPage result={artist}/>}></Route>
          </Routes>
          </ArtistManagerContext.Provider>
      </TrackManagerContext.Provider>
  );
}

export default App;
