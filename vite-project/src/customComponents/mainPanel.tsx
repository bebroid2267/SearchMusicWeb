import ImageMainMapel from '../../src/resources/kandinsky-download-1725187229371.jpeg';
import '../../../wwwroot/css/site.css';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrackManager } from '../contexts/TrackManagerContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { selectUserIsAuth, setCurrentUser, setLogoutUser } from '../store/userSlice';
import { isUserAuth } from '../store/Middleware/isUserAuth';
import { fetchLikedTracks } from '../store/Middleware/fetchDataPage';
import MainButtons from './mainButtonsMenu';

export default function MainPanel() {
  const mainPanel = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const trackManager = useTrackManager();

  const dispatch = useDispatch<AppDispatch>();
  const isUserAuthorised = useSelector(selectUserIsAuth);

  useEffect(() => {
    dispatch(isUserAuth(null));
    dispatch(setCurrentUser());

    trackManager.trackManager.mainPanel = mainPanel.current;
  }, );

  const handleLogout = () => {
    dispatch(setLogoutUser());
  };

  const handleAuth = () => {
    dispatch(setCurrentUser());
    navigate('/Auth');
  };

  const handleFavorites = () => {
    dispatch(fetchLikedTracks(null));
    navigate('/Favorites');
  };
  
  return (
    <div className="main-panel" ref={mainPanel}>
      <img src={ImageMainMapel} className="logo-service" alt="Service Logo" />
      <p className="name-service">Спайси</p>
      <div className="button-container-main-panel">
        <MainButtons 
          onClickFav={handleFavorites}
          onClickHome={() => navigate('/')}
          onClickLogin={handleAuth}
          onClickLogout={handleLogout}
          isUserAuth={isUserAuthorised}
        />
      </div>
    </div>
  );
}
