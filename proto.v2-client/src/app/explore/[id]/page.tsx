"use client";
import colors from "@/styles/color";
import styled from "styled-components";
import Image from "next/image";
import ParticipantsBanner from "@/components/common/ParticipantsBanner";

const ExploreChallenge = () => {
  return (
    <Container>
      <ThumbnailContainer>
        <Image
          src="/asset/badges/bronze_badge.svg" //여기 챌린지 썸네일 사진이 들어가면 됨.
          alt="challenge thumbnail"
          fill
          style={{
            objectFit: "cover",
          }}
          priority={true}
        />
      </ThumbnailContainer>
      <InfoContainer>
        <Name>Lose 4 lbs</Name>
        <ParticipantsBanner />
      </InfoContainer>
    </Container>
  );
};

export default ExploreChallenge;
const Container = styled.main`
  width: 100%;
  height: auto;
  background-color: ${colors.white};
  box-sizing: border-box;
`;

const ThumbnailContainer = styled.section`
  width: 100%;
  height: 200px;
  position: relative;
`;

const InfoContainer = styled.section`
  width: 100%;
  height: 200px;
  padding: 0 22px;
  box-sizing: border-box;
`;

const Name = styled.div`
  color: ${colors.black};
  font-size: 22px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 20px;
`;
