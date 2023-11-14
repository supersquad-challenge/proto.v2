import styled from "styled-components";
type Props = {
  height: number;
};

const BottomMargin = ({ height }: Props) => {
  return <BottomMarginContainer $height={height}></BottomMarginContainer>;
};

export default BottomMargin;

const BottomMarginContainer = styled.div<{ $height: number }>`
  width: 100%;
  height: ${(props) => `${props.$height}px`};
`;
