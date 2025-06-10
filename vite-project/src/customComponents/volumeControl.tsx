import styled from 'styled-components';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useTrackManager } from '../contexts/TrackManagerContext';

interface VolumeControlProps {
    isFullscreen?: boolean;
}

interface StyledWrapperProps {
    $isFullscreen: boolean;
    $volume: number;
}

export const VolumeControl = ({ isFullscreen = false }: VolumeControlProps) => {
    const [volume, setVolume] = useState(1);
    const [previousVolume, setPreviousVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const trackManager = useTrackManager();
    const sliderRef = useRef<HTMLInputElement>(null);

    // Optimized volume update with RAF
    const updateAudioVolume = useCallback((newVolume: number) => {
        if (!trackManager.trackManager.trackForUrl) return;
        
        requestAnimationFrame(() => {
            if (trackManager.trackManager.trackForUrl) {
                trackManager.trackManager.trackForUrl.volume = newVolume;
            }
        });
    }, [trackManager]);

    useEffect(() => {
        updateAudioVolume(volume);
    }, [volume, updateAudioVolume]);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mouseleave', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseUp);
        };
    }, [isDragging]);

    const handleMuteClick = () => {
        if (isMuted) {
            setVolume(previousVolume);
            setIsMuted(false);
        } else {
            setPreviousVolume(volume);
            setVolume(0);
            setIsMuted(true);
        }
    };

    return (
        <StyledWrapper $isFullscreen={isFullscreen} $volume={volume}>
            <div className="volume-container">
                <button className="volume-button" onClick={handleMuteClick}>
                    {isMuted || volume === 0 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H1.5c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 00-1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06z" />
                        </svg>
                    ) : volume <= 0.5 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H1.5c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 00-1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM14 11.75a.75.75 0 00-1.5 0v.5a.75.75 0 001.5 0v-.5zm0-3a.75.75 0 00-1.5 0v.5a.75.75 0 001.5 0v-.5zm0 6a.75.75 0 00-1.5 0v.5a.75.75 0 001.5 0v-.5z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H1.5c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 00-1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM16 12a3.5 3.5 0 00-1.5-2.872V9.5a.75.75 0 00-1.5 0v.128a3.5 3.5 0 000 5.744v.128a.75.75 0 001.5 0v-.128A3.5 3.5 0 0016 12zm3 0a6.5 6.5 0 00-3.5-5.872V5.5a.75.75 0 00-1.5 0v.628a6.5 6.5 0 000 11.744v.628a.75.75 0 001.5 0v-.628A6.5 6.5 0 0019 12z" />
                        </svg>
                    )}
                </button>
                <input
                    ref={sliderRef}
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    onMouseDown={handleMouseDown}
                    className={`volume-slider ${isDragging ? 'dragging' : ''}`}
                />
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div<StyledWrapperProps>`
    display: flex;
    align-items: center;
    height: 100%;
    position: absolute;
    right: 110px;
    margin-top: 0px;

    .volume-container {
        display: flex;
        align-items: center;
        gap: 8px;
        user-select: none;
        height: 100%;
        padding: 8px 0;
    }

    .volume-button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        color: white;
        transition: all 0.2s ease;
        width: 24px;
        height: 24px;

        &:hover {
            opacity: 0.7;
            transform: scale(1.1);
        }

        &:active {
            transform: scale(0.95);
        }

        svg {
            width: 100%;
            height: 100%;
        }
    }

    .volume-slider {
        width: 80px;
        height: 4px;
        -webkit-appearance: none;
        appearance: none;
        background: #5e5e5e;
        border-radius: 2px;
        outline: none;
        opacity: 0.7;
        transition: opacity 0.2s ease;
        position: relative;
        margin: 0;
        padding: 0;
        cursor: pointer;

        &.dragging {
            opacity: 1;
        }

        &::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            background: #5e5e5e;
            border-radius: 2px;
            background-image: linear-gradient(
                to right,
                white 0%,
                white ${props => props.$volume * 100}%,
                #5e5e5e ${props => props.$volume * 100}%,
                #5e5e5e 100%
            );
        }

        &::-moz-range-track {
            width: 100%;
            height: 4px;
            background: #5e5e5e;
            border-radius: 2px;
            background-image: linear-gradient(
                to right,
                white 0%,
                white ${props => props.$volume * 100}%,
                #5e5e5e 
                #5e5e5e 100%
            );
        }

        &:hover {
            opacity: 1;
        }

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgb(218, 204, 216);
            cursor: pointer;
            transition: transform 0.2s ease;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            margin-top: -4px;

            &:hover {
                transform: scale(1.2);
                background: white;
            }
        }

        &::-moz-range-thumb {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgb(218, 204, 216);
            cursor: pointer;
            transition: transform 0.2s ease;
            border: none;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);

            &:hover {
                transform: scale(1.2);
                background: white;
            }
        }
    }

    @media (min-width: 550px) and (max-width: 700px) {
        right: 100px;
        
        .volume-container {
            gap: 6px;
        }

        .volume-button {
            width: 20px;
            height: 20px;
        }

        .volume-slider {
            width: 60px;
            height: 3px;

            &::-webkit-slider-thumb {
                width: 10px;
                height: 10px;
                margin-top: -3.5px;
            }

            &::-moz-range-thumb {
                width: 10px;
                height: 10px;
            }
        }
    }

    @media (max-width: 550px) {
        right: 40px;
        
        .volume-container {
            margin-left: 8px;
        }

        .volume-slider {
            width: 60px;
        }

        .volume-button {
            width: 20px;
            height: 20px;
        }
    }
`; 