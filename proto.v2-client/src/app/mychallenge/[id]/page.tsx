"use client";
import BaseProgressBar from "@/components/base/ProgressBar/BaseProgressBar";
import DetailedChallengePage from "@/components/common/DetailedChallengePage";
import colors from "@/styles/color";
import styled from "styled-components";
import Image from "next/image";
import SingleChallengeInfo from "@/components/common/explore/SingleChallengeInfo";

const MyChallengeID = () => {
  return (
    <Container>
      <DetailedChallengePage>
        <Wrapper>
          <Title>My Status</Title>
        </Wrapper>

        <ProgressBarWrapper>
          <BaseProgressBar rate={100} />
          <TargetSuccess>
            Target Success <TargetSuccessBold>100%</TargetSuccessBold>
          </TargetSuccess>
        </ProgressBarWrapper>

        <Wrapper>
          <Title>My Deposit</Title>
          <Detail $fontSize={18}>100 MATIC</Detail>
        </Wrapper>

        <Wrapper>
          <Title>Total Crypto</Title>
          <Detail $fontSize={24}>1500 $USDT</Detail>
        </Wrapper>

        <PoolWrapper style={{ marginTop: "20px" }}>
          <Image
            src="/asset/left_bottom_perpendicular.svg"
            width={8}
            height={8}
            alt="ㄴ"
            style={{ margin: "3px 7px 0 0" }}
          />
          <PoolName>Over 80% Pool</PoolName>
          <PoolDetail>1,000 $USDT</PoolDetail>
        </PoolWrapper>

        <PoolWrapper style={{ marginTop: "8px" }}>
          <Image
            src="/asset/left_bottom_perpendicular.svg"
            width={8}
            height={8}
            alt="ㄴ"
            style={{ margin: "3px 7px 0 0" }}
          />
          <PoolName>Under 80% Pool</PoolName>
          <PoolDetail>500 $USDT</PoolDetail>
        </PoolWrapper>

        <SingleChallengeInfo
          title="Schedule"
          content="Sep 11st - Oct 11st"
          detail="Everyday"
        />
        <SingleChallengeInfo
          title="How To"
          content="Take a picture"
          detail="Take a picture of your scale everyday to prove your weight.
          Remind to have your both feet shown!"
        />
        <SingleChallengeInfo
          title="Why this challenge?"
          content=""
          detail="Replacing one meal a day with salad is the first step to changing your eating habits healthier."
        />
      </DetailedChallengePage>
    </Container>
  );
};

export default MyChallengeID;

const Wrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 30px;
`;

const Title = styled.div`
  color: ${colors.black};
  font-size: 18px;
  font-weight: 600;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: auto;
`;

const TargetSuccess = styled.div`
  width: 100%;
  margin-top: 5px;

  color: ${colors.gray};
  text-align: right;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -0.3px;
`;

const TargetSuccessBold = styled.span`
  font-weight: 600;
`;

const Detail = styled.div<{ $fontSize: number }>`
  color: ${colors.primary};
  font-size: ${(props) => `${props.$fontSize}px`};
  font-weight: 600;
  letter-spacing: -0.36px;
`;

const PoolWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const PoolName = styled.div`
  color: ${colors.black};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.28px;
  flex-grow: 1;
`;

const PoolDetail = styled.div`
  color: ${colors.black};
  text-align: right;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
`;

const Container = styled.main`
  width: 100%;
  height: auto;
  background-color: ${colors.white};
`;
