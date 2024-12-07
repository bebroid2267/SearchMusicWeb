import BackgroundVideo from "../customComponents/backVideo";
import MainPanel from "../customComponents/mainPanel";
import test from '../../lib/resources/cover.jpeg'
import '../../../wwwroot/css/artisttpagestyle.css'
import yalogo from '../../lib/resources/yalogo.svg'
import { useEffect, useRef } from "react";

export default function ArtistPage() {
    const coverArtist = useRef<HTMLImageElement>(null);
    const panelForChangeColor = useRef<HTMLDivElement>(null);

    const canvas = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

    useEffect(() => {
            const currentImage = coverArtist.current;
        
                if (ctx && currentImage) {
                    canvas.width = currentImage.width;
                    canvas.height = currentImage.height;
                    ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
        
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;
        
                    let r = 0, g = 0, b = 0, count = 0;
        
                    for (let i = 0; i < data.length; i += 4) {
                        r += data[i];
                        g += data[i + 1];
                        b += data[i + 2];
                        count++;
                    }
        
                    r = Math.floor(r / count);
                    g = Math.floor(g / count);
                    b = Math.floor(b / count);
        
                    // Обновление градиента
                    const gradient = `linear-gradient(to bottom, rgb(67,67,69), rgb(${r},${g},${b}))`;
                    panelForChangeColor.current!.style.background = gradient;
                    panelForChangeColor.current!.style.background = gradient;
                }
        
    }, [])
    return (
        <div className="intro">
            <div className="intro_result">
                <BackgroundVideo />
                <MainPanel />
                <div className="artist-container" ref={panelForChangeColor}>
                    <div className="header-artist-info">
                        <img 
                            className="artist-cover" 
                            src={test} 
                            alt="test" 
                            ref={coverArtist}
                        />
                        <div className="about-artist">
                            <p className="artist-article">Артист</p>
                            <h1>an.heaL</h1>
                            <div className="count-listeners-yandex">
                                <img 
                                    className="img-ya-logo"
                                    src={yalogo} 
                                    alt="yalogo" 
                                />
                                <p className="count-listeners-p">Слушателей на Яндексе: 5.542</p>
                            </div>
                        </div>
                    </div>
                    <div className="results">
                        <div className="artist-result-tracks">
                            <h2>Треки</h2>
                            <ul className="result-tracks-ul">
                                <li className="track-item">
                                    <img
                                        src={yalogo}
                                        alt="Обложка песни"
                                        className="cover"
                                    />
                                    <div className="track-info">
                                        <h3 className="track-title">test</h3>
                                        <p className="track-artist">test</p>
                                    </div>
                                </li>
                                <li className="track-item">
                                    <img
                                        src={yalogo}
                                        alt="Обложка песни"
                                        className="cover"
                                    />
                                    <div className="track-info">
                                        <h3 className="track-title">test</h3>
                                        <p className="track-artist">test</p>
                                    </div>
                                </li>

                            </ul>
                        </div>
                        <div className="artist-result-albums">
                            <h2 className="album-article-result">Альбомы</h2>
                            <ul className="result-albums-ul">
                                <li className="result_item_album">
                                    <img
                                        src={yalogo}
                                        alt="Обложка альбома"
                                        className="cover-album"
                                    />
                                    <h3 className="album_name">test</h3>
                                    <div className="blur_album_cover"></div>
                                    <h4 className="album_artist">test</h4>
                                    <h4 className="album_year">test5</h4>
                                </li>
                                <li className="result_item_album">
                                    <img
                                        src={yalogo}
                                        alt="Обложка альбома"
                                        className="cover-album"
                                    />
                                    <h3 className="album_name">test</h3>
                                    <div className="blur_album_cover"></div>
                                    <h4 className="album_artist">test</h4>
                                    <h4 className="album_year">test5</h4>
                                </li>
                                <li className="result_item_album">
                                    <img
                                        src={yalogo}
                                        alt="Обложка альбома"
                                        className="cover-album"
                                    />
                                    <h3 className="album_name">test</h3>
                                    <div className="blur_album_cover"></div>
                                    <h4 className="album_artist">test</h4>
                                    <h4 className="album_year">test5</h4>
                                </li>
                                <li className="result_item_album">
                                    <img
                                        src={yalogo}
                                        alt="Обложка альбома"
                                        className="cover-album"
                                    />
                                    <h3 className="album_name">test</h3>
                                    <div className="blur_album_cover"></div>
                                    <h4 className="album_artist">test</h4>
                                    <h4 className="album_year">test5</h4>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}