import styled from 'styled-components';
import '../../wwwroot/css/fullScreenPlayer.css';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentTrack, selectIsPlaying, setCurrentTrack, setIsPlay } from '../store/playerSlice';
import { useTrackManager } from '../contexts/TrackManagerContext';
import { PlayerControls } from './playerControls';
import { FullscreenHeart } from './fullscreenHeart';
import { AppDispatch } from '../store/store';
import { likeTrack, dislikeTrack } from '../store/Middleware/likeTrack';
import { isLikedTrack } from '../store/Middleware/isLikedTrack';
import store from '../store/store';
import { ITrack, IArtist } from '../Interfaces';
import { fetchUrl } from '../store/Middleware/fetchUrlForTrack';
import { useNavigate } from 'react-router-dom';
import { fetchAlbumsArtist, fetchTracksArtist } from '../store/Middleware/fetchDataPage';
import { setArtist } from '../store/artistSlice';

interface FullScreenPlayerProps {
    onClose: () => void;
}

export default function FullScreenPlayer({ onClose }: FullScreenPlayerProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const currentTrack = useSelector(selectCurrentTrack);
    const isPlayingRedux = useSelector(selectIsPlaying);
    const [isPlaying, setIsPlaying] = useState(isPlayingRedux);
    const trackManager = useTrackManager();
    const [isLiked, setIsLiked] = useState(store.getState().player.isCurrentTrackLiked);

    const canvas = useRef<HTMLCanvasElement>(null);
    const coverTrack = useRef<HTMLImageElement>(null);
    const panelForGradient = useRef<HTMLDivElement>(null);
    const progressBar = useRef<HTMLDivElement>(null);
    const progressContainer = useRef<HTMLDivElement>(null);
    const allTimeText = useRef<HTMLParagraphElement>(null);
    const currentTimeText = useRef<HTMLParagraphElement>(null);

    // Сохраняем оригинальные элементы при монтировании
    const originalElements = useRef({
        progressBar: null as HTMLDivElement | null,
        progressContainer: null as HTMLDivElement | null,
        currentTimeTrack: null as HTMLParagraphElement | null,
        allTimeTrack: null as HTMLParagraphElement | null,
        gradientDiv: null as HTMLDivElement | null,
        imgForGradient: null as HTMLImageElement | null
    });

    // При монтировании сохраняем оригинальные элементы
    useEffect(() => {
        originalElements.current = {
            progressBar: trackManager.trackManager.progressBar,
            progressContainer: trackManager.trackManager.progressContainer,
            currentTimeTrack: trackManager.trackManager.currentTimeTrack,
            allTimeTrack: trackManager.trackManager.allTimeTrack,
            gradientDiv: trackManager.trackManager.gradientDiv,
            imgForGradient: trackManager.trackManager.imgForGradient
        };

        // Функция форматирования времени
        const formatTime = (seconds: number): string => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        };

        // Настраиваем обработчик обновления прогресса
        const updateProgress = (e: any) => {
            // Обновляем прогресс в полноэкранном плеере
            if (progressBar.current && progressContainer.current && currentTimeText.current && allTimeText.current) {
                const { duration, currentTime } = e.srcElement;
                const progressPercent = (currentTime / duration) * 100;
                progressBar.current.style.width = `${progressPercent}%`;
                
                // Обновляем время
                currentTimeText.current.textContent = formatTime(currentTime);
                allTimeText.current.textContent = formatTime(duration);
            }
        };

        if (trackManager.trackManager.trackForUrl) {
            trackManager.trackManager.trackForUrl.addEventListener('timeupdate', updateProgress);
            
            // Синхронизируем начальное состояние
            const { duration, currentTime } = trackManager.trackManager.trackForUrl;
            if (progressBar.current && currentTimeText.current && allTimeText.current) {
                const progressPercent = (currentTime / duration) * 100;
                progressBar.current.style.width = `${progressPercent}%`;
                currentTimeText.current.textContent = formatTime(currentTime);
                allTimeText.current.textContent = formatTime(duration);
            }
        }

        return () => {
            if (trackManager.trackManager.trackForUrl) {
                trackManager.trackManager.trackForUrl.removeEventListener('timeupdate', updateProgress);
            }
        };
    }, [currentTrack]); // Перепривязываем при смене трека

    const handleClick = (e: any) => {
        const width = progressContainer.current!.clientWidth;
        const clickX = e.offsetX;
        const duration = trackManager.trackManager.trackForUrl!.duration;

        trackManager.trackManager.trackForUrl!.currentTime = (clickX / width) * duration;
    };

    // Обновляем элементы управления при смене трека
    useEffect(() => {
        if (canvas.current && coverTrack.current) {
            canvas.current.width = 50;
            canvas.current.height = 50;

            const ctx = canvas.current.getContext('2d', { willReadFrequently: true });
            if (ctx) {
                // Сохраняем оригинальные элементы перед обновлением
                const origElements = {
                    progressBar: trackManager.trackManager.progressBar,
                    progressContainer: trackManager.trackManager.progressContainer,
                    currentTimeTrack: trackManager.trackManager.currentTimeTrack,
                    allTimeTrack: trackManager.trackManager.allTimeTrack,
                    gradientDiv: trackManager.trackManager.gradientDiv,
                    imgForGradient: trackManager.trackManager.imgForGradient
                };

                // Устанавливаем элементы для фона
                trackManager.trackManager.gradientDiv = panelForGradient.current;
                trackManager.trackManager.imgForGradient = coverTrack.current;

                // Обновляем только фон без перезапуска трека
                coverTrack.current.crossOrigin = 'anonymous';
                if (coverTrack.current.complete) {
                    trackManager.trackManager.changeBackgroundMusicPanel();
                } else {
                    coverTrack.current.onload = () => {
                        trackManager.trackManager.changeBackgroundMusicPanel();
                    };
                }

                // Обновляем элементы управления для полноэкранного плеера
                trackManager.trackManager.progressBar = progressBar.current;
                trackManager.trackManager.progressContainer = progressContainer.current;
                trackManager.trackManager.currentTimeTrack = currentTimeText.current;
                trackManager.trackManager.allTimeTrack = allTimeText.current;

                // Обновляем сохраненные оригинальные элементы
                originalElements.current = origElements;
            }
        }

        // Добавляем обработчик клика для прогресс-бара
        if (progressContainer.current) {
            progressContainer.current.addEventListener('click', handleClick);
        }

        return () => {
            if (progressContainer.current) {
                progressContainer.current.removeEventListener('click', handleClick);
            }
        };
    }, [currentTrack]);

    // Обработчик закрытия с восстановлением элементов
    const handleClose = () => {
        // Сначала удаляем все слушатели с текущих элементов
        const currentAudio = trackManager.trackManager.trackForUrl;
        if (currentAudio) {
            const updateProgress = trackManager.trackManager.updateProgressTrack.bind(trackManager.trackManager);
            currentAudio.removeEventListener('timeupdate', updateProgress);
        }

        // Проверяем, что все элементы существуют перед восстановлением
        if (originalElements.current.progressBar && 
            originalElements.current.progressContainer && 
            originalElements.current.currentTimeTrack && 
            originalElements.current.allTimeTrack && 
            originalElements.current.gradientDiv && 
            originalElements.current.imgForGradient) {
            
            // Восстанавливаем оригинальные элементы
            trackManager.trackManager.progressBar = originalElements.current.progressBar;
            trackManager.trackManager.progressContainer = originalElements.current.progressContainer;
            trackManager.trackManager.currentTimeTrack = originalElements.current.currentTimeTrack;
            trackManager.trackManager.allTimeTrack = originalElements.current.allTimeTrack;
            trackManager.trackManager.gradientDiv = originalElements.current.gradientDiv;
            trackManager.trackManager.imgForGradient = originalElements.current.imgForGradient;

            // Обновляем фон маленького плеера
            if (originalElements.current.imgForGradient.complete) {
                trackManager.trackManager.changeBackgroundMusicPanel();
            }

            // Восстанавливаем слушатели и состояние
            if (currentAudio) {
                // Переподключаем слушатель обновления прогресса
                const updateProgress = trackManager.trackManager.updateProgressTrack.bind(trackManager.trackManager);
                currentAudio.addEventListener('timeupdate', updateProgress);

                // Восстанавливаем текущее состояние прогресса
                const { duration, currentTime } = currentAudio;
                if (!isNaN(duration) && !isNaN(currentTime)) {
                    const progressPercent = (currentTime / duration) * 100;
                    trackManager.trackManager.progressBar!.style.width = `${progressPercent}%`;
                    
                    if (trackManager.trackManager.currentTimeTrack && trackManager.trackManager.allTimeTrack) {
                        trackManager.trackManager.currentTimeTrack.textContent = trackManager.trackManager.secondsToMinutes(currentTime);
                        trackManager.trackManager.allTimeTrack.textContent = trackManager.trackManager.secondsToMinutes(duration);
                    }
                }

                // Добавляем обработчик клика на прогресс-бар
                if (trackManager.trackManager.progressContainer) {
                    const handleClick = (e: any) => {
                        const width = trackManager.trackManager.progressContainer!.clientWidth;
                        const clickX = e.offsetX;
                        const duration = currentAudio.duration;
                        currentAudio.currentTime = (clickX / width) * duration;
                    };

                    trackManager.trackManager.progressContainer.addEventListener('click', handleClick);
                }
            }
        }

        onClose();
    };

    const handlePlayClick = () => {
        if (isPlaying) {
            trackManager.trackManager.pauseTrack();
            setIsPlaying(false);
            dispatch(setIsPlay(false));
        } else {
            trackManager.trackManager.playTrack();
            setIsPlaying(true);
            dispatch(setIsPlay(true));
        }
    };

    // Обновляем состояние лайка при смене трека
    useEffect(() => {
        setIsLiked(store.getState().player.isCurrentTrackLiked);
    }, [currentTrack]);

    const handleLike = async () => {   
        const isAuthUser = store.getState().user.isAuth;
        if (!isAuthUser) {
            return;
        }   
        
        if (isLiked) {
            await dispatch(dislikeTrack(currentTrack));
            setIsLiked(false);
        } else {
            await dispatch(likeTrack(currentTrack));
            setIsLiked(true);
        }
    };

    const getIndexCurrentTrack = (track: ITrack): number => {
        const playlist = store.getState().player.playlist;
        if (playlist) {
            for (let i = 0; i < playlist.length; i++) {
                if (playlist[i].id === track.id) {
                    return i;
                }
            }
        }
        return -1;
    };

    const changeTrackPanel = (track: ITrack) => {
        dispatch(setCurrentTrack(track));
        dispatch(fetchUrl(track.id));
    };

    const nextTrack = (): void => {
        trackManager.trackManager.clearTrack();
        const playlist = store.getState().player.playlist;
        if (currentTrack !== null) {
            const indexCurrentTrack = getIndexCurrentTrack(currentTrack);
            if (playlist !== null && playlist.length > 0) {
                if (indexCurrentTrack === playlist.length - 1) {
                    dispatch(isLikedTrack(playlist[0]));            
                    changeTrackPanel(playlist[0]);
                } else {
                    dispatch(isLikedTrack(playlist[indexCurrentTrack + 1]));           
                    changeTrackPanel(playlist[indexCurrentTrack + 1]);
                }
                trackManager.trackManager.playTrack();
                setIsPlaying(true);
            }
        }
    };

    const prevTrack = (): void => {
        trackManager.trackManager.clearTrack();
        const playlist = store.getState().player.playlist;
        if (currentTrack !== null) {
            const indexCurrentTrack = getIndexCurrentTrack(currentTrack);
            if (playlist !== null && playlist.length > 0) {
                if (indexCurrentTrack === 0) {
                    dispatch(isLikedTrack(playlist[playlist.length - 1]));            
                    changeTrackPanel(playlist[playlist.length - 1]);
                } else {
                    dispatch(isLikedTrack(playlist[indexCurrentTrack - 1]));
                    changeTrackPanel(playlist[indexCurrentTrack - 1]);
                }
                trackManager.trackManager.playTrack();
                setIsPlaying(true);
            }
        }
    };

    const handleOpenArtistPage = async (artist: IArtist) => {
        onClose(); // Закрываем плеер перед навигацией
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

    return (
        <StyledWrapper>
            <div className="fullscreen-player" ref={panelForGradient}>
                <canvas ref={canvas}></canvas>
                <div className="fullscreen-player-content">
                    <button className="fullscreen-close-button" onClick={handleClose}>×</button>
                    <div className="fullscreen-cover-container">
                        <img
                            ref={coverTrack}
                            src={currentTrack.coverPath}
                            alt="Album Cover"
                            className="fullscreen-cover"
                        />
                    </div>
                    <div className="fullscreen-track-info">
                        <h2 className="fullscreen-track-title">{currentTrack.title}</h2>
                        <div className="fullscreen-artists-container">
                            {currentTrack.artistsEntity?.map((artist: IArtist) => (
                                <div 
                                    key={artist.id} 
                                    className="fullscreen-artist-item"
                                    onClick={() => handleOpenArtistPage(artist)}
                                >
                                    <img 
                                        src={artist.coverPath} 
                                        alt={artist.name}
                                        className="fullscreen-artist-cover"
                                    />
                                    <span className="fullscreen-artist-name">
                                        {artist.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="fullscreen-controls">
                        <PlayerControls
                            onClickNext={nextTrack}
                            onClickPlay={handlePlayClick}
                            onClickPrev={prevTrack}
                            refProgressBar={progressBar}
                            refProgressContainer={progressContainer}
                            refAllTime={allTimeText}
                            refCurrentTime={currentTimeText}
                            isFullscreen={true}
                            isPlaying={isPlaying}
                        />
                        <div className="fullscreen-like-button">
                            <FullscreenHeart
                                isLiked={isLiked}
                                handleClick={handleLike}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    .fullscreen-player {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(10px);
    }

    .fullscreen-player-content {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 1200px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        color: white;
    }

    .fullscreen-close-button {
        position: absolute;
        top: 2rem;
        right: 2rem;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 10;

        &:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
        }
    }

    .fullscreen-cover-container {
        width: 100%;
        max-width: 400px;
        aspect-ratio: 1;
        margin: 2rem 0;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .fullscreen-cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .fullscreen-track-info {
        text-align: center;
        margin: 1.5rem 0;
        width: 100%;
        max-width: 800px;
    }

    .fullscreen-track-title {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: white;
    }

    .fullscreen-track-artist {
        font-size: 1.1rem;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 1rem;
    }

    .fullscreen-controls {
        width: 100%;
        max-width: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        margin-top: 1.5rem;
    }

    .fullscreen-controls-main {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .fullscreen-like-button {
        margin-top: 20px;
    }

    .fullscreen-artists-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        margin-top: 10px;
    }

    .fullscreen-artist-item {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;

        &:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }
    }

    .fullscreen-artist-cover {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
    }

    .fullscreen-artist-name {
        font-size: 1.1rem;
        color: rgba(255, 255, 255, 0.8);
    }

    @media (max-height: 700px) {
        .fullscreen-player-content {
            padding: 1rem;
            justify-content: flex-start;
        }

        .fullscreen-close-button {
            top: 1rem;
            right: 1rem;
            width: 35px;
            height: 35px;
            font-size: 1.5rem;
        }

        .fullscreen-cover-container {
            max-width: 250px;
            margin: 1rem 0;
        }

        .fullscreen-track-info {
            margin: 1rem 0;
        }

        .fullscreen-track-title {
            font-size: 1.2rem;
        }

        .fullscreen-track-artist {
            font-size: 1rem;
        }

        .fullscreen-controls {
            margin-top: 1rem;
            gap: 1rem;
        }

        .fullscreen-like-button {
            margin-top: 15px;
        }

        .fullscreen-artist-item {
            padding: 3px 8px;
        }

        .fullscreen-artist-cover {
            width: 25px;
            height: 25px;
        }

        .fullscreen-artist-name {
            font-size: 1rem;
        }
    }

    @media (max-width: 400px) {
        .fullscreen-close-button {
            width: 30px;
            height: 30px;
            font-size: 1.2rem;
        }

        .fullscreen-cover-container {
            max-width: 200px;
        }

        .fullscreen-artist-cover {
            width: 20px;
            height: 20px;
        }

        .fullscreen-artist-name {
            font-size: 0.9rem;
        }
    }
`; 