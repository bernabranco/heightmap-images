import styled from "styled-components";

export const AudioContainer = styled.div`
  background-color: black;
  position: relative;
  margin: 10px;
  border: 2px solid rgba(100, 100, 100, 1);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1;
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

export const Info = styled.p`
  font-size: 11px;
  font-weight: regular;
  margin-bottom: 5px;
  margin-top: 0;
  color: white;
`;
