import '../../../wwwroot/css/result.css'
import '../../../wwwroot/css/site.css'
import testPhoto from '../resources/test pic/89_2.jpg'
import testPhoto2 from '../resources/test pic/i (1).webp'

export default function Albums() {
    return (
        <div className="albums">
                <h2 id="artist-text">Альбомы</h2>
                <ul className="result_albums">
                    <li className="result_item_album">
                        <img src={testPhoto}
                             alt="Обложка песни" 
                             className="cover-album" 
                        />
                        <h3 className="album_name">name album</h3>
                        <div className="blur_album_cover"></div>
                        <h4 className="album_artist">большая семерка</h4>
                        <h4 className="album_year">2015</h4>
                    </li>
                    <li className="result_item_album">
                        <img src={testPhoto2}
                             alt="Обложка песни" 
                             className="cover-album" 
                        />
                        <h3 className="album_name">name album</h3>
                        <div className="blur_album_cover"></div>
                        <h4 className="album_artist">artist name</h4>
                        <h4 className="album_year">2023</h4>
                    </li>
                </ul>
            </div>
    );
}