"use client";
import FeaturedChallengeBlock from "@/components/common/home/FeaturedChallengeBlock";
import WelcomeMessage from "@/components/common/home/WelcomeMessage";
import colors from "@/styles/color";
import styled from "styled-components";
import LoginBlock from "@/components/common/home/LoginBlock";
import Image from "next/image";
import ExtendedChallengeHeader from "@/components/common/home/ExtendedChallengeHeader";

const Home = () => {
  return (
    <Container>
      <BackgroundImage
        src="/asset/Saly-36.png"
        width={271}
        height={340}
        alt="background image"
        priority={true}
      />
      <WelcomeMessage />
      <Home_BeforeLogin />
    </Container>
  );
};
export default Home;

const Home_BeforeLogin = () => {
  return (
    <>
      <LoginBlock />
      <ExtendedChallengeHeader
        challengeHeader="Featured Challenge"
        margin="40px 0 0 0"
      />
      <FeaturedChallengeBlock margin="22px 0 0 0" />
    </>
  );
};

const Container = styled.main`
  width: 100%;
  height: auto;
  background-color: ${colors.primary};

  padding: 0 22px 30px 22px;
  box-sizing: border-box;
  overflow: auto;
  position: relative;
`;

const BackgroundImage = styled(Image)`
  position: absolute;
  top: 35px;
  right: 0px;
`;
