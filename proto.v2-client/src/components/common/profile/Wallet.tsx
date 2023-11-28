import styled from "styled-components";
import Image from "next/image";
import colors from "@/styles/color";
import BaseButton from "@/components/base/Button/BaseButton";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_USER_CONNECT,
  SET_USER_DISCONNECT,
  getIsLoggedInState,
} from "@/redux/slice/authSlice";
import { useAccount } from "wagmi";
import { useEffect } from "react";

type Props = {
  walletName: string;
  walletImgSrc: string;
  children?: React.ReactNode;
};

const Wallet = ({ walletName, walletImgSrc, children }: Props) => {
  const isLoggedIn = useSelector(getIsLoggedInState);

  return (
    <Wrapper>
      <Image src={walletImgSrc} alt={walletName} width={30} height={30} />
      <Name>{walletName}</Name>
      {children}
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

export const DefaultWalletButtonWrapper = styled.div`
  width: auto;
  height: auto;
  margin-left: auto;
  box-sizing: border-box;
`;

export const WalletConnectButtonWrapper = styled.div`
  width: 85px;
  height: 36.6px;
  margin-left: auto;
`;
