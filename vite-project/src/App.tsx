import './App.css';
import '../../wwwroot/css/site.css';
import MainPage from './Pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import ResultPage from './Pages/ResultPage';
import { useMemo } from 'react';
import AuthPage from './Pages/AuthPage';
import FavoriteTracksPage from './Pages/FavoriteTracksPage';
import { ArtistManagerContext, TrackManagerProvider } from './contexts/TrackManagerContext';
import MusicPanel from './customComponents/musicPanel';
import ArtistPage from './Pages/ArtistPage';
import ArtistManager from './managers/ArtistManager';
import MainPanel from './customComponents/mainPanel';
import AlbumPage from './Pages/AlbumPage';
import { ArtistTracksPage } from './Pages/ArtistTracksPage';

function App() {

  const artistManger = useMemo(() => new ArtistManager(), []);

  return (
      <TrackManagerProvider>
        <ArtistManagerContext.Provider value={artistManger}>
        <MusicPanel />
        <MainPanel />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="Result/:quearySearch"
              element={<ResultPage />}
            />
            <Route path="Auth" element={<AuthPage />}></Route>
            <Route path="Favorites" element={<FavoriteTracksPage />}></Route>
            <Route path='Artist/:quearySearch' element={<ArtistPage/>}></Route>
            <Route path='Album/:quearySearch' element={<AlbumPage />}></Route>
            <Route path='Artist/:querySearch/tracks' element={<ArtistTracksPage/>}></Route>
          </Routes>
          </ArtistManagerContext.Provider>
      </TrackManagerProvider>
  );
}

export default App;
