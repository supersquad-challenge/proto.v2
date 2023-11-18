import React from "react";
import styled from "styled-components";
import { ButtonProp } from "@/types/Button";

type BaseButtonT = {
  color: string;
  fontSize: number;
  fontWeight: number;
  borderRadius: number;
  backgroundColor: string;
  padding: string;
  children?: React.ReactNode;
};

const BaseButton = ({
  title,
  onClickHandler,
  color,
  fontSize,
  fontWeight,
  borderRadius,
  backgroundColor,
  padding,
  children,
}: BaseButtonT & ButtonProp) => {
  return (
    <BaseButtonWrapper
      $color={color}
      $fontSize={fontSize}
      onClick={() => onClickHandler()}
      $borderRadius={borderRadius}
      $backgroundColor={backgroundColor}
      $padding={padding}
      $fontWeight={fontWeight}
    >
      {title}
      {children}
    </BaseButtonWrapper>
  );
};

export default BaseButton;

const BaseButtonWrapper = styled.button<{
  $color: string;
  $fontSize: number;
  $borderRadius: number;
  $backgroundColor: string;
  $padding: string;
  $fontWeight: number;
}>`
  width: 100%;
  min-width: 50px;
  height: 100%;
  font-weight: ${(props) => props.$fontWeight};
  min-height: 20px;
  font-size: ${(props) => `${props.$fontSize}px`};
  color: ${(props) => props.$color};
  text-align: center;
  border: none;
  transition: all ease 0.2s;
  border-radius: ${(props) => `${props.$borderRadius}px`};
  background-color: ${(props) => props.$backgroundColor};
  padding: ${(props) => props.$padding};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;
