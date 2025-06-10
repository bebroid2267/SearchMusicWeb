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
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { searchAlbums, searchArtists, searchTracks } from '../store/Middleware/fetchDataPage';
import { AppDispatch } from '../store/store';
import Loader from '../customComponents/loader';

export default function ResultPage() {
  const tracks = useSelector(selectTracks);
  const artists = useSelector(selectArtists);
  const albums = useSelector(selectAlbums);
  const quearyUser = useSelector(selectQuearyUser);
  const [delayerRender, setDelayerRender] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const [queary, setQueary] = useState('');
  const navigate = useNavigate();
  const { quearySearch } = useParams();

  let cutTracks = null;

  if (tracks !== undefined) {
    console.log(tracks);
      if (tracks.length > 10) {
        cutTracks = tracks.slice(0, 10);
    } else {
        cutTracks = tracks.slice(0, tracks.length);
    }
  }

  // Обработка параметра URL при монтировании компонента
  useEffect(() => {
    if (quearySearch && quearySearch.trim()) {
      dispatch(setQuearyUser(quearySearch));
      setQueary(quearySearch);
      
      dispatch(searchTracks({queary: quearySearch, page: 0, pageSize: 16}));
      dispatch(searchAlbums({queary: quearySearch, page: 0, pageSize: 10}));
      dispatch(searchArtists({queary: quearySearch, page: 0, pageSize: 10}));
    }
  }, [dispatch, quearySearch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayerRender(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (!delayerRender) {
    return (
    <>
      <div className="intro">
        </div>
      <div className="intro_result">
        <div className='loader-container'>
            <Loader></Loader>
          </div>
      </div>
    </>
    );
  }

  const handleOpenAllTracksPage = () => {
    navigate(`/Result/${quearyUser}/tracks`);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!queary.trim()) {
      alert('Введите запрос');
      return;
    }
    dispatch(setQuearyUser(queary));
    
    dispatch(searchTracks({queary, page: 0, pageSize: 16}));
    dispatch(searchAlbums({queary, page: 0, pageSize: 10}));
    dispatch(searchArtists({queary, page: 0, pageSize: 10}));

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
                    handleOpenTracks={handleOpenAllTracksPage} 
                    neededBtn={true} 
                    currentPage={'none'}            
                />
                <Artists 
                  artists={artists}
                  className={'artist-result-container'} 
                  currentPage={'result'}
                />
                <Albums 
                    albums={albums} 
                    className={'artistPage'}  
                    currentPage={'result'}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
