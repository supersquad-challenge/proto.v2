"use client";
import FeaturedChallengeBlock from "@/components/common/home/FeaturedChallengeBlock";
import WelcomeMessage from "@/components/common/home/WelcomeMessage";
import colors from "@/styles/color";
import styled from "styled-components";
import LoginBlock from "@/components/common/home/LoginBlock";
import Image from "next/image";
import ExtendedChallengeHeader from "@/components/common/home/ExtendedChallengeHeader";
import BadgePointPannel from "@/components/common/home/BadgePointPannel";
import ChallengeHeader from "@/components/common/home/ChallengeHeader";
import { useQuery } from "react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getAllChallengesByUserId } from "@/lib/api/querys/myChallenge/getAllChallengesByUserId";
import MyChallengeBlock from "@/components/common/MyChallengeBlock";
import CompletedChallengeBlock from "@/components/common/home/CompletedChallengeBlock";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  SET_USER_LOGIN,
  SET_USER_LOGOUT,
  getIsLoggedInState,
  getUserIDState,
} from "@/redux/slice/authSlice";
import { login } from "@/lib/api/axios/auth/login";
import { useSelector } from "react-redux";
import { AllChallengesByUserIdT } from "@/types/api/Challenge";
import NoOngoingChallengesBlock from "@/components/common/home/NoOngoingChallengesBlock";
import { getUserInfo } from "@/lib/api/querys/user/getUserInfo";
import { FEATURED_CHALLENGE_IDS } from "@/lib/protoV2Constants";
import { INITIALIZE_FOOTER_BLUEBUTTON } from "@/redux/slice/layoutSlice";
import { CLOSE_MODAL } from "@/redux/slice/modalSlice";

const Home = () => {
  // variables //
  const [auth, setAuth] = useState<boolean>(false);
  const dispatch = useDispatch();

  // Use Effect //
  useEffect(() => {
    dispatch(INITIALIZE_FOOTER_BLUEBUTTON());
    dispatch(CLOSE_MODAL());
  }, []);

  useEffect(() => {
    const _handlelogin = async () => {
      const loginRes = await login();
      if (loginRes?.status !== 200) {
        dispatch(SET_USER_LOGOUT());
        return;
      }

      setAuth(true);

      const userId = loginRes?.data.userInfoId;
      const userRes = await getUserInfo({ userId });

      dispatch(
        SET_USER_LOGIN({
          userID: loginRes?.data?.userInfoId,
          email: loginRes?.data?.email,

          nickname: userRes?.userInfo?.nickname,
          profile: userRes?.userInfo?.profileUrl,
        })
      );
    };
    _handlelogin();
  }, [dispatch]);

  if (!auth) {
    return <HomeBeforeLogin />;
  }

  return <HomeAfterLogin />;
};
export default Home;

const HomeBeforeLogin = () => {
  return (
    <>
      <Container $isLogin={false}>
        <BackgroundImage
          src="/asset/Saly-36.png"
          width={271}
          height={340}
          alt="background image"
          priority={true}
        />
        <TopContainer $isFixed={false}>
          <WelcomeMessage isLogin={false} isScrolled={false} />
          <LoginBlock />
          <ExtendedChallengeHeader
            challengeHeader="Featured Challenges"
            margin="40px 0 0 0"
          />
          {FEATURED_CHALLENGE_IDS.map((challengeId, index) => {
            return (
              <FeaturedChallengeBlock
                challengeId={challengeId}
                margin="20px 0 0 0"
                key={index}
              />
            );
          })}
        </TopContainer>
      </Container>
    </>
  );
};

