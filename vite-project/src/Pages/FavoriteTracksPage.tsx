import axios from 'axios';
import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import BackgroundVideo from '../customComponents/backVideo';
import MainPanel from '../customComponents/mainPanel';
import MusicPanel from '../customComponents/musicPanel';
import Tracks from '../customComponents/tracks';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { ITrack } from '../../../wwwroot/js/Interfaces/Interfaces';
import { useNavigate } from 'react-router-dom';

export default function ResultPage({ results }: any) {
  const [tracks, setTracks] = useState<ITrack[]>([]); // Состояние для треков
  const navigate = useNavigate();

  useEffect(() => {
    const API_URL = 'https://a30895-8359.x.d-f.pw/api/tracksLike';
    results;
    const fetchLikedTracks = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/Auth');
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      try {
        const response = await axios.get(`${API_URL}/liked`, { headers });
        if (response.data && response.data.value.trackList) {
          setTracks(response.data.value); // Обновляем треки в состоянии
        }
      } catch (error) {}
    };

    fetchLikedTracks();
  }, []);

  return (
    <div className="intro">
      <div className="intro_result">
        <BackgroundVideo />
        <MainPanel />
        <div className="result_content">
          <Tracks tracks={tracks} />
          <MusicPanel />
        </div>
      </div>
    </div>
  );
}
