import colors from "@/styles/color";
import styled from "styled-components";

interface GreetingsProps {
  fontSize: number;
}

const WelcomeMessage = () => {
  return (
    <Container>
      <Greetings fontSize={26}>
        Hi, <GreetingsBold>Challengers</GreetingsBold>
      </Greetings>
      <Greetings fontSize={16} style={{ marginTop: "10px" }}>
        Hack your goals with SuperSquad!
      </Greetings>
    </Container>
  );
};

export default WelcomeMessage;

const Container = styled.div`
  width: auto;
  height: auto;
  margin-left: 22px;
  margin-right: 25px;

  box-sizing: border-box;

  /* border: 1px solid red; */
`;

const Greetings = styled.div<GreetingsProps>`
  color: ${colors.white};
  font-family: PoppinLight;
  font-size: ${(props) => `${props.fontSize}px`};
  font-style: normal;
  font-weight: 300;
  line-height: ${(props) => `${props.fontSize}px`};
  letter-spacing: -0.52px;
`;

const GreetingsBold = styled.span`
  font-weight: 600;
`;
