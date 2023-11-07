import React from "react";
import styled from "styled-components";
import { ButtonProp } from "@/types/Button";

type BasicButtonT = {
  color: string;
  fontSize: number;
  borderRadius: number;
  backgroundColor: string;
  padding: string;
  fontWeight: number;
  children?: React.ReactNode;
};

const BasicButton = ({
  title,
  onClickHandler,
  color,
  fontSize,
  borderRadius,
  backgroundColor,
  padding,
  fontWeight,
  children,
}: BasicButtonT & ButtonProp) => {
  return (
    <BasicButtonWrapper
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
    </BasicButtonWrapper>
  );
};

export default BasicButton;

const BasicButtonWrapper = styled.button<{
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

  &:hover {
    cursor: pointer;
  }
`;
