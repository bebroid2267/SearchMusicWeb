import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import Albums from '../customComponents/albums';
import Artists from '../customComponents/artists';
import BackgroundVideo from '../customComponents/backVideo';
import Tracks from '../customComponents/tracks';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ResultPage({ results, onChangeArtist, onChangeAlbum }: any) {
  const { tracks, artist, albums } = results;

  return (
    <div className="intro">
      <div className="intro_result">
        <BackgroundVideo />
        <div className="result_content">
          <Artists artists={artist} onChangeArtist={onChangeArtist} />
          <Albums albums={albums} className={'non-artist-page'} onChangeAlbum={onChangeAlbum} />
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
