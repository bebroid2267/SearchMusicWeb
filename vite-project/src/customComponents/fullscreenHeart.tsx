import styled from 'styled-components';

interface HeartProps {
    isLiked: boolean;
    handleClick: () => void;
}

export const FullscreenHeart = ({ isLiked, handleClick }: HeartProps) => {
    return (
        <StyledWrapper>
            <div className="fullscreen-heart-container" onClick={handleClick}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    strokeWidth="2" 
                    strokeLinejoin="round" 
                    strokeLinecap="round" 
                    className="fullscreen-heart-button"
                    stroke={isLiked ? "#ff4081" : "white"}
                    fill={isLiked ? "#ff4081" : "none"}
                    height="24" 
                    width="24"
                >
                    <path d="M3.343 7.778a4.5 4.5 0 0 1 7.339-1.46L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 20.364l-7.682-7.682a4.501 4.501 0 0 1-.975-4.904Z"></path>
                </svg>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;

    .fullscreen-heart-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        transition: all 0.2s ease;
        
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
            
            svg {
                stroke: #ff4081;
            }
        }
        
        &:active {
            transform: scale(0.9);
        }
    }

    .fullscreen-heart-button {
        width: 24px;
        height: 24px;
        transition: all 0.2s ease;
    }
`; 