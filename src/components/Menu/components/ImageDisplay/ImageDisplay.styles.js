import styled from "styled-components";

export const Container = styled.div`
  background-color: black;
  position: relative;
  max-height: 300px;
  border-style: solid;
  border-color: rgba(100, 100, 100, 1);
  border-width: 2px;
  border-radius: 0.5rem;
  color: white;
  box-sizing: border-box;
  padding: 10px;
  margin: 10px;
  margin-bottom: 15px;
  z-index: 1;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  height: 200px;
`;

export const Title = styled.h1`
  font-size: 11px;
  border-bottom: 1px solid gray;
  box-sizing: border-box;
  padding-bottom: 5px;
  font-weight: bold;
  margin-bottom: 5px;
  margin-top: 0;
  color: white;
`;

export const Image = styled.img`
  position: relative;
  width: 75px;
  height: 75px;
  z-index: 10;
  opacity: 1;
  margin: 0.5rem;
  border-style: solid;
  border-width: 1px;
  z-index: 1;

  &:hover {
    border-style: solid;
    border-width: 1px;
    border-color: white;
  }
`;
