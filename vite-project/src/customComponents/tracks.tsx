import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import '../../../wwwroot/css/favoritespage.css'
import { ITrack } from '../Interfaces';
import { useDispatch } from 'react-redux';
import { setCurrentTrack, setPlaylist } from '../store/playerSlice';
import { useTrackManager } from '../contexts/TrackManagerContext';
import store, { AppDispatch } from '../store/store';
import { useEffect } from 'react';
import { fetchUrl } from '../store/Middleware/fetchUrlForTrack';
import { setCurrentUrlWitoutFetch } from '../store/tracksSlice';
import { isLikedTrack } from '../store/Middleware/isLikedTrack';
import imgPlay from '../../../wwwroot/lib/resources/play (2).jpg';
import Track from './track';

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
    if (tracks) {
      dispatch(setPlaylist(tracks));
    }
    changeTrackPanel(track);
  };

  const changeTrackPanel = (track: ITrack) => {
    dispatch(setCurrentTrack(track));
    //if (!track.downloadUrl){
        dispatch(fetchUrl(track.id));
    //}
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
        {tracks
          ? tracks.map((track: ITrack) => (
            <Track track={track} handleClick={handleClick} ></Track>
            ))
          : (
            <h3 className="no-results" style={{marginLeft: '10px'}}>Ничего не найдено</h3>
          )}
      </ul>
    </div>
  );
}