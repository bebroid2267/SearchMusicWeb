import React from 'react';
import styled from 'styled-components';

const MainButtons = () => {
  return (
    <StyledWrapper>
      <div id="navbody">
        <form action="#">
          <ul className="ul">
            <input defaultChecked name="rad" className="radio" id="choose1" type="radio" />
            <label htmlFor="choose1">
              <li className="li">
                <svg viewBox="0 0 20 20" fill="none" height={30} width={30} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="svg w-6 h-6 text-gray-800 dark:text-white">
                  <path d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" />
                </svg>
              </li>
            </label>
            <input className="radio" name="rad" id="choose2" type="radio" />
            <input className="radio" name="rad" id="choose3" type="radio" />
            <label htmlFor="choose3">
              <li className="li">
                <svg viewBox="0 0 20 20" fill="none" height={25} width={25} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="svg w-6 h-6 text-gray-800 dark:text-white">
                  <path d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" />
                </svg>
              </li>
            </label>
            <input className="radio" name="rad" id="choose4" type="radio" />
            <label htmlFor="choose4">
              <li className="li">
                <svg viewBox="0 0 20 20" fill="none" height={24} width={24} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="svg w-6 h-6 text-gray-800 dark:text-white">
                  <path d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="square" stroke="currentColor" />
                </svg>
              </li>
            </label>
          </ul>
        </form>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #navbody {
    width: 250px;
    height: 50px;
    background-color: rgba(61, 59, 59, 0.69);
    border-radius: 10px;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.041);
    align-items: center;
    justify-content: center;
    display: flex;
    margin-right: 15px;
  }

  .ul {
    list-style: none;
    width: 300px !important;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    margin-left: -40px !important;
  }

  .ul .li {
    display: inline-block;
  }

  .radio {
    display: none;
  }

  .svg {
    width: 60px;
    height: 60px;
    opacity: 80%;
    cursor: pointer;
    padding: 13px 20px;
    transition: 0.2s;
    color: rgb(255, 255, 255);
  }
    
  li:hover {
  background-color: rgb(0,0,0,0)
  }
  .ul .li .svg:hover {
    transition: 0.1s;
    color: rgb(219, 40, 235);
    position: relative;
    margin-top: -4px;
    opacity: 100%;
  }

  .radio:checked + label .li .svg {
    color: rgb(219, 40, 235);
    fill-rule: evenodd;
  }`;

export default MainButtons;
