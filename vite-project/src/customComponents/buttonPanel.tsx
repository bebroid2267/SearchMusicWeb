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
import FullScreenPlayer from './fullScreenPlayer';
import styled from 'styled-components';

const ScrollButton = styled.button<{ $color: string; $visible: boolean }>`
    position: fixed;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: rgba(${props => props.$color || '124, 116, 116'}, 0.7);
    color: white;
    cursor: pointer;
    display: ${props => props.$visible ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    font-size: 16px;
    z-index: 99999;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    bottom: 120px;

    &:hover {
        background: rgba(${props => props.$color || '124, 116, 116'}, 0.9);
        transform: scale(1.1);
    }

    &.left {
        left: calc(50% - 40px);
    }

    &.right {
        left: calc(50% + 10px);
    }
`;

const ButtonPanelContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export default function ButtonPanel() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const currentTrack = useSelector(selectCurrentTrack);
    const playlist = useRef<HTMLDivElement>(null);
    const buttonListRef = useRef<HTMLUListElement>(null);
    const [isOpenPlaylist, setIsOpenPlaylist] = useState(false);
    const [isFullScreenPlayerOpen, setIsFullScreenPlayerOpen] = useState(false);
    const [buttonColor, setButtonColor] = useState<string>('');
    const [showScrollButtons, setShowScrollButtons] = useState(false);
    const canvas = useRef<HTMLCanvasElement>(null);

    const calculateColor = (imageUrl: string) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageUrl;

        img.onload = () => {
            if (!canvas.current) return;
            
            const ctx = canvas.current.getContext('2d');
            if (!ctx) return;

            try {
                canvas.current.width = img.naturalWidth;
                canvas.current.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0, canvas.current.width, canvas.current.height);

                const imageData = ctx.getImageData(0, 0, canvas.current.width, canvas.current.height);
                const data = imageData.data;

                let r = 0, g = 0, b = 0, count = 0;

                for (let i = 0; i < data.length; i += 4) {
                    r += data[i];
                    g += data[i + 1];
                    b += data[i + 2];
                    count++;
                }

                r = Math.floor(r / count);
                g = Math.floor(g / count);
                b = Math.floor(b / count);

                const color = `${r}, ${g}, ${b}`;
                console.log('Calculated color from track cover:', color);
                setButtonColor(color);
            } catch (error) {
                console.error('Error calculating color:', error);
            }
        };

        img.onerror = (error) => {
            console.error('Error loading image:', error);
        };
    };

    // Calculate color when track changes
    useEffect(() => {
        if (!currentTrack?.coverPath) return;
        console.log('Calculating color for track cover:', currentTrack.coverPath);
        calculateColor(currentTrack.coverPath);
    }, [currentTrack?.coverPath]);

    const handleOpenArtistPage = async (artist: IArtist) => {
        dispatch(fetchTracksArtist({
            artistId: artist.id,
            page: 0,
            pageSize: 10,
        }));
        dispatch(fetchAlbumsArtist({
            artistId: artist.id,
            page: 0,
            pageSize: 10,
        }));
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

    const handleOpenFullScreenPlayer = () => {
        setIsFullScreenPlayerOpen(true);
        setShowScrollButtons(false);
    };

    const handleCloseFullScreenPlayer = () => {
        setIsFullScreenPlayerOpen(false);
        if (buttonListRef.current) {
            const { scrollWidth, clientWidth } = buttonListRef.current;
            setShowScrollButtons(scrollWidth > clientWidth);
        }
    };

    const handleScroll = (direction: 'left' | 'right') => {
        if (!buttonListRef.current) return;
        
        const scrollAmount = 200; // Прокрутка на 200px
        const currentScroll = buttonListRef.current.scrollLeft;
        const newScroll = direction === 'left' 
            ? currentScroll - scrollAmount 
            : currentScroll + scrollAmount;
            
        buttonListRef.current.scrollTo({
            left: newScroll,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        console.log(currentTrack);
    },[currentTrack])

    useEffect(() => {
        // Скрываем плейлист по умолчанию при загрузке компонента
        if (playlist.current) {
            playlist.current.style.display = 'none';
        }
    }, []);

    useEffect(() => {
        const checkScrollable = () => {
            if (buttonListRef.current) {
                const { scrollWidth, clientWidth } = buttonListRef.current;
                setShowScrollButtons(scrollWidth > clientWidth && !isFullScreenPlayerOpen);
            }
        };

        checkScrollable();
        window.addEventListener('resize', checkScrollable);

        return () => {
            window.removeEventListener('resize', checkScrollable);
        };
    }, [currentTrack, isFullScreenPlayerOpen]);

    return (
        <ButtonPanelContainer>
            <ScrollButton 
                className="left" 
                onClick={() => handleScroll('left')}
                $color={buttonColor}
                $visible={showScrollButtons}
            >
                ←
            </ScrollButton>
            <ScrollButton 
                className="right" 
                onClick={() => handleScroll('right')}
                $color={buttonColor}
                $visible={showScrollButtons}
            >
                →
            </ScrollButton>
            <div className='button-panel'>
                <canvas ref={canvas} style={{ display: 'none' }} />
                <ul className='ul-button-panel' ref={buttonListRef}>
                    {currentTrack?.artistsEntity?.map((artist: IArtist) => (
                        <li 
                            key={artist.id} 
                            className='button-panel-element' 
                            onClick={() => handleOpenArtistPage(artist)}
                            style={{
                                '--button-color': buttonColor 
                                    ? `rgba(${buttonColor}, 0.4)`
                                    : 'rgba(124, 116, 116, 0.2)',
                                '--button-hover-color': buttonColor
                                    ? `rgba(${buttonColor}, 0.5)`
                                    : 'rgb(105, 97, 97)'
                            } as React.CSSProperties}
                        >
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
                    <li 
                        className='button-panel-element' 
                        onClick={handleOpenAlbumPage}
                        style={{
                            '--button-color': buttonColor
                                ? `rgba(${buttonColor}, 0.4)`
                                : 'rgba(124, 116, 116, 0.2)',
                            '--button-hover-color': buttonColor
                                ? `rgba(${buttonColor}, 0.5)`
                                : 'rgb(105, 97, 97)'
                        } as React.CSSProperties}
                    >
                        <img 
                            className='img-btn-element' 
                            src={currentTrack?.album?.coverPath} 
                            alt=""
                            style={{ display: currentTrack?.artistsEntity[0]?.coverPath == undefined || currentTrack?.artistsEntity[0]?.coverPath == null? 'none' : 'block'}}    
                        />
                        <p className='text-btn-element-left'>{currentTrack?.album?.title}</p>
                    </li>
                    <li 
                        className='button-panel-element' 
                        onClick={handleOpenPlaylist}
                        style={{
                            '--button-color': buttonColor
                                ? `rgba(${buttonColor}, 0.4)`
                                : 'rgba(124, 116, 116, 0.2)',
                            '--button-hover-color': buttonColor
                                ? `rgba(${buttonColor}, 0.5)`
                                : 'rgb(105, 97, 97)'
                        } as React.CSSProperties}
                    >
                        <p className='text-btn-element'>Плейлист</p>
                    </li>
                    <li 
                        className='button-panel-element' 
                        onClick={handleOpenRemixGooglePage}
                        style={{
                            '--button-color': buttonColor
                                ? `rgba(${buttonColor}, 0.4)`
                                : 'rgba(124, 116, 116, 0.2)',
                            '--button-hover-color': buttonColor
                                ? `rgba(${buttonColor}, 0.5)`
                                : 'rgb(105, 97, 97)'
                        } as React.CSSProperties}
                    >
                        <p className='text-btn-element'>Поиск ремикса</p>
                    </li>
                    <li 
                        className='button-panel-element' 
                        onClick={handleOpenClipGooglePage}
                        style={{
                            '--button-color': buttonColor
                                ? `rgba(${buttonColor}, 0.4)`
                                : 'rgba(124, 116, 116, 0.2)',
                            '--button-hover-color': buttonColor
                                ? `rgba(${buttonColor}, 0.5)`
                                : 'rgb(105, 97, 97)'
                        } as React.CSSProperties}
                    >
                        <p className='text-btn-element'>Поиск клипов</p>
                    </li>
                    <li 
                        className='button-panel-element' 
                        onClick={handleOpenFullScreenPlayer}
                        style={{
                            '--button-color': buttonColor
                                ? `rgba(${buttonColor}, 0.4)`
                                : 'rgba(124, 116, 116, 0.2)',
                            '--button-hover-color': buttonColor
                                ? `rgba(${buttonColor}, 0.5)`
                                : 'rgb(105, 97, 97)'
                        } as React.CSSProperties}
                    >
                        <p className='text-btn-element'>Плеер</p>
                    </li>
                </ul>
            </div>
            <Playlist ref={playlist}/>
            {isFullScreenPlayerOpen && (
                <FullScreenPlayer onClose={handleCloseFullScreenPlayer} />
            )}
        </ButtonPanelContainer>
    );
}