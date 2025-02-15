import { useNavigate } from 'react-router-dom';
import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import { IArtist } from '../Interfaces';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { fetchAlbumsArtist, fetchTracksArtist } from '../store/Middleware/fetchDataPage';
import { setArtist } from '../store/artistSlice';

export default function Artists({ artists }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenArtistPage = async (artist: IArtist) => {
    dispatch(fetchTracksArtist(artist.id));
    dispatch(fetchAlbumsArtist(artist.id));
    dispatch(setArtist(artist));

    navigate(`/Artist/${artist.name}`);
  };

  return (
    <div className="artists">
      <h2 id="artist-text">Артисты</h2>
      <ul className="result-artists">
        {artists
          ? artists.map((artist: IArtist) => (
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
          : (
            <h3 className="no-results" style={{marginLeft: '-20px'}}>Ничего не найдено</h3>
          )}
      </ul>
    </div>
  );
}
