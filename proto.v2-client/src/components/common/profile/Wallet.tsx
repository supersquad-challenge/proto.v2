import styled from "styled-components";
import Image from "next/image";
import colors from "@/styles/color";
import BaseButton from "@/components/base/Button/BaseButton";
import { useSelector } from "react-redux";
import { getIsLoggedInState } from "@/redux/slice/authSlice";

type Props = {
  walletName: string;
};

const Wallet = ({ walletName }: Props) => {
  const isLoggedIn = useSelector(getIsLoggedInState);
  return (
    <Wrapper>
      <Image
        src="/asset/wallet_connect.svg"
        alt="wallet connect"
        width={30}
        height={30}
      />
      <Name>{walletName}</Name>
      <ButtonWrapper>
        <BaseButton
          color={colors.white}
          fontSize={12}
          fontWeight={500}
          borderRadius={21}
          backgroundColor={isLoggedIn ? colors.primary : colors.gray}
          padding="7px 23px 5px 22px"
          title={"Connect"}
          onClickHandler={
            isLoggedIn
              ? () => {
                  console.log("여기에 지갑 연결 함수가 들어가야 합니다.");
                }
              : () => {}
          } //지갑 연결 함수
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Wallet;

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 7px 0;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  margin-top: 15px;
`;

const Name = styled.div`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: -0.32px;

  margin-left: 15px;
`;

const ButtonWrapper = styled.div`
  width: 96px;
  height: 30px;
  margin-left: auto;
`;
