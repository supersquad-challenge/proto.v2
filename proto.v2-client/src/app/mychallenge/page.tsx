<<<<<<< HEAD
"use client";
import MyChallengeBlock from "@/components/common/MyChallengeBlock";
import CompletedChallengeBlock from "@/components/common/home/CompletedChallengeBlock";
import colors from "@/styles/color";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const MyChallenge = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("ongoing");

  useEffect(() => {
    router.push("/mychallenge?status=ongoing");
  }, []);

  useEffect(() => {
    const statusQuery = searchParams.get("status");
    setStatus(statusQuery!);
  }, [pathname, searchParams]);

  return (
    <Container>
      <StatusContainer>
        <SectionName>My Challenge</SectionName>
        <StatusesWrapper>
          <Status
            $isclicked={status == "ongoing"}
            onClick={() => {
              router.push("/mychallenge?status=ongoing");
            }}
          >
            Ongoing
          </Status>
          <Status
            $isclicked={status == "complete"}
            style={{ marginLeft: "20px" }}
            onClick={() => {
              router.push("/mychallenge?status=complete");
            }}
          >
            Complete
          </Status>
        </StatusesWrapper>
      </StatusContainer>
      <ChallengesContainer>
        <TotalWrapper>
          Total <TotalBold>2</TotalBold>
        </TotalWrapper>
        <MyChallengeBlock border="1px solid #dddddd" margin="0 0 15px 0" />
        <MyChallengeBlock border="1px solid #dddddd" />
      </ChallengesContainer>
=======
import colors from "@/styles/color";
import styled from "styled-components";

const MyChallenge = () => {
  return (
    <Container>
      <SectionName>My Challenge</SectionName>
>>>>>>> 09511c3 (Add: Header)
    </Container>
  );
};
export default MyChallenge;

const Container = styled.main`
  width: 100%;
  height: auto;
<<<<<<< HEAD
`;

const StatusContainer = styled.section`
  width: 100%;
  padding: 22px 22px 20px 22px;
  box-sizing: border-box;
  background-color: ${colors.primary};
  position: fixed;
  z-index: 3;
=======
  background-color: ${colors.primary};

  padding: 0 22px;
  box-sizing: border-box;
>>>>>>> 09511c3 (Add: Header)
`;

const SectionName = styled.div`
  color: ${colors.white};
  font-size: 24px;
  font-weight: 600;

  height: 24px;
<<<<<<< HEAD
`;

const StatusesWrapper = styled.div`
  display: flex;
  margin-top: 30px;
`;

const Status = styled.div<{ $isclicked: boolean }>`
  color: ${(props) =>
    props.$isclicked ? "#FFF570" : "rgba(255, 255, 255, 0.6)"};
  font-size: 16px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }
`;

const ChallengesContainer = styled.section`
  width: 100%;
  height: auto;
  padding: 150px 22px 30px 22px;
  box-sizing: border-box;
  overflow: scroll;
  background-color: ${colors.white};
`;

const TotalWrapper = styled.div`
  display: flex;
  color: ${colors.black};
  font-size: 14px;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: -0.28px;

  margin-bottom: 20px;
`;

const TotalBold = styled.span`
  font-weight: 600;
  margin-left: 6px;
=======

  margin-top: 22px;
>>>>>>> 09511c3 (Add: Header)
`;
