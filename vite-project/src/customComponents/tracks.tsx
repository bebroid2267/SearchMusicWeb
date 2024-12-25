import { useEffect } from 'react';
import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import '../../../wwwroot/css/favoritespage.css'
import { ITrack } from '../Interfaces';
import { useTrackManager } from '../contexts/TrackManagerContext';

interface TracksProps {
  tracks: any;
  className: any;
  classNameForTrackText: any;
}

export default function Tracks({ tracks, className, classNameForTrackText }: TracksProps) {
  const trackManager = useTrackManager();

  useEffect(() => {
    if (tracks && tracks.trackList) {
      trackManager.resultTracks!.length = 0;
      trackManager.resultTracks = [...tracks.trackList];
    }
  }, [tracks]);

  const handleClick = (track: ITrack) => {
    trackManager.changeTrackPanel(track);
  };
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
          : null}
      </ul>
    </div>
  );
}
