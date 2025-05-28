import '../../../wwwroot/css/artisttpagestyle.css'
import { useEffect, useRef } from "react";
import Tracks from "../customComponents/tracks";
import Albums from "../customComponents/albums";
import { useArtistManager, useTrackManager } from "../contexts/TrackManagerContext";
import { useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import clearPlay from '../../lib/resources/clearplay (1) (1).png'
import { isLikedTrack } from "../store/Middleware/isLikedTrack";
import { setCurrentTrack, setPlaylist } from "../store/playerSlice";
import { fetchUrl } from "../store/Middleware/fetchUrlForTrack";
import { ITrack } from "../Interfaces";
import { motion } from "framer-motion"
import { setQuearyUser } from '../store/searchDataSlice';
import { searchAlbums, searchArtists, searchTracks } from '../store/Middleware/fetchDataPage';
// import { fetchAlbumsArtist, fetchTracksArtist } from '../store/Middleware/fetchDataPage';
// import { setArtist } from '../store/artistSlice';

export default function ArtistPage() {
    const artistManager = useArtistManager();
    const trackManager = useTrackManager();
    const dispatch = useDispatch<AppDispatch>();
    const artistContainer = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const { quearySearch } = useParams();
  
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
        const handleScroll = () => {
            let scrollPosition = window.scrollY;
        
            if (scrollPosition > 100) { 
                console.log('pupu');
                artistContainer.current!.style.transform = "translateY(-250px)";
            } else {
                console.log('p45353');
                artistContainer.current!.style.transform = "translateY(0)";
            }
        };

        window.addEventListener("scroll", handleScroll);

        if (tracks?.length == 0 && !store.getState().artist.isPending) {
            // if (artistId && querySearch)
            //     const artist: IArtist = {
    
            // }
            //     dispatch(fetchTracksArtist({
            //       artistId: artistId,
            //       page: 0,
            //       pageSize: 10,
            //     }));
            //     dispatch(fetchAlbumsArtist(artist.id));
            //     dispatch(setArtist(artist));
            console.log(quearySearch);
            if (quearySearch) {
                dispatch(setQuearyUser(quearySearch));
                
                dispatch(searchTracks({queary: quearySearch, pageSize: 10, page: 0}));
                dispatch(searchAlbums(quearySearch));
                dispatch(searchArtists(quearySearch));
            
                navigate(`/Result/${quearySearch}`);
            }
        }
    

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    useEffect(() => {
        artistManager.coverArtist = coverArtist.current;
        artistManager.gradientDiv = panelForChangeColor.current;
        artistManager.gradientDivBetweenPanel = betweenPanelForChangeColor.current;

        artistManager.changeArtist(artist);
    }, )

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
                                    {/* <div className="count-listeners-yandex">
                                        <img 
                                            className="img-ya-logo"
                                            src={yalogo} 
                                            alt="yalogo" 
                                        />
                                        <p className="count-listeners-p">Слушателей на Яндексе: 5.542</p>
                                    </div> */}
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
                            <div className="pustoi-div"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}