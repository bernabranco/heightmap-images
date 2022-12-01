import styled from "styled-components";

export const StyledContainer = styled.div`
  position: absolute;
  width: 15.313rem;
  right: 0;
  bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: black;
  z-index: 10;
`;

export const StyledButton = styled.button`
  position: relative;
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  background-color: black;
  color: white;
  border: none;
  border-bottom: 1px rgba(255, 255, 255, 0.5) solid;
`;
