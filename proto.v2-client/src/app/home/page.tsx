"use client";
import LongBlueButton from "@/components/base/Button/LongBlueButton";
import BaseModal from "@/components/base/Modal/BaseModal";
import PaymentSelectModal from "@/components/common/explore/PaymentSelectModal";
import MyChallengeBlock from "@/components/common/MyChallengeBlock";
import BadgePointPannel from "@/components/common/home/BadgePointPannel";
import ChallengeHeader from "@/components/common/home/ChallengeHeader";
import CompletedChallengeBlock from "@/components/common/home/CompletedChallengeBlock";
import FeaturedChallengeBlock from "@/components/common/home/FeaturedChallengeBlock";
import WelcomeMessage from "@/components/common/home/WelcomeMessage";
import colors from "@/styles/color";
import styled from "styled-components";
import DepositChargeModal from "@/components/common/explore/DepositChargeModal";
import LoginBlock from "@/components/common/home/LoginBlock";
import Image from "next/image";
import BottomMargin from "@/components/common/BottomMargin";
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
      <BottomMargin height={30} />
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

  padding: 0 22px;
  box-sizing: border-box;
  overflow: auto;
  position: relative;
`;

const BackgroundImage = styled(Image)`
  position: absolute;
  top: 35px;
  right: 0px;
`;