const HomeAfterLogin = () => {
  // variables //
  const pathname = usePathname();
  const [isSrcolled, setIsScrolled] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const userId = useSelector(getUserIDState);

  // API //
  const { data, error, isLoading } = useQuery(
    ["all MyChallenges", pathname],
    async () => {
      const res = await getAllChallengesByUserId({
        // userId: USERID,
        userId: userId!,
        queryString: "status=ongoing",
      });
      const ongoingChallenges = res.userChallengeInfos;
      let photoUploadedChallenges: AllChallengesByUserIdT[] = [];
      let photoNotUploadedChallenges: AllChallengesByUserIdT[] = [];
      if (ongoingChallenges) {
        ongoingChallenges.forEach((challenge: AllChallengesByUserIdT) => {
          if (challenge.isPhotoUploadedToday) {
            photoUploadedChallenges.push(challenge);
          } else {
            photoNotUploadedChallenges.push(challenge);
          }
        });
      }
      return { photoUploadedChallenges, photoNotUploadedChallenges };
    },
    {
      staleTime: 5000,
      cacheTime: 60 * 60 * 1000,
    }
  );

  const photoUploadedChallenges = data?.photoUploadedChallenges;
  const photoNotUploadedChallenges = data?.photoNotUploadedChallenges;

  const handleScroll = useCallback(() => {
    if (wrapperRef.current) {
      const isAtTop = wrapperRef.current.scrollTop === 0;
      setIsScrolled(!isAtTop); // 최상단이 아니면 true, 최상단이면 false
      setIsBlurred(wrapperRef.current.scrollTop > 0);
    }
  }, []);

  return (
    <>
      <Container $isLogin={true}>
        <BackgroundImage
          src="/asset/Saly-36.png"
          width={271}
          height={340}
          alt="background image"
          priority={true}
        />

        <TopContainer $isFixed={true}>
          <WelcomeMessage isLogin={true} isScrolled={isSrcolled} />
          {!isSrcolled && <BadgePointPannel />}
        </TopContainer>

        <ChallengesContainer $isScrolled={isSrcolled}>
          <ChallengesWrapper
            // style={{ height: `${windowHeight - 184}px` }}
            style={{ height: "calc(100vh - 184px)" }}
            ref={wrapperRef}
            onScroll={handleScroll}
          >
            {isBlurred && <BlurOverlay />}
            <ChallengeHeader
              $fontColor={colors.black}
              style={{ marginBottom: "20px" }}
            >
              Today challenges
            </ChallengeHeader>
            {photoNotUploadedChallenges?.length === 0 &&
              photoUploadedChallenges?.length === 0 && (
                <NoOngoingChallengesBlock />
              )}
            {photoNotUploadedChallenges?.map(
              (challenge: AllChallengesByUserIdT, index: number) => {
                return (
                  <MyChallengeBlock
                    successRate={challenge.successRate}
                    thumbnailUrl={challenge.thumbnailUrl}
                    category={challenge.category}
                    name={challenge.name}
                    challengeStartAt={challenge.challengeStartAt}
                    challengeEndAt={challenge.challengeEndAt}
                    status={challenge.status}
                    isPhotoUploadedToday={challenge.isPhotoUploadedToday}
                    onClickHandler={() =>
                      router.push(`/mychallenge/${challenge.userChallengeId}`)
                    }
                    margin={index !== 0 ? "15px 0 0 0" : "none"}
                    key={index}
                  />
                );
              }
            )}
            {photoUploadedChallenges?.map(
              (challenge: AllChallengesByUserIdT, index: number) => {
                return (
                  <CompletedChallengeBlock
                    category={challenge.category}
                    name={challenge.name}
                    onClickHandler={() =>
                      router.push(`/mychallenge/${challenge.userChallengeId}`)
                    }
                    key={index}
                  />
                );
              }
            )}

            <ChallengeHeader
              $fontColor={colors.black}
              style={{ margin: "40px 0 0 0" }}
            >
              Featured Challenge
            </ChallengeHeader>
            {FEATURED_CHALLENGE_IDS.map((challengeId, index) => {
              return (
                <FeaturedChallengeBlock
                  challengeId={challengeId}
                  margin="20px 0 0 0"
                  key={index}
                />
              );
            })}

            {/* <FeaturedChallengeBlock margin="20px 0 0 0" /> */}
          </ChallengesWrapper>
        </ChallengesContainer>
      </Container>
    </>
  );
};

const Container = styled.main<{ $isLogin: boolean }>`
  width: 100%;
  height: ${(props) => (props.$isLogin ? "auto" : "calc(100vh - 68px)")};
  background-color: ${colors.primary};
  position: relative;
  overflow: auto;
`;
const TopContainer = styled.section<{ $isFixed: boolean }>`
  width: 100%;
  height: auto;

  padding: 0 22px;
  box-sizing: border-box;
  /* overflow: auto; */
  overflow: scroll;

  position: ${(props) => props.$isFixed && "fixed"};
  padding-bottom: ${(props) => !props.$isFixed && "115px"};

  top: 70px;
  -webkit-overflow-scrolling: touch; // iOS에서 부드러운 스크롤링을 위함
`;

const BackgroundImage = styled(Image)`
  position: fixed;
  top: 110px;
  right: 0px;

  /* -webkit-transform: translate3d(0, 0, 0); // 하드웨어 가속을 활용 */
  z-index: 1 !important; /* z-index를 설정 */
`;

const ChallengesContainer = styled.section<{ $isScrolled: boolean }>`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  overflow: hidden;

  margin-top: ${(props) => (props.$isScrolled ? "116px" : "214px")};
  transition: margin-top 0.3s ease-in-out; // 부드러운 전환 효과

  border-radius: 22px 22px 0px 0px;
  background: rgba(255, 255, 255, 0.6);
  position: relative;

  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px); // iOS에서 blur 효과를 위함s

  z-index: 2 !important;
`;

const ChallengesWrapper = styled.div`
  width: 100%;
  /* height: auto; */
  padding: 40px 22px 115px 22px;
  box-sizing: border-box;
  overflow: auto;
`;

const BlurOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px; // 조정 가능
  background: rgba(255, 255, 255, 0.5);
  filter: blur(30px);
  pointer-events: none; // 마우스 이벤트 방지

  -webkit-filter: blur(30px); // WebKit 브라우저에서 필터 효과를 위함
`;
