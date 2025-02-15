import { useSelector } from 'react-redux';
import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import Albums from '../customComponents/albums';
import Artists from '../customComponents/artists';
import BackgroundVideo from '../customComponents/backVideo';
import Tracks from '../customComponents/tracks';
import 'bootstrap/dist/css/bootstrap.min.css';
import { selectAlbums, selectArtists, selectTracks } from '../store/searchDataSlice';

export default function ResultPage() {
  const tracks = useSelector(selectTracks);
  const artists = useSelector(selectArtists);
  const albums = useSelector(selectAlbums);
  
  return (
    <div className="intro">
      <div className="intro_result">
        <BackgroundVideo />
        <div className="result_content">
          <Artists artists={artists} />
          <Albums 
              albums={albums} 
              className={'non-artist-page'}  
          />
          <Tracks 
              tracks={tracks} 
              className={'tracks'} 
              classNameForTrackText={'artist-text'} 
            />
        </div>
      </div>
    </div>
  );
}
