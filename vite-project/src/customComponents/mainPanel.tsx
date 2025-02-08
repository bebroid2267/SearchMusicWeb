import ImageMainMapel from '../../src/resources/kandinsky-download-1725187229371.jpeg';
import '../../../wwwroot/css/site.css';
import { useEffect, useRef, useState } from 'react';
import { getCurrentUser, logout } from '../services/authService'; // Импортируем методы для работы с авторизацией
import { useNavigate } from 'react-router-dom';
import { useTrackManager } from '../contexts/TrackManagerContext';
import mainImg from '../../lib/resources/home.png'
import favImg from '../../lib/resources/favorite.png'
import exitImg from '../../lib/resources/exit.png'
import enterImg from '../../lib/resources/user.png'

export default function MainPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Состояние для авторизации
  const mainPanel = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const trackManager = useTrackManager();

  useEffect(() => {
    // Проверяем, есть ли текущий пользователь
    const currentUser = getCurrentUser();
    setIsAuthenticated(currentUser !== null); // Устанавливаем состояние в зависимости от наличия пользователя
  }, );

  useEffect(() => {
    trackManager.trackManager.mainPanel = mainPanel.current;
  },)

  const handleLogout = () => {
    logout(); // Вызываем метод логаута
    setIsAuthenticated(false); // Обновляем состояние
  };

  const handleAuth = () => {
    navigate('/Auth');
  };

  const handleFavorites = () => {
    navigate('/Favorites');
  };
  return (
    <div className="main-panel" ref={mainPanel}>
      <img src={ImageMainMapel} className="logo-service" alt="Service Logo" />
      <p className="name-service">Mell Music</p>
      <div className="button-container-main-panel">
        <img src={favImg} alt="fav" className='fav-img' />
        <button onClick={() => navigate('/')} className="btn-home">
          Главная
        </button>
        <img src={mainImg} alt="mainImg" className='main-img'/>
        <button className="btn-favorites" onClick={handleFavorites}>
          Фавориты
        </button>

        {isAuthenticated ? ( <>
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
