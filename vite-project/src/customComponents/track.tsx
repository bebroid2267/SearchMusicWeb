import { ITrack } from "../Interfaces";

interface TrackProps {
    track: ITrack;
    handleClick: any;
  }

export default function Track ({track, handleClick}: TrackProps) {    
    return (
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
    );
}