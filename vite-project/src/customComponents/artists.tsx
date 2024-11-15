import '../../../wwwroot/css/result.css'
import '../../../wwwroot/css/site.css'
import testPhoto from '../resources/test pic/m1000x1000.jpg'
import testPhoto2 from '../resources/test pic/lo_moon__lo_moon_2_lp1.jpg'

export default function Artists() {
    return (
        <div className="artists">
                <h2 id="artist-text">Артисты</h2>
                <ul className="result-artists">
                    <li className="result_item">
                            <img src={testPhoto}
                                 alt="Обложка песни" 
                                 className="cover-artist" 
                            />
                            <h3 className="artist_name">voscresenskiy</h3>
                        <div className="blur_artist_cover"></div>
                    </li>
                    <li className="result_item">
                        <img src={testPhoto2}
                             alt="Обложка песни" 
                             className="cover-artist" 
                        />
                        <h3 className="artist_name">voscresenskiy</h3>
                        <div className="blur_artist_cover"></div>
                    </li>
                </ul>
            </div>
    );
}