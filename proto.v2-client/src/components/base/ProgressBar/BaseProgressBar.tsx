import colors from "@/styles/color";
import styled, { keyframes } from "styled-components";
import Image from "next/image";

type Props = {
  rate: number; // 진행률을 나타내는 비율 (0에서 100 사이)
};

const BaseProgressBar = ({ rate }: Props) => {
  return (
    <>
      <TooltipWrapper $rate={rate}>
        <ToolTipImage
          src="/asset/tooltip.svg"
          width={44}
          height={31}
          alt="tooltip"
        />
        <TooltipMessage>{rate}%</TooltipMessage>
      </TooltipWrapper>
      <ProgressBarWrapper>
        <Progress $rate={rate} />
      </ProgressBarWrapper>
    </>
  );
};

export default BaseProgressBar;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 15px;
  background-color: #dddddd;
  border-radius: 10px;
  overflow: hidden; // border-radius를 적용하기 위해 필요
`;

const Progress = styled.div<{ $rate: number }>`
  background-color: ${colors.primary};
  height: 100%;
  border-radius: 10px;
  width: ${(props) => `${props.$rate}%`};
  animation-name: appearRight;
  animation-duration: 0.5s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;

  @keyframes appearRight {
    0% {
      width: 0px;
    }
    100% {
      width: ${(props) => `${props.$rate}%`};
    }
  }
`;

const TooltipWrapper = styled.div<{ $rate: number }>`
  width: 44px;
  height: 31px;
  margin-bottom: 5px;
  position: relative;

  animation-name: appearRightT;
  animation-duration: 0.5s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;

  @keyframes appearRightT {
    0% {
      left: 0px;
    }
    100% {
      left: ${(props) => `calc(${props.$rate}% - 22px)`};
    }
  }
`;

const ToolTipImage = styled(Image)`
  position: absolute;
  top: 0px;
  left: 0px;
`;

const TooltipMessage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  /* padding: 2px 7px 4px 9px; */
  /* padding: 2px 9px 4px 6px; */

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${colors.primary};

  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.28px;
`;
