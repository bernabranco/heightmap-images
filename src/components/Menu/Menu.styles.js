// Menu.styles.js
import styled from "styled-components";

import { Button } from "../../styles/common.styles";

export const MenuContainer = styled.div`
  max-width: 400px;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
  color: white;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OptionButton = styled(Button)``;

export const SubOptionsContainer = styled.div`
  margin-left: 70px;
`;
