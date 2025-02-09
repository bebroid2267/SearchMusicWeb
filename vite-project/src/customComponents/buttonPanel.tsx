import '../../../wwwroot/css/buttonPanel.css'
import { useTrackManager } from '../contexts/TrackManagerContext';
import { getInfoArtist } from '../services/artistService';
import { onChangeServer } from '../Pages/MainPage';
import { useNavigate } from 'react-router-dom';
import store from '../store/store';


export default function ButtonPanel({onChangeAlbum, onChangeArtist}: any) {
    const trackManager = useTrackManager();
    const navigate = useNavigate();

      const handleOpenArtistPage = async () => {
        const currentTrack = store.getState().player.currentTrack;
        const dataTracks = await getInfoArtist('GetTracksArtist', currentTrack.artistEntity!.id);
        const dataAlbums =  await getInfoArtist('GetAlbumsArtist', currentTrack.artistEntity!.id);
        const serverResponse: onChangeServer = {
          tracks: dataTracks,
          albums: dataAlbums,
          artist: currentTrack.artistEntity
        };
    
        onChangeArtist(serverResponse);
        navigate(`/Artist/${trackManager.currentTrack?.artistEntity?.name}`);
      };

      const handleOpenAlbumPage = async () => {
          const dataTracks = await getInfoArtist('GetTracksAlbum', trackManager.currentTrack!.album!.id);
          const serverResponse: onChangeServer = {
            tracks: dataTracks,
            albums: trackManager.currentTrack!.album!,
            artist: trackManager.currentTrack!.artistEntity
          };
      
          onChangeAlbum(serverResponse);
          navigate(`/Album/${trackManager.currentTrack!.album!.title}`);
        };
    
    return (
        <div className='button-panel'>
            <ul className='ul-button-panel'>
                <li className='button-panel-element' onClick={handleOpenArtistPage}>
                    <img  className='img-btn-element' src={trackManager.currentTrack?.artistEntity?.coverPath} alt="" />
                    <p className='text-btn-element'>{trackManager.currentTrack?.artist}</p>
                </li>
                <li className='button-panel-element' onClick={handleOpenAlbumPage}>
                    <img className='img-btn-element' src={trackManager.currentTrack?.album?.coverPath} alt="" />
                    <p className='text-btn-element'>{trackManager.currentTrack?.album?.title}</p>
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