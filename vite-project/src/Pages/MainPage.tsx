import { useState } from 'react';
import BackgroundVideo from '../customComponents/backVideo';
import { useNavigate } from 'react-router-dom';
import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { searchAlbums, searchArtists, searchTracks } from '../store/Middleware/fetchDataPage';
import Input from '../customComponents/mainInput';
import { setQuearyUser } from '../store/searchDataSlice';

export type onChangeServer = {
  tracks: any;
  artist: any;
  albums: any;
};

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [queary, setQueary] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
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
      <BackgroundVideo />
        <div className="intro__content">
        <h1 className='intro-text'>Погрузитесь в звезды</h1>
          <h2 className='intro-text-h2'>Музыка, способная разбудить галактики!</h2>
          <form onSubmit={handleSubmit} className='form-container'>
            <Input id={"input_queary"} value={queary} name={"Queary"} onChange={setQueary}></Input>
          </form>
        </div>
    </div>
  );
}
