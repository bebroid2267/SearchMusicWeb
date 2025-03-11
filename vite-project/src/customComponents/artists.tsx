import { useNavigate } from 'react-router-dom';
import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import '../../../wwwroot/css/resultPage.css'
import { IArtist } from '../Interfaces';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { fetchAlbumsArtist, fetchTracksArtist } from '../store/Middleware/fetchDataPage';
import { setArtist } from '../store/artistSlice';
import Button from './buttonScrollAlbums';
import { useEffect, useRef } from 'react';

export default function Artists({ artists, className }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const nextArtistBtn = useRef<HTMLButtonElement>(null);
  const prevArtistBtn = useRef<HTMLButtonElement>(null);
  const artistList = useRef<HTMLUListElement>(null);
  const artistElement = useRef<HTMLLIElement>(null);
  

  const handleOpenArtistPage = async (artist: IArtist) => {
    dispatch(fetchTracksArtist({
      artistId: artist.id,
      page: 0,
      pageSize: 10,
    }));
    dispatch(fetchAlbumsArtist(artist.id));
    dispatch(setArtist(artist));

    navigate(`/Artist/${artist.name}`);
  };



  const handleNextArtistClick = () => {
    const itemWidth = artistElement.current!.offsetWidth;
    artistList.current!.scrollLeft += itemWidth;
  };

  const handlePrevArtistClick = () => {
    console.log('wtf');
    const itemWidth = artistElement.current!.offsetWidth;
    artistList.current!.scrollLeft -= itemWidth;
  }


  return (
    <div className={className}>
      <div className='album-div-container'>
        <h2 id="artist-text">Артисты</h2>
        <div className='btn-albums-container'>
              <Button rotation={1} className='btn-prev-album' onClick={handlePrevArtistClick} ref={prevArtistBtn}></Button>
              <Button rotation={-1} className='btn-next-album' onClick={handleNextArtistClick} ref={nextArtistBtn}></Button>
        </div>    
      </div>
      <ul className="result-artists" ref={artistList}>
        {artists
          ? artists.map((artist: IArtist) => (
              <li
                key={artist.id}
                data-id={artist.id}
                data-cover-part={artist.coverPath}
                data-name={artist.name}
                className="result_item"
                onClick={() => {handleOpenArtistPage(artist)}}
                ref={artistElement}
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
