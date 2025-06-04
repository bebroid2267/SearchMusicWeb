import '../../../wwwroot/css/buttonPanel.css'
import { useNavigate } from 'react-router-dom';
import store, { AppDispatch } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumsArtist, fetchTracksAlbum, fetchTracksArtist } from '../store/Middleware/fetchDataPage';
import { setArtist } from '../store/artistSlice';
import { setAlbum, setArtistName} from '../store/albumSlice';
import { selectCurrentTrack } from '../store/playerSlice';
import { useEffect, useRef, useState } from 'react';
import { IArtist } from '../Interfaces';
import Playlist from './playlist';


export default function ButtonPanel() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const currentTrack = useSelector(selectCurrentTrack);
    const playlist = useRef<HTMLDivElement>(null);
    const [isOpenPlaylist, setIsOpenPlaylist] = useState(false);

      const handleOpenArtistPage = async (artist: IArtist) => {
        dispatch(fetchTracksArtist({
            artistId: artist.id,
            page: 0,
            pageSize: 10,
        }));
        dispatch(fetchAlbumsArtist(artist.id));
        dispatch(setArtist(artist));

        navigate(`/Artist/${artist.name}`);
      };

      const handleOpenAlbumPage = async () => {
        const currentTrack = store.getState().player.currentTrack;

        dispatch(fetchTracksAlbum(currentTrack.album!.id));
        dispatch(setArtistName(currentTrack.artists));
        dispatch(setAlbum(currentTrack.album!));

        navigate(`/Album/${currentTrack!.album!.title}`);
        };

    const handleOpenRemixGooglePage = () => {
        const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(`${store.getState().player.currentTrack.artists[0]} ${store.getState().player.currentTrack.title} remix`)}`;
        window.open(googleUrl, '_blank');
    };

    const handleOpenClipGooglePage = () => {
        const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(`${store.getState().player.currentTrack.artists[0]} ${store.getState().player.currentTrack.title} clip`)}`;
        window.open(googleUrl, '_blank');
    };

    const handleOpenPlaylist = () => {
        if (isOpenPlaylist) {
            playlist.current!.style.display = 'none';
        } else {
            playlist.current!.style.display = 'block';
        }
        setIsOpenPlaylist(!isOpenPlaylist);
    }

    useEffect(() => {
        console.log(currentTrack);
    },[currentTrack])

    return (
        <>
            <div className='button-panel'>
                <ul className='ul-button-panel'>
                    {store.getState().player.currentTrack.artistsEntity?.map((artist: IArtist) => (
                        <li className='button-panel-element' onClick={() => handleOpenArtistPage(artist)}>
                            <img  
                                className='img-btn-element' 
                                src={artist.coverPath} 
                                alt=""
                                style={{ display: artist.coverPath == undefined ? 'none' : 'block'}}    
                            />
                            <p className='text-btn-element-left'>
                                {artist.name}
                            </p>
                        </li>
                    ))}
                    <li className='button-panel-element' onClick={handleOpenAlbumPage}>
                        <img 
                            className='img-btn-element' 
                            src={currentTrack?.album?.coverPath} 
                            alt=""
                            style={{ display: currentTrack?.artistsEntity[0]?.coverPath == undefined || currentTrack?.artistsEntity[0]?.coverPath == null? 'none' : 'block'}}    
                        />
                        <p className='text-btn-element-left'>{currentTrack?.album?.title}</p>
                    </li>
                    <li className='button-panel-element' onClick={handleOpenPlaylist}>
                        <p className='text-btn-element'>Плейлист</p>
                    </li>
                    <li className='button-panel-element' onClick={handleOpenRemixGooglePage}>
                        <p className='text-btn-element'>Поиск ремикса</p>
                    </li>
                    <li className='button-panel-element' onClick={handleOpenClipGooglePage}>
                        <p className='text-btn-element'>Поиск клипов</p>
                    </li>
                    <li className='button-panel-element'>
                        <p className='text-btn-element'>Скачать трек</p>
                    </li>
                    <li className='button-panel-element'>
                        <p className='text-btn-element'>Плеер</p>
                    </li>

                </ul>
            </div>
            <Playlist ref={playlist}/>
        </>
    );
}