import { ImageContainer, Image } from "../../../../styles/App.styles";
import * as traits from "../../../../utils/Traits";

export const ImageDisplay = () => {
  const LIST_SIZE = traits.image_list_size;

  let imgArray = [];
  for (let i = 0; i < LIST_SIZE; i++) {
    imgArray.push(1);
  }

  const imgList = imgArray.map((item, index) => {
    return (
      <Image
        src={window.location.origin + `/images/${index}.jpg`}
        id={`image${index}`}
        key={`image${index}`}
      />
    );
  });
  return <ImageContainer>{imgList}</ImageContainer>;
};
