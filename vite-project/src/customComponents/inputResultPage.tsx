import styled from 'styled-components';

export const InputResult = ({id, value, name, onChange}: any) => {
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
  }

  .label {
    position: relative;
    display: block;
    width: 100%;
    height: 40px;
    border-radius: 10px;
     border: 1px solid #5e5757;
    padding: 15px 8px 15px 10px;
    text-align: left;
    box-shadow:
      0px 40px 100px rgb(194, 56, 199)
    //   0px -20px 60px #19ad88;
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
          .input {
            font-size: 10px;
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
    color: rgb(111, 115, 119);
    font-weight: 700;
  }
  .search_bar:focus {
    color: white;
    font-weight: 700;
  }  
  `;

export default InputResult;