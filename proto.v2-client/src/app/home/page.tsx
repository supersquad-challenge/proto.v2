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
import { usePathname, useSearchParams } from "next/navigation";
import { getAllChallengesByUserId } from "@/lib/api/querys/myChallenge/getAllChallengesByUserId";
import { USERID } from "@/lib/api/testdata";
import MyChallengeBlock from "@/components/common/MyChallengeBlock";
import CompletedChallengeBlock from "@/components/common/home/CompletedChallengeBlock";
import { useCallback, useEffect, useRef, useState } from "react";

const Home = () => {
  // return <Home_BeforeLogin />;
  return <Home_AfterLogin />;
};
export default Home;

const Home_BeforeLogin = () => {
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
        <TopContainer>
          <WelcomeMessage isLogin={false} />
          <LoginBlock />
          <ExtendedChallengeHeader
            challengeHeader="Featured Challenge"
            margin="40px 0 0 0"
          />
          <FeaturedChallengeBlock margin="22px 0 0 0" />
        </TopContainer>
      </Container>
    </>
  );
};

const Home_AfterLogin = () => {
  // variables //
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSrcolled, setIsScrolled] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // // API //
  // const { data, error, isLoading } = useQuery(
  //   ["all MyChallenges", searchParams.get("status")],
  //   async () => {
  //     const status = searchParams.get("status") ?? "";
  //     const queryString = new URLSearchParams({ status }).toString();
  //     const res = await getAllChallengesByUserId({
  //       userId: USERID,
  //       queryString,
  //     });
  //     const challenges = res.userChallengeInfo.allUserChallengeInfo;
  //     return challenges;
  //   },
  //   {
  //     staleTime: 5000,
  //     cacheTime: 60 * 60 * 1000,
  //   }
  // );

  const handleScroll = useCallback(() => {
    if (wrapperRef.current) {
      const isAtTop = wrapperRef.current.scrollTop === 0;
      setIsScrolled(!isAtTop); // 최상단이 아니면 true, 최상단이면 false
      setIsBlurred(wrapperRef.current.scrollTop > 0);
    }
  }, []);

  // 브라우저 높이 값에 맞게 ChallengesContainer 값 가변 적용
  const [windowHeight, setWindowHeight] = useState(844);

  useEffect(() => {
    // 브라우저 환경에서만 실행
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);

      const handleResize = () => {
        setWindowHeight(window.innerHeight);
      };

      window.addEventListener("resize", handleResize);

      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [windowHeight]);

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

        <TopContainer>
          <WelcomeMessage isLogin={true} />
          {!isSrcolled && <BadgePointPannel />}
        </TopContainer>

        <ChallengesContainer $isScrolled={isSrcolled}>
          <ChallengesWrapper
            style={{ height: `${windowHeight - 184}px` }}
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
            <MyChallengeBlock
              successRate={30}
              thumbnailUrl="/asset/Saly-15.svg"
              category="Mental Health"
              name="15 minutes of meditation"
              challengeStartAt="2023-11-10-17:51:56"
              challengeEndAt="2023-11-15-17:51:56"
              status="ongoing"
              isPhotoUploadedToday={false}
              onClickHandler={() => {}}
            />

            <CompletedChallengeBlock />

            <ChallengeHeader
              $fontColor={colors.black}
              style={{ margin: "40px 0 0 0" }}
            >
              Featured Challenge
            </ChallengeHeader>
            <FeaturedChallengeBlock margin="20px 0 0 0" />
          </ChallengesWrapper>
        </ChallengesContainer>
      </Container>
    </>
  );
};

const Container = styled.main<{ $isLogin: boolean }>`
  width: 100%;
  height: auto;
  padding: ${(props) => !props.$isLogin && "0 0 30px 0"};
  background-color: ${colors.primary};
  position: relative;
`;

const TopContainer = styled.section`
  width: 100%;
  height: auto;

  padding: 0 22px;
  box-sizing: border-box;
  overflow: auto;

  position: fixed;
  top: 70px;
`;

const BackgroundImage = styled(Image)`
  position: fixed;
  top: 110px;
  right: 0px;
`;

const ChallengesContainer = styled.section<{ $isScrolled: boolean }>`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  overflow: hidden;

  margin-top: ${(props) => (props.$isScrolled ? "114px" : "214px")};
  transition: margin-top 0.3s ease-in-out; // 부드러운 전환 효과

  border-radius: 22px 22px 0px 0px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
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
`;
