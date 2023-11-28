import styled from "styled-components";
import Image from "next/image";
import colors from "@/styles/color";

type Props = {
  participants: number;
  profileUrls: string[] | [];
};

const ParticipantsBanner = ({ participants, profileUrls }: Props) => {
  const defaultProfileSrc = "/asset/profile-circle.svg";
  let profileImgArr;
  if (profileUrls.length === 0) {
    profileImgArr = Array(2).fill(defaultProfileSrc);
  } else if (profileUrls.length === 1) {
    profileImgArr = Array(2).fill(null);
    profileImgArr[0] = profileUrls[0];
    profileImgArr[1] = defaultProfileSrc;
  } else if (profileUrls.length >= 2) {
    profileImgArr = profileUrls.slice(-2).reverse();
  }
  console.log(profileImgArr);
  return (
    <Container>
      <CirclesWrapper>
        <ProfileContainer>
          <Image
            src="/asset/profile-circle.svg" // 참여자 프로필
            width={32}
            height={32}
            alt="participants"
          />
        </ProfileContainer>
        <ProfileContainer style={{ marginLeft: "-10px" }}>
          <Image
            src="/asset/profile-circle.svg" //참여자 프로필
            width={32}
            height={32}
            alt="participants"
          />
        </ProfileContainer>
        <ParticipantsNumCircle>+{participants - 2}</ParticipantsNumCircle>
      </CirclesWrapper>
      <ParticipationMessage>
        <b>{participants} people</b> participating!
      </ParticipationMessage>
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
  border-radius: 10px;
`;

const CirclesWrapper = styled.div`
  width: auto;
  height: auto;

  display: flex;
`;

const ProfileContainer = styled.div`
  width: 33px;
  height: 33px;
  border-radius: 50%;
  overflow: hidden;
  padding: 1px;
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
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
  align-items: center;
  box-sizing: border-box;
  margin-left: -10px;
`;

const ParticipationMessage = styled.div`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: 400;
`;
