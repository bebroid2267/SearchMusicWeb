import { useDispatch, useSelector } from 'react-redux';
import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import '../../../wwwroot/css/resultPage.css';
import Albums from '../customComponents/albums';
import Artists from '../customComponents/artists';
import Tracks from '../customComponents/tracks';
import 'bootstrap/dist/css/bootstrap.min.css';
import { selectAlbums, selectArtists, selectQuearyUser, selectTracks, setQuearyUser } from '../store/searchDataSlice';
import InputResult from '../customComponents/inputResultPage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchAlbums, searchArtists, searchTracks } from '../store/Middleware/fetchDataPage';
import { AppDispatch } from '../store/store';

export default function ResultPage() {
  const tracks = useSelector(selectTracks);
  const artists = useSelector(selectArtists);
  const albums = useSelector(selectAlbums);
  const quearyUser = useSelector(selectQuearyUser);

  const dispatch = useDispatch<AppDispatch>();
  const [queary, setQueary] = useState('');
  const navigate = useNavigate();

  let cutTracks = null;

  if (tracks !== undefined) {
      if (tracks.length > 10) {
        cutTracks = tracks.slice(0, 10);
    } else {
        cutTracks = tracks.slice(0, tracks.length);
    }
  }

    const handleSubmit = async (e: any) => {
      console.log('chd');
      e.preventDefault();
      if (!queary.trim()) {
        alert('Введите запрос');
        return;
      }
      dispatch(setQuearyUser(queary));
      
      dispatch(searchTracks(queary));
      dispatch(searchAlbums(queary));
      dispatch(searchArtists(queary));

      navigate(`/Result/${queary}`);
    };
  
  return (
    <div className="intro">
      <div className="intro_result">
        <div className='result-page-container'>
          <div className='header-result-page'>
            <div className='container-header'>
              <form onSubmit={handleSubmit}>
                <InputResult id={"input_queary"} value={queary} name={"Queary"} onChange={setQueary}></InputResult>
              </form>
                <div className='container-result-text'>
                    <h1 className='h1-results-for'>Результаты для</h1>
                    <h1 className='result-text'>{`"${quearyUser}"`}</h1>
                </div>
            </div>
          </div>
          <div className="result-container">
            <div className='light-container'>

            </div>
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
