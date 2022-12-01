import React from "react";
import { StyledLoader, WrapperDiv } from "./Loading.styles";

export default function Loading() {
  return (
    <WrapperDiv>
      <StyledLoader>
        <span>Loading data</span>
      </StyledLoader>
    </WrapperDiv>
  );
}
