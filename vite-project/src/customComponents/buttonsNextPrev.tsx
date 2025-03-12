import styled from 'styled-components';

export const Card = ({onClickPrev, onClickPlay, onClickStop, onClickNext}: any) => {
  return (
    <StyledWrapper>
        <div className="controls">
          <svg onClick={onClickPrev} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={30} width={30}>
            <path clipRule="evenodd" d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm.848-12.352a1.2 1.2 0 0 0-1.696-1.696l-3.6 3.6a1.2 1.2 0 0 0 0 1.696l3.6 3.6a1.2 1.2 0 0 0 1.696-1.696L11.297 13.2H15.6a1.2 1.2 0 1 0 0-2.4h-4.303l1.551-1.552Z" fillRule="evenodd" />
          </svg>

          <div className="container">
            <label>
                <input className="play-btn" type="checkbox" />
                <div className="play-icon" onClick={onClickPlay}/>
                <div className="pause-icon" onClick={onClickStop}/>
            </label>
        </div>

          <svg onClick={onClickNext} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={30} width={30}>
            <path clipRule="evenodd" d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm4.448-10.448-3.6-3.6a1.2 1.2 0 0 0-1.696 1.696l1.551 1.552H8.4a1.2 1.2 0 1 0 0 2.4h4.303l-1.551 1.552a1.2 1.2 0 1 0 1.696 1.696l3.6-3.6a1.2 1.2 0 0 0 0-1.696Z" fillRule="evenodd" />
          </svg>
          <div className="air" />
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
    width: 100%;
    margin-inline: auto;
    position: relative;
    display: flex;
    align-items: center;
    gap: .3rem;
  }

  .time {
    width: 90%;
    background-color: #5e5e5e;
    height: .35rem;
    border-radius: 3px;
  }

  .elapsed {
    width: 42%;
    background-color: #1db954;
    height: 100%;
    border-radius: 3px;
  }

  .controls {
    color: white;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
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

  .controls .heart:hover {
    color: pink;
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
    background-color: #00000060;
    padding: .5rem;
    border-radius: .5rem;
    background-blend-mode: multiply;
  }

  .time_full {
    font-size: .8rem;
    background-color: #00000060;
    padding: .5rem;
    border-radius: .5rem;
    background-blend-mode: multiply;
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
    margin-left: 5px;
    margin-right: 5px;
  }
    .container:hover {
        background: black;
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
    background-color: #000;
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