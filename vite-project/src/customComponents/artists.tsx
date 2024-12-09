import { useNavigate } from 'react-router-dom';
import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import { IArtist } from '../../../wwwroot/js/Interfaces/Interfaces';
import { getInfoArtist } from '../services/artistService';
import { onChangeServer } from '../Pages/MainPage';

export default function Artists({ artists, onChangeArtist }: any) {
  const navigate = useNavigate();
  const handleOpenArtistPage = async (artist: IArtist) => {

    const dataTracks = await getInfoArtist('GetTracksArtist', artist.id.toString());
    const dataAlbums =  await getInfoArtist('GetAlbumsArtist', artist.id.toString());
    const serverResponse: onChangeServer = {
      tracks: dataTracks,
      albums: dataAlbums,
      artist: artist
    };

    onChangeArtist(serverResponse);
    navigate(`/Artist/${artist.name}`);
  };

  return (
    <div className="artists">
      <h2 id="artist-text">Артисты</h2>
      <ul className="result-artists">
        {artists && artists.artistList
          ? artists.artistList.map((artist: IArtist) => (
              <li
                key={artist.id}
                data-id={artist.id}
                data-cover-part={artist.coverPath}
                data-name={artist.name}
                className="result_item"
                onClick={() => {handleOpenArtistPage(artist)}}
              >
                <img
                  src={artist.coverPath}
                  alt="Обложка песни"
                  className="cover-artist"
                />
                <h3 className="artist_name">{artist.name}</h3>
                <div className="blur_artist_cover"></div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
