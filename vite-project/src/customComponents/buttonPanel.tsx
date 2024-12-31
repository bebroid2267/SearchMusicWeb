import yalogo from '../../lib/resources/yalogo.svg'
import '../../../wwwroot/css/buttonPanel.css'
import { useTrackManager } from '../contexts/TrackManagerContext';
import { useEffect } from 'react';


export default function ButtonPanel() {
    const trackManager = useTrackManager();
    
    useEffect(() => {
        
    }, [trackManager.currentTrack]);

    return (
        <div className='button-panel'>
            <ul className='ul-button-panel'>
                <li className='button-panel-element'>
                    <img  className='img-btn-element' src={yalogo} alt="" />
                    <p className='text-btn-element'>artist</p>
                </li>
                <li className='button-panel-element'>
                    <img className='img-btn-element' src={yalogo} alt="" />
                    <p className='text-btn-element'>album</p>
                </li>
                <li className='button-panel-element'>
                    <p className='text-btn-element'>playlist</p>
                </li>
                <li className='button-panel-element'>
                    <p className='text-btn-element'>search remix</p>
                </li>
                <li className='button-panel-element'>
                    <p className='text-btn-element'>search clip</p>
                </li>
                <li className='button-panel-element'>
                    <p className='text-btn-element'>download track</p>
                </li>
                <li className='button-panel-element'>
                    <p className='text-btn-element'>full player</p>
                </li>

            </ul>
        </div>
    );
}