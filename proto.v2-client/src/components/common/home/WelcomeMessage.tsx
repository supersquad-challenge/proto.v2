import { getNicknameState } from "@/redux/slice/authSlice";
import colors from "@/styles/color";
import { useSelector } from "react-redux";
import styled from "styled-components";

type Props = {
  isLogin: boolean;
  isScrolled: boolean;
};

const WelcomeMessage = ({ isLogin, isScrolled }: Props) => {
  return isLogin ? <AfterLogin isScrolled={isScrolled} /> : <BeforeLogin />;
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

const AfterLogin = ({ isScrolled }: { isScrolled: boolean }) => {
  const nickname = useSelector(getNicknameState);
  // console.log(nickname);
  return (
    <Container>
      <div>
        <Greetings fontSize={26}>
          Hi, <GreetingsBold>{nickname}</GreetingsBold>
        </Greetings>
        <Greetings fontSize={16} style={{ marginTop: "10px" }}>
          Hack your goals with SuperSquad!
        </Greetings>
      </div>
      {isScrolled && (
        <BadgeImage src="/asset/badges/gold_badge.svg" alt="gold badge" />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;

  box-sizing: border-box;

  display: flex;
  justify-content: space-between;

  background-color: ${colors.primary};
  padding-top: 22px;
`;

const Greetings = styled.div<{ fontSize: number }>`
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
