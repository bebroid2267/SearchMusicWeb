import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import { IAlbum } from '../../../wwwroot/js/Interfaces/Interfaces';

export default function Albums({ albums }: any) {
  return (
    <div className="albums">
      <h2 id="artist-text">Альбомы</h2>
      <ul className="result_albums">
        {albums && albums.albumList
          ? albums.albumList.map((album: IAlbum) => (
              <li
                key={album.id}
                className="result_item_album"
                data-id={album.id}
                data-cover-path={album.coverPath}
                data-title={album.title}
              >
                <img
                  src={album.coverPath}
                  alt="Обложка альбома"
                  className="cover-album"
                />
                <h3 className="album_name">{album.title}</h3>
                <div className="blur_album_cover"></div>
                <h4 className="album_artist">{album.artistName}</h4>
                <h4 className="album_year">{album.year}</h4>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
