import colors from "@/styles/color";
import styled from "styled-components";

type Props = {
  $fontColor: string;
};

const ChallengeHeader = styled.div<Props>`
  color: ${(props) => props.$fontColor};
  font-size: 18px;
  font-weight: 700;
`;

export default ChallengeHeader;
