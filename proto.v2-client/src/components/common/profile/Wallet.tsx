import styled from 'styled-components';
import Image from 'next/image';
import colors from '@/styles/color';
import BaseButton from '@/components/base/Button/BaseButton';
import { useSelector, useDispatch } from 'react-redux';
import {
  SET_USER_CONNECT,
  SET_USER_DISCONNECT,
  getIsLoggedInState,
} from '@/redux/slice/authSlice';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';

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
        <w3m-button
          label="Connect"
          size="md"
          disabled={isLoggedIn ? false : true}
          loadingLabel="Connecting"
          balance="hide"
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
  width: auto;
  height: auto;
  margin-left: auto;
`;
