"use client";
import colors from "@/styles/color";
import styled from "styled-components";

const MyChallenge = () => {
  return (
    <Container>
      <SectionName>My Challenge</SectionName>
    </Container>
  );
};
export default MyChallenge;

const Container = styled.main`
  width: 100%;
  height: auto;
  background-color: ${colors.primary};

  padding: 0 22px;
  box-sizing: border-box;
`;

const SectionName = styled.div`
  color: ${colors.white};
  font-size: 24px;
  font-weight: 600;

  height: 24px;

  margin-top: 22px;
`;
