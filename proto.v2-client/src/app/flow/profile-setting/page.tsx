"use client";

import FlowSectionName from "@/components/common/flow/FlowSectionName";
import ImageInputCircle from "@/components/common/flow/ImageInputCircle";
import NicknameInput from "@/components/common/flow/NicknameInput";
import NicknameMessage from "@/components/common/flow/NicknameMessage";
import { setNickname } from "@/lib/api/axios/user/setNickname";
import {
  getIsLoggedInState,
  getNicknameState,
  getProfileState,
  getUserIDState,
} from "@/redux/slice/authSlice";
import { SET_FOOTER_BLUEBUTTON } from "@/redux/slice/layoutSlice";
import { profile } from "console";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const ProfileSetting = () => {
  // variables //
  const dispatch = useDispatch();
  const [isSaveChanges, setIsSaveChanges] = useState(false);
  const userId = useSelector(getUserIDState);
  const isLoggedIn = useSelector(getIsLoggedInState);
  const profile = useSelector(getProfileState);
  const originalNickname = useSelector(getNicknameState);
  const [nowNickname, setNowNickname] = useState(
    originalNickname ? originalNickname : ""
  );
  console.log(profile);

  // useEffect //
  useEffect(() => {
    dispatch(
      SET_FOOTER_BLUEBUTTON({
        blueButtonTitle: "Save Changes",
        handleBlueButtonClick: handleBlueButtonClick,
      })
    );
  }, []);

  // Image Input functions //
  let file;

  // Nickname Input functions //
  const updateInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNowNickname(event.target.value);
  };

  const submitInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // 닉네임 제출 로직 (예: 서버로 전송)
      console.log("Submitted Nickname:", nowNickname);
      handleBlueButtonClick();
    }
  };

  const handleBlueButtonClick = async () => {
    // 프로필 이미지 변경하는 로직 추가
    if (userId) {
      const res = await setNickname({
        userInfoId: userId,
        nickname: nowNickname,
      });
    }
  };

  return (
    isLoggedIn && (
      <Container>
        <FlowSectionName>Profile Setting</FlowSectionName>
        <ImageInputWrapper>
          {/* <ImageInputCircle profileSrc="/asset/meditation.jpeg" /> */}
          <ImageInputCircle profileSrc={profile!} file={file} />
        </ImageInputWrapper>
        <NicknameMessage>Nickname</NicknameMessage>
        <NicknameInput
          nickname={nowNickname}
          updateInput={updateInput}
          submitInput={submitInput}
        />
      </Container>
    )
  );
};

export default ProfileSetting;

const Container = styled.main`
  width: 100%;
  height: auto;
  padding: 22px;
`;

const ImageInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
