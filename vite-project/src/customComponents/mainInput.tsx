import styled from 'styled-components';

export const Input = ({id, value, name, onChange}: any) => {
  return (
    <StyledWrapper>
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

const StyledWrapper = styled.div`
  .input {
    max-width: 190px;
    min-width: 100px;
  }
  @media (max-width: 500px) {
    .container-input {
      width: 220px !important;
    }
  }
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
    box-shadow:
      0px 20px 60px rgb(194, 56, 199),
      0px -20px 60px #19ad88;

    &:hover {
      border-color: rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.15);
    }
  }
  .container-input {
    width: 400px;
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

export default Input;