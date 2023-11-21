"use client";
import colors from "@/styles/color";
import styled from "styled-components";
import Image from "next/image";
import { POINT } from "@/lib/protoV2Constants";
import thousandFormat from "@/utils/thousandFormat";

const Profile = () => {
  return (
    <Container>
      <AccountOverviewContainer>
        <ProfileImageWrapper>
          <Image
            src="/asset/profile-circle.svg" //여기 챌린지 썸네일 사진이 들어가면 됨.
            alt="Profile Image"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </ProfileImageWrapper>
        <AccountOverviewWrapper>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Nickname>Nickname</Nickname>
            <Image
              src="/asset/pencil.svg"
              width={16}
              height={16}
              alt="edit nickname"
              style={{ marginLeft: "9px" }}
            />
          </div>
          <Email>ddd0000@gmail.com</Email>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              boxSizing: "border-box",
              marginTop: "17px",
            }}
          >
            <Points>{thousandFormat(POINT)}</Points>
            <div
              style={{
                color: "rgba(255, 255, 255, 0.60)",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "112.5%",
                letterSpacing: "-0.32px",
                padding: "8px 0px 4px 5px",
                boxSizing: "border-box",
              }}
            >
              points
            </div>
          </div>
        </AccountOverviewWrapper>
      </AccountOverviewContainer>
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
  padding: 15px 22px 40px 44px; //원래는 22px인데 밑에 흰색 컨테이너의 border-radius = 22px인 것때문에
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
