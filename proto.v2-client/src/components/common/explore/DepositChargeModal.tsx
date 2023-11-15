import BaseModal from "@/components/base/Modal/BaseModal";
import BaseSlider from "@/components/base/Slider/BaseSlider";
import colors from "@/styles/color";
import { useState } from "react";
import styled from "styled-components";

const DepositChargeModal = () => {
  const [deposit, setDeposit] = useState<number>(10);
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0 || parseInt(e.target.value) < 0)
      setDeposit(0);
    else if (parseInt(e.target.value) > 300) setDeposit(300);
    else setDeposit(parseInt(e.target.value));
  };
  return (
    <BaseModal title="Win your goal" deletePath={undefined} show={true}>
      <SingleSimpleChallengeInfo
        title="Period"
        content="Sep 11st- Oct 11st"
        contentColor={colors.primary}
        marginTop="30px"
      />
      <SingleSimpleChallengeInfo
        title="Frequency"
        content="Everyday"
        contentColor={colors.black}
        marginTop="15px"
      />
      <SingleSimpleChallengeInfo
        title="Deposit"
        content=""
        contentColor={colors.black}
        marginTop="15px"
      />
      <SliderContainer>
        <BaseSlider
          deposit={deposit}
          handleDeposit={handleSliderChange}
          min={10}
          max={300}
        />
        <SliderNumbersWrapper>
          <SliderNumber>10</SliderNumber>
          <SliderNumber>300</SliderNumber>
        </SliderNumbersWrapper>
      </SliderContainer>
      <DepositContainer>
        <Deposit>{deposit}</Deposit>
        <Currency>$USD</Currency>
      </DepositContainer>
      <AverageDeposit>
        Members deposit <OrangeUnderline>150 $USD</OrangeUnderline> / 1 Week in
        average
      </AverageDeposit>
    </BaseModal>
  );
};

export default DepositChargeModal;

type SingleSimpleChallengeInfoT = {
  title: string;
  content: string;
  contentColor: string;
  marginTop: string;
};

const SingleSimpleChallengeInfo = ({
  title,
  content,
  contentColor,
  marginTop,
}: SingleSimpleChallengeInfoT) => {
  return (
    <Container $marginTop={marginTop}>
      <Title>{title}</Title>
      <Content $contentColor={contentColor}>{content}</Content>
    </Container>
  );
};

const Container = styled.div<{ $marginTop: string }>`
  width: 100%;
  height: auto;
  display: flex;

  margin-top: ${(props) => props.$marginTop};
`;

const Title = styled.div`
  color: ${colors.black};
  font-size: 18px;
  font-weight: 400;
  width: 112px;
`;

const Content = styled.div<{ $contentColor: string }>`
  color: ${(props) => props.$contentColor};
  font-size: 18px;
  font-weight: 600;
`;

const SliderContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 24px;
`;

const SliderNumbersWrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: space-between;
  margin-top: 5px;
`;

const SliderNumber = styled.div`
  color: ${colors.gray};
  font-size: 15px;
  font-weight: 400;
`;

const DepositContainer = styled.div`
  width: 100%;
  height: 60px;

  border-radius: 20px;
  border: 2px solid #ddd;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  margin-top: 20px;
`;

const Deposit = styled.div`
  width: 68%;
  height: 100%;
  border-right: 2px solid #ddd;
  box-sizing: border-box;

  padding-left: 29px;
  display: flex;
  align-items: center;

  color: ${colors.black};
  font-size: 16px;
  font-weight: 600;
`;

const Currency = styled.div`
  width: 32%;
  height: 100%;

  padding-left: 33px;
  display: flex;
  align-items: center;

  color: ${colors.black};
  font-size: 16px;
  font-weight: 400;
`;

const AverageDeposit = styled.div`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 24px;

  color: ${colors.gray};
  font-size: 12px;
  font-weight: 400;
`;

const OrangeUnderline = styled.span`
  color: #eb4826;
  font-weight: 500;
  text-decoration-line: underline;
`;
