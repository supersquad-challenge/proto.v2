"use client";
import ServiceTitle from "@/components/common/ServiceTitle";
import WelcomeMessage from "@/components/common/WelcomeMessage";
import colors from "@/styles/color";
import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      <ServiceTitle></ServiceTitle>
      <WelcomeMessage></WelcomeMessage>
    </Container>
  );
};
export default Home;

const Container = styled.main`
  width: 100%;
  height: auto;
  background-color: ${colors.primary};
`;
