"use client";
import colors from "@/styles/color";
import styled from "styled-components";

const Explore = () => {
  return (
    <Container>
      <SectionName>Categories</SectionName>
    </Container>
  );
};
export default Explore;

const Container = styled.main`
  width: 100%;
  height: auto;
  background-color: ${colors.primary};

  padding: 22px 22px 0px 22px;
  box-sizing: border-box;
`;

const SectionName = styled.div`
  color: ${colors.white};
  font-size: 24px;
  font-weight: 600;

  height: 24px;
`;
