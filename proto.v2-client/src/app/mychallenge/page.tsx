"use client";
import MyChallengeBlock from "@/components/common/MyChallengeBlock";
import { getAllChallengesByUserId } from "@/lib/api/querys/myChallenge/getAllChallengesByUserId";
import colors from "@/styles/color";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { USERID } from "@/lib/api/testdata";
import { AllChallengesByUserId } from "@/types/api/Challenge";

const MyChallenge = () => {
  // variables //
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("ongoing");

  // Use Effect //
  useEffect(() => {
    router.push("/mychallenge?status=ongoing");
  }, []);

  useEffect(() => {
    const statusQuery = searchParams.get("status");
    setStatus(statusQuery!);
  }, [pathname, searchParams]);

  // API //
  const { data, error, isLoading } = useQuery(
    ["all MyChallenges", searchParams.get("status")],
    async () => {
      const status = searchParams.get("status") ?? "";
      const queryString = new URLSearchParams({ status }).toString();
      const res = await getAllChallengesByUserId({
        userId: USERID,
        queryString,
      });
      const challenges = res.userChallengeInfo.allUserChallengeInfo;
      return challenges;
    },
    {
      staleTime: 5000,
      cacheTime: 60 * 60 * 1000,
    }
  );

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
          Total <TotalBold>{data?.length}</TotalBold>
        </TotalWrapper>
        {data?.map((challenge: AllChallengesByUserId, index: number) => {
          return (
            <MyChallengeBlock
              successRate={20} //수정 필요
              thumbnailUrl={challenge.thumbnailUrl}
              category={challenge.category}
              name={challenge.name}
              challengeStartAt={challenge.challengeStartAt}
              challengeEndAt={challenge.challengeStartAt}
              key={index}
              border="1px solid #dddddd"
              margin="0 0 15px 0"
            />
          );
        })}
      </ChallengesContainer>
    </Container>
  );
};
export default MyChallenge;

const Container = styled.main`
  width: 100%;
  height: auto;
`;

const StatusContainer = styled.section`
  width: 100%;
  padding: 22px 22px 20px 22px;
  box-sizing: border-box;
  background-color: ${colors.primary};
  position: fixed;
  z-index: 3;
`;

const SectionName = styled.div`
  color: ${colors.white};
  font-size: 24px;
  font-weight: 600;

  height: 24px;
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
  padding: 150px 22px 15px 22px;
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
`;
