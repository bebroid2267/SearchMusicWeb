import ImageMainMapel from '../../src/resources/kandinsky-download-1725187229371.jpeg';
import '../../../wwwroot/css/site.css';
import '../../../wwwroot/css/result.css';
import { useEffect, useRef, useState } from 'react';
import { getCurrentUser, logout } from '../services/authService'; // Импортируем методы для работы с авторизацией
import { useNavigate } from 'react-router-dom';
import { useTrackManager } from '../contexts/TrackManagerContext';

export default function MainPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Состояние для авторизации
  const mainPanel = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const trackManager = useTrackManager();

  useEffect(() => {
    // Проверяем, есть ли текущий пользователь
    const currentUser = getCurrentUser();
    setIsAuthenticated(currentUser !== null); // Устанавливаем состояние в зависимости от наличия пользователя
  }, []);

  useEffect(() => {
    trackManager.mainPanel = mainPanel.current;
  }, [trackManager.currentTrack])

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
        <button onClick={() => navigate('/')} className="btn-home">
          Главная
        </button>
        <button className="btn-favorites" onClick={handleFavorites}>
          Фавориты
        </button>

        {isAuthenticated ? (
          <button className="btn-exit" onClick={handleLogout}>
            Выйти
          </button>
        ) : (
          <button onClick={handleAuth} className="btn-enter">
            Войти
          </button>
        )}
      </div>
    </div>
  );
}
