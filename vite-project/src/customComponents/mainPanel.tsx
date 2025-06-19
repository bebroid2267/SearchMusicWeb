import ImageMainMapel from '../../src/resources/kandinsky-download-1725187229371.jpeg';
import '../../../wwwroot/css/site.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTrackManager } from '../contexts/TrackManagerContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { selectUserIsAuth, setCurrentUser, setLogoutUser } from '../store/userSlice';
import { isUserAuth } from '../store/Middleware/isUserAuth';
import MainButtons from './mainButtonsMenu';
import InputResult from './inputResultPage';
import { searchAlbums, searchArtists, searchTracks } from '../store/Middleware/fetchDataPage';
import { setQuearyUser } from '../store/searchDataSlice';
import styled from 'styled-components';

const StyledMainPanel = styled.div`
  .search-container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    margin-top: 5px;

    @media (max-width: 800px) {
      width: 300px;
    }

    @media (max-width: 900px) {
      display: none;
    }
  }

  .search-button {
    display: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    margin-top: 0px;

    svg {
      width: 24px;
      height: 24px;
      color: white;
      transition: color 0.2s ease;

      &:hover {
        color: rgb(194, 56, 199);
      }
    }

    @media (max-width: 900px) {
      display: block;
    }

    @media (max-width: 600px) {
      left: 110px;
      transform: none;
    }

    @media (max-width: 500px) {
          left: 50px;
      transform: none;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  .search-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    z-index: 1000;
    display: flex;
    justify-content: center;
  }

  .modal-content {
    position: absolute;
    top: 70px;
    width: 90%;
    max-width: 500px;
    padding: 10px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    animation: slideDown 0.3s ease;

    form {
      width: 100%;

      > div {
        width: 100%;
      }
    }

    .search-hint {
      text-align: center;
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
      margin-top: 8px;
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export default function MainPanel() {
  const mainPanel = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const trackManager = useTrackManager();
  const [queary, setQueary] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const isUserAuthorised = useSelector(selectUserIsAuth);

  // Определяем, нужно ли показывать поисковую строку или кнопку
  const shouldShowSearch = !location.pathname.includes('/Result') && 
                         !location.pathname.includes('/Auth') && 
                         location.pathname !== '/';

  useEffect(() => {
    dispatch(isUserAuth(null));
    dispatch(setCurrentUser());

    trackManager.trackManager.mainPanel = mainPanel.current;
  }, []);

  const handleLogout = () => {
    dispatch(setLogoutUser());
  };

  const handleAuth = () => {
    dispatch(setCurrentUser());
    navigate('/Auth');
  };

  const handleFavorites = () => {
    navigate('/Favorites');
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!queary.trim()) {
      alert('Введите запрос');
      return;
    }
    dispatch(setQuearyUser(queary));
    
    dispatch(searchTracks({queary, page: 0, pageSize: 16}));
    dispatch(searchAlbums({queary, page: 0, pageSize: 10}));
    dispatch(searchArtists({queary, page: 0, pageSize: 10}));

    setIsSearchModalOpen(false);
    navigate(`/Result/${queary}`);
  };

  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };
  
  return (
    <StyledMainPanel>
      <div className="main-panel" ref={mainPanel}>
        <img src={ImageMainMapel} className="logo-service" alt="Service Logo" />
        <p className="name-service">Спайси</p>
        {shouldShowSearch && (
          <>
            <div className="search-container">
              <form onSubmit={handleSubmit}>
                <InputResult 
                  id="input_queary" 
                  value={queary} 
                  name="Queary" 
                  onChange={setQueary}
                  variant="header"
                />
              </form>
            </div>
            <button className="search-button" onClick={handleSearchClick}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </>
        )}
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

      {isSearchModalOpen && shouldShowSearch && (
        <div className="search-modal" onClick={() => setIsSearchModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <InputResult 
                id="input_queary_modal" 
                value={queary} 
                name="Queary" 
                onChange={setQueary}
                variant="modal"
              />
              <div className="search-hint">
                Введите ваш запрос здесь
              </div>
            </form>
          </div>
        </div>
      )}
    </StyledMainPanel>
  );
}
