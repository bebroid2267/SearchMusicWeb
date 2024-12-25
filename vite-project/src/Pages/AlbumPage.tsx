import BackgroundVideo from "../customComponents/backVideo";
import '../../../wwwroot/css/albumpage.css'
import Tracks from "../customComponents/tracks";
import { useArtistManager } from "../contexts/TrackManagerContext";
import { useEffect, useRef } from "react";

export default function AlbumPage( {result }:any ) {
    const {tracks, albums, artist} = result;
    const albumManager = useArtistManager();

    const coverAlbum = useRef<HTMLImageElement>(null);
    const panelForChangeColor = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        albumManager.coverArtist = coverAlbum.current;
        albumManager.gradientDiv = panelForChangeColor.current;
    
        albumManager.changeAlbum(albums);
    });

    return (
        <div className="intro">
            <div className="intro_result">
            <BackgroundVideo />
                <div className="album-container" ref={panelForChangeColor}>
                    <div className="header-album-info">
                        <img 
                            className="album-cover"
                            src={albums.coverPath}
                            alt="обложка альбома"
                            ref={coverAlbum} 
                        />
                        <div className="about-album">
                            <p className="album-article">{artist}</p>
                            <h1>{albums.title}</h1>
                            <div className="count-tracks">

                            </div>
                        </div>
                    </div>
                    <Tracks 
                        tracks={tracks}
                        className={'result-tracks-ul'}
                        classNameForTrackText={'no-style'}
                    />
                </div>
            </div>
        </div>
    );
}