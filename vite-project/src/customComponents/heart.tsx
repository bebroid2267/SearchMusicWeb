import styled from 'styled-components';

export const Heart = ({isLiked, handleClick}: any) => {
    return (
            <StyledWrapper>
                    <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" className={isLiked ? 'heartLiked' : 'heart'} stroke="currentColor" fill="none" height={20} width={24}>
                        <path d="M3.343 7.778a4.5 4.5 0 0 1 7.339-1.46L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 20.364l-7.682-7.682a4.501 4.501 0 0 1-.975-4.904Z">
                        </path>
                    </svg>

            </StyledWrapper>

    );
};

const StyledWrapper = styled.div`
    .heart {
        position: absolute; /* Абсолютное позиционирование */
        top: 5px; /* Отступ сверху */
        right: 50px; /* Отступ справа */
        width: 35px;
        height: 35px;
        cursor: pointer; 
    }
    .heartLiked {
        position: absolute; /* Абсолютное позиционирование */
        top: 5px; /* Отступ сверху */
        right: 50px; /* Отступ справа */
        width: 35px;
        height: 35px;
        cursor: pointer; 
        color: rgb(250, 6, 250);
    }
        @media (max-width: 550px) {
            .heart, .heartLiked {
                right: 120px;
                width: 28px;
                height: 28px;

            }
        }

     .heart:hover {
        color: pink;
    }


`;