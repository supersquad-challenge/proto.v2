"use client";
import Category from "@/components/common/explore/Category";
import ChallengeBlock from "@/components/common/explore/ChallengeBlock";
import colors from "@/styles/color";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Explore = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("all");

  useEffect(() => {
    router.push("/explore?category=all");
  }, []);

  useEffect(() => {
    const categoryQuery = searchParams.get("category");
    setCategory(categoryQuery!);
  }, [pathname, searchParams]);

  const handleCategoryClick = (title: string) => {
    if (category == title) {
      router.push("/explore?category=all");
    } else {
      router.push(`/explore?category=${title}`);
    }
    return;
  };

  return (
    <Container>
      <CategoriesContainer>
        <SectionName>Categories</SectionName>
        <CategoriesWrapper>
          <Category
            title="Diet"
            imgSrc="/asset/categories/diet.svg"
            isClicked={category == "diet"}
            onClickHandler={() => {
              handleCategoryClick("diet");
            }}
          />
          <Category
            title="Fitness"
            imgSrc="/asset/categories/fitness.svg"
            isClicked={category == "fitness"}
            onClickHandler={() => {
              handleCategoryClick("fitness");
            }}
          />
          <Category
            title="Mental Health"
            imgSrc="/asset/categories/mental_health.svg"
            isClicked={category == "mental_health"}
            onClickHandler={() => {
              handleCategoryClick("mental_health");
            }}
          />
          <Category
            title="Habit"
            imgSrc="/asset/categories/habit.svg"
            isClicked={category == "habit"}
            onClickHandler={() => {
              handleCategoryClick("habit");
            }}
          />
        </CategoriesWrapper>
      </CategoriesContainer>
      <ChallengesContainer>
        <ChallengeBlock />
        <ChallengeBlock />
        <ChallengeBlock />
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

const ChallengesContainer = styled.section`
  width: 100%;
  height: auto;
  padding: 248px 22px 30px 22px;
  box-sizing: border-box;
  overflow: auto;
  background-color: ${colors.white};

  display: grid;
  grid-template-columns: 1fr 1fr;
`;
