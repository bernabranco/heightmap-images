import styled from "styled-components";

export const Button = styled.button`
  position: relative;
  width: 180px;
  background-color: black;
  border: 2px solid rgba(100, 100, 100, 1);
  border-radius: 0.5rem;
  color: white;
  box-sizing: border-box;
  padding: 8px;
  margin: 0.5rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  font-size: 14px;
  font-weight: bold;
  z-index: 1;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #333;
    border-color: #333;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(100, 100, 100, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
