import styled from "styled-components";
import SmallArrowButton from "../../base/Button/SmallArrowButton";
import BaseBlock from "@/components/base/Block/BaseBlock";
import colors from "@/styles/color";
import Image from "next/image";
import { useQuery } from "react-query";
import { SingleChallengeByChallengeIdT } from "@/types/api/Challenge";
import { getSingleChallenge } from "@/lib/api/querys/challenge/getSingleChallenge";
import {
  addDaysToDate,
  convertIsoDateToReadable,
} from "@/utils/dateFormatUtils";
import { DURATION_DAYS } from "@/lib/protoV2Constants";
import { useRouter } from "next/navigation";

type Props = {
  margin: string;
  challengeId: string;
};

const FeaturedChallengeBlock = ({ margin, challengeId }: Props) => {
  // variables //
  const today = new Date();
  const router = useRouter();

  // API //
  const {
    data: challenge,
    error,
    isLoading,
  } = useQuery<SingleChallengeByChallengeIdT>({
    queryKey: [`singleChallenge-${challengeId}`],
    queryFn: async () => {
      const res = await getSingleChallenge({ challengeId: challengeId });
      const challenge = res.challengeInfo;
      return challenge;
    },
    staleTime: 5000,
    cacheTime: 60 * 60 * 1000,
  });

  return (
    <BlockWrapper
      $margin={margin}
      onClick={() => router.push(`/explore/${challengeId}`)}
    >
      <BaseBlock
        backgroundColor={colors.highlight}
        borderRadius={20}
        padding="22px"
        onClickHandler={() => {}}
      >
        <Wrapper>
          <Catergory>{challenge?.category!}</Catergory>
          <Name>{challenge?.name}</Name>
          <Period>
            {convertIsoDateToReadable(today.toString())} -{" "}
            {convertIsoDateToReadable(
              addDaysToDate(today, DURATION_DAYS).toString()
            )}
          </Period>
          <SmallArrowButton
            title="Read more"
            margin="24px 0 0 0"
            backgroundColor={colors.primary}
            onClickHandler={() => {
              router.push(`/explore/${challengeId}`);
            }}
          />
        </Wrapper>
      </BaseBlock>
      <ThumbnailWrapper>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            // backgroundColor: `${colors.white}`,
          }}
        >
          <Image
            src={
              challenge?.thumbnailUrl
                ? challenge?.thumbnailUrl
                : "/asset/blur.png"
            } //여기 챌린지 썸네일 사진이 들어가면 됨.
            alt="challenge thumbnail"
            fill
            style={{
              objectFit: "cover",
            }}
            sizes="175px"
            placeholder="blur"
            blurDataURL="/asset/blur.png"
          />
        </div>
      </ThumbnailWrapper>
    </BlockWrapper>
  );
};

export default FeaturedChallengeBlock;

const BlockWrapper = styled.div<{ $margin: string }>`
  width: 100%;
  height: 198px;
  position: relative;
  cursor: pointer;

  margin: ${(props) => props.$margin};
`;

const Wrapper = styled.div`
  width: auto;
  height: auto;
  margin-top: 8px;
`;

const Catergory = styled.div`
  color: ${colors.gray};
  font-size: 12px;
  font-weight: 500;
`;

const Name = styled.div`
  color: ${colors.black};
  font-size: 18px;
  font-weight: 600;
  max-width: 139px;
  margin-top: 5px;
`;

const Period = styled.div`
  color: ${colors.black};
  font-size: 14px;
  font-weight: 500;

  margin-top: 5px;
`;

const ThumbnailWrapper = styled.div`
  //여기에 이미지 들어감
  width: 50%;
  height: 100%;
  border-radius: 0 20px 20px 0;
  overflow: hidden;
  position: absolute;
  right: 0px;
  top: 0px;
`;
