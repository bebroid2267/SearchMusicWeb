import '../../../wwwroot/css/favoritespage.css'
import Tracks from '../customComponents/tracks';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectLikedTracks } from '../store/searchDataSlice';
import { selectUserIsAuth, setCurrentUser } from '../store/userSlice';
import { AppDispatch } from '../store/store';
import heartImg from '../../lib/resources/kandinsky-download-1741283020133.png'
import { useArtistManager } from "../contexts/TrackManagerContext";

export default function FavoritePage() {
  const tracks = useSelector(selectLikedTracks);
  const isAuth = useSelector(selectUserIsAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const artistManager = useArtistManager();

  const heartImgRef = useRef<HTMLImageElement>(null);
  const panelForChangeColor = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (!isAuth) {
        dispatch(setCurrentUser());
        navigate('/Auth');
      }
  },);

  useEffect(() => {
    artistManager.coverArtist = heartImgRef.current;
    artistManager.gradientDiv = panelForChangeColor.current;

    artistManager.changeBackgroundArtistPanel();
}, )


  return (
    <div className="intro">
      <div className="intro_result">
        <div className="artist-page-container">
                    <div className="header-favorite-tracks" ref={panelForChangeColor}>
                            <div className="inline-container-tracks">
                                <div className="info-container">
                                    <p className="all-tracks-article">Фавориты</p>
                                    <h2 className="artist-name-article">Треки которые вам понравились</h2>
                                </div>
                                <img 
                                    className="heart-img" 
                                    src={heartImg} 
                                    alt="обложка артиста" 
                                    // ref={heartImgRef}
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

        {/* <div className="favorite_content">
          <Tracks isArtistTracksPage={false} tracks={tracks} className={'favorites'} classNameForTrackText={'tracks-text'} handleOpenTracks={null} neededBtn={false}/>
        </div> */}
      </div>
    </div>
  );
}
