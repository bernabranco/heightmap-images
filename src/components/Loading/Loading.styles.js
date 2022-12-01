import styled, { keyframes } from "styled-components";

export const WrapperDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 10;
`;

const loader21 = keyframes`
	0%   { transform: rotate(0deg);   }
  50%  { transform: rotate(180deg); }
	100% { transform: rotate(360deg); }
`;

const loader22 = keyframes`
	0%   { transform: rotate(0deg); background: linear-gradient(red, blue);  }
	50% { transform: rotate(0); background: linear-gradient(darkorange, purple); }
  100% { transform: rotate(0); background: linear-gradient(purple, red); }
`;

export const StyledLoader = styled.div`
  height: 10rem;
  width: 10rem;
  -webkit-animation: ${loader21} 5s linear infinite;
  animation: ${loader21} 5s linear infinite;

  span {
    position: absolute;
    height: 100%;
    width: 100%;
    -webkit-animation: ${loader21} 3s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    animation: ${loader21} 3s cubic-bezier(0.77, 0, 0.175, 1) infinite;
  }

  span::before {
    content: "";
    position: absolute;
    margin: auto;
    height: 50%;
    width: 50%;
    background: linear-gradient(red, blue);
    border-radius: 50em;
    border: none;
    -webkit-animation: ${loader22} 3s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    animation: ${loader22} 3s cubic-bezier(0.77, 0, 0.175, 1) infinite;
  }
`;
