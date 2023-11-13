import colors from "@/styles/color";
import { useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  deposit: number;
  handleDeposit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  min: number;
  max: number;
};

const BaseSlider = ({ deposit, handleDeposit, min, max }: Props) => {
  const [sliderValue, setSliderValue] = useState(deposit);
  useEffect(() => {
    setSliderValue(deposit);
  }, [deposit]);

  const percentage = ((sliderValue - min) / (max - min)) * 100;

  return (
    <Slider
      type="range"
      min={min.toString()}
      max={max.toString()}
      value={deposit}
      onChange={(event) => {
        setSliderValue(parseInt(event.target.value));
        handleDeposit(event);
      }}
      style={{
        background: `linear-gradient(to right, ${colors.primary} 0%, ${colors.primary} ${percentage}%, #ddd ${percentage}%, #ddd 100%)`,
      }}
    />
  );
};

const Slider = styled.input`
  -webkit-appearance: none; /* WebKit 브라우저에서 기본 스타일 제거 */
  width: 100%; /* 슬라이더의 너비 */
  height: 15px; /* 슬라이더 트랙의 높이 */
  background: #dddddd; /* 슬라이더 트랙의 색상 */
  outline: none; /* 포커스 시 외곽선 제거 */
  -webkit-transition: 0.2s; /* 트랜지션 효과 */
  transition: opacity 0.2s;
  border-radius: 10px;

  /* 슬라이더 썸 스타일링 */
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* WebKit 브라우저에서 기본 스타일 제거 */
    appearance: none;
    width: 25px; /* 썸의 너비 */
    height: 25px; /* 썸의 높이 */
    border-radius: 25px;
    border: 3px solid ${colors.white};
    box-sizing: border-box;
    background: ${colors.primary};
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.4);
    cursor: pointer; /* 마우스 커서 변경 */
  }

  &::-moz-range-thumb {
    width: 25px; /* 썸의 너비 */
    height: 25px; /* 썸의 높이 */
    border-radius: 25px;
    border: 3px solid ${colors.white};
    box-sizing: border-box;
    background: ${colors.primary};
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.4);
    cursor: pointer; /* 마우스 커서 변경 */
  }
`;

const Number = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin: auto 5px;
`;

export default BaseSlider;

//   /* WebKit: 선택한 부분의 트랙 색상 */
//   &::-webkit-slider-runnable-track {
//     background: linear-gradient(
//       to right,
//       #8a01d7 0%,
//       #8a01d7 50%,
//       #ddd 50%,
//       #ddd 100%
//     );
//   }

//   /* Firefox: 선택한 부분의 트랙 색상 */
//   &::-moz-range-track {
//     background: linear-gradient(
//       to right,
//       #8a01d7 0%,
//       #8a01d7 50%,
//       #ddd 50%,
//       #ddd 100%
//     );
//   }
