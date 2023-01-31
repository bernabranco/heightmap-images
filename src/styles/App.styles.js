import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  position: relative;
  width: 10rem;
  background-color: black;
  border-style: solid;
  border-color: rgba(100, 100, 100, 1);
  border-width: 1px;
  border-radius: 0.5rem;
  color: white;
  box-sizing: border-box;
  padding: 1rem;
  margin: 0.5rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.7rem;
  font-weight: bold;
  z-index: 1;
`;

export const ImageContainer = styled.div`
  position: relative
  width: 20rem;
  max-width: 20rem;
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
  overflow-y: hidden;
`;

export const Image = styled.img`
  position: relative;
  width: 3rem;
  height: 3rem;
  z-index: 10;
  opacity: 1;
  margin: 0.5rem;
  border-style: solid;
  border-width: 1px;

  &:hover {
    border-style: solid;
    border-width: 1px;
    border-color: white;
  }
`;
