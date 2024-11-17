import '../../../wwwroot/css/result.css'
import '../../../wwwroot/css/site.css'
import img1 from '../../../wwwroot/lib/resources/gray left.png'
import img2 from '../../../wwwroot/lib/resources/play (2).jpg'
import img3 from '../../../wwwroot/lib/resources/gray right.png'
import { useTrackManager } from '../contexts/TrackManagerContext'
import { useEffect, useRef, useState } from 'react'

export default function MusicPanel() {
    const trackManager = useTrackManager();

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

        trackManager.playTrackBtn!.addEventListener(
            'click',
            trackManager.playTrackClick.bind(trackManager)
        );
                
        if (trackManager.trackForUrl) {
            trackManager.trackForUrl.addEventListener('timeupdate', 
                trackManager.updateProgressTrack.bind(trackManager));
        }

        trackManager.nextTrackBtn!.addEventListener('click', trackManager.nextTrack);
        trackManager.prevTrackBtn!.addEventListener('click', trackManager.prevTrack);

        trackManager.progressContainer!.addEventListener('click', (e: any) => {
            const width = trackManager.progressContainer!.clientWidth;  // используем progressContainer напрямую
            const clickX = e.offsetX;
            const duration = trackManager.trackForUrl!.duration;

            trackManager.trackForUrl!.currentTime = (clickX / width) * duration;
        });
    },)

    useEffect(() => {
        trackManager.setOnTrackChangeListener((newTrack: any) => {
            setCurrentTrack(newTrack);
        });
        trackManager.setOnProgressBarChangeListener((newProgressBar: any) => {
            setCurrentProgressBar(newProgressBar);
        });
    }, [trackManager]);


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
                <img src={img1} className="prev-track-button" ref={prevTrackBtn}/>
                <img src={img2} ref={playTrackBtn} className="stop-track-button" id="play-music-btn" />
                <img src={img3} className="next-track-button" ref={nextTrackBtn} />
            </div>

            <div className="progress__container" ref={progressContainer}>
                <div className="progress" id="progress_bar" ref={progressBar}></div>
            </div>
        </div>
    );
}