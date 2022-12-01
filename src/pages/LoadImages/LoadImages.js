import React, { useEffect, useState } from "react";
import { Container, Text } from "./LoadImages.styles";
import { useNavigate } from "react-router";
import ReactLoading from "react-loading";
import * as imageSetup from "../../components/Heightmap/components/Image/ImageSetup";

let imagesData;
export default function LoadImages() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // analyze image list data (rgb)
    setTimeout(()=>{
      imagesData = imageSetup.analyzeImages();
      console.log("images have loaded...");
      setLoading(false);
    },1000);
  }, [setLoading]);

  useEffect(()=>{
    if(!loading){
      navigate("/heightmap");
    }
  },[loading, navigate])

  return (
    <div>
      <Text>loading images...</Text>
      <Container>
      <ReactLoading 
        type={'bars'} 
        style={{width: '100px', height:'100px', fill:'white'}}  
      />
      </Container>
    </div>
  );
}

export { imagesData };
