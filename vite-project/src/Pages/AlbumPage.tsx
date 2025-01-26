import BackgroundVideo from "../customComponents/backVideo";
import '../../../wwwroot/css/albumpage.css'
import Tracks from "../customComponents/tracks";
import { useArtistManager } from "../contexts/TrackManagerContext";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getInfoArtist } from "../services/artistService";
import { onChangeServer } from "./MainPage";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function AlbumPage( {result, onChangeArtist }:any ) {
    const results: any = useSelector<RootState>(state => state.album);
    const { tracks, albums, artist} = results;
    console.log(tracks);
    console.log(albums);
    console.log(artist);
    const albumManager = useArtistManager();
    const navigate = useNavigate();

    const coverAlbum = useRef<HTMLImageElement>(null);
    const panelForChangeColor = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        albumManager.coverArtist = coverAlbum.current;
        albumManager.gradientDiv = panelForChangeColor.current;
    
        albumManager.changeAlbum(albums);
    });

      const handleOpenArtistPage = async () => {
        const dataTracks = await getInfoArtist('GetTracksArtist', artist.id.toString());
        const dataAlbums =  await getInfoArtist('GetAlbumsArtist', artist.id.toString());
        const serverResponse: onChangeServer = {
          tracks: dataTracks,
          albums: dataAlbums,
          artist: artist
        };
        onChangeArtist(serverResponse);
        navigate(`/Artist/${artist.name}`);
      };

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
                            <div className="artist-album-cover" onClick={handleOpenArtistPage}>
                                <img className="artist-album-cover-img" src={artist.coverPath} alt="" />
                                <p className="album-article">{artist.name}</p>
                            </div>
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