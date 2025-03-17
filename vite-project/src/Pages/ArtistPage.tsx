import BackgroundVideo from "../customComponents/backVideo";
import '../../../wwwroot/css/artisttpagestyle.css'
import yalogo from '../../lib/resources/yalogo.svg'
import { useEffect, useRef } from "react";
import Tracks from "../customComponents/tracks";
import Albums from "../customComponents/albums";
import { useArtistManager, useTrackManager } from "../contexts/TrackManagerContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import clearPlay from '../../lib/resources/clearplay (1) (1).png'
import { isLikedTrack } from "../store/Middleware/isLikedTrack";
import { setCurrentTrack, setPlaylist } from "../store/playerSlice";
import { fetchUrl } from "../store/Middleware/fetchUrlForTrack";
import { ITrack } from "../Interfaces";

export default function ArtistPage() {
    const artistManager = useArtistManager();
    const trackManager = useTrackManager();
    const dispatch = useDispatch<AppDispatch>();
  
    const results: any = useSelector<RootState>(state => state.artist);
    const {tracks, albums, artist} = results;
    let cutTracks = null;

    if (tracks.length > 10) {
        cutTracks = tracks.slice(0, 10);
    } else {
        cutTracks = tracks.slice(0, tracks.length);
    }
    const navigate = useNavigate();

    const coverArtist = useRef<HTMLImageElement>(null);
    const panelForChangeColor = useRef<HTMLDivElement>(null);
    const betweenPanelForChangeColor = useRef<HTMLDivElement>(null);

    const handleOpenTracks = () => {
        navigate(`/Artist/${artist.name}/tracks`);
    };

    const handlePlayRandomTrack = () => {
        const randomTrack = Math.floor(Math.random() * cutTracks.length);
        trackManager.trackManager.isPlaying = true;
        dispatch(isLikedTrack(cutTracks[randomTrack]));
        if (tracks) {
          dispatch(setPlaylist(tracks));
        }
        changeTrackPanel(cutTracks[randomTrack]);
    };

    
      const changeTrackPanel = (track: ITrack) => {
        dispatch(setCurrentTrack(track));
            dispatch(fetchUrl(track.id));
      };
    


    useEffect(() => {
        artistManager.coverArtist = coverArtist.current;
        artistManager.gradientDiv = panelForChangeColor.current;
        artistManager.gradientDivBetweenPanel = betweenPanelForChangeColor.current;

        artistManager.changeArtist(artist);
    }, )
    return (
        <div className="intro">
            <div className="intro_result">
                <BackgroundVideo />
                <div className="artist-page-container">
                    <div className="header-artist-info" ref={panelForChangeColor}>
                            <div className="inline-container">
                                <img 
                                    className="artist-cover" 
                                    src={artist.coverPath} 
                                    alt="обложка артиста" 
                                    ref={coverArtist}
                                />
                                <div className="about-artist">
                                    <p className="artist-article">Артист</p>
                                    <h1 className="artist-name">{artist.name}</h1>
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
                        </div>
                    <div className="artist-container">
                        <div className="results">
                            <Tracks 
                                handleOpenTracks={handleOpenTracks}
                                tracks={cutTracks} 
                                className={'result-artist-ul'} 
                                classNameForTrackText={'artist-page-tracks-h2'} 
                                neededBtn={true}
                                isArtistTracksPage={false}
                            />
                            <div className="between-panel" ref={betweenPanelForChangeColor}>
                                <div className="container-random-track">
                                    <h2 className="article-random-track" >Случайный трек</h2>
                                    <img onClick={handlePlayRandomTrack} className="play-random-track-btn" src={clearPlay} alt="" />
                                </div>
                                <div className="container-random-album">
                                    <h2 className="article-random-album">Случайный альбом</h2>
                                    <img onClick={handlePlayRandomTrack} className="play-random-track-btn" src={clearPlay} alt="" />
                                </div>
                            </div>
                            <Albums
                                albums={albums}
                                className={'artistPage'}                       
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}