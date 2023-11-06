"use client";
import ServiceTitle from "@/components/common/ServiceTitle";
import colors from "@/styles/color";
import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      <ServiceTitle></ServiceTitle>
    </Container>
  );
};
export default Home;

const Container = styled.main`
  width: 100%;
  height: auto;
  background-color: ${colors.primary};
`;
