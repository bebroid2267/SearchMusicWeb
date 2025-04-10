import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import '../../../wwwroot/css/artisttpagestyle.css'
import { IAlbum } from '../Interfaces'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAlbum, setArtistName } from '../store/albumSlice';
import { AppDispatch } from '../store/store';
import { fetchTracksAlbum } from '../store/Middleware/fetchDataPage';
import { useEffect, useRef, useState } from 'react';
import Button from './buttonScrollAlbums';

interface AlbumsProps {
  albums: any,
  className: any,
}
export default function Albums({ albums, className }: AlbumsProps) {
  const divClass = className === 'artistPage' ? 'artist-result-albums' : 'albums';
  const h2Class = className === 'artistPage' ? 'album-article-result' : 'artist-text';
  const ulClass = className === 'artistPage' ? 'result-albums-ul' : 'result_albums';
  
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const nextAlbumBtn = useRef<HTMLButtonElement>(null);
  const prevAlbumBtn = useRef<HTMLButtonElement>(null);
  const albumsList = useRef<HTMLUListElement>(null);
  const albumElement = useRef<HTMLLIElement>(null);

  const [itemWidth, setItemWidth] = useState(0);
  itemWidth;

  useEffect(() => {
    if (albumsList.current && albumsList.current.querySelector('li')) {
        setItemWidth(albumsList.current!.querySelector('li')!.offsetWidth);
    }
}, [albums]);

  const handleOpenAlbumPage = async (album: IAlbum) => {
    dispatch(fetchTracksAlbum(album.id.toString()));
    dispatch(setArtistName(album.artistName));
    dispatch(setAlbum(album));
    
    navigate(`/Album/${album.title}`);
  };

  const handleNextAlbumClick = () => {
    const itemWidth = albumElement.current!.offsetWidth;
    albumsList.current!.scrollLeft += itemWidth;
  };

  const handlePrevAlbumClick = () => {
    console.log('wtf');
    const itemWidth = albumElement.current!.offsetWidth;
    albumsList.current!.scrollLeft -= itemWidth;
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
        {albums 
          ? albums.map((album: IAlbum) => (
              <li
                ref={albumElement}
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