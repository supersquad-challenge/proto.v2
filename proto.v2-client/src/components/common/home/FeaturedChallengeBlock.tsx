import styled from "styled-components";
import SmallArrowButton from "../../base/Button/SmallArrowButton";
import BaseBlock from "@/components/base/Block/BaseBlock";
import colors from "@/styles/color";

type Props = {
  margin: string;
};

const FeaturedChallengeBlock = ({ margin }: Props) => {
  return (
    <BlockWrapper $margin={margin}>
      <BaseBlock
        backgroundColor={colors.highlight}
        borderRadius={20}
        padding="22px"
        onClickHandler={() => {}}
      >
        <Wrapper>
          <Catergory>Digital Detox</Catergory>
          <Name>15 minutes of meditation</Name>
          <Period>Sep 11st - Oct 11st</Period>
          <SmallArrowButton
            title="Read more"
            margin="24px 0 0 0"
            backgroundColor={colors.primary}
            onClickHandler={() => []}
          />
        </Wrapper>
      </BaseBlock>
      <ThumbnailWrapper></ThumbnailWrapper>
    </BlockWrapper>
  );
};

export default FeaturedChallengeBlock;

const BlockWrapper = styled.div<{ $margin: string }>`
  width: 100%;
  height: 198px;
  position: relative;

  margin: ${(props) => props.$margin};
`;

const Wrapper = styled.div`
  width: auto;
  height: auto;
  margin-top: 8px;
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
  max-width: 139px;
  margin-top: 5px;
`;

const Period = styled.div`
  color: ${colors.black};
  font-size: 14px;
  font-weight: 500;

  margin-top: 5px;
`;

const ThumbnailWrapper = styled.div`
  //여기에 이미지 들어감
  width: 50%;
  height: 100%;
  border-radius: 0 20px 20px 0;
  overflow: hidden;

  border: 1px solid black;
  position: absolute;
  right: 0px;
  top: 0px;
`;
