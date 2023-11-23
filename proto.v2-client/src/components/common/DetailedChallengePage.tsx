import colors from "@/styles/color";
import styled from "styled-components";
import Image from "next/image";
import Tag from "./Tag";
import ParticipantsBanner from "./ParticipantsBanner";
import SingleChallengeInfo from "./explore/SingleChallengeInfo";
import { DURATION } from "@/lib/protoV2Constants";
import { useEffect, useState } from "react";

type Props = {
  thumbnailUrl: string;
  frequency: string;
  name: string;
  participants: number;
  children?: React.ReactNode;
};

const DetailedChallengePage = ({
  thumbnailUrl,
  frequency,
  name,
  participants,
  children,
}: Props) => {
  return (
    <>
      <ThumbnailContainer>
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl} //여기 챌린지 썸네일 사진이 들어가면 됨.
            alt="challenge thumbnail"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        )}
        <TagsContainer>
          <Tag
            backgroundColor={colors.primary}
            color={colors.highlight}
            title={frequency}
          />
          <Tag
            backgroundColor={colors.highlight}
            color={colors.primary}
            title={DURATION}
          />
        </TagsContainer>
      </ThumbnailContainer>
      <InfoContainer>
        <Name>{name}</Name>
        <ParticipantsBanner participants={participants} />
        {children}
      </InfoContainer>
    </>
  );
};
export default DetailedChallengePage;

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
