import '../../../wwwroot/css/favoritespage.css'
import BackgroundVideo from '../customComponents/backVideo';
import Tracks from '../customComponents/tracks';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { ITrack } from '../../../wwwroot/js/Interfaces/Interfaces';
import {fetchLikedTracks} from '../services/musicService.ts'
import { useNavigate } from 'react-router-dom';

export default function ResultPage() {
  const [tracks, setTracks] = useState<ITrack[]>([]); // Состояние для треков
  const navigate = useNavigate();

  useEffect(() => {
    const likedTracks = async () => {
      const tracks = await fetchLikedTracks();
      if (tracks == null) {
        navigate('/Auth')
        return;
      }
      if (tracks != undefined) {
        setTracks(tracks);
      }
    };   

    likedTracks();
  }, []);

  return (
    <div className="intro">
      <div className="intro_result">
        <BackgroundVideo />
        <div className="favorite_content">
          <Tracks tracks={tracks} className={'favorites'} classNameForTrackText={'tracks-text'}/>
        </div>
      </div>
    </div>
  );
}
