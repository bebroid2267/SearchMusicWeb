import '../../../wwwroot/css/favoritespage.css'
import BackgroundVideo from '../customComponents/backVideo';
import Tracks from '../customComponents/tracks';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectLikedTracks } from '../store/searchDataSlice';
import { selectUserIsAuth, setCurrentUser } from '../store/userSlice';
import { AppDispatch } from '../store/store';

export default function FavoritePage() {
  const tracks = useSelector(selectLikedTracks);
  const isAuth = useSelector(selectUserIsAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
      if (!isAuth) {
        dispatch(setCurrentUser());
        navigate('/Auth');
      }
  },);

  return (
    <div className="intro">
      <div className="intro_result">
        <BackgroundVideo />
        <div className="favorite_content">
          <Tracks tracks={tracks} className={'favorites'} classNameForTrackText={'tracks-text'}/>
        </div>
      </div>
    </div>
  );
}
