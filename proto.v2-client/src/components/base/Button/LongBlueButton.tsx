import styled from "styled-components";
import BaseButton from "./BaseButton";
import colors from "@/styles/color";

type Props = {
  margin: string;
  title: string;
  onClickHandler: () => void;
  children?: React.ReactNode;
};

const LongBlueButton = ({ margin, title, onClickHandler, children }: Props) => {
  return (
    <ButtonWrapper $margin={margin}>
      <BaseButton
        color={colors.white}
        fontSize={16}
        fontWeight={600}
        borderRadius={25}
        backgroundColor={colors.primary}
        padding="0"
        title={title}
        onClickHandler={onClickHandler}
      />
      {children}
    </ButtonWrapper>
  );
};

export default LongBlueButton;

const ButtonWrapper = styled.div<{ $margin: string }>`
  width: 281px;
  height: 50px;
  margin: ${(props) => props.$margin};
`;
