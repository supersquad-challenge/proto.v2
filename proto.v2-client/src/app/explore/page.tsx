"use client";
import Category from "@/components/common/explore/Category";
import ChallengeBlock from "@/components/common/explore/ChallengeBlock";
import colors from "@/styles/color";
import styled from "styled-components";

const Explore = () => {
  return (
    <Container>
      <CategoriesContainer>
        <SectionName>Categories</SectionName>
        <CategoriesWrapper>
          <Category title="Diet" imgSrc="/asset/categories/diet.svg" />
          <Category title="Fitness" imgSrc="/asset/categories/fitness.svg" />
          <Category
            title="Mental Health"
            imgSrc="/asset/categories/mental_health.svg"
          />
          <Category title="Habit" imgSrc="/asset/categories/habit.svg" />
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
  padding: 22px 22px 20px 22px;
  box-sizing: border-box;
  background-color: ${colors.primary};
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
  padding: 37px 22px 30px 22px;
  box-sizing: border-box;
  overflow: auto;
  background-color: ${colors.white};

  display: grid;
  grid-template-columns: 1fr 1fr;
`;
