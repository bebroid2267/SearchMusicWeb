import BackgroundVideo from "../customComponents/backVideo";
import '../../../wwwroot/css/artisttpagestyle.css'
import yalogo from '../../lib/resources/yalogo.svg'
import { useEffect, useRef } from "react";
import Tracks from "../customComponents/tracks";
import Albums from "../customComponents/albums";
import { useArtistManager } from "../contexts/TrackManagerContext";

export default function ArtistPage({ result, onChangeAlbum }: any) {
    console.log(result);
    const artistManager = useArtistManager();
    const {tracks, albums, artist} = result;
    console.log(albums);

    const coverArtist = useRef<HTMLImageElement>(null);
    const panelForChangeColor = useRef<HTMLDivElement>(null);

    useEffect(() => {
        artistManager.coverArtist = coverArtist.current;
        artistManager.gradientDiv = panelForChangeColor.current;

        artistManager.changeArtist(artist);
    }, )
    return (
        <div className="intro">
            <div className="intro_result">
                <BackgroundVideo />
                <div className="artist-container" ref={panelForChangeColor}>
                    <div className="header-artist-info">
                        <img 
                            className="artist-cover" 
                            src={artist.coverPath} 
                            alt="обложка артиста" 
                            ref={coverArtist}
                        />
                        <div className="about-artist">
                            <p className="artist-article">Артист</p>
                            <h1>{artist.name}</h1>
                            <div className="count-listeners-yandex">
                                <img 
                                    className="img-ya-logo"
                                    src={yalogo} 
                                    alt="yalogo" 
                                />
                                <p className="count-listeners-p">Слушателей на Яндексе: 5.542</p>
                            </div>
                        </div>
                    </div>
                    <div className="results">
                        <Tracks 
                            tracks={tracks} 
                            className={'result-artist-ul'} 
                            classNameForTrackText={'no-style'} 
                        />
                        <Albums
                            albums={albums}
                            className={'artistPage'} 
                            onChangeAlbum={onChangeAlbum}                        
                         />
                    </div>
                </div>
            </div>
        </div>
    );
}