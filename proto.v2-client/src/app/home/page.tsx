"use client";
<<<<<<< HEAD
=======
import LongBlueButton from "@/components/base/Button/LongBlueButton";
import BaseModal from "@/components/base/Modal/BaseModal";
import PaymentSelectModal from "@/components/common/explore/PaymentSelectModal";
import MyChallengeBlock from "@/components/common/MyChallengeBlock";
import BadgePointPannel from "@/components/common/home/BadgePointPannel";
import ChallengeHeader from "@/components/common/home/ChallengeHeader";
import CompletedChallengeBlock from "@/components/common/home/CompletedChallengeBlock";
>>>>>>> 09511c3 (Add: Header)
import FeaturedChallengeBlock from "@/components/common/home/FeaturedChallengeBlock";
import WelcomeMessage from "@/components/common/home/WelcomeMessage";
import colors from "@/styles/color";
import styled from "styled-components";
<<<<<<< HEAD
import LoginBlock from "@/components/common/home/LoginBlock";
import Image from "next/image";
import ExtendedChallengeHeader from "@/components/common/home/ExtendedChallengeHeader";
=======
import DepositChargeModal from "@/components/common/explore/DepositChargeModal";
>>>>>>> 00eae61 (Add: modals)

const Home = () => {
  return (
    <Container>
<<<<<<< HEAD
<<<<<<< HEAD
      <BackgroundImage
        src="/asset/Saly-36.png"
        width={271}
        height={340}
        alt="background image"
        priority={true}
      />
      <WelcomeMessage />
      <Home_BeforeLogin />
=======
=======
      {/* <PaymentSelectModal /> */}
      <DepositChargeModal />
>>>>>>> 00eae61 (Add: modals)
      <WelcomeMessage></WelcomeMessage>
      <BadgePointPannel />
      <ChallengeHeader $fontColor={colors.white}>
        Today Challenges
      </ChallengeHeader>
      <MyChallengeBlock></MyChallengeBlock>
      <CompletedChallengeBlock></CompletedChallengeBlock>
      <FeaturedChallengeBlock></FeaturedChallengeBlock>
      <div style={{ width: "100%", backgroundColor: "white" }}>
        <LongBlueButton
          margin="10 0 0 0"
          title="Explore Challenge"
          onClickHandler={() => {}}
        />
      </div>
>>>>>>> 09511c3 (Add: Header)
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

<<<<<<< HEAD
  padding: 0 22px 30px 22px;
=======
  padding: 0 22px;
>>>>>>> 09511c3 (Add: Header)
  box-sizing: border-box;
  overflow: auto;
  position: relative;
`;

const BackgroundImage = styled(Image)`
  position: absolute;
  top: 35px;
  right: 0px;
`;
