import { useImageContext } from "../../../../store/ImageContext";

import { ImageContainer, Image, Title, Container } from "./ImageDisplay.styles";

import { useNavigate } from "react-router";

export const ImageDisplay = () => {
  const { uploadedImages } = useImageContext();

  const imgList = uploadedImages.map((item, index) => {
    return (
      <Image src={item.preview} id={`image${index}`} key={`image${index}`} />
    );
  });

  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate("/");
  };

  return (
    <Container>
      <Title>Image Display</Title>
      <button onClick={handleRefresh}>Refresh</button>
      <ImageContainer>{imgList}</ImageContainer>
    </Container>
  );
};
