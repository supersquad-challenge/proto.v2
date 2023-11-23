"use client";
//test page

import LongBlueButton from "@/components/base/Button/LongBlueButton";
import MyChallengeBlock from "@/components/common/MyChallengeBlock";
import BadgePointPannel from "@/components/common/home/BadgePointPannel";
import ChallengeHeader from "@/components/common/home/ChallengeHeader";
import CompletedChallengeBlock from "@/components/common/home/CompletedChallengeBlock";
import FeaturedChallengeBlock from "@/components/common/home/FeaturedChallengeBlock";
import WelcomeMessage from "@/components/common/home/WelcomeMessage";
import colors from "@/styles/color";
import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      {/* <WelcomeMessage></WelcomeMessage> */}
      <BadgePointPannel />
      <ChallengeHeader $fontColor={colors.white}>
        Today Challenges
      </ChallengeHeader>
      {/* <MyChallengeBlock />
      <CompletedChallengeBlock></CompletedChallengeBlock> */}
      <div style={{ width: "100%", backgroundColor: "white" }}>
        <LongBlueButton
          margin="10 0 0 0"
          title="Explore Challenge"
          onClickHandler={() => {}}
        />
      </div>
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
