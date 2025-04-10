import { useEffect, useRef } from "react";
import Tracks from "../customComponents/tracks";
import { useSelector } from "react-redux";
import { useArtistManager } from "../contexts/TrackManagerContext";
import { RootState } from "../store/store";
import  "../../../wwwroot/css/artistTracksPage.css"
import backArrow from "../../lib/resources/Antu_go-previous-view.svg.png"
import { useNavigate } from "react-router-dom";

export function ArtistTracksPage () {
    const artistManager = useArtistManager();
    const results: any = useSelector<RootState>(state => state.artist);
    const {tracks, artist} = results;
    const navigate = useNavigate();
    const parentScrollDis = useRef<HTMLDivElement | null>(null); 

    const coverArtist = useRef<HTMLImageElement>(null);
    const panelForChangeColor = useRef<HTMLDivElement>(null);

    useEffect(() => {
        artistManager.coverArtist = coverArtist.current;
        artistManager.gradientDiv = panelForChangeColor.current;

        artistManager.changeArtist(artist);
    }, )

    const handleReturnArtistPage = () => {
        navigate(`/Artist/${artist.name}`);
    }

       return (
        <div className="intro">
            <div className="intro_result">
                <div className="artist-page-container" ref={parentScrollDis}>
                    <div className="header-artist-info" ref={panelForChangeColor}>
                            <div className="inline-container-tracks">
                                <div className="info-container">
                                    <div className="btn-exit-tracks-container" onClick={handleReturnArtistPage}>
                                        <img className="back-btn-tracks" src={backArrow} alt="" />
                                        <p className="back-btn-text-article">Назад к артисту</p>
                                    </div>
                                    <p className="all-tracks-article">Все треки</p>
                                    <h2 className="artist-name-article">{artist.name}</h2>
                                </div>
                                <img 
                                    className="artist-cover-tracks" 
                                    src={artist.coverPath} 
                                    alt="обложка артиста" 
                                    ref={coverArtist}
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
                                isArtistTracksPage={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}