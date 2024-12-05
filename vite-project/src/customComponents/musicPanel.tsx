import '../../../wwwroot/css/result.css';
import img1 from '../../../wwwroot/lib/resources/gray left.png';
import img2 from '../../../wwwroot/lib/resources/play (2).jpg';
import img3 from '../../../wwwroot/lib/resources/gray right.png';
import { useTrackManager } from '../contexts/TrackManagerContext';
import { useEffect, useRef, useState } from 'react';
import likeTrack from '../../../wwwroot/lib/resources/heart (1).png';
import unlikeTrack from '../../../wwwroot/lib/resources/unheart (1).png';
import axios from 'axios';
import imgPlay from '../../../wwwroot/lib/resources/play (2).jpg';
import imgStop from '../../../wwwroot/lib/resources/pause.png';

export default function MusicPanel() {
  const trackManager = useTrackManager();

  const [like, setLiked] = useState(false);
  const [image, setImage] = useState<any>(unlikeTrack);
  const [play, setPlay] = useState(false);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentProgressBar, setCurrentProgressBar] = useState(null);

  const img = useRef<HTMLImageElement>(null);
  const gradientDiv = useRef<HTMLDivElement>(null);
  const trackForUrl = useRef<HTMLAudioElement>(null);
  const playTrackBtn = useRef<HTMLImageElement>(null);
  const trackArtistPanel = useRef<HTMLHeadingElement>(null);
  const trackTitlePanel = useRef<HTMLParagraphElement>(null);

  const progressBar = useRef<HTMLDivElement>(null);
  const progressContainer = useRef<HTMLDivElement>(null);
  const nextTrackBtn = useRef<HTMLImageElement>(null);
  const prevTrackBtn = useRef<HTMLImageElement>(null);

  useEffect(() => {
    trackManager.trackForUrl = trackForUrl.current;
    trackManager.imgForGradient = img.current;
    trackManager.playTrackBtn = playTrackBtn.current;
    trackManager.trackArtistPanel = trackArtistPanel.current;
    trackManager.trackTitlePanel = trackTitlePanel.current;
    trackManager.progressBar = progressBar.current;
    trackManager.progressContainer = progressContainer.current;
    trackManager.nextTrackBtn = nextTrackBtn.current;
    trackManager.prevTrackBtn = prevTrackBtn.current;
    trackManager.gradientDiv = gradientDiv.current;
    trackManager.imgPlay = imgPlay;
    trackManager.imgStop = imgStop;

    currentProgressBar;

    if (trackManager.trackForUrl) {
      trackManager.trackForUrl.addEventListener(
        'timeupdate',
        trackManager.updateProgressTrack.bind(trackManager)
      );
    }

    trackManager.nextTrackBtn!.addEventListener(
      'click',
      trackManager.nextTrack
    );
    trackManager.prevTrackBtn!.addEventListener(
      'click',
      trackManager.prevTrack
    );

    trackManager.progressContainer!.addEventListener('click', (e: any) => {
      const width = trackManager.progressContainer!.clientWidth; // используем progressContainer напрямую
      const clickX = e.offsetX;
      const duration = trackManager.trackForUrl!.duration;

      trackManager.trackForUrl!.currentTime = (clickX / width) * duration;
    });
  });

  useEffect(() => {
    trackManager.setOnTrackChangeListener((newTrack: any) => {
      setCurrentTrack(newTrack);
    });
    trackManager.setOnProgressBarChangeListener((newProgressBar: any) => {
      setCurrentProgressBar(newProgressBar);
    });
  }, [trackManager]);

  useEffect(() => {
    const API_URL = 'https://a30895-8359.x.d-f.pw/api/tracksLike';
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      if (trackManager.currentTrack?.coverPath !== 'test') {
        axios
          .get(`${API_URL}/${trackManager.currentTrack!.id}/likedthis`, {
            headers,
          })
          .then(function (response) {
            response;
            setImage(likeTrack);
            setLiked(true);
          })
          .catch((error) => {
            error;
            setImage(unlikeTrack);
            setLiked(false);
          });
      }
    } catch (error) {}

    trackManager.playTrackBtn!.src = imgStop;
  }, [currentTrack]);

  const handlePlayClick = () => {
    if (play) {
      trackManager.playTrackBtn!.src = imgPlay;
      setPlay(false);
      trackManager.pauseTrack();
    } else {
      trackManager.playTrackBtn!.src = imgStop;
      setPlay(true);
      trackManager.playTrack();
    }
  };

  const handleLike = async () => {
    const API_URL = 'https://a30895-8359.x.d-f.pw/api/tracksLike';
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const track = {
        id: String(trackManager.currentTrack!.id),
        title: trackManager.currentTrack!.title,
        artist: trackManager.currentTrack?.artist,
        coverPath: trackManager.currentTrack?.coverPath,
        downloadUrl: trackManager.currentTrack?.downloadUrl,
      };

      if (like) {
        await axios.delete(`${API_URL}/${track.id}/like`, { headers });
        setImage(unlikeTrack);
      } else {
        await axios.post(
          `${API_URL}/${track.id}/like?idTrack=${track.id}&titleTrack=${track.title}&artistTrack=${track.artist}&coverPath=${track.coverPath}&downloadUrl=${track.downloadUrl}`,
          {},
          { headers }
        );
        setImage(likeTrack);
      }
      setLiked(!like);
    } catch (error) {}
  };
  return (
    <div className="music-panel" ref={gradientDiv} id="gradient-box">
      <img
        alt="Обложка песни"
        ref={img}
        className="cover-panel"
        id="img-for-gradient"
      />
      <div className="track-info-panel">
        <h3 className="track-title-panel" ref={trackTitlePanel}></h3>
        <p className="track-artist-panel" ref={trackArtistPanel}></p>
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
  );
}
