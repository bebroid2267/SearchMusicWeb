import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import '../../../wwwroot/css/artisttpagestyle.css'
import { IAlbum } from '../Interfaces'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAlbum, setArtistName } from '../store/albumSlice';
import { AppDispatch } from '../store/store';
import { fetchTracksAlbum, fetchAlbumsArtistPage, searchAlbumPage } from '../store/Middleware/fetchDataPage';
import { useCallback, useEffect, useRef, useState } from 'react';
import Button from './buttonScrollAlbums';
import { selectQuearyUser } from '../store/searchDataSlice';
import { selectCurrentArtist } from '../store/artistSlice';

interface AlbumsProps {
  albums: IAlbum[];
  className: string;
  currentPage: 'artist' | 'result' | 'none';
}

export default function Albums({ albums, className, currentPage }: AlbumsProps) {
  const divClass = className === 'artistPage' ? 'artist-result-albums' : 'albums';
  const h2Class = className === 'artistPage' ? 'album-article-result' : 'artist-text';
  const ulClass = className === 'artistPage' ? 'result-albums-ul' : 'result_albums';
  
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const quearyUser = useSelector(selectQuearyUser);
  const currentArtist = useSelector(selectCurrentArtist);

  const nextAlbumBtn = useRef<HTMLButtonElement>(null);
  const prevAlbumBtn = useRef<HTMLButtonElement>(null);
  const albumsList = useRef<HTMLUListElement>(null);
  const albumElement = useRef<HTMLLIElement>(null);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  // Сброс страницы при изменении артиста или поискового запроса
  useEffect(() => {
    if (currentPage === 'result' || currentPage === 'artist') {
      setPage(1);
      setIsLastPage(false);
    }
  }, [quearyUser, currentArtist?.id, currentPage]);

  const loadMoreAlbumsArtist = useCallback(async () => {
    if (loading || isLastPage || page > 20 || !currentArtist?.id) return;
    
    setLoading(true);
    try {
      const result = await dispatch(fetchAlbumsArtistPage({ 
        artistId: currentArtist.id, 
        page, 
        pageSize: 10 
      })).unwrap();
      
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
  }, [dispatch, page, loading, currentArtist?.id, isLastPage]);

  const loadMoreAlbumsResult = useCallback(async () => {
    if (loading || isLastPage || page > 20) return;
    
    setLoading(true);
    try {
      const result = await dispatch(searchAlbumPage({ queary: quearyUser, page, pageSize: 10 })).unwrap();
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
    if (!albumsList.current) return;
    const ulElement = albumsList.current;
    
    const scrollPosition = ulElement.scrollLeft;
    const scrollWidth = ulElement.scrollWidth;
    const clientWidth = ulElement.clientWidth;
    
    // Загружаем когда осталось 20% скролла
    if (scrollPosition + clientWidth >= scrollWidth * 0.8) {
      if (currentPage === 'artist' && albums?.length > 0) {
        loadMoreAlbumsArtist();
      } else if (currentPage === 'result') {
        loadMoreAlbumsResult();
      }
    }
  }, [loadMoreAlbumsArtist, loadMoreAlbumsResult, currentPage, albums]);

  useEffect(() => {
    if (currentPage === 'none') return;

    const currentAlbumsList = albumsList.current;
    if (currentAlbumsList) {
      currentAlbumsList.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentAlbumsList) {
        currentAlbumsList.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentPage, handleScroll]);

  const handleOpenAlbumPage = async (album: IAlbum) => {
    dispatch(fetchTracksAlbum(album.id.toString()));
    dispatch(setArtistName(album.artistsName));
    dispatch(setAlbum(album));
    
    navigate(`/Album/${album.title}`);
  };

  const handleNextAlbumClick = () => {
    if (!albumElement.current || !albumsList.current) return;
    const itemWidth = albumElement.current.offsetWidth;
    albumsList.current.scrollLeft += itemWidth;
  };

  const handlePrevAlbumClick = () => {
    if (!albumElement.current || !albumsList.current) return;
    const itemWidth = albumElement.current.offsetWidth;
    albumsList.current.scrollLeft -= itemWidth;
  }

  return (
    <div className={divClass}>
      <div className='album-div-container'>
        <h2 id={h2Class}>Альбомы</h2>
        <div className='btn-albums-container'>
          <Button rotation={1} className='btn-prev-album' onClick={handlePrevAlbumClick} ref={prevAlbumBtn}></Button>
          <Button rotation={-1} className='btn-next-album' onClick={handleNextAlbumClick} ref={nextAlbumBtn}></Button>
        </div>
      </div>
      <ul ref={albumsList} className={ulClass}>
        {albums && albums.length > 0
          ? albums.map((album: IAlbum) => (
              <li
                ref={albumElement}
                onClick={() => handleOpenAlbumPage(album)}
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
                <h4 className="album_artist">{album.artistsName[0]}</h4>
                <h4 className="album_year">{album.year}</h4>
              </li>
            ))
          : (
            <h3 className="no-results" style={{marginLeft: '10px'}}>Ничего не найдено</h3>
          )}
        {loading && <div className="loading">Загрузка...</div>}
      </ul>
    </div>
  );
}