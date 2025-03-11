import BackgroundVideo from "../customComponents/backVideo";
import '../../../wwwroot/css/albumpage.css'
import Tracks from "../customComponents/tracks";
import { useArtistManager } from "../contexts/TrackManagerContext";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchAlbumsArtist, fetchTracksArtist } from "../store/Middleware/fetchDataPage";
import { setArtist } from "../store/artistSlice";
import '../../../wwwroot/css/artistTracksPage.css'

export default function AlbumPage() {
    const results: any = useSelector<RootState>(state => state.album);
    const { tracks, album, artist} = results;
    const albumManager = useArtistManager();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const coverAlbum = useRef<HTMLImageElement>(null);
    const panelForChangeColor = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        albumManager.coverArtist = coverAlbum.current;
        albumManager.gradientDiv = panelForChangeColor.current;
    
        console.log(results);
        albumManager.changeAlbum(album);
    }, );

      const handleOpenArtistPage = async () => {
        dispatch(fetchTracksArtist({
            artistId: artist.id,
            page: 0,
            pageSize: 10,
        }));
        dispatch(fetchAlbumsArtist(artist.id));
        dispatch(setArtist(artist));

        navigate(`/Artist/${artist.name}`);
      };

    return (
        <div className="intro">
            <div className="intro_result">
            <BackgroundVideo />

            <div className="artist-page-container">
                    <div className="header-artist-info" ref={panelForChangeColor}>
                            <div className="inline-container-tracks">
                                <div className="info-container">
                                    <p className="album-article">Альбом</p>
                                    <p className="all-tracks-article-album">{album?.title}</p>
                                    <div className="container-cover-artist">
                                        <img className="cover-artist-album" src={artist?.coverPath} alt="" />
                                        <h2 className="artist-name-article-album" onClick={handleOpenArtistPage}>{album?.artistName}</h2>
                                    </div>
                                </div>
                                <img 
                                    className="album-cover-tracks" 
                                    src={album.coverPath} 
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
                                isArtistTracksPage={false}
                            />
                        </div>
                    </div>
                </div>


                {/* <div className="album-container" ref={panelForChangeColor}>
                    <div className="header-album-info">
                        <img 
                            className="album-cover"
                            src={album.coverPath}
                            alt="обложка альбома"
                            ref={coverAlbum} 
                        />
                        <div className="about-album">
                            <div className="artist-album-cover" onClick={handleOpenArtistPage}>
                                <img className="artist-album-cover-img" src={artist?.coverPath} alt="" />
                                <p className="album-article">{artist?.name}</p>
                            </div>
                            <h1>{album.title}</h1>
                            <div className="count-tracks">

                            </div>
                        </div>
                    </div>
                    <Tracks 
                        handleOpenTracks={null}
                        tracks={tracks}
                        className={'result-tracks-ul'}
                        classNameForTrackText={'no-style'}
                    />
                </div> */}
            </div>
        </div>
    );
}