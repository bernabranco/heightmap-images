import React, { useState } from "react";
import {
  Button,
  LoadingContainer,
  Text,
  TextContainer,
} from "./StartScreen.Styles";
import { useNavigate } from "react-router";
import ReactLoading from "react-loading";
import * as imageSetup from "../../components/Image/ImageSetup";

let imagesData;
export default function LoadImages() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const loadImages = () => {
    setIsLoading(true);
    setTimeout(() => {
      imagesData = imageSetup.analyzeImages();
      console.log("images have loaded...");
      setIsLoading(false);
      navigate("/dashboard");
    }, 5000);
  };

  const loadingStyle = {
    width: 200,
    height: 200,
    color: "white",
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 500,
    fill: "white",
  };

  return (
    <TextContainer>
      <Text>Welcome to After Image !</Text>
      <Text>Use this programm to visually alter images of your choosing</Text>
      <Text>and apply visual effects to them.</Text>

      <LoadingContainer>
        {isLoading && <ReactLoading type={"balls"} style={loadingStyle} />}

        {!isLoading && (
          <Button
            onClick={() => {
              loadImages();
            }}
          >
            START
          </Button>
        )}
      </LoadingContainer>
    </TextContainer>
  );
}

export { imagesData };
