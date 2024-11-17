import '../../../wwwroot/css/result.css'
import '../../../wwwroot/css/site.css'
import Albums from '../customComponents/albums';
import Artists from '../customComponents/artists';
import BackgroundVideo from '../customComponents/backVideo';
import MainPanel from '../customComponents/mainPanel';
import MusicPanel from '../customComponents/musicPanel';
import Tracks from '../customComponents/tracks';
import 'bootstrap/dist/css/bootstrap.min.css'
import  { TrackManagerContext, useTrackManager } from '../contexts/TrackManagerContext';
import TrackManager from '../../../wwwroot/js/trackManager';

export default function ResultPage( {results} : any ) {

  const trackManager = new TrackManager();

  const { tracks, artist, albums } = results;

  console.log(tracks);
  console.log(artist);
  console.log(albums);

    return (
      <TrackManagerContext.Provider value={trackManager}>
      <div className='pupupu'>
          <div className="intro_result">
            <BackgroundVideo />
            <MainPanel />
            <div className='result_content'>
                <Artists artists={artist}/>
                <Albums albums={albums}/>
                <Tracks tracks={tracks}/>
                <MusicPanel />
            </div>
          </div>  
      </div>
      </TrackManagerContext.Provider>
    );
}