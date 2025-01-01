import './App.css';
import '../../wwwroot/css/site.css';
import MainPage from './Pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import ResultPage from './Pages/ResultPage';
import { useMemo, useState } from 'react';
import AuthPage from './Pages/AuthPage';
import FavoriteTracksPage from './Pages/FavoriteTracksPage';
import { ArtistManagerContext, TrackManagerContext } from './contexts/TrackManagerContext';
import TrackManager from '../src/managers/trackManager';
import MusicPanel from './customComponents/musicPanel';
import ArtistPage from './Pages/ArtistPage';
import ArtistManager from './managers/ArtistManager';
import MainPanel from './customComponents/mainPanel';
import AlbumPage from './Pages/AlbumPage';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [artist, setArtist] = useState(null);
  const [album, setAlbum] = useState(null);

  const trackManager = useMemo(() => new TrackManager(), []);
  const artistManger = useMemo(() => new ArtistManager(), []);
  return (
      <TrackManagerContext.Provider value={trackManager}>
        <ArtistManagerContext.Provider value={artistManger}>
        <MusicPanel onChangeAlbum={setAlbum} onChangeArtist={setArtist}/>
        <MainPanel />
          <Routes>
            <Route path="/" element={<MainPage onChange={setSearchResults} />} />
            <Route
              path="Result/:quearySearch"
              element={<ResultPage results={searchResults} onChangeArtist={setArtist} onChangeAlbum={setAlbum}/>}
            />
            <Route path="Auth" element={<AuthPage />}></Route>
            <Route path="Favorites" element={<FavoriteTracksPage />}></Route>
            <Route path='Artist/:quearySearch' element={<ArtistPage result={artist} onChangeAlbum={setAlbum}/>}></Route>
            <Route path='Album/:quearySearch' element={<AlbumPage result={album} />}></Route>
          </Routes>
          </ArtistManagerContext.Provider>
      </TrackManagerContext.Provider>
  );
}

export default App;
