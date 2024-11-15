import '../../../wwwroot/css/result.css'
import '../../../wwwroot/css/site.css'
import { ITrack } from '../../../wwwroot/js/Interfaces/Interfaces'

export default function Tracks({ tracks }: { tracks: any }) {
    return (
      <div className="result-tracks">
        <h2 id="artist-text">Треки</h2>
        <ul className="tracks">
          {tracks && tracks.trackList
            ? tracks.trackList.map((track: ITrack) => (
                <li
                  key={track.id}
                  className="track-item"
                  data-id={track.id}
                  data-cover-path={track.coverPath}
                  data-title={track.title}
                  data-artist={track.artist}
                >
                  <img src={track.coverPath} alt="Обложка песни" className="cover" />
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
  