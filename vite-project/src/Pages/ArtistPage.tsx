import '../../../wwwroot/css/artisttpagestyle.css'
import { useEffect, useRef } from "react";
import Tracks from "../customComponents/tracks";
import Albums from "../customComponents/albums";
import { useArtistManager, useTrackManager } from "../contexts/TrackManagerContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import playIcon from '../../lib/resources/play (2).jpg'
import { isLikedTrack } from "../store/Middleware/isLikedTrack";
import { setCurrentTrack, setIsPlay, setPlaylist } from "../store/playerSlice";
import { fetchUrl } from "../store/Middleware/fetchUrlForTrack";
import { ITrack } from "../Interfaces";
import { motion } from "framer-motion"
import { fetchAlbumsArtist, fetchTracksAlbum } from "../store/Middleware/fetchDataPage";

export default function ArtistPage() {
    const artistManager = useArtistManager();
    const trackManager = useTrackManager();
    const dispatch = useDispatch<AppDispatch>();
    const artistContainer = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
  
    const results: any = useSelector<RootState>(state => state.artist);
    const {tracks, albums, artist} = results;
    
    let cutTracks = null;

    if (tracks?.length > 10) {
        cutTracks = tracks.slice(0, 10);
    } else {
        cutTracks = tracks?.slice(0, tracks?.length);
    }

    const coverArtist = useRef<HTMLImageElement>(null);
    const panelForChangeColor = useRef<HTMLDivElement>(null);
    const betweenPanelForChangeColor = useRef<HTMLDivElement>(null);
    const resultArtistUlRef = useRef<HTMLDivElement>(null);

    // Инициализация загрузки альбомов при первом рендере
    useEffect(() => {
        if (artist?.id) {
            dispatch(fetchAlbumsArtist({
                artistId: artist.id,
                page: 0,
                pageSize: 10
            }));
        }
    }, [artist?.id, dispatch]);

    const handleOpenTracks = () => {
        navigate(`/Artist/${artist.name}/tracks`);
    };

    const handlePlayRandomTrack = () => {
        if (!cutTracks || cutTracks.length === 0) return;

        const randomTrack = Math.floor(Math.random() * cutTracks.length);
        trackManager.trackManager.isPlaying = true;
        dispatch(setIsPlay(true));
        dispatch(isLikedTrack(cutTracks[randomTrack]));
        if (tracks) {
          dispatch(setPlaylist(tracks));
        }
        changeTrackPanel(cutTracks[randomTrack]);
    };

    const handlePlayRandomAlbum = () => {
        if (!albums || albums.length === 0) return;

        const randomAlbum = Math.floor(Math.random() * albums.length);
        const album = albums[randomAlbum];
        
        // Загружаем треки альбома и воспроизводим первый трек
        dispatch(fetchTracksAlbum(album.id.toString()))
          .unwrap()
          .then((albumTracks: ITrack[]) => {
            if (albumTracks && albumTracks.length > 0) {
              trackManager.trackManager.isPlaying = true;
              dispatch(setIsPlay(true));
              dispatch(isLikedTrack(albumTracks[0]));
              dispatch(setPlaylist(albumTracks));
              changeTrackPanel(albumTracks[0]);
            }
          });
    };
    
    const changeTrackPanel = (track: ITrack) => {
        dispatch(setCurrentTrack(track));
        dispatch(fetchUrl(track.id));
    };
    
    useEffect(() => {
        const handleScroll = () => {
            let scrollPosition = window.scrollY;
        
            if (scrollPosition > 100) { 
                artistContainer.current!.style.transform = "translateY(-250px)";
            } else {
                artistContainer.current!.style.transform = "translateY(0)";
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        artistManager.coverArtist = coverArtist.current;
        artistManager.gradientDiv = panelForChangeColor.current;
        artistManager.gradientDivBetweenPanel = betweenPanelForChangeColor.current;
        artistManager.resultArtistUlDiv = resultArtistUlRef.current;
        
        artistManager.changeArtist(artist);
    }, [artist]);

    return (
        <div className="intro">
            <div className="intro_result">
                <div className="artist-page-container">
                <motion.div 
                    initial={{opacity: 0}}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.1 }}
                    >
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
                                </div>
                            </div>
                        </div>
                        <div className="artist-container" ref={artistContainer}>
                            <div className="results">
                                <Tracks 
                                    handleOpenTracks={handleOpenTracks}
                                    tracks={cutTracks} 
                                    className={'result-artist-ul'} 
                                    classNameForTrackText={'artist-page-tracks-h2'} 
                                    neededBtn={true}
                                    currentPage={'none'}
                                    ref={resultArtistUlRef}
                                />
                                <div className="between-panel" ref={betweenPanelForChangeColor}>
                                    <div className="container-random-track">
                                        <h2 className="article-random-track">Случайный трек</h2>
                                        <img onClick={handlePlayRandomTrack} className="play-random-track-btn" src={playIcon} alt="Play" />
                                    </div>
                                    <div className="container-random-album">
                                        <h2 className="article-random-album">Случайный альбом</h2>
                                        <img onClick={handlePlayRandomAlbum} className="play-random-track-btn" src={playIcon} alt="Play" />
                                    </div>
                                </div>
                                <Albums
                                    albums={albums}
                                    className={'artistPage'}
                                    currentPage={'artist'}                       
                                />
                            </div>
                            <div className="pustoi-div"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}