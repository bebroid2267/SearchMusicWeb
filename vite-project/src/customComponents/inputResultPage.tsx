import styled from 'styled-components';

export const InputResult = ({id, value, name, onChange, variant = 'default'}: any) => {
  return (
    <StyledWrapper $variant={variant}>
        <div className='container-input'>
        <label className="label">
            <input 
                name={name} 
                type="text" 
                className="search_bar" 
                placeholder="Поиск в космосе..." 
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div<{ $variant: 'default' | 'modal' | 'header' }>`
  ${props => props.$variant === 'default' && `
    .container-input {
      width: 400px;
    }

    .label {
      box-shadow: 0px 40px 100px rgb(194, 56, 199);
    }

    @media (max-width: 500px) {
      .container-input {
        width: 300px !important;
      }
    }
    @media (max-width: 400px) {
      .container-input {
        width: 250px !important;
      }
      .search_bar {
        font-size: 12px !important;
      }
    }
  `}

  ${props => props.$variant === 'header' && `
    .container-input {
      width: 400px;
    }

    .label {
      box-shadow: none;
    }

    @media (max-width: 500px) {
      .container-input {
        width: 300px !important;
      }
    }
    @media (max-width: 400px) {
      .container-input {
        width: 250px !important;
      }
      .search_bar {
        font-size: 12px !important;
      }
    }
  `}

  ${props => props.$variant === 'modal' && `
    width: 100%;
    .container-input {
      width: 100%;
    }
  `}

  .label {
    position: relative;
    display: block;
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 15px 8px 15px 10px;
    text-align: left;
    background: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;

    &:hover {
      border-color: rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.15);
    }
  }

  .search_bar {
    margin-top: -17px;
    height: 40px;
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    color: white;
    font-weight: 500;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .search_bar:focus {
    color: white;
    font-weight: 500;
  }
`;

export default InputResult;