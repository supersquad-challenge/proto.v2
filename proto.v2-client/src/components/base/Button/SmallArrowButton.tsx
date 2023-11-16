import styled from "styled-components";
import BaseButton from "./BaseButton";
import colors from "@/styles/color";

type Props = {
  title: string;
  margin: string;
  backgroundColor: string;
  onClickHandler: () => void;
};

const SmallArrowButton = ({
  title,
  margin,
  backgroundColor,
  onClickHandler,
}: Props) => {
  return (
    <ButtonWrapper $margin={margin}>
      <BaseButton
        color={colors.white}
        fontSize={12}
        borderRadius={21}
        backgroundColor={backgroundColor}
        padding="0 11px 0 15px"
        title={title}
        onClickHandler={onClickHandler}
        fontWeight={500}
      >
        <MoreDetailImg src="/asset/right_arrow.svg" />
      </BaseButton>
    </ButtonWrapper>
  );
};

export default SmallArrowButton;

const ButtonWrapper = styled.div<{ $margin: string }>`
  width: fit-content;
  height: 30px;
  margin: ${(props) => props.$margin};
`;

const MoreDetailImg = styled.img`
  width: 14px;
  height: 14px;
  margin-left: 4px;
`;
