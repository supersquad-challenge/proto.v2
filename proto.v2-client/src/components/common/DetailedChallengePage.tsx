import colors from "@/styles/color";
import styled from "styled-components";
import Image from "next/image";
import Tag from "./Tag";
import ParticipantsBanner from "./ParticipantsBanner";
import SingleChallengeInfo from "./explore/SingleChallengeInfo";

type Props = {
  children?: React.ReactNode;
};

const DetailedChallengePage = ({ children }: Props) => {
  return (
    <Container>
      <ThumbnailContainer>
        <Image
          src="/asset/Saly-15.svg" //여기 챌린지 썸네일 사진이 들어가면 됨.
          alt="challenge thumbnail"
          fill
          style={{
            objectFit: "cover",
          }}
          priority={true}
        />
        <TagsContainer>
          <Tag
            backgroundColor={colors.primary}
            color={colors.highlight}
            title="Everyday"
          />
          <Tag
            backgroundColor={colors.highlight}
            color={colors.primary}
            title="1 month"
          />
        </TagsContainer>
      </ThumbnailContainer>
      <InfoContainer>
        <Name>Lose 4 lbs</Name>
        <ParticipantsBanner />
        {children}
      </InfoContainer>
    </Container>
  );
};
export default DetailedChallengePage;

const Container = styled.main`
  width: 100%;
  height: auto;
  background-color: ${colors.white};
`;

const ThumbnailContainer = styled.section`
  width: 100%;
  height: 200px;
  position: relative;
`;

const TagsContainer = styled.div`
  position: absolute;
  display: flex;
  right: 22px;
  bottom: 20px;

  z-index: 2;
`;

const InfoContainer = styled.section`
  width: 100%;
  height: auto;
  padding: 0 22px 15px 22px;
  box-sizing: border-box;
  overflow: auto;
`;

const Name = styled.div`
  color: ${colors.black};
  font-size: 22px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 20px;
`;
