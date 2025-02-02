import '../../../wwwroot/css/result.css';
import photo from '../../lib/resources/lv_0_20240716115956.mp4'

export default function BackgroundVideo() {
  return (
    <video className="intro__media-video" src={photo}
    autoPlay loop>
    </video>
  );
}
