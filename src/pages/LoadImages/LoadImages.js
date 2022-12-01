import React from "react";
import { Container, Text } from "./LoadImages.styles";
import { useNavigate } from "react-router";

export default function LoadImages() {
  const navigate = useNavigate();

  const navigateToHeightmap = () => {
    console.log("navigate to heightmap...");
    navigate("/heightmap");
  };

  return (
    <Container onClick={() => navigateToHeightmap()}>
      <Text>Press to load images</Text>
    </Container>
  );
}
