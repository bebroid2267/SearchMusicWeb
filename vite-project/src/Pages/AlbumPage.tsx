import '../../../wwwroot/css/albumpage.css'
import Tracks from "../customComponents/tracks";
import { useArtistManager } from "../contexts/TrackManagerContext";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "../store/store";
import { fetchAlbumsArtist, fetchTracksArtist, searchAlbums, searchArtists, searchTracks } from "../store/Middleware/fetchDataPage";
import { setArtist } from "../store/artistSlice";
import '../../../wwwroot/css/artistTracksPage.css'
import { motion } from "framer-motion"
import { setQuearyUser } from '../store/searchDataSlice';

export default function AlbumPage() {
    const results: any = useSelector<RootState>(state => state.album);
    const { tracks, album, artists} = results;
    const albumManager = useArtistManager();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { quearySearch } = useParams();

    const coverAlbum = useRef<HTMLImageElement>(null);
    const panelForChangeColor = useRef<HTMLDivElement>(null);
    
    useEffect(() => {

        if (tracks == null && !store.getState().album.isPending && quearySearch) {
            dispatch(setQuearyUser(quearySearch));
            
            dispatch(searchTracks(quearySearch));
            dispatch(searchAlbums(quearySearch));
            dispatch(searchArtists(quearySearch));
        
            navigate(`/Result/${quearySearch}`);

        } else {
            albumManager.coverArtist = coverAlbum.current;
            albumManager.gradientDiv = panelForChangeColor.current;
        
            albumManager.changeAlbum(album);
        }
        console.log(artists);
    }, );

      const handleOpenArtistPage = async () => {
        dispatch(fetchTracksArtist({
            artistId: artists[0].id,
            page: 0,
            pageSize: 10,
        }));
        dispatch(fetchAlbumsArtist(artists[0].id));
        dispatch(setArtist(artists[0]));

        navigate(`/Artist/${artists[0].name}`);
      };

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
                            <div className="inline-container-tracks">
                                <div className="info-container">
                                    <p className="album-article">Альбом</p>
                                    <p className="all-tracks-article-album">{album?.title}</p>
                                    <div className="container-cover-artist">
                                        <img className="cover-artist-album" src={artists[0]?.coverPath} alt="" />
                                        <h2 className="artist-name-article-album" onClick={handleOpenArtistPage}>{album?.artistsName[0]}</h2>
                                    </div>
                                </div>
                                <img 
                                    className="album-cover-tracks" 
                                    src={album?.coverPath} 
                                    alt="обложка артиста" 
                                    ref={coverAlbum}
                                />
                            </div>
                        </div>
                    <div className="artist-container">
                        <div className="results">
                            <Tracks 
                                handleOpenTracks={null}
                                tracks={tracks} 
                                className={'artistTracks-ul'} 
                                classNameForTrackText={'artist-page-tracks-h2'} 
                                neededBtn={false}
                                currentPage={'none'}
                            />
                            <div className="pusto-div"></div>
                        </div>
                    </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}