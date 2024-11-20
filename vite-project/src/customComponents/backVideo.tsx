import video from '../../src/resources/lv_0_20240716115956.mp4';
import '../../../wwwroot/css/result.css';

export default function BackgroundVideo() {
  return (
    <video className="intro__media-video" autoPlay muted loop>
      <source src={video} type="video/mp4" />
      Ваш браузер не поддерживает видео.
    </video>
  );
}
