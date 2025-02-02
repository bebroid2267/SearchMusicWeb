import '../../../wwwroot/css/result.css';
import img1 from '../../../wwwroot/lib/resources/gray left.png';
import img2 from '../../../wwwroot/lib/resources/play (2).jpg';
import img3 from '../../../wwwroot/lib/resources/gray right.png';
import { useTrackManager } from '../contexts/TrackManagerContext';
import { useEffect, useRef, useState } from 'react';
import likeTrack from '../../lib/resources/heartreal.png';
import unlikeTrack from '../../lib/resources/unheartreal.png';
import imgPlay from '../../../wwwroot/lib/resources/play (2).jpg';
import imgStop from '../../src/resources/pause.png';
import { isCurrentTrackLiked, likedTrack } from '../services/musicService';
import ButtonPanel from './buttonPanel';
import { useSelector } from 'react-redux';
import { selectCurrentTrack } from '../store/playerSlice';
import { usePlayerManager } from '../customHooks/usePlayerManager';

export default function MusicPanel({onChangeAlbum, onChangeArtist}: any) {
  const currentReduxTrack = useSelector(selectCurrentTrack);
  const trackManager = useTrackManager();

  const [like, setLiked] = useState(false);
  const [image, setImage] = useState<any>(unlikeTrack);
  const [play, setPlay] = useState(false);

  const [currentProgressBar, setCurrentProgressBar] = useState(null);

  const canvas = useRef<HTMLCanvasElement>(null);

  const coverTrack = useRef<HTMLImageElement>(null);
  const panelForGradient = useRef<HTMLDivElement>(null);
  const trackForUrl = useRef<HTMLAudioElement>(null);
  const playTrackBtn = useRef<HTMLImageElement>(null);

  const progressBar = useRef<HTMLDivElement>(null);
  const progressContainer = useRef<HTMLDivElement>(null);
  const nextTrackBtn = useRef<HTMLImageElement>(null);
  const prevTrackBtn = useRef<HTMLImageElement>(null);

  useEffect(() => {
    trackManager.trackManager.trackForUrl = trackForUrl.current;
    trackManager.trackManager.playTrackBtn = playTrackBtn.current;
    trackManager.trackManager.progressBar = progressBar.current;
    trackManager.trackManager.progressContainer = progressContainer.current;
    trackManager.trackManager.nextTrackBtn = nextTrackBtn.current;
    trackManager.trackManager.prevTrackBtn = prevTrackBtn.current;
    trackManager.trackManager.gradientDiv = panelForGradient.current;
    trackManager.trackManager.imgPlay = imgPlay;
    trackManager.trackManager.imgStop = imgStop;
    currentProgressBar;
  
    const updateProgress = trackManager.trackManager.updateProgressTrack.bind(trackManager.trackManager);

    const handleClick = (e: any) => {
      const width = trackManager.trackManager.progressContainer!.clientWidth;
      const clickX = e.offsetX;
      const duration = trackManager.trackManager.trackForUrl!.duration;
  
      trackManager.trackManager.trackForUrl!.currentTime = (clickX / width) * duration;
    };
  
    if (trackManager.trackManager.trackForUrl) {
      trackManager.trackManager.trackForUrl.addEventListener('timeupdate', updateProgress);
      trackManager.trackManager.trackForUrl.addEventListener('ended', () => {
        trackManager.nextTrack;
        trackManager.trackManager.playTrack()
      });
    }
    trackManager.trackManager.nextTrackBtn!.addEventListener('click', () => {
      trackManager.nextTrack;
      trackManager.trackManager.playTrack();
    });
    trackManager.trackManager.prevTrackBtn!.addEventListener('click', trackManager.prevTrack);
    trackManager.trackManager.progressContainer!.addEventListener('click', handleClick);
  
    return () => {
      if (trackManager.trackManager.trackForUrl) {
        trackManager.trackManager.trackForUrl.removeEventListener('timeupdate', updateProgress);
      }
      trackManager.trackManager.nextTrackBtn!.removeEventListener('click', () => {
        trackManager.nextTrack;
        trackManager.trackManager.playTrack();
      });

      trackManager.trackManager.prevTrackBtn!.removeEventListener('click', () => {
        trackManager.nextTrack;
        trackManager.trackManager.playTrack();
      });
      
      trackManager.trackManager.progressContainer!.removeEventListener('click', handleClick);
    };
  }, [trackManager.trackManager]);
  

  useEffect(() => {
    //const handleTrackChange = (newTrack: any) => setCurrentTrack(newTrack);
    const handleProgressBarChange = (newProgressBar: any) => setCurrentProgressBar(newProgressBar);
  
    //trackManager.trackManager.setOnTrackChangeListener(handleTrackChange);
    trackManager.trackManager.setOnProgressBarChangeListener(handleProgressBarChange);
  
    return () => {
      //trackManager.trackManager.setOnTrackChangeListener(null);
      trackManager.trackManager.setOnProgressBarChangeListener(null);
    };
  }, [trackManager.trackManager]);
  

  useEffect(() => {
    const updateTrackLikedState = async () => {
      const { isLiked, image } = await isCurrentTrackLiked(trackManager.trackManager, unlikeTrack, likeTrack);
      setLiked(isLiked);
      setImage(image);
    };
  
    updateTrackLikedState();
    trackManager.trackManager.playTrackBtn!.src = imgStop;
  }, [currentReduxTrack]);
  
  

  const handlePlayClick = () => {
    if (play) {
      trackManager.trackManager.playTrackBtn!.src = imgPlay;
      setPlay(false);
      trackManager.trackManager.pauseTrack();
    } else {
      trackManager.trackManager.playTrackBtn!.src = imgStop;
      setPlay(true);
      trackManager.trackManager.playTrack();
    }
  };

  const handleLike = async () => {      
      await likedTrack(like, currentReduxTrack);
      if (like) {
        setImage(unlikeTrack);
      } else {
        setImage(likeTrack);
      }
      setLiked(!like);
  };

  const changeBackgroundColorPanel = () => {
    coverTrack.current!.crossOrigin = 'anonymous';
    coverTrack.current!.setAttribute('src', currentReduxTrack.coverPath + '?t=' + new Date().getTime());
    const ctx = canvas.current!.getContext('2d');

    if (ctx && coverTrack.current) {
      canvas.current!.width = coverTrack.current!.width;
      canvas.current!.height = coverTrack.current!.height;
      ctx.drawImage(coverTrack.current!, 0, 0, canvas.current!.width, canvas.current!.height);

      const imageData = ctx.getImageData(0, 0, canvas.current!.width, canvas.current!.height);
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

      const gradient = `linear-gradient(to left, rgb(67,67,69), rgb(${r},${g},${b}))`;

      panelForGradient.current!.style.background = gradient;
    }
  }

  return (
    <>
      <div className="music-panel" ref={panelForGradient} id="gradient-box">
        <canvas ref={canvas}></canvas>
        <img
          alt="Обложка песни"
          ref={coverTrack}
          className="cover-panel"
          id="img-for-gradient"
          onLoad={changeBackgroundColorPanel}
        />
        <div className="track-info-panel">
          <h3 className="track-title-panel">{currentReduxTrack.title}</h3>
          <p className="track-artist-panel">{currentReduxTrack.artistEntity?.name}</p>
        </div>
        <audio id="track_for_url" ref={trackForUrl}></audio>
        <div className="music-buttons">
          <img src={img1} className="prev-track-button" ref={prevTrackBtn} />
          <img
            src={img2}
            onClick={handlePlayClick}
            ref={playTrackBtn}
            className="stop-track-button"
            id="play-music-btn"
          />
          <img src={img3} className="next-track-button" ref={nextTrackBtn} />
        </div>

        <div className="progress__container" ref={progressContainer}>
          <div className="progress" id="progress_bar" ref={progressBar}></div>
        </div>

        <img className="like-track" onClick={handleLike} src={image} />
      </div>
      <ButtonPanel onChangeAlbum={onChangeAlbum} onChangeArtist={onChangeArtist}/>
    </>
  );
}