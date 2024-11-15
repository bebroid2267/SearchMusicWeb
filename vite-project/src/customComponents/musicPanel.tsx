import '../../../wwwroot/css/result.css'
import '../../../wwwroot/css/site.css'
import img1 from '../../../wwwroot/lib/resources/gray left.png'
import img2 from '../../../wwwroot/lib/resources/play (2).jpg'
import img3 from '../../../wwwroot/lib/resources/gray right.png'

export default function MusicPanel() {
    return (
        <div className="music-panel" id="gradient-box">
            <img alt="Обложка песни" className="cover-panel" id="img-for-gradient" />
            <div className="track-info-panel">
                <h3 className="track-title-panel">hooch</h3>
                <p className="track-artist-panel">an.heaL</p>
            </div>
            <audio id="track_for_url"></audio>
            <div className="music-buttons">
                <img src={img1} className="prev-track-button" />
                <img src={img2} className="stop-track-button" id="play-music-btn" />
                <img src={img3} className="next-track-button" />
            </div>

            <div className="progress__container">
                <div className="progress" id="progress_bar"></div>
            </div>
        </div>
    );
}