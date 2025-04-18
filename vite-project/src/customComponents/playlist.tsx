import { forwardRef } from "react";
import "../../../wwwroot/css/playlist.css"
import Tracks from "./tracks";
import { useSelector } from "react-redux";
import { selectPlaylist } from "../store/playerSlice";

const Playlist = forwardRef<HTMLDivElement>((_, ref) => {
    const tracks = useSelector(selectPlaylist);
 return (
    <div className="panel-playlist" ref={ref}>
        <h2 className="playlist-h2">Плейлист</h2>
        <Tracks 
            tracks={tracks}
            className={'playlist'}
            classNameForTrackText={'article-playlist'} 
            handleOpenTracks={null} 
            neededBtn={false} 
            currentPage={'none'}            
        />
    </div>
 );
});

export default Playlist;