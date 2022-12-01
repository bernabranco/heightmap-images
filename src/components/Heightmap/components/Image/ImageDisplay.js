import { Container, StyledImage } from "./Image.styles";
import * as traits from "../../../../utils/Traits";

export const ImageDisplay = () => {
  const LIST_SIZE = traits.image_list_size;

  let imgArray = [];
  for (let i = 0; i < LIST_SIZE; i++) {
    imgArray.push(1);
  }

  const imgList = imgArray.map((item, index) => {
    return (
      <StyledImage
        src={window.location.origin + `/images/${index}.jpg`}
        id={`image${index}`}
        key={`image${index}`}
      ></StyledImage>
    );
  });
  return <Container>{imgList}</Container>;
};
