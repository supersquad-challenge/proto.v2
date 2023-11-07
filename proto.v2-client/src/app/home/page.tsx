"use client";
import MyChallengeBlock from "@/components/common/MyChallengeBlock";
import ChallengeHeader from "@/components/common/home/ChallengeHeader";
import CompletedChallengeBlock from "@/components/common/home/CompletedChallengeBlock";
import ServiceTitle from "@/components/common/home/ServiceTitle";
import WelcomeMessage from "@/components/common/home/WelcomeMessage";
import colors from "@/styles/color";
import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      <ServiceTitle></ServiceTitle>
      <WelcomeMessage></WelcomeMessage>
      <ChallengeHeader $fontColor={colors.white}>
        Today Challenges
      </ChallengeHeader>
      <MyChallengeBlock></MyChallengeBlock>
      <CompletedChallengeBlock></CompletedChallengeBlock>
    </Container>
  );
};
export default Home;

const Container = styled.main`
  width: 100%;
  height: auto;
  background-color: ${colors.primary};

  padding: 0 22px; // 상하 패딩 0, 좌우 패딩 22px
  box-sizing: border-box;
`;
