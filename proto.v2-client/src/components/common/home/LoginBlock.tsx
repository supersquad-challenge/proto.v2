import LongBlueButton from "@/components/base/Button/LongBlueButton";
import colors from "@/styles/color";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { login } from "@/lib/api/axios/auth/login";
import { SET_USER_LOGIN } from "@/redux/slice/authSlice";

const LoginBlock = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/flow/login");
  };

  return (
    <BlockWrapper>
      <Wrapper>
        <Title>Join SuperSquad now!</Title>
        <Detail>You can participate in various challenges</Detail>
        <LongBlueButton
          margin="15px 0 0 0"
          title="Login"
          onClickHandler={() => handleLogin()}
        />
      </Wrapper>
    </BlockWrapper>
  );
};

export default LoginBlock;

const BlockWrapper = styled.div`
  width: 100%;
  height: 193px;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(2px);

  display: flex;
  align-items: center;
  margin-top: 40px;
  border-radius: 20px;
  z-index: 2 !important; /* 더 높은 z-index를 설정 */
  position: relative;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  color: ${colors.black};
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;

const Detail = styled.div`
  color: ${colors.black};
  text-align: center;
  font-size: 14px;
  font-weight: 400;
`;
