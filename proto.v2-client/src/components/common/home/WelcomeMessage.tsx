import colors from "@/styles/color";
import styled from "styled-components";

type Props = {
  fontSize: number;
};

const WelcomeMessage = () => {
  return <BeforeLogin />;
};

export default WelcomeMessage;

const BeforeLogin = () => {
  return (
    <Container>
      <div>
        <Greetings fontSize={26}>
          Hi, <GreetingsBold>Challengers</GreetingsBold>
        </Greetings>
        <Greetings fontSize={16} style={{ marginTop: "10px" }}>
          Hack your goals with SuperSquad!
        </Greetings>
      </div>
    </Container>
  );
};

const AfterLogin = () => {
  return (
    <Container>
      <div>
        <Greetings fontSize={26}>
          Hi, <GreetingsBold>Nickname</GreetingsBold>
        </Greetings>
        <Greetings fontSize={16} style={{ marginTop: "10px" }}>
          Hack your goals with SuperSquad!
        </Greetings>
      </div>
      <BadgeImage src="/asset/badges/gold_badge.svg" alt="gold badge" />
    </Container>
  );
};

const Container = styled.div`
  width: auto;
  height: auto;

  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  margin-top: 22px;
`;

const Greetings = styled.div<Props>`
  color: ${colors.white};
  font-size: ${(props) => `${props.fontSize}px`};
  font-weight: 300;
  line-height: ${(props) => `${props.fontSize}px`};
  letter-spacing: -0.52px;
`;

const GreetingsBold = styled.span`
  font-weight: 600;
`;

const BadgeImage = styled.img`
  width: 60px;
  height: 60px;
  margin-top: -4px;
`;
