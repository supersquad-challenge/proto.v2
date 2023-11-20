import React from "react";
import styled from "styled-components";
import { InputProp } from "@/types/Input";
import colors from "@/styles/color";

type BaseInputT = {
  color: string;
  fontSize: number;
  $padding: string;
  $border?: string;
  $borderRadius?: number;
};

const BaseInput = ({
  placeholder,
  updateInput,
  submitInput,
  currentValue,
  color,
  fontSize,
  $padding: padding,
  $border: border,
  $borderRadius: borderRadius,
}: InputProp & BaseInputT) => {
  return (
    <BaseInputElement
      type="text"
      maxLength={40}
      placeholder={placeholder}
      onChange={(event) => updateInput(event)}
      onKeyUp={(event) => submitInput(event)}
      value={currentValue}
      color={color}
      fontSize={fontSize}
      $padding={padding}
      $border={border}
      $borderRadius={borderRadius}
    />
  );
};

export default BaseInput;

const BaseInputElement = styled.input<BaseInputT>`
  width: 100%;
  min-width: 70px;
  height: 100%;
  min-height: 30px;
  text-align: left;

  font-size: ${(props) => `${props.fontSize}px`};
  color: ${(props) => props.color};
  padding: ${(props) => props.$padding};

  border: ${(props) => props.$border};
  border-radius: ${(props) => `${props.$borderRadius}px`};

  display: flex;
  align-items: center;

  box-sizing: border-box;

  &::placeholder {
    color: ${colors.gray};
  }
  &:focus {
    border-color: ${colors.primary}; // 포커스 될 때 테두리 색상 변경
  }
`;
