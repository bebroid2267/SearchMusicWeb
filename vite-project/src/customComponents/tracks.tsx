import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import '../../../wwwroot/css/favoritespage.css'
import { ITrack } from '../Interfaces';
import { useDispatch } from 'react-redux';
import { setCurrentTrack, setPlaylist } from '../store/playerSlice';
import { useTrackManager } from '../contexts/TrackManagerContext';
import store, { AppDispatch } from '../store/store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchUrl } from '../store/Middleware/fetchUrlForTrack';
import { setCurrentUrlWitoutFetch } from '../store/tracksSlice';
import { isLikedTrack } from '../store/Middleware/isLikedTrack';
import imgPlay from '../../../wwwroot/lib/resources/play (2).jpg';
import Track from './track';
import Button from './buttonScrollAlbums';
import '../../../wwwroot/css/artistTracksPage.css'
import { fetchTracksArtistPage } from '../store/Middleware/fetchDataPage';

interface TracksProps {
  tracks: any;
  className: string;
  classNameForTrackText: string;
  handleOpenTracks: any;
  neededBtn: boolean;
  isArtistTracksPage: boolean;
}

export default function Tracks({ tracks, className, classNameForTrackText, handleOpenTracks, neededBtn, isArtistTracksPage }: TracksProps) {
  const trackManager = useTrackManager();
  const dispatch = useDispatch<AppDispatch>();
  const artistId = store.getState().artist.artist.id;

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const ulRef = useRef<HTMLUListElement>(null); // Ссылка на элемент ul


  const loadMoreTracks = useCallback(() => {
    const neededFinishDownload = store.getState().artist.isLastTracksScroll;
    if (loading || neededFinishDownload || !artistId) return;
    setLoading(true);
    dispatch(fetchTracksArtistPage({ artistId, page, pageSize: 10 }))
      .then(() => {
        setPage(prevPage => prevPage + 1);
      })
      .finally(() => setLoading(false));
  }, [dispatch, artistId, page, loading]);

  const handleScroll = useCallback(() => {
    if (!ulRef.current) return;
    const ulElement = ulRef.current;
    // Проверяем, находится ли пользователь внизу элемента ul
    if (ulElement.scrollTop + ulElement.clientHeight >= ulElement.scrollHeight - 200) {
      loadMoreTracks();
    }
  }, [loadMoreTracks]);


  useEffect(() => {
    const neededFinishDownload = store.getState().artist.isLastTracksScroll;
    if (!isArtistTracksPage || !artistId || neededFinishDownload) return;
    loadMoreTracks();

    if (ulRef.current) {
      ulRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ulRef.current) {
        ulRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isArtistTracksPage, artistId, loadMoreTracks, handleScroll]);


  const handleClick = (track: ITrack) => {
    dispatch(isLikedTrack(track));
    if (tracks) {
      dispatch(setPlaylist(tracks));
    }
    changeTrackPanel(track);
  };

  const changeTrackPanel = (track: ITrack) => {
    dispatch(setCurrentTrack(track));
        dispatch(fetchUrl(track.id));
    trackManager.trackManager.playTrackBtn!.src = imgPlay;
  };
  
  useEffect(() => {
    const currentTrack = store.getState().player.currentTrack;
    dispatch(setCurrentUrlWitoutFetch(currentTrack.downloadUrl));
  },);

  return (
    <div className={'result-' + className}>
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
}