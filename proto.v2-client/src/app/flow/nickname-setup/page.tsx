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
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      SET_FOOTER_BLUEBUTTON({
        blueButtonTitle: "Sign up",
        handleBlueButtonClick: async () => {
          if (newNickname !== "") {
            router.push("/home");

            const res = await setNickname({
              userId: userId!,
              nickname: newNickname,
              file: undefined,
            });
            console.log(res);
          }
        },
      })
    );
  }, [newNickname]);

  // Nickname Input functions //
  const updateInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNickname(event.target.value);
  };

  const submitInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
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
