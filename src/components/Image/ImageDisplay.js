import styled from "styled-components";
import { useImageContext } from "../../store/ImageContext";

import { preset } from "../../presets/choosePreset";
const traits = require(`../../presets/${preset}`);

export const ImageDisplay = () => {
  const { uploadedImages } = useImageContext();

  const ImageContainer = styled.div`
    position: relative
    width: 100%;
    height:200px;
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    border-style: solid;
    border-color: rgba(100, 100, 100, 1);
    border-width: 1px;
    border-radius: 0.5rem;
    color: white;
    box-sizing: border-box;
    padding: 8px;
    margin: 0.5rem;
    font-size: 14px;
    font-weight: bold;
    z-index:10;
`;

  const Image = styled.img`
    position: relative;
    width: 100px;
    height: 100px;
    z-index: 10;
    opacity: 1;
    margin: 0.5rem;
    border-style: solid;
    border-width: 1px;
    z-index: 11;

    &:hover {
      border-style: solid;
      border-width: 1px;
      border-color: white;
    }
  `;

  const imgList = uploadedImages.map((item, index) => {
    return (
      <Image src={item.preview} id={`image${index}`} key={`image${index}`} />
    );
  });

  return <ImageContainer>{imgList}</ImageContainer>;
};
