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

const StyledWrapper = styled.div<{ $variant: 'default' | 'modal' }>`
  ${props => props.$variant === 'default' && `
    .container-input {
      width: 400px;
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
    border-radius: 10px;
    border: 1px solid #5e5757;
    padding: 15px 8px 15px 10px;
    text-align: left;
    box-shadow: 0px 40px 100px rgb(194, 56, 199);
  }

  .search_bar {
    margin-top: -17px;
    height: 40px;
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    color: rgb(111, 115, 119);
    font-weight: 700;
  }

  .search_bar:focus {
    color: white;
    font-weight: 700;
  }
`;

export default InputResult;