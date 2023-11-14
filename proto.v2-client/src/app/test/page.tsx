"use client";
import FullPageModal from "@/components/base/Modal/FullPageModal";
import colors from "@/styles/color";
import styled from "styled-components";

const Test = () => {
  return (
    <Container>
      <FullPageModal
        imgSrc="/asset/full_page_modal/thumbs_up.svg"
        title="Snap your Scale"
        detail="Take a picture of your scale
        everyday to prove your weight.
        Remind to have your both feet shown!"
        buttonText="Complete Mission"
      />
    </Container>
  );
};

export default Test;

const Container = styled.main`
  width: 100%;
  height: auto;
  background-color: ${colors.white};

  padding: 0 22px;
  box-sizing: border-box;
  overflow: auto;
  position: relative;
`;
