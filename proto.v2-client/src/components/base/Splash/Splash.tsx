import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Loading from "@/components/animation/Loading/Bar/Loading";
import colors from "@/styles/color";

const Splash = () => {
  return (
    <Container>
      <LogoImg
        src="/asset/spalsh_logo.svg"
        width={40}
        height={40}
        alt="splash logo"
      />
      <Title>
        Engage to <br />
        Make Changes
      </Title>
      <Detail>
        Focus on One by One,
        <br />
        Make Lasting Habits With
      </Detail>
      <LogoTitle>SuperSquad</LogoTitle>
    </Container>
  );
};

export default Splash;

const Container = styled.section`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${colors.primary};
  z-index: 9999;
`;

const LogoImg = styled(Image)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  top: 90px;
`;

const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  color: ${colors.white};

  text-align: center;
  font-family: ClashDisplayVariable;
  font-size: 32px;
  font-weight: 600;
  line-height: 154.6%;

  top: 142px;
  width: 100vw;
`;

const Detail = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  color: ${colors.white};
  text-align: center;
  font-size: 16px;
  font-weight: 300;
  line-height: 130%;
  letter-spacing: -0.32px;

  bottom: 154px;
  width: 100%;
`;

const LogoTitle = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  color: ${colors.white};
  font-family: ClashDisplayVariable;
  font-size: 28px;
  font-weight: 700;
  line-height: normal;

  bottom: 100px;
`;

// const Title = styled.div`
//   font-weight: 600;
//   font-size: 24px;
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   font-family: ClashDisplayVariable;
//   position: absolute;
//   top: 20%;
//   left: 25px;
// `;

// const LogoContainer = styled.div`
//   position: absolute;
//   bottom: 70px;
//   left: 50%;
//   transform: translateX(-50%);
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// const LogoTitle = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-top: 10px;
//   font-family: ClashDisplayVariable;
//   font-weight: 800;
//   font-size: 24px;
// `;

// const LoadingContainer = styled.div`
//   z-index: 99;
//   width: 200px;
// `;
