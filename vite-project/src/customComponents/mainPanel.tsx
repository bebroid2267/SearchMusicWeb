import ImageMainMapel from '../../src/resources/kandinsky-download-1725187229371.jpeg'
import '../../../wwwroot/css/site.css'
import '../../../wwwroot/css/result.css'
import { useEffect } from 'react';

export default function MainPanel() {

    useEffect(() => {
        
    })
    return (
        <div className="main-panel">
            <img src={ImageMainMapel} className="logo-service" />
            <p className="name-service">Mell Music</p>
            <button className="btn-home">Главная</button>
            <button className="btn-favorites">Фавориты</button>
        </div>
    );
}