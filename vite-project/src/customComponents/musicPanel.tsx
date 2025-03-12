import '../../../wwwroot/css/result.css';
import img1 from '../../../wwwroot/lib/resources/gray left.png';
import img2 from '../../../wwwroot/lib/resources/play (2).jpg';
import img3 from '../../../wwwroot/lib/resources/gray right.png';
import { useTrackManager } from '../contexts/TrackManagerContext';
import { useEffect, useRef, useState } from 'react';
import likeTrackImg from '../../lib/resources/heartreal.png';
import unlikeTrack from '../../lib/resources/unheartreal.png';
import imgPlay from '../../../wwwroot/lib/resources/play (2).jpg';
import imgStop from '../../src/resources/pause.png';
import ButtonPanel from './buttonPanel';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentTrack, selectIsTrackLiked, setActualDownloadUrlPlaylist, setCurrentTrack, setIsPlay } from '../store/playerSlice';
import { ITrack } from '../Interfaces';
import store, { AppDispatch, RootState } from '../store/store';
import { fetchUrl } from '../store/Middleware/fetchUrlForTrack';
import { likeTrack, dislikeTrack } from '../store/Middleware/likeTrack';
import { isLikedTrack } from '../store/Middleware/isLikedTrack';
import Checkbox from './buttonPlay';
import Card from './buttonsNextPrev';

export default function MusicPanel() {
  const dispatch = useDispatch<AppDispatch>();
  console.log('render music panle');
  const currentReduxTrack = useSelector(selectCurrentTrack);
  const trackManager = useTrackManager();
  const isTrackLiked = useSelector(selectIsTrackLiked);

  const [image, setImage] = useState<any>(unlikeTrack);
  const { url } = useSelector((state: RootState) => state.tracks);

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

  const handleClick = (e: any) => {
    const width = trackManager.trackManager.progressContainer!.clientWidth;
    const clickX = e.offsetX;
    const duration = trackManager.trackManager.trackForUrl!.duration;

    trackManager.trackManager.trackForUrl!.currentTime = (clickX / width) * duration;
  };

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
    trackManager.trackManager.imgForGradient = coverTrack.current;
    currentProgressBar;
  
    const updateProgress = trackManager.trackManager.updateProgressTrack.bind(trackManager.trackManager);

    if (trackManager.trackManager.trackForUrl) {
      trackManager.trackManager.trackForUrl.addEventListener('timeupdate', updateProgress);
      trackManager.trackManager.trackForUrl.addEventListener('ended', nextTrack);
    }
    trackManager.trackManager.progressContainer!.addEventListener('click', handleClick);
    dispatch(setIsPlay(true));
  
    return () => {
      if (trackManager.trackManager.trackForUrl) {
        trackManager.trackManager.trackForUrl.removeEventListener('timeupdate', updateProgress);
      }
      trackManager.trackManager.trackForUrl?.removeEventListener('ended', nextTrack);
      
      trackManager.trackManager.progressContainer!.removeEventListener('click', handleClick);
    };
  },);
  

  useEffect(() => {
    const handleProgressBarChange = (newProgressBar: any) => setCurrentProgressBar(newProgressBar);
    trackManager.trackManager.setOnProgressBarChangeListener(handleProgressBarChange);
  
    return () => {
      trackManager.trackManager.setOnProgressBarChangeListener(null);
    };
  }, [currentReduxTrack.downloadUrl]);
  

  const setLikeImage = () => {
    const isLikedTrack = store.getState().player.isCurrentTrackLiked;
    if (isLikedTrack) {
      setImage(likeTrackImg)
    } else {
      setImage(unlikeTrack);
    }
  };
  
  useEffect(() => {
    setLikeImage();
  }, [currentReduxTrack, isTrackLiked])

  const handlePlayClick = () => {
    const isPlaying = store.getState().player.isPlaying;
    if (isPlaying) {
      trackManager.trackManager.pauseTrack();
    } else {
      trackManager.trackManager.playTrack();
    }
    dispatch(setIsPlay(!isPlaying));
  };

  const handleLike = async () => {   
    const isAuthUser = store.getState().user.isAuth;
    if (!isAuthUser) {
      return;
    }   
    
    const isLikedTrack = store.getState().player.isCurrentTrackLiked;
      if (isLikedTrack) {
        dispatch(dislikeTrack(currentReduxTrack));
        setImage(unlikeTrack);
      } else {
        dispatch(likeTrack(currentReduxTrack));
        setImage(likeTrackImg);
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
}

const nextTrack = (): void => {
  trackManager.trackManager.clearTrack();
    const playlist = store.getState().player.playlist;
    if (currentReduxTrack !== null) {
        const indexCurrentTrack = getIndexCurrentTrack(currentReduxTrack);
        if (playlist !== null) {
            if (indexCurrentTrack === playlist.length - 1) {
              dispatch(isLikedTrack(playlist[0]));            
              changeTrackPanel(playlist[0]);
            } else {
              dispatch(isLikedTrack(playlist[indexCurrentTrack + 1]));           
                changeTrackPanel(playlist[indexCurrentTrack + 1]);
            }
        }
        trackManager.trackManager.playTrack();
    }
};

useEffect(() => {
  if (url && url != currentReduxTrack.downloadUrl) {
      dispatch(setActualDownloadUrlPlaylist({
          neededTrack: currentReduxTrack,
              url: url,
      }));
      trackManager.trackManager.changeTrackPanel({ 
        ...currentReduxTrack,
        downloadUrl: url
      });    
  }
  else if (url){
    trackManager.trackManager.changeTrackPanel({ 
      ...currentReduxTrack,
    });    

  }
}, [url])

const changeTrackPanelTrackManager = () => {
  const currentTrack: ITrack = store.getState().player.currentTrack;
  trackManager.trackManager.changeTrackPanel({ 
    ...currentTrack
  });    
}

const prevTrack = (): void => {
  trackManager.trackManager.clearTrack();
  const playlist = store.getState().player.playlist;

    if (currentReduxTrack !== null) {
        const indexCurrentTrack = getIndexCurrentTrack(currentReduxTrack);
        if (playlist !== null) {
            if (indexCurrentTrack === 0) {
              dispatch(isLikedTrack(playlist[playlist.length - 1]));            
              changeTrackPanel(playlist[playlist.length - 1]);
            } else {
              dispatch(isLikedTrack(playlist[indexCurrentTrack - 1]));
              changeTrackPanel(playlist[indexCurrentTrack - 1]);
            }
        }
        trackManager.trackManager.playTrack();
    }
 };

 const changeTrackPanel = (track: ITrack) => {
  dispatch(setCurrentTrack(track));
  //if (!track.downloadUrl){
      dispatch(fetchUrl(track.id));
  //}
  //else {
    changeTrackPanelTrackManager();
  //}

};

  return (
    <>
      <div className="music-panel" ref={panelForGradient} id="gradient-box">
        <canvas ref={canvas}></canvas>
        <img
          src={currentReduxTrack.coverPath}
          alt="Обложка песни"
          ref={coverTrack}
          className="cover-panel"
          id="img-for-gradient"
        />
        <div className="track-info-panel">
          <h3 className="track-title-panel">{currentReduxTrack.title}</h3>
          <p className="track-artist-panel">{currentReduxTrack.artistEntity?.name}</p>
        </div>
        <audio id="track_for_url" ref={trackForUrl}></audio>
        <div className="music-buttons">
          {/* <img 
            src={img1} 
            className="prev-track-button"  
            ref={prevTrackBtn} 
            onClick={prevTrack}
          /> */}
          <Card onClickNext={nextTrack} onClickPlay={handlePlayClick} onClickPrev={prevTrack} onClickStop={handlePlayClick}></Card>
          {/* <img
            src={img2}
            onClick={handlePlayClick}
            ref={playTrackBtn}
            className="stop-track-button"
            id="play-music-btn"
          /> */}
          {/* <img 
            src={img3} 
            className="next-track-button" 
            ref={nextTrackBtn} 
            onClick={nextTrack}
          /> */}
        </div>

        <div className="progress__container" ref={progressContainer}>
          <div className="progress" id="progress_bar" ref={progressBar}></div>
        </div>

        <img className="like-track" onClick={handleLike} src={image} />
      </div>
      {<ButtonPanel/>}
    </>
  );
}