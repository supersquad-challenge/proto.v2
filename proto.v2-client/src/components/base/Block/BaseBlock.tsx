import styled from "styled-components";
import { Block } from "@/types/Block";

const BaseBlock = ({
  backgroundColor,
  children,
  borderRadius,
  padding,
  border,
  onClickHandler,
}: Block) => {
  return (
    <BlockWrapper
      $backgroundColor={backgroundColor}
      $borderRadius={borderRadius}
      $padding={padding}
      $border={border}
      onClick={() => onClickHandler()}
    >
      {children}
    </BlockWrapper>
  );
};
export default BaseBlock;

const BlockWrapper = styled.div<{
  $backgroundColor: string;
  $borderRadius: number;
  $padding: string;
  $border: string | undefined;
}>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.$backgroundColor};
  border-radius: ${(props) => `${props.$borderRadius}px`};
  padding: ${(props) => props.$padding};
  border: ${(props) => props.$border};

  box-sizing: border-box;
`;
