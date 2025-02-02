import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import '../../../wwwroot/css/favoritespage.css'
import { ITrack } from '../Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentTrack, selectPlaylist, setActualDownloadUrlPlaylist, setCurrentTrack, setPlaylist } from '../store/playerSlice';
import { usePlayerManager } from '../customHooks/usePlayerManager';
import { useTrackManager } from '../contexts/TrackManagerContext';
import { RootState } from '../store/store';
import { useEffect } from 'react';

interface TracksProps {
  tracks: any;
  className: any;
  classNameForTrackText: any;
}

export default function Tracks({ tracks, className, classNameForTrackText }: TracksProps) {
  const playerManager = usePlayerManager();
  const trackManager = useTrackManager();
  const dispatch = useDispatch();
  const { url, loading, error } = useSelector((state: RootState) => state.tracks);
  const currentTrack = useSelector(selectCurrentTrack);
  const playlist = useSelector(selectPlaylist);

  const handleClick = (track: ITrack) => {
    if (tracks && tracks.trackList) {
      dispatch(setPlaylist(tracks.trackList));
      //trackManager.resultTracks = [...tracks.trackList];
    }
    playerManager.changeTrackPanel(track);
    console.log('between changetracks panels');
    console.log('after trackManager');
  };
  useEffect(() => {
      if (url) {
        console.log(url);
          dispatch(setActualDownloadUrlPlaylist({
              neededTrack: currentTrack,
                  url: url,
          }));
          console.log(currentTrack);
          trackManager.trackManager.changeTrackPanel({ 
            ...currentTrack,
            downloadUrl: url
          });
      }
  }, [url])
  
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