"use client";
import Category from "@/components/common/explore/Category";
import ChallengeBlock from "@/components/common/explore/ChallengeBlock";
import { getAllChallenges } from "@/lib/api/querys/challenge/getAllChallenges";
import colors from "@/styles/color";
import { AllChallenges } from "@/types/api/Challenge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

const Explore = () => {
  // variables //
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("");

  // useEffect //
  useEffect(() => {
    const categoryQuery = searchParams.get("category");
    setCategory(categoryQuery!);
  }, [pathname, searchParams]);

  // handle functions //
  const handleCategoryClick = (title: string) => {
    if (category == title) {
      router.push("/explore");
    } else {
      router.push(`/explore?category=${title}`);
    }
    return;
  };

  // api //
  const { data, error, isLoading } = useQuery(
    ["allChallenges", searchParams.get("category")],
    async () => {
      const category = searchParams.get("category") ?? "";
      const queryString = new URLSearchParams({ category }).toString();
      const res = await getAllChallenges({ queryString });
      const challenges = res.challengeInfo;
      return challenges;
    },
    {
      staleTime: 5000,
      cacheTime: 60 * 60 * 1000,
    }
  );

  // Change Padding //
  // 브라우저 너비 값에 맞게 ContainerPaddingTop 값 가변 적용
  const [windowWidth, setWindowWidth] = useState(392);
  const [challengesContainerPaddingTop, setChallengesContainerPaddingTop] =
    useState(248);

  useEffect(() => {
    // 브라우저 환경에서만 실행
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      const handleResizeImg = () => {
        setChallengesContainerPaddingTop(
          Number((windowWidth - 44 - 36) / 4 + 10 + 42 + 20 + 24 + 42 + 32)
        );
      };

      window.addEventListener("resize", handleResize);
      handleResizeImg();

      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [windowWidth]);

  return (
    <Container>
      <CategoriesContainer>
        <SectionName>Categories</SectionName>
        <CategoriesWrapper>
          <Category
            title="Diet"
            imgSrc="/asset/categories/diet.svg"
            isClicked={category == "Diet"}
            onClickHandler={() => {
              handleCategoryClick("Diet");
            }}
          />
          <Category
            title="Fitness"
            imgSrc="/asset/categories/fitness.svg"
            isClicked={category == "Fitness"}
            onClickHandler={() => {
              handleCategoryClick("Fitness");
            }}
          />
          <Category
            title="Mental Health"
            imgSrc="/asset/categories/mental_health.svg"
            isClicked={category == "Mental_health"}
            onClickHandler={() => {
              handleCategoryClick("Mental_health");
            }}
          />
          <Category
            title="Habit"
            imgSrc="/asset/categories/habit.svg"
            isClicked={category == "Habit"}
            onClickHandler={() => {
              handleCategoryClick("Habit");
            }}
          />
        </CategoriesWrapper>
      </CategoriesContainer>
      <ChallengesContainer $padding={challengesContainerPaddingTop}>
        {data?.map((challenge: AllChallenges, index: number) => {
          return (
            <ChallengeBlock
              thumbnailUrl={challenge.thumbnailUrl}
              name={challenge.name}
              participants={challenge.participants}
              onClickHandler={() =>
                router.push(`/explore/${challenge.challengeId}`)
              }
              key={index}
            />
          );
        })}
      </ChallengesContainer>
    </Container>
  );
};
export default Explore;

const Container = styled.main`
  width: 100%;
  height: auto;
`;

const CategoriesContainer = styled.section`
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

const CategoriesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ChallengesContainer = styled.section<{ $padding: number }>`
  width: 100%;
  height: auto;
  padding: ${(props) => `${props.$padding}px`} 22px 15px 22px;
  box-sizing: border-box;
  overflow: auto;
  background-color: ${colors.white};

  display: grid;
  grid-template-columns: 1fr 1fr;
`;
