import '../../../wwwroot/css/buttonPanel.css'
import { useNavigate } from 'react-router-dom';
import store, { AppDispatch } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumsArtist, fetchTracksAlbum, fetchTracksArtist } from '../store/Middleware/fetchDataPage';
import { setArtist } from '../store/artistSlice';
import { setAlbum, setArtistName} from '../store/albumSlice';
import { selectCurrentTrack } from '../store/playerSlice';


export default function ButtonPanel() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const currentTrack = useSelector(selectCurrentTrack);

      const handleOpenArtistPage = async () => {
        const currentTrack = store.getState().player.currentTrack;

        dispatch(fetchTracksArtist({
            artistId: currentTrack.artistEntity!.id,
            page: 0,
            pageSize: 10,
        }));
        dispatch(fetchAlbumsArtist(currentTrack.artistEntity!.id));
        dispatch(setArtist(currentTrack.artistEntity!));

        navigate(`/Artist/${currentTrack?.artistEntity?.name}`);
      };

      const handleOpenAlbumPage = async () => {
        const currentTrack = store.getState().player.currentTrack;

        dispatch(fetchTracksAlbum(currentTrack.album!.id));
        dispatch(setArtistName(currentTrack.artistEntity?.name!));
        dispatch(setAlbum(currentTrack.album!));

        navigate(`/Album/${currentTrack!.album!.title}`);
        };
    
    return (
        <div className='button-panel'>
            <ul className='ul-button-panel'>
                <li className='button-panel-element' onClick={handleOpenArtistPage}>
                    <img  className='img-btn-element' src={currentTrack?.artistEntity?.coverPath} alt="" />
                    <p className='text-btn-element'>{currentTrack?.artist}</p>
                </li>
                <li className='button-panel-element' onClick={handleOpenAlbumPage}>
                    <img className='img-btn-element' src={currentTrack?.album?.coverPath} alt="" />
                    <p className='text-btn-element'>{currentTrack?.album?.title}</p>
                </li>
                <li className='button-panel-element'>
                    <p className='text-btn-element'>playlist</p>
                </li>
                <li className='button-panel-element'>
                    <p className='text-btn-element'>search remix</p>
                </li>
                <li className='button-panel-element'>
                    <p className='text-btn-element'>search clip</p>
                </li>
                <li className='button-panel-element'>
                    <p className='text-btn-element'>download track</p>
                </li>
                <li className='button-panel-element'>
                    <p className='text-btn-element'>full player</p>
                </li>

            </ul>
        </div>
    );
}