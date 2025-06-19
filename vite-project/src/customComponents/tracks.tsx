import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import '../../../wwwroot/css/favoritespage.css'
import { ITrack } from '../Interfaces';
import { useDispatch } from 'react-redux';
import { setCurrentTrack, setIsPlay, setPlaylist } from '../store/playerSlice';
import { useTrackManager } from '../contexts/TrackManagerContext';
import store, { AppDispatch } from '../store/store';
import { useCallback, forwardRef, useEffect, useRef, useState } from 'react';
import { fetchUrl } from '../store/Middleware/fetchUrlForTrack';
import { isLikedTrack } from '../store/Middleware/isLikedTrack';
import Track from './track';
import Button from './buttonScrollAlbums';
import '../../../wwwroot/css/artistTracksPage.css'
import { fetchTracksArtistPage, searchTrackPage } from '../store/Middleware/fetchDataPage';

type Page = 'artist' | 'result' | 'none';

interface TracksProps {
    tracks: ITrack[];
    className: string;
    classNameForTrackText: string;
    neededBtn: boolean;
    currentPage: Page;
    handleOpenTracks?: (() => void) | null;
}

const Tracks = forwardRef<HTMLDivElement, TracksProps>(({ 
    tracks, 
    className, 
    classNameForTrackText, 
    neededBtn, 
    currentPage,
    handleOpenTracks 
}, ref) => {
  const trackManager = useTrackManager();
  const dispatch = useDispatch<AppDispatch>();
  const artistId = store.getState().artist.artist.id;

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const ulRef = useRef<HTMLUListElement>(null); // Ссылка на элемент ul


  const loadMoreTracksArtist = useCallback(() => {
    const neededFinishDownload = store.getState().artist.isLastTracksScroll;
    if (loading || neededFinishDownload || !artistId || page > 20) return;
    setLoading(true);
    dispatch(fetchTracksArtistPage({ artistId, page, pageSize: 10 }))
      .then(() => {
        setPage(prevPage => prevPage + 1);
      })
      .finally(() => setLoading(false));
  }, [dispatch, artistId, page, loading]);

  const loadMoreTracksResult = useCallback(() => {
    const neededFinishDownload = store.getState().data.isLastTracksScroll;
    const queary = store.getState().data.queary;
    if (loading || neededFinishDownload || !artistId || page > 20) return;
    setLoading(true);
    dispatch(searchTrackPage({ queary, page, pageSize: 10 }))
      .then(() => {
        setPage(prevPage => prevPage + 1);
      })
      .finally(() => setLoading(false));
  }, [dispatch, page, loading]);


  const handleScroll = useCallback(() => {
    if (!ulRef.current) return;
    const ulElement = ulRef.current;
    // Проверяем, находится ли пользователь внизу элемента ul
    if (ulElement.scrollTop + ulElement.clientHeight >= ulElement.scrollHeight - 200) {
      if (currentPage == 'artist') {
        loadMoreTracksArtist();
      }
      else {
        loadMoreTracksResult();
      }
    }
  }, [loadMoreTracksArtist, loadMoreTracksResult]);


  useEffect(() => {
    const neededFinishDownload = store.getState().artist.isLastTracksScroll;
    if (currentPage == 'none' || !artistId || neededFinishDownload) return;

    if (currentPage == 'artist') {
      loadMoreTracksArtist();
    }
    else {
      loadMoreTracksResult();
    }

    if (ulRef.current) {
      ulRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ulRef.current) {
        ulRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentPage, artistId, loadMoreTracksArtist, loadMoreTracksResult, handleScroll]);


  const handleClick = (track: ITrack) => {
    trackManager.trackManager.isPlaying = true;
    dispatch(setIsPlay(true));
    dispatch(isLikedTrack(track));
    if (tracks) {
      dispatch(setPlaylist(tracks));
    }
    changeTrackPanel(track);
  };

  const changeTrackPanel = (track: ITrack) => {
    console.log(track);
    dispatch(setCurrentTrack(track));
    dispatch(fetchUrl(track.id));
  };
  
  return (
    <div className={'result-' + className} ref={ref}>
      <div className='container-article-tracks'>
        <h2 id={classNameForTrackText}>Треки</h2>
        {neededBtn ?
          <Button rotation={-1} className='btn-open-tracks-artist' onClick={handleOpenTracks}></Button>
        : null}
      </div>
      
      <ul ref={ulRef} className={className}>
        {tracks
          ? tracks.map((track: ITrack) => (
            <div key={track.id}>
              <Track track={track} handleClick={handleClick} ></Track>
            </div>
            ))
          : (
            <h3 className="no-results" style={{marginLeft: '10px'}}>Ничего не найдено</h3>
          )}
          {loading && <div>Download...</div>}
      </ul>
    </div>
  );
});

export default Tracks;