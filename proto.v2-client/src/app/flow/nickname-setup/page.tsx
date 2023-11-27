"use client";

import FlowSectionName from "@/components/common/flow/FlowSectionName";
import NicknameInput from "@/components/common/flow/NicknameInput";
import NicknameMessage from "@/components/common/flow/NicknameMessage";
import { login } from "@/lib/api/axios/auth/login";
import { setNickname } from "@/lib/api/axios/user/setNickname";
import { getUserIDState } from "@/redux/slice/authSlice";
import {
  INITIALIZE_FOOTER_BLUEBUTTON,
  SET_FOOTER_BLUEBUTTON,
} from "@/redux/slice/layoutSlice";
import colors from "@/styles/color";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const NicknameSetup = () => {
  // variable //
  const [newNickname, setNewNickname] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [userId, setUserId] = useState("");

  // useEffect //
  useEffect(() => {
    const _handlelogin = async () => {
      const loginRes = await login();
      setUserId(loginRes?.data?.userInfoId);
    };
    _handlelogin();

    dispatch(
      SET_FOOTER_BLUEBUTTON({
        blueButtonTitle: "Sign up",
        handleBlueButtonClick: async () => {
          if (newNickname !== "") {
            router.push("/home");

            const res = await setNickname({
              userInfoId: userId!,
              nickname: newNickname,
            });
            console.log(res);
          }
        },
      })
    );
  }, [dispatch]);

  // Nickname Input functions //
  const updateInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNickname(event.target.value);
  };

  const submitInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // 닉네임 제출 로직 (예: 서버로 전송)
      console.log("Submitted Nickname:", newNickname);
    }
  };

  return (
    <Container>
      <FlowSectionName>What is your</FlowSectionName>
      <NicknameMessage>Nickname</NicknameMessage>
      <NicknameInput
        nickname={newNickname}
        updateInput={updateInput}
        submitInput={submitInput}
      />
    </Container>
  );
};

export default NicknameSetup;

const Container = styled.main`
  width: 100%;
  height: auto;
  padding: 22px;
`;
