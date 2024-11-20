import { useState } from 'react';
import BackgroundVideo from '../customComponents/backVideo';
import MainPanel from '../customComponents/mainPanel';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';

export type onChangeServer = {
  tracks: any;
  artist: any;
  albums: any;
};

export default function MainPage({ onChange }: any) {
  const { quearySearch } = useParams();
  const [queary, setQueary] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!queary.trim()) {
      alert('Введите запрос');
      return;
    }

    const dataTracks = await postRequestsToServer('SearchTracks');
    const dataArtists = await postRequestsToServer('SearchArtists');
    const dataAlbums = await postRequestsToServer('SearchAlbums');

    const serverResponse: onChangeServer = {
      tracks: dataTracks,
      artist: dataArtists,
      albums: dataAlbums,
    };
    onChange(serverResponse);
    navigate(`/Result/${queary}`);
  };

  async function postRequestsToServer(request: string) {
    try {
      const response = await fetch(`https://localhost:44303/Home/${request}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Queary: queary }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="intro">
      <BackgroundVideo />
      <MainPanel />
      <div className="intro__content">
        <h1>Найти трек. Легко.</h1>
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
              backgroundImage: "url('../src/resources/yalogo.svg')",
              backgroundSize: 'cover',
              animation: 'pulse 1.5s infinite',
            }}
          ></button>
        </form>
      </div>
    </div>
  );
}
