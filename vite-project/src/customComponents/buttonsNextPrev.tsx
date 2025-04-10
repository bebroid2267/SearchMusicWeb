import styled from 'styled-components';
import store from '../store/store';

export const Card = ({onClickPrev, onClickPlay, onClickNext, refProgressBar, refProgressContainer, refCurrentTime, refAllTime}: any) => {
  return (
    <StyledWrapper>
        <div className="controls">
          <svg onClick={onClickPrev} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={30} width={30}>
            <path clipRule="evenodd" d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm.848-12.352a1.2 1.2 0 0 0-1.696-1.696l-3.6 3.6a1.2 1.2 0 0 0 0 1.696l3.6 3.6a1.2 1.2 0 0 0 1.696-1.696L11.297 13.2H15.6a1.2 1.2 0 1 0 0-2.4h-4.303l1.551-1.552Z" fillRule="evenodd" />
          </svg>

          <div 
            className="container" 
            onClick={onClickPlay}
          >
            <label>
                {store.getState().player.isPlaying ?
                  <div 
                      className="pause-icon" 
                  /> :
                <div 
                  className="play-icon" 
                />
                }
            </label>
        </div>

          <svg onClick={onClickNext} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={30} width={30}>
            <path clipRule="evenodd" d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm4.448-10.448-3.6-3.6a1.2 1.2 0 0 0-1.696 1.696l1.551 1.552H8.4a1.2 1.2 0 1 0 0 2.4h4.303l-1.551 1.552a1.2 1.2 0 1 0 1.696 1.696l3.6-3.6a1.2 1.2 0 0 0 0-1.696Z" fillRule="evenodd" />
          </svg>
        </div>
        <div className="song-time">
            <p ref={refCurrentTime} className="timetext time_now"></p>
            <div 
              className="time"
              ref={refProgressContainer}
            >
              <div 
                className="elapsed"
                ref={refProgressBar} 
              >
              </div>
            </div>
            <p ref={refAllTime} className="timetext time_full"></p>
          </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`

  .card {
    position: relative;
    margin-top: -300px;
    min-width: 250px;
    min-height: 120px;
    background: #191414;
    border-radius: 10px;
    padding: .8rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    box-shadow: 0 10px 40px -25px rgba(100, 100, 100, .5);
  }
  @media (max-width: 800px) {
    .song-time {
      width: 200px !important;
    }
  }
  @media (max-width: 550px) {
    .song-time {
      margin-left: 18px !important;
      width: 400px !important;
      top: 50px !important;
    }
    .time_now, .time_full{
      font-size: 8px !important;
      display: none;
    }
    .time {
      height: 2px !important;
    }
    .container {
      width: 30px !important;
      height: 30px !important;
    }
      .controls svg {
        width: 20px !important;
        height: 20px !important;
      }
    .controls {
      position: fixed;
      right: -40%;
      top: -30px;
      // margin-top: -60px !important;
      // margin-left: 160px !important; 
    }
  }

    @media (max-width: 490px) {
      .controls {
        position: fixed;
        right: -38%;
        top: -30px;
        // margin-top: -60px !important;
        // margin-left: 160px !important; 
      }

    }
    @media (max-width: 400px) {
      .controls {
        position: fixed;
        right: -36%;
        top: -30px;
        // margin-top: -60px !important;
        // margin-left: 160px !important; 
      }

    }


  .top {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-block-end: .5rem;
  }

  .pfp {
    position: relative;
    height: 40px;
    width: 40px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title-1 {
    color: white;
    font-size: 1.25rem;
    font-weight: 900;
  }


  .title-2 {
    color: white;
    font-size: .75rem;
    opacity: .8;
  }

  /* new */
  .song-time {
    width: 400px;
    margin-inline: auto;
    position: relative;
    display: flex;
    align-items: center;
    gap: .3rem;
    height: 50px;
    margin-top: -10px;
    margin-bottom: 10px;
  }

  .time {
    width: 90%;
    background-color: #5e5e5e;
    height: .25rem;
    border-radius: 3px;
    box-shadow: inset 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  }
  .time:hover {
  cursor: pointer;
  }

  .elapsed {
    width: 0%;
    background-color: white;
    height: 100%;
    border-radius: 3px;
    box-shadow: inset 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  }

  .controls {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    margin-top: 50px;
  }

  .volume {
    height: 100%;
    width: 48px;
  }

  .air {
    height: 100%;
    width: 48px;
  }

  .controls svg {
    cursor: pointer;
    transition: 0.1s;
  }

  .controls svg:hover {
    color: gray;
  }
  .heart {
    margin-right: -50px;
  }
  .controls .heart:hover {
    color: pink;
    // background: pink;
  }

  .volume {
    opacity: 0;
    position: relative;
    transition: 0.2s;
  }

  .volume .slider {
    height: 4px;
    background-color: #5e5e5e;
    width: 80%;
    border-radius: 2px;
    margin-left: .3rem;
    background-blend-mode: multiply;
  }

  .volume .slider .green {
    background-color: #1db954;
    height: 100%;
    width: 80%;
    border-radius: 3px;
  }

  .volume .circle {
    background-color: white;
    height: 6px;
    width: 6px;
    border-radius: 3px;
    position: absolute;
    right: 20%;
    top: 50%;
    transform: translateY(-50%);
  }

  .volume_button:hover ~ .volume {
    opacity: 1;
  }

  .timetext {
    color: white;
  }

  .time_now {
    font-size: .8rem;
    background-color:rgba(0, 0, 0, 0);
    padding: .5rem;
    border-radius: .5rem;
    background-blend-mode: multiply;
    margin-top: 12px;
  }

  .time_full {
    font-size: .8rem;
    background-color:rgba(0, 0, 0, 0);
    padding: .5rem;
    border-radius: .5rem;
    background-blend-mode: multiply;
    margin-top: 12px;
  }

  .playing {
    display: flex;
    position: relative;
    justify-content: center;
    gap: 1px;
    width: 30px;
    height: 20px;
  }

  .greenline {
    background-color: #1db954;
    height: 20px;
    width: 2px;
    position: relative;
    transform-origin: bottom;
  }

  .line-1 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0.2s;
  }

  .line-2 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0.5s;
  }

  .line-3 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0.6s;
  }

  .line-4 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0s;
  }

  .line-5 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0.4s;
  }

  @keyframes playing {
    0% {
      transform: scaleY(0.1);
    }

    33% {
      transform: scaleY(0.6);
    }

    66% {
      transform: scaleY(0.9);
    }

    100% {
      transform: scaleY(0.1);
    }
  }
    .container {
    width: 40px;
    height: 40px;
    position: relative;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 10px;
    background: gray;
        border: 1px solid white;
  }
    .container:hover {
        background: black;
        cursor: pointer;
    }
    
  .play-btn {
    position: absolute;
    top: 0px;
    left: 0px;
    appearance: none;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(rgb(218, 204, 216),rgb(218, 204, 216));
    cursor: pointer;
    outline: none;
  }

  .play-btn::before {
    content: "";
    position: absolute;
    width: 93%;
    height: 93%;
    background-color: gray;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .play-btn:checked {
    animation: borderAnimate 700ms ease-in-out 1;
    animation-fill-mode: forwards;
  }

  @keyframes borderAnimate {
    0% {
      transform: rotate(0);
      background: conic-gradient(rgb(218, 204, 216), transparent 20%);
    }

    80% {
      background: conic-gradient(rgb(218, 204, 216), transparent 90%);
    }

    100% {
      transform: rotate(360deg);
      background: conic-gradient(rgb(218, 204, 216),rgb(218, 204, 216));
    }
  }

  .play-icon {
    position: absolute;
    width: 15px;
    height: 15px;
    left: 60%;
    top: 50%;
    background-color:rgb(218, 204, 216);
    transform: translate(-60%, -50%) rotate(90deg);
    clip-path: polygon(50% 15%, 0% 100%, 100% 100%);
    transition: all 400ms ease-in-out;
    cursor: pointer;
  }

  .play-btn:checked + .play-icon {
    clip-path: polygon(0 100%, 0% 100%, 100% 100%);
  }

  .pause-icon {
    position: absolute;
    width: 12px;
    height: 12px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    background-color:rgb(218, 204, 216);
    transition: all 400ms ease-in-out;

  }

  .pause-icon::before {
    content: "";
    position: absolute;
    width: 0%;
    height: 100%;
    background-color: rgb(218, 204, 216);
    left: 0;
  }

  .pause-icon::after {
    content: "";
    position: absolute;
    width: 0;
    height: 100%;
    background-color: rgb(218, 204, 216);
    right: 0;
  }

  .play-btn:checked ~ .pause-icon::before {
    animation: reveal 300ms ease-in-out 350ms 1;
    animation-fill-mode: forwards;
  }

  .play-btn:checked ~ .pause-icon::after {
    animation: reveal 300ms ease-in-out 600ms 1;
    animation-fill-mode: forwards;
  }

  @keyframes reveal {
    0% {
      width: 0;
    }

    100% {
      width: 35%;
    }
  }`;

export default Card;