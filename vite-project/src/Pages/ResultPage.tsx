import { useSelector } from 'react-redux';
import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import '../../../wwwroot/css/resultPage.css';

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

  let cutTracks = null;

  if (tracks !== undefined) {
      if (tracks.length > 10) {
        cutTracks = tracks.slice(0, 10);
    } else {
        cutTracks = tracks.slice(0, tracks.length);
    }
  }
  
  return (
    <div className="intro">
      <div className="intro_result">
        <BackgroundVideo />
        <div className='result-page-container'>
          {/* <div className='header-result'>

          </div> */}
          <div className="result-container">
            <div className='result-main-container'>
                <Tracks 
                    tracks={cutTracks}
                    className={'tracks-finally'}
                    classNameForTrackText={'artist-text'} 
                    handleOpenTracks={null} 
                    neededBtn={false} 
                    isArtistTracksPage={false}            
                />
                <Artists 
                  artists={artists}
                  className={'artist-result-container'} 
                />
                <Albums 
                    albums={albums} 
                    className={'artistPage'}  
                />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
