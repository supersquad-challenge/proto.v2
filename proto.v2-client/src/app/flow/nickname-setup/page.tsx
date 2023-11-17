"use client";
import BasicInput from "@/components/base/Input/BasicInput";
import FlowSectionName from "@/components/common/flow/FlowSectionName";
import colors from "@/styles/color";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import styled from "styled-components";

const NicknameSetup = () => {
  const [nickname, setNickname] = useState("");

  const updateInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const submitInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // 닉네임 제출 로직 (예: 서버로 전송)
      console.log("Submitted Nickname:", nickname);
    }
  };
  return (
    <Container>
      <FlowSectionName>What is your</FlowSectionName>
      <NickNameMessage>Nickname</NickNameMessage>
      <InputWrapper>
        <BasicInput
          placeholder="Write your nickname"
          currentValue={nickname}
          updateInput={updateInput}
          submitInput={submitInput}
          color={colors.black}
          fontSize={16}
          $padding="0 0 0 29px"
          $border="2px solid #DDD"
          $borderRadius={20}
        />
      </InputWrapper>
    </Container>
  );
};

export default NicknameSetup;

const Container = styled.main`
  width: 100%;
  height: auto;
  padding: 22px;
`;

const NickNameMessage = styled.div`
  color: ${colors.black};
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.36px;

  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 60px;
`;
