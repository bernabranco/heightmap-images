import styled from "styled-components";

export const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

export const Text = styled.div`
  color: white;
  font-size: 25px;
  margin-top: 15px;
`;

export const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
`;

export const Button = styled.button`
  width: 200px;
  height: 200px;
  color: white;
  background-color: black;
  border-color: white;
  border-width: 1px;
  border-style: solid;
  border-radius: 500px;
  font-size: 40px;
  font-weight: bold;
`;
