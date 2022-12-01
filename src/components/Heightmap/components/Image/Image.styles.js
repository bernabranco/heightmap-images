import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  max-width: 30rem;
  max-height: 4rem;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`;

export const StyledImage = styled.img`
  position: relative;
  width: 3rem;
  height: 3rem;
  z-index: 10;
  opacity: 1;
  margin:0.5rem;

  &:hover {
    border-style: solid;
    border-width: 1px;
    border-color: white;
  }
`;
