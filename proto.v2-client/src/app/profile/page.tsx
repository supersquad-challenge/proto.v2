'use client';
import colors from '@/styles/color';
import styled from 'styled-components';
import Image from 'next/image';
import { POINT } from '@/lib/protoV2Constants';
import thousandFormat from '@/utils/thousandFormat';
import SingleCollection from '@/components/common/profile/SingleCollection';
import Wallet from '@/components/common/profile/Wallet';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
  SET_USER_LOGOUT,
  getEmailState,
  getNicknameState,
  getProfileState,
  getUserIDState,
} from '@/redux/slice/authSlice';
import { useEffect, useState } from 'react';
import { INITIALIZE_FOOTER_BLUEBUTTON } from '@/redux/slice/layoutSlice';
import { CLOSE_MODAL } from '@/redux/slice/modalSlice';
import { login } from '@/lib/api/axios/auth/login';
import { useQuery } from 'react-query';
import { getUserInfo } from '@/lib/api/querys/user/getUserInfo';
import { BadgeT, UserInfoT } from '@/types/api/User';

const Profile = () => {
  // variables //
  const router = useRouter();
  const profile = useSelector(getProfileState);
  const nickname = useSelector(getNicknameState);
  const email = useSelector(getEmailState);
  const [isClient, setIsClient] = useState(false);
  const isLoggedIn = useSelector(getIsLoggedInState);
  const dispatch = useDispatch();
  const userId = useSelector(getUserIDState);

  // API //
  const {
    data: userInfo,
    isLoading,
    error,
  } = useQuery<UserInfoT>({
    queryKey: [`profile-${userId}`],
    queryFn: async () => {
      if (userId) {
        const res = await getUserInfo({ userId });
        const userInfo = res.userInfo;
        return userInfo;
      } else return;
    },
    staleTime: 5000,
    cacheTime: 60 * 60 * 1000,
  });

  // useEffect //
  useEffect(() => {
    setIsClient(true);
    dispatch(INITIALIZE_FOOTER_BLUEBUTTON());
    dispatch(CLOSE_MODAL());
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Container>
      <AccountOverviewContainer>
        <ProfileImageWrapper>
          <Image
            src={profile ? profile : '/asset/profile-circle.svg'} //여기 프로필 사진이 들어가면 됨.
            alt="Profile Image"
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </ProfileImageWrapper>
        <AccountOverviewWrapper>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Nickname>{nickname}</Nickname>
            <Image
              src="/asset/pencil.svg"
              width={16}
              height={16}
              alt="edit profile"
              style={{ marginLeft: '9px', cursor: 'pointer' }}
              onClick={() => router.push('/flow/profile-setting')}
            />
          </div>
          <Email>{email}</Email>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              boxSizing: 'border-box',
              marginTop: '17px',
            }}
          >
            <Points>{thousandFormat(POINT)}</Points>
            <div
              style={{
                color: 'rgba(255, 255, 255, 0.60)',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '112.5%',
                letterSpacing: '-0.32px',
                padding: '8px 0px 4px 5px',
                boxSizing: 'border-box',
              }}
            >
              points
            </div>
          </div>
        </AccountOverviewWrapper>
      </AccountOverviewContainer>
      <AssetsContainer>
        <SectionName style={{ marginBottom: '5px' }}>Collection</SectionName>
        <SectionDetail>Choose a badge and proudly display it</SectionDetail>
        {isLoggedIn ? (
          <CollectionContainer>
            {userInfo?.badge.map((singleBadge: BadgeT, index: number) => {
              return (
                <SingleCollection
                  name={singleBadge.challengeName}
                  margin={index !== 0 ? '0 0 0 30px' : undefined}
                  key={index}
                />
              );
            })}
          </CollectionContainer>
        ) : (
          <div style={{ width: '100%', height: '140px' }}></div>
        )}

        <SectionName style={{ marginTop: '30px' }}>Wallet</SectionName>
        <Wallet walletName="WalletConnect" />
        <a href="mailto:official@supersquad.xyz">
          <ContactTeam>Contact Team</ContactTeam>
        </a>
      </AssetsContainer>
    </Container>
  );
};

export default Profile;

const Container = styled.main`
  width: 100%;
  height: auto;
`;

const AccountOverviewContainer = styled.section`
  width: 100%;
  padding: 85px 22px 66px 22px; //원래는 padding-bottom이 44px인데 밑에 흰색 컨테이너의 border-radius = 22px인 것때문에
  box-sizing: border-box;
  background-color: ${colors.primary};
  display: flex;
`;

const ProfileImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  padding: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
`;

const AccountOverviewWrapper = styled.div`
  width: auto;
  height: auto;
  margin: 4px 0 0 22px;
  box-sizing: border-box;
`;

const Nickname = styled.div`
  color: ${colors.white};
  font-size: 22px;
  font-weight: 600;
  line-height: 128.571%;
  letter-spacing: -0.44px;
`;

const Email = styled.div`
  color: ${colors.white};
  font-size: 14px;
  font-weight: 400;
  line-height: 128.571%;
  letter-spacing: -0.28px;

  margin-top: 10px;
`;

const Points = styled.div`
  color: ${colors.highlight};
  font-size: 30px;
  font-weight: 800;
  line-height: 100%;
  letter-spacing: -0.6px;
`;

const AssetsContainer = styled.section`
  margin-top: -22px;
  border-radius: 22px 22px 0px 0px;
  padding: 40px 22px 30px 22px;
  background-color: ${colors.white};
  box-sizing: border-box;
`;

const SectionName = styled.div`
  color: ${colors.black};
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.36px;
  line-height: 100%;
`;

const SectionDetail = styled.div`
  color: ${colors.black};
  font-size: 14px;
  font-weight: 400;
  line-height: 128.571%;
  letter-spacing: -0.28px;
`;

const CollectionContainer = styled.div`
  width: 100vw;
  height: auto;
  margin-top: 20px;
  box-sizing: border-box;
  overflow: scroll;
  display: flex;
  padding: 0 22px 10px 22px;
  margin-left: -22px;
`;

const ContactTeam = styled.div`
  color: ${colors.gray};
  width: fit-content;
  padding: 0 0 5px 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: -0.32px;

  border-bottom: 1px solid ${colors.gray};
  margin-top: 74px;

  &:hover {
    cursor: pointer;
  }
`;
