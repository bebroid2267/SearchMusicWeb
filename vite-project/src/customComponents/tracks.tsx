import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import '../../../wwwroot/css/favoritespage.css'
import { ITrack } from '../Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTrack, setPlaylist } from '../store/playerSlice';
import { useTrackManager } from '../contexts/TrackManagerContext';
import store, { AppDispatch, RootState } from '../store/store';
import { useEffect } from 'react';
import { fetchUrl } from '../store/Middleware/fetchUrlForTrack';
import { setCurrentUrlWitoutFetch } from '../store/tracksSlice';
import { isLikedTrack } from '../store/Middleware/isLikedTrack';
import imgPlay from '../../../wwwroot/lib/resources/play (2).jpg';

interface TracksProps {
  tracks: any;
  className: any;
  classNameForTrackText: any;
}

export default function Tracks({ tracks, className, classNameForTrackText }: TracksProps) {
  const trackManager = useTrackManager();
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (track: ITrack) => {
    dispatch(isLikedTrack(track));
    if (tracks && tracks.trackList) {
      dispatch(setPlaylist(tracks.trackList));
    }
    changeTrackPanel(track);
  };

  const changeTrackPanel = (track: ITrack) => {
    dispatch(setCurrentTrack(track));
    if (!track.downloadUrl){
        dispatch(fetchUrl(track.id));
    }
    trackManager.trackManager.playTrackBtn!.src = imgPlay;
  };
  
  useEffect(() => {
    const currentTrack = store.getState().player.currentTrack;
    dispatch(setCurrentUrlWitoutFetch(currentTrack.downloadUrl));
  },);

  return (
    <div className={'result-' + className}>
      <h2 id={classNameForTrackText}>Треки</h2>
      <ul className={className}>
        {tracks && tracks.trackList
          ? tracks.trackList.map((track: ITrack) => (
              <li
                key={track.id}
                className="track-item"
                data-id={track.id}
                data-cover-path={track.coverPath}
                data-title={track.title}
                data-artist={track.artist}
                onClick={() => handleClick(track)}
              >
                <img
                  src={track.coverPath}
                  alt="Обложка песни"
                  className="cover"
                />
                <div className="track-info">
                  <h3 className="track-title">{track.title}</h3>
                  <p className="track-artist">{track.artist}</p>
                </div>
              </li>
            ))
          : (
            <h3 className="no-results" style={{marginLeft: '10px'}}>Ничего не найдено</h3>
          )}
      </ul>
    </div>
  );
}