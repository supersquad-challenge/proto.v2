import colors from "@/styles/color";
import React, { ReactElement } from "react";
import styled from "styled-components";

type Props = {
  progress: number;
  label?: string;
  width?: number;
  imageUrl: string;
  isCircularProgressBarPrimary: boolean;
};

export default function CircularProgressBar({
  progress,
  label = "Progress Bar",
  width = 100,
  imageUrl,
  isCircularProgressBarPrimary,
}: Props): ReactElement {
  const strokeWidth = 3;
  const radius = 100 / 2 - strokeWidth * 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={progress}
      height={width}
      role="progressbar"
      width={width}
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="circleView">
          <circle cx="50" cy="50" r={radius} />
        </clipPath>
      </defs>
      <image
        clipPath="url(#circleView)" // 클립 패스를 이미지에 적용합니다.
        href={imageUrl} // 이미지 URL을 href 속성으로 설정합니다.
        height="100"
        width="100"
        x="0"
        y="0"
      />
      <Circle cx="50" cy="50" r={radius} strokeWidth={strokeWidth} />
      <FilledCircle
        cx="50"
        cy="50"
        data-testid="progress-bar-bar"
        r={radius}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeWidth={strokeWidth}
        $isCircularProgressBarPrimary={isCircularProgressBarPrimary}
      />
    </svg>
  );
}

const Circle = styled.circle`
  //안 채워진 부분
  fill: transparent;
  stroke: #dddddd;
  stroke-linecap: round;
`;

const FilledCircle = styled(Circle)<{ $isCircularProgressBarPrimary: boolean }>`
  //채워진 부분
  stroke: ${(props) =>
    props.$isCircularProgressBarPrimary
      ? `${colors.primary}`
      : `${colors.gray}`};
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.5s ease-out;
`;
