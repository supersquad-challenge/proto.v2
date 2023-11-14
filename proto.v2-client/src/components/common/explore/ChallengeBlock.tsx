import BaseBlock from "@/components/base/Block/BaseBlock";
import colors from "@/styles/color";
import Image from "next/image";
import styled from "styled-components";

const ChallengeBlock = () => {
  return (
    <BlockWrapper>
      <BaseBlock
        backgroundColor={colors.white}
        borderRadius={10}
        padding="0px"
        border="1px solid #DDD"
        onClickHandler={() => {}}
      >
        <ThumbnailWrapper>
          <Image
            src="/asset/Saly-15.svg" //여기 챌린지 썸네일 사진이 들어가면 됨.
            alt="challenge thumbnail"
            fill
            style={{
              objectFit: "cover",
            }}
            priority={true}
          />
        </ThumbnailWrapper>
        <InfoWrapper>
          <Name>15 minutes of meditation</Name>
          <Period>Sep 11st - Oct 11st</Period>
          <ParticipantsWrapper>
            <Image
              src="/asset/ic_participant.svg"
              alt="participant"
              width={20}
              height={20}
            />
            <Participants>30</Participants>
          </ParticipantsWrapper>
        </InfoWrapper>
      </BaseBlock>
    </BlockWrapper>
  );
};

export default ChallengeBlock;

const BlockWrapper = styled.div`
  width: 96%;
  height: 222px;
  margin-bottom: 15px;

  &:nth-child(odd) {
    /* 첫 번째 열 (홀수 번째 아이템) */
    justify-self: start;
  }

  &:nth-child(even) {
    /* 두 번째 열 (짝수 번째 아이템) */
    justify-self: end;
  }
`;

const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 10px 10px 0px 0px;
  position: relative;
`;

const InfoWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 14px 0 0 15px;
  box-sizing: border-box;
`;

const Name = styled.div`
  max-width: 110px;
  color: ${colors.black};
  font-size: 16px;
  font-weight: 600;
  line-height: 130%;
  letter-spacing: -0.32px;
`;

const Period = styled.div`
  width: auto;
  margin-top: 5px;

  color: ${colors.gray};
  font-size: 14px;
  font-weight: 400;
`;

const ParticipantsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const Participants = styled.div`
  color: ${colors.black};
  font-size: 14px;
  font-weight: 600;
  margin-left: 5px;
`;
