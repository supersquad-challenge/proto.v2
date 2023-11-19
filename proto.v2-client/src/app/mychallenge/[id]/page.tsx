"use client";
import BaseProgressBar from "@/components/base/ProgressBar/BaseProgressBar";
import DetailedChallengePage from "@/components/common/DetailedChallengePage";
import colors from "@/styles/color";
import styled from "styled-components";
import Image from "next/image";
import SingleChallengeInfo from "@/components/common/explore/SingleChallengeInfo";
import { useQuery } from "react-query";
import { useParams, useRouter } from "next/navigation";
import { SingleChallengeByUserChallengeId } from "@/types/api/Challenge";
import { getSingleChallengeByUserChallengeId } from "@/lib/api/querys/myChallenge/getSingleChallengeByUserChallengeId";
import thousandFormat from "@/utils/thousandFormat";
import { convertIsoDateToReadable } from "@/utils/dateFormatUtils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_FOOTER_BLUEBUTTON } from "@/redux/slice/footerSlice";
import {
  CLOSE_MODAL,
  IModalState,
  OPEN_MODAL,
  getModalState,
} from "@/redux/slice/modalSlice";
import SnapYourScaleModal from "@/components/common/mychallenge/SnapYourScaleModal";
import { congrats_statusSrc } from "@/lib/components/fullPageModal";
import FullPageModal from "@/components/base/Modal/FullPageModal";

const MyChallengeID = () => {
  // variables //
  const { id } = useParams<{ id: string }>();
  const userChallengeId: string = id as string;
  let currency;
  const modal: IModalState = useSelector(getModalState);
  const dispatch = useDispatch();

  // useEffect //
  useEffect(() => {
    dispatch(
      SET_FOOTER_BLUEBUTTON({
        blueButtonTitle: "Verify Mission",
        handleBlueButtonClick: () => {
          dispatch(OPEN_MODAL({ modal: "snapYourScale" }));
        },
      })
    );
  }, [id, modal.visibility]);

  // API //
  const {
    data: challenge,
    isLoading,
    error,
  } = useQuery<SingleChallengeByUserChallengeId>({
    queryKey: [`myStatus-${userChallengeId}`],
    queryFn: async () => {
      const res = await getSingleChallengeByUserChallengeId({
        userChallengeId: userChallengeId,
      });
      const challenge = res.myStatus;
      if (challenge.depositMethod == "crypto") {
        currency = "MATIC";
      } else if (challenge.depositMethod == "cash") {
        currency = "$USD";
      }
      return challenge;
    },
    staleTime: 5000,
    cacheTime: 60 * 60 * 1000,
  });

  return (
    <>
      {modal.activeModal == "congrats_status" && modal.visibility == true && (
        <FullPageModal
          {...congrats_statusSrc}
          onClickHandler={() => dispatch(CLOSE_MODAL())}
        />
      )}
      {modal.activeModal == "snapYourScale" && modal.visibility == true && (
        <SnapYourScaleModal userChallengeId={userChallengeId} />
      )}
      {modal.activeModal == undefined && (
        <Container>
          <DetailedChallengePage
            thumbnailUrl={challenge?.thumbnailUrl!}
            frequency={"Everyday"} //수정 필요
            name={challenge?.name!}
            participants={30}
          >
            <Wrapper>
              <Title>My Status</Title>
            </Wrapper>

            <ProgressBarWrapper>
              <BaseProgressBar rate={challenge?.successRate!} />
              <TargetSuccess>
                Target Success <TargetSuccessBold>100%</TargetSuccessBold>
              </TargetSuccess>
            </ProgressBarWrapper>

            <Wrapper>
              <Title>My Deposit</Title>
              <Detail $fontSize={18}>
                {challenge?.deposit!} {currency}
              </Detail>
            </Wrapper>

            <Wrapper>
              <Title>Total Crypto</Title>
              <Detail $fontSize={24}>
                {thousandFormat(challenge?.totalDeposit! as number)} $USD
              </Detail>
            </Wrapper>

            <PoolWrapper style={{ marginTop: "20px" }}>
              <Image
                src="/asset/left_bottom_perpendicular.svg"
                width={8}
                height={8}
                alt="ㄴ"
                style={{ margin: "3px 7px 0 0" }}
              />
              <PoolName>Over 80% Pool</PoolName>
              <PoolDetail>
                {thousandFormat(challenge?.cryptoSuccessPool! as number)} $USD
              </PoolDetail>
            </PoolWrapper>

            <PoolWrapper style={{ marginTop: "8px" }}>
              <Image
                src="/asset/left_bottom_perpendicular.svg"
                width={8}
                height={8}
                alt="ㄴ"
                style={{ margin: "3px 7px 0 0" }}
              />
              <PoolName>Under 80% Pool</PoolName>
              <PoolDetail>
                {thousandFormat(challenge?.cryptoFailPool!)} $USD
              </PoolDetail>
            </PoolWrapper>

            <SingleChallengeInfo
              title="Period"
              content={`${convertIsoDateToReadable(
                challenge?.challengeStartAt!
              )} - ${convertIsoDateToReadable(challenge?.challengeEndAt!)}`}
              detail={"Everyday"} //수정 필요
            />
            <SingleChallengeInfo
              title="How To" //수정 필요
              content="Take a picture"
              detail="Take a picture of your scale everyday to prove your weight.
          Remind to have your both feet shown!"
            />
            <SingleChallengeInfo
              title="Why this challenge?" //수정 필요
              content=""
              detail="Replacing one meal a day with salad is the first step to changing your eating habits healthier."
            />
          </DetailedChallengePage>
        </Container>
      )}
    </>
  );
};

export default MyChallengeID;

const Wrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 30px;
`;

const Title = styled.div`
  color: ${colors.black};
  font-size: 18px;
  font-weight: 600;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: auto;
`;

const TargetSuccess = styled.div`
  width: 100%;
  margin-top: 5px;

  color: ${colors.gray};
  text-align: right;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -0.3px;
`;

const TargetSuccessBold = styled.span`
  font-weight: 600;
`;

const Detail = styled.div<{ $fontSize: number }>`
  color: ${colors.primary};
  font-size: ${(props) => `${props.$fontSize}px`};
  font-weight: 600;
  letter-spacing: -0.36px;
`;

const PoolWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const PoolName = styled.div`
  color: ${colors.black};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.28px;
  flex-grow: 1;
`;

const PoolDetail = styled.div`
  color: ${colors.black};
  text-align: right;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
`;

const Container = styled.main`
  width: 100%;
  height: auto;
  background-color: ${colors.white};
`;
