import BaseButton from "@/components/base/Button/BaseButton";
import colors from "@/styles/color";
import styled from "styled-components";
type Props = {
  margin: string;
};

const CompletedButton = ({ margin }: Props) => {
  return (
    <ButtonWrapper $margin={margin}>
      <BaseButton
        color={colors.white}
        fontSize={10}
        fontWeight={600}
        borderRadius={21}
        backgroundColor={colors.gray}
        padding="4px 8px"
        title="Completed"
        onClickHandler={() => {}}
      />
    </ButtonWrapper>
  );
};

export default CompletedButton;

const ButtonWrapper = styled.div<{ $margin: string }>`
  width: fit-content;
  height: fit-content;
  margin: ${(props) => props.$margin};
`;
