import { useImageContext } from "../../../../store/ImageContext";
import { ImageContainer, Image, Title, Container } from "./ImageDisplay.styles";

export const ImageDisplay = () => {
  const { uploadedImages } = useImageContext();

  const imgList = uploadedImages.map((item, index) => {
    return (
      <Image src={item.preview} id={`image${index}`} key={`image${index}`} />
    );
  });

  return (
    <Container>
      <Title>Image Display</Title>
      <ImageContainer>{imgList}</ImageContainer>
    </Container>
  );
};
