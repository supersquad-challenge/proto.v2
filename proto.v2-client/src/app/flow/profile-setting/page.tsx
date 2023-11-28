"use client";

import FlowSectionName from "@/components/common/flow/FlowSectionName";
import ImageInputCircle from "@/components/common/flow/ImageInputCircle";
import NicknameInput from "@/components/common/flow/NicknameInput";
import NicknameMessage from "@/components/common/flow/NicknameMessage";
import { login } from "@/lib/api/axios/auth/login";
import { setNickname } from "@/lib/api/axios/user/setNickname";
import {
  getIsLoggedInState,
  getNicknameState,
  getProfileState,
  getUserIDState,
} from "@/redux/slice/authSlice";
import {
  INITIALIZE_FOOTER_BLUEBUTTON,
  SET_FOOTER_BLUEBUTTON,
  SET_HEADER_GOBACK,
} from "@/redux/slice/layoutSlice";
import { CLOSE_MODAL } from "@/redux/slice/modalSlice";
import { profile } from "console";
import { useRouter } from "next/navigation";
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
  const [newNickname, setNewNickname] = useState(
    originalNickname ? originalNickname : ""
  );
  const router = useRouter();
  // const [newProfileSrc, setNewProfileSrc] = useState("");
  const [file, setFile] = useState<File>();

  // useEffect //
  useEffect(() => {
    dispatch(INITIALIZE_FOOTER_BLUEBUTTON());
    dispatch(CLOSE_MODAL());

    dispatch(
      SET_HEADER_GOBACK({
        handleGoBackButtonClick: () => {
          router.push("/profile");
        },
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      SET_FOOTER_BLUEBUTTON({
        blueButtonTitle: "Save Changes",
        handleBlueButtonClick: async () => {
          // if (newNickname !== "") {
          //   router.push("/home");

          //   const res = await setNickname({
          //     userId: userId!,
          //     nickname: newNickname,
          //     file: file,
          //   });
          //   console.log(res);
          // }
          console.log(newNickname);
          console.log(file);
        },
      })
    );
  }, [newNickname, file]);

  // Nickname Input functions //
  const updateInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNickname(event.target.value);
  };

  const submitInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // 닉네임 제출 로직 (예: 서버로 전송)
      console.log("Submitted Nickname:", newNickname);
      handleBlueButtonClick();
    }
  };

  const handleBlueButtonClick = async () => {
    // 프로필 이미지 변경하는 로직 추가
    if (userId) {
      const res = await setNickname({
        userId: userId,
        nickname: newNickname,
      });
    }
  };

  return (
    isLoggedIn && (
      <Container>
        <FlowSectionName>Profile Setting</FlowSectionName>
        <ImageInputWrapper>
          {/* <ImageInputCircle profileSrc="/asset/meditation.jpeg" /> */}
          <ImageInputCircle
            profileSrc={profile!}
            file={file}
            setFile={setFile}
          />
        </ImageInputWrapper>
        <NicknameMessage>Nickname</NicknameMessage>
        <NicknameInput
          nickname={newNickname}
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
