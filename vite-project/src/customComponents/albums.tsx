import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import '../../../wwwroot/css/artisttpagestyle.css'
import { IAlbum, ITrack } from '../Interfaces'
import { useNavigate } from 'react-router-dom';
import { getInfoArtist } from '../services/artistService';
import { useDispatch } from 'react-redux';
import { ResultState, setAlbumPage } from '../store/albumSlice';

interface AlbumsProps {
  albums: any,
  className: any,
  onChangeAlbum: any
}
export default function Albums({ albums, className, onChangeAlbum }: AlbumsProps) {
  const divClass = className === 'artistPage' ? 'artist-result-albums' : 'albums';
  const h2Class = className === 'artistPage' ? 'album-article-result' : 'artist-text';
  const ulClass = className === 'artistPage' ? 'result-albums-ul' : 'result_albums';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenAlbumPage = async (album: IAlbum) => {
    const dataTracks = await getInfoArtist('GetTracksAlbum', album.id.toString());
    var artist;
    for (let index = 0; index < dataTracks.trackList.length; index++) {
      dataTracks.trackList[index].downloadUrl = '';
      if (dataTracks.trackList[index].artistEntity.name === album.artistName)
      {
        artist = dataTracks.trackList[index].artistEntity;
      }
    }
    const serverResponse: ResultState = {
      tracks: dataTracks,
      albums: album,
      artist: artist
    };
    console.log(serverResponse);
    //dispatch(setAlbumPage(serverResponse));
    onChangeAlbum(serverResponse);
    navigate(`/Album/${album.title}`);
  };

  return (
    <div className={divClass}>
      <h2 id={h2Class}>Альбомы</h2>
      <ul className={ulClass}>
        {albums && albums.albumList
          ? albums.albumList.map((album: IAlbum) => (
              <li
                onClick={() => {handleOpenAlbumPage(album)}}
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
          : (
            <h3 className="no-results" style={{marginLeft: '10px'}}>Ничего не найдено</h3>
          )}
      </ul>
    </div>
  );
};