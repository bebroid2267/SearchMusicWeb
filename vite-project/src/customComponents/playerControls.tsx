import styled from 'styled-components';
import store from '../store/store';

interface PlayerControlsProps {
    onClickPrev: () => void;
    onClickPlay: () => void;
    onClickNext: () => void;
    refProgressBar: any;
    refProgressContainer: any;
    refAllTime: any;
    refCurrentTime: any;
    isFullscreen?: boolean;
}

export const PlayerControls = ({
    onClickPrev,
    onClickPlay,
    onClickNext,
    refProgressBar,
    refProgressContainer,
    refAllTime,
    refCurrentTime,
    isFullscreen = false
}: PlayerControlsProps) => {
    return (
        <StyledWrapper $isFullscreen={isFullscreen}>
            <div className="controls">
                <svg onClick={onClickPrev} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={30} width={30}>
                    <path clipRule="evenodd" d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm.848-12.352a1.2 1.2 0 0 0-1.696-1.696l-3.6 3.6a1.2 1.2 0 0 0 0 1.696l3.6 3.6a1.2 1.2 0 0 0 1.696-1.696L11.297 13.2H15.6a1.2 1.2 0 1 0 0-2.4h-4.303l1.551-1.552Z" fillRule="evenodd" />
                </svg>

                <div className='container-high' onClick={onClickPlay}>
                    <div className="container">
                        <label>
                            {store.getState().player.isPlaying ?
                                <div className="pause-icon" /> :
                                <div className="play-icon" />
                            }
                        </label>
                    </div>
                </div>

                <svg onClick={onClickNext} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={30} width={30}>
                    <path clipRule="evenodd" d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm4.448-10.448-3.6-3.6a1.2 1.2 0 0 0-1.696 1.696l1.551 1.552H8.4a1.2 1.2 0 1 0 0 2.4h4.303l-1.551 1.552a1.2 1.2 0 1 0 1.696 1.696l3.6-3.6a1.2 1.2 0 0 0 0-1.696Z" fillRule="evenodd" />
                </svg>
            </div>

            <div className="song-time">
                <p className="time_now" ref={refCurrentTime}>0:00</p>
                <div className="time" ref={refProgressContainer}>
                    <div className="elapsed" ref={refProgressBar}></div>
                </div>
                <p className="time_full" ref={refAllTime}>0:00</p>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div<{ $isFullscreen: boolean }>`
    .controls {
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 30px;
        margin-top: ${props => props.$isFullscreen ? '50px' : '0'};
    }

    .controls svg {
        cursor: pointer;
        transition: 0.2s ease;
        color: ${props => props.$isFullscreen ? 'white' : 'gray'};
        margin-top: -10px;

        &:hover {
            color: ${props => props.$isFullscreen ? 'gray' : 'white'};
            transform: scale(1.1);
        }
        
        &:active {
            transform: scale(0.95);
        }
    }

    .container-high {
        height: 50px;
    }

    .container {
        width: 40px;
        height: 40px;
        position: relative;
        border-radius: 50%;
        margin: 0 20px;
        background: ${props => props.$isFullscreen ? 'gray' : 'transparent'};
        border: 1px solid ${props => props.$isFullscreen ? 'white' : 'gray'};
        transition: all 0.2s ease;

        &:hover {
            background: ${props => props.$isFullscreen ? 'black' : 'gray'};
            cursor: pointer;
        }

        &:active {
            transform: scale(0.95);
        }
    }

    .play-icon {
        position: absolute;
        width: 15px;
        height: 15px;
        left: 60%;
        top: 50%;
        background-color: ${props => props.$isFullscreen ? 'rgb(218, 204, 216)' : 'gray'};
        transform: translate(-60%, -50%) rotate(90deg);
        clip-path: polygon(50% 15%, 0% 100%, 100% 100%);
        transition: all 0.2s ease;

        &:hover {
            background-color: ${props => props.$isFullscreen ? 'rgb(218, 204, 216)' : 'white'};
        }
    }

    .pause-icon {
        position: absolute;
        width: 12px;
        height: 12px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        background-color: ${props => props.$isFullscreen ? 'rgb(218, 204, 216)' : 'gray'};
        transition: all 0.2s ease;

        &:hover {
            background-color: ${props => props.$isFullscreen ? 'rgb(218, 204, 216)' : 'white'};
        }

        &::before, &::after {
            content: "";
            position: absolute;
            width: 35%;
            height: 100%;
            background-color: ${props => props.$isFullscreen ? 'rgb(218, 204, 216)' : 'gray'};
            transition: all 0.2s ease;
        }

        &:hover::before, &:hover::after {
            background-color: ${props => props.$isFullscreen ? 'rgb(218, 204, 216)' : 'white'};
        }

        &::before {
            left: 0;
        }

        &::after {
            right: 0;
        }
    }

    .song-time {
        width: ${props => props.$isFullscreen ? '400px' : '300px'};
        margin: 0 auto;
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.3rem;
        height: 20px;
        margin-top: ${props => props.$isFullscreen ? '20px' : '-10px'};
    }

    .time {
        width: 90%;
        background-color: #5e5e5e;
        height: ${props => props.$isFullscreen ? '4px' : '3px'};
        border-radius: 3px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            height: ${props => props.$isFullscreen ? '6px' : '4px'};
        }
    }

    .elapsed {
        background-color: ${props => props.$isFullscreen ? 'white' : '#1db954'};
        height: 100%;
        border-radius: 3px;
        transition: width 0.1s linear;
    }

    .time_now, .time_full {
        font-size: 0.8rem;
        color: white;
        padding: 0.5rem;
        border-radius: 0.5rem;
        margin-top: 12px;
    }

    @media (max-width: 800px) {
        .song-time {
            width: 200px;
        }
    }

    @media (max-height: 700px) {
        .controls {
            margin-top: ${props => props.$isFullscreen ? '20px' : '0'};
        }

        .song-time {
            margin-top: ${props => props.$isFullscreen ? '10px' : '-10px'};
        }
    }

    @media (max-width: 550px) {
        .song-time {
            width: 200px;
            margin: 0 auto;
            margin-top: ${props => props.$isFullscreen ? '10px' : '-10px'};
        }

        .time_now, .time_full {
            font-size: 8px;
            ${props => !props.$isFullscreen && 'display: none;'}
        }

        .time {
            height: ${props => props.$isFullscreen ? '3px' : '2px'};
        }

        .container {
            width: ${props => props.$isFullscreen ? '35px' : '30px'};
            height: ${props => props.$isFullscreen ? '35px' : '30px'};
        }

        .controls svg {
            width: ${props => props.$isFullscreen ? '25px' : '20px'};
            height: ${props => props.$isFullscreen ? '25px' : '20px'};
        }
    }
`; 