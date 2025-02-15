import { useState } from 'react';
import BackgroundVideo from '../customComponents/backVideo';
import { useNavigate } from 'react-router-dom';
import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { searchAlbums, searchArtists, searchTracks } from '../store/Middleware/fetchDataPage';

export type onChangeServer = {
  tracks: any;
  artist: any;
  albums: any;
};

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [queary, setQueary] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!queary.trim()) {
      alert('Введите запрос');
      return;
    }
    dispatch(searchTracks(queary));
    dispatch(searchAlbums(queary));
    dispatch(searchArtists(queary));

    navigate(`/Result/${queary}`);
  };

  return (
    <div className="intro">
      <BackgroundVideo />
      <div className="intro__content">
        <h1 className='intro-text'>Найти трек. Легко.</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="text_queary"
            name="Queary"
            id="input_queary"
            placeholder="Ник артиста или название трека"
            value={queary}
            onChange={(e) => setQueary(e.target.value)}
          />
          <button
            type="submit"
            className="btn_queary"
            id="btn_queary"
            style={{
              backgroundSize: 'cover',
              animation: 'pulse 1.5s infinite',
            }}>
            </button>
        </form>
      </div>
    </div>
  );
}
