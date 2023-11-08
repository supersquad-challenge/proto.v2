import styled from "styled-components";
import Image from "next/image";
import colors from "@/styles/color";

const ParticipantsBanner = () => {
  return (
    <Container>
      <CirclesWrapper>
        <Image
          src="/asset/profile-circle.svg"
          width={37}
          height={37}
          alt="participants"
        />
        <Image
          src="/asset/profile-circle.svg"
          width={37}
          height={37}
          alt="participants"
        />
        <ParticipantsNumCircle>+28</ParticipantsNumCircle>
      </CirclesWrapper>
    </Container>
  );
};
export default ParticipantsBanner;

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 19px;
  box-sizing: border-box;

  background-color: rgba(82, 101, 251, 0.1);
`;

const CirclesWrapper = styled.div`
  width: auto;
  height: auto;

  display: flex;
  border: 1px solid black;
`;

const ParticipantsNumCircle = styled.div`
  width: 33px;
  height: 33px;

  border-radius: 50%;
  background-color: #d9d9d9;

  border: 1px solid ${colors.white};

  color: ${colors.black};
  font-size: 10px;
  font-weight: 400;

  display: flex;
  text-align: center;
  justify-content: center;
`;
