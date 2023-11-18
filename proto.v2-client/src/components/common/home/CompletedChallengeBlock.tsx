import BaseBlock from "@/components/base/Block/BaseBlock";
import colors from "@/styles/color";
import styled from "styled-components";
import CompletedButton from "./CompletedButton";

const CompletedChallengeBlock = () => {
  return (
    <BlockWrapper>
      <BaseBlock
        backgroundColor={colors.lightGray}
        borderRadius={20}
        padding="22px"
        // padding="22px 22px 0 22px"
        onClickHandler={() => {}}
      >
        <Catergory>Digital Detox</Catergory>
        <div
          style={{
            display: "flex",
            marginTop: "3px",
            justifyContent: "space-between",
          }}
        >
          <Name>15 minutes of meditation</Name>
          <CompletedButton margin="3px 0 0 0" onClickHandler={() => {}} />
        </div>
      </BaseBlock>
    </BlockWrapper>
  );
};

export default CompletedChallengeBlock;

const BlockWrapper = styled.div`
  width: 100%;

  ///////////
  margin-top: 10px;
`;

const Catergory = styled.div`
  color: ${colors.gray};
  font-size: 12px;
  font-weight: 500;
`;

const Name = styled.div`
  color: ${colors.black};
  font-size: 18px;
  font-weight: 600;
  max-width: 230px;
`;
