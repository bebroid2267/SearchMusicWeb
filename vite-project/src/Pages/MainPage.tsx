import { useState } from 'react';
import BackgroundVideo from '../customComponents/backVideo';
import { useNavigate } from 'react-router-dom';
import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import { getDifferentMusicResult } from '../services/musicService';
import yaLogo from '../resources/ya loho2.jpg'

export type onChangeServer = {
  tracks: any;
  artist: any;
  albums: any;
};

export default function MainPage({ onChange }: any) {

  const [queary, setQueary] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!queary.trim()) {
      alert('Введите запрос');
      return;
    }

    const dataTracks = await getDifferentMusicResult('SearchTracks', queary);
    const dataArtists = await getDifferentMusicResult('SearchArtists', queary);
    const dataAlbums = await getDifferentMusicResult('SearchAlbums', queary);

    const serverResponse: onChangeServer = {
      tracks: dataTracks,
      artist: dataArtists,
      albums: dataAlbums,
    };
    onChange(serverResponse);
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
