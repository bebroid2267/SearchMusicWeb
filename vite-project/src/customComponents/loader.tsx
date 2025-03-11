import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%; 
    height: 100%;

  .loader {
    border: 4px solid rgba(15, 150, 150, 0.46);
    border-left-color: transparent;
    border-radius: 50%;
  }

  .loader {
    width: 150px; /* или нужная ширина */
    height: 40px; 
  }
  .loader {
    border: 4px solid rgba(150, 150, 150, 1);
    border-left-color: transparent;
    width: 36px;
    height: 36px;
  }

  .loader {
    border: 4px solid rgba(150, 150, 150, 1);
    border-left-color: transparent;
    width: 36px;
    height: 36px;
    animation: spin89345 1s linear infinite;
  }

  @keyframes spin89345 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }`;

export default Loader;