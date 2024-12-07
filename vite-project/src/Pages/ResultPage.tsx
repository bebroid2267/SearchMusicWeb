import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import Albums from '../customComponents/albums';
import Artists from '../customComponents/artists';
import BackgroundVideo from '../customComponents/backVideo';
import MainPanel from '../customComponents/mainPanel';
import Tracks from '../customComponents/tracks';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ResultPage({ results }: any) {
  const { tracks, artist, albums } = results;

  return (
    <div className="intro">
      <div className="intro_result">
        <BackgroundVideo />
        <MainPanel />
        <div className="result_content">
          <Artists artists={artist} />
          <Albums albums={albums} />
          <Tracks tracks={tracks} className={'tracks'} classNameForTrackText={'artist-text'} />
        </div>
      </div>
    </div>
  );
}
