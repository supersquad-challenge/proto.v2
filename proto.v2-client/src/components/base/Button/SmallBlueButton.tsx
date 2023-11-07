import styled from "styled-components";
import BaseButton from "./BaseButton";
import colors from "@/styles/color";

const SmallBlueButton = ({
  title,
  margin,
}: {
  title: string;
  margin: string;
}) => {
  return (
    <ButtonWrapper $margin={margin}>
      <BaseButton
        color={colors.white}
        fontSize={12}
        borderRadius={21}
        backgroundColor={colors.primary}
        padding="0 11px 0 15px"
        title={title}
        onClickHandler={() => {}}
        fontWeight={500}
      >
        <MoreDetailImg src="/asset/right>.svg" />
      </BaseButton>
    </ButtonWrapper>
  );
};

export default SmallBlueButton;

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
