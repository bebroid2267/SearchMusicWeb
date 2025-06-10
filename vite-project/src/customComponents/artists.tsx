import { useNavigate } from 'react-router-dom';
import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import '../../../wwwroot/css/resultPage.css'
import { IArtist } from '../Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { artistProps, fetchAlbumsArtist, fetchTracksArtist, searchArtistPage } from '../store/Middleware/fetchDataPage';
import { setArtist } from '../store/artistSlice';
import Button from './buttonScrollAlbums';
import { useCallback, useEffect, useRef, useState } from 'react';
import { selectQuearyUser } from '../store/searchDataSlice';

interface ArtistsProps {
  artists: IArtist[];
  className: string;
  currentPage: 'result' | 'none';
}

export default function Artists({ artists, className, currentPage }: ArtistsProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const quearyUser = useSelector(selectQuearyUser);

  const nextArtistBtn = useRef<HTMLButtonElement>(null);
  const prevArtistBtn = useRef<HTMLButtonElement>(null);
  const artistList = useRef<HTMLUListElement>(null);
  const artistElement = useRef<HTMLLIElement>(null);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  // Сброс страницы при изменении поискового запроса
  useEffect(() => {
    setPage(1);
    setIsLastPage(false);
  }, [quearyUser]);

  const loadMoreArtistsResult = useCallback(async () => {
    if (loading || isLastPage || page > 20) return;
    
    setLoading(true);
    try {
      const result = await dispatch(searchArtistPage({ queary: quearyUser, page, pageSize: 10 })).unwrap();
      if (!result || result.length === 0) {
        setIsLastPage(true);
      } else {
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      setIsLastPage(true);
    } finally {
      setLoading(false);
    }
  }, [dispatch, page, loading, quearyUser, isLastPage]);

  const handleScroll = useCallback(() => {
    if (!artistList.current) return;
    const ulElement = artistList.current;
    
    const scrollPosition = ulElement.scrollLeft;
    const scrollWidth = ulElement.scrollWidth;
    const clientWidth = ulElement.clientWidth;
    
    // Загружаем когда осталось 20% скролла
    if (scrollPosition + clientWidth >= scrollWidth * 0.8) {
      if (currentPage === 'result') {
        loadMoreArtistsResult();
      }
    }
  }, [loadMoreArtistsResult, currentPage]);

  useEffect(() => {
    if (currentPage === 'none') return;

    if (currentPage === 'result' && artists?.length > 0 && !isLastPage) {
      loadMoreArtistsResult();
    }

    const currentArtistList = artistList.current;
    if (currentArtistList) {
      currentArtistList.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentArtistList) {
        currentArtistList.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentPage, loadMoreArtistsResult, handleScroll, artists, isLastPage]);

  const handleOpenArtistPage = async (artist: IArtist) => {
    const artistProps: artistProps = {
      artistId: artist.id,
      page: 0,
      pageSize: 10
    };

    dispatch(fetchTracksArtist(artistProps));
    dispatch(fetchAlbumsArtist(artistProps));
    dispatch(setArtist(artist));

    navigate(`/Artist/${artist.name}`);
  };

  const handleNextArtistClick = () => {
    if (!artistElement.current || !artistList.current) return;
    const itemWidth = artistElement.current.offsetWidth;
    artistList.current.scrollLeft += itemWidth;
  };

  const handlePrevArtistClick = () => {
    if (!artistElement.current || !artistList.current) return;
    const itemWidth = artistElement.current.offsetWidth;
    artistList.current.scrollLeft -= itemWidth;
  }

  return (
    <div className={className}>
      <div className='album-div-container'>
        <h2 id="artist-text">Артисты</h2>
        <div className='btn-artist-container'>
          <Button rotation={1} className='btn-prev-album' onClick={handlePrevArtistClick} ref={prevArtistBtn}></Button>
          <Button rotation={-1} className='btn-next-album' onClick={handleNextArtistClick} ref={nextArtistBtn}></Button>
        </div>    
      </div>
      <ul className="result-artists" ref={artistList}>
        {artists && artists.length > 0
          ? artists.map((artist: IArtist) => (
              <li
                key={artist.id}
                data-id={artist.id}
                data-cover-part={artist.coverPath}
                data-name={artist.name}
                className="result_item"
                onClick={() => handleOpenArtistPage(artist)}
                ref={artistElement}
              >
                <img
                  src={artist.coverPath}
                  alt="Обложка артиста"
                  className="cover-artist"
                />
                <h3 className="artist_name">{artist.name}</h3>
                <div className="blur_artist_cover"></div>
              </li>
            ))
          : (
            <h3 className="no-results" style={{marginLeft: '-20px'}}>Ничего не найдено</h3>
          )}
        {loading && <div className="loading">Загрузка...</div>}
      </ul>
    </div>
  );
}
