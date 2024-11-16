import '../../../wwwroot/css/result.css'
import '../../../wwwroot/css/site.css'
import Albums from '../customComponents/albums';
import Artists from '../customComponents/artists';
import BackgroundVideo from '../customComponents/backVideo';
import MainPanel from '../customComponents/mainPanel';
import MusicPanel from '../customComponents/musicPanel';
import Tracks from '../customComponents/tracks';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useTrackManager } from '../contexts/TrackManagerContext';
import { useEffect, useRef } from 'react';

export default function ResultPage( {results} : any ) {
  const progressBarRef = useRef(null);
  const tracksElementRef = useRef(null);
  const progressContainerRef = useRef(null);
  const nextTrackBtnRef = useRef(null);
  const prevTrackBtnRef = useRef(null);

  const trackManager = useTrackManager();

  useEffect(() => {
    trackManager.
  })


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