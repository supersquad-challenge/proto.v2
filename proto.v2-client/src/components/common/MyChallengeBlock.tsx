import colors from "@/styles/color";
import BaseBlock from "../base/Block/BaseBlock";
import styled from "styled-components";
import CircularProgressBar from "./CircularProgressBar";
import SmallArrowButton from "../base/Button/SmallArrowButton";

const MyChallengeBlock = () => {
  return (
    <BlockWrapper>
      <BaseBlock
        backgroundColor={colors.white}
        borderRadius={20}
        padding="22px 0 0 22px"
        onClickHandler={() => {}}
      >
        <div style={{ display: "flex" }}>
          <CircularProgressBar
            progress={70}
            width={100}
            imageUrl="/asset/Saly-15.svg"
          />
          <Wrapper>
            <Catergory>Mental Health</Catergory>
            <Name>15 minutes of meditation</Name>
            <Period>Sep 11st - Oct 11st</Period>
            <SmallArrowButton
              title="Verify Mission"
              margin="15px 0 0 0"
              backgroundColor={colors.primary}
              onClickHandler={() => []}
            />
          </Wrapper>
        </div>
      </BaseBlock>
    </BlockWrapper>
  );
};

export default MyChallengeBlock;

const BlockWrapper = styled.div`
  width: 100%;
  height: 177px;
`;

const Wrapper = styled.div`
  margin-left: 20px;
  width: auto;
  height: auto;
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
  max-width: 185px;
`;

const Period = styled.div`
  color: ${colors.black};
  font-size: 14px;
  font-weight: 500;

  margin-top: 5px;
`;
