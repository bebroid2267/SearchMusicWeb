import ImageMainMapel from '../../src/resources/kandinsky-download-1725187229371.jpeg';
import '../../../wwwroot/css/site.css';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrackManager } from '../contexts/TrackManagerContext';
import mainImg from '../../lib/resources/home.png'
import favImg from '../../lib/resources/favorite.png'
import exitImg from '../../lib/resources/exit.png'
import enterImg from '../../lib/resources/user.png'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { selectUserIsAuth, setCurrentUser, setLogoutUser } from '../store/userSlice';
import { isUserAuth } from '../store/Middleware/isUserAuth';
import { fetchLikedTracks } from '../store/Middleware/fetchDataPage';
import MainButtonsMenu from './mainButtonsMenu';

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
        {/* <MainButtonsMenu></MainButtonsMenu> */}
        <img src={favImg} alt="fav" className='fav-img' />
        <button onClick={() => navigate('/')} className="btn-home">
          Главная
        </button>
        <img src={mainImg} alt="mainImg" className='main-img'/>
        <button className="btn-favorites" onClick={handleFavorites}>
          Фавориты
        </button>

        {isUserAuthorised ? ( <>
          <img src={exitImg} alt="exit" className='exit-img'/>
          <button className="btn-exit" onClick={handleLogout}>
            Выйти
          </button>
          </>
        ) : (
          <>
          <img src={enterImg} alt="enter" className='enter-img'/>
          <button onClick={handleAuth} className="btn-enter">
            Войти
          </button>
          </>
        )}
      </div>
    </div>
  );
}
