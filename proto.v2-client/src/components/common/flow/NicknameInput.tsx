import BasicInput from "@/components/base/Input/BasicInput";
import colors from "@/styles/color";
import { ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";

type Props = {
  nickname: string;
  updateInput: (event: ChangeEvent<HTMLInputElement>) => void;
  submitInput: (event: KeyboardEvent<HTMLInputElement>) => void;
};

const NicknameInput = ({ nickname, updateInput, submitInput }: Props) => {
  return (
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
  );
};

export default NicknameInput;

const InputWrapper = styled.div`
  width: 100%;
  height: 60px;
`;
