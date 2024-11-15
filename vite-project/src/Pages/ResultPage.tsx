import '../../../wwwroot/css/result.css'
import '../../../wwwroot/css/site.css'
import Albums from '../customComponents/albums';
import Artists from '../customComponents/artists';
import BackgroundVideo from '../customComponents/backVideo';
import MainPanel from '../customComponents/mainPanel';
import MusicPanel from '../customComponents/musicPanel';
import Tracks from '../customComponents/tracks';
import 'bootstrap/dist/css/bootstrap.min.css'
import TrackManager from '../../../wwwroot/js/trackManager'

export default function ResultPage( {results} : any ) {
  

    return (
      <div className='pupupu'>
          <div className="intro_result">
            <BackgroundVideo />
            <MainPanel />
            <div className='result_content'>
                <Artists />
                <Albums />
                <Tracks tracks={results}/>
                <MusicPanel />
            </div>
          </div>  
      </div>
    );
}