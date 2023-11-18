"use client";
import FullPageModal from "@/components/base/Modal/FullPageModal";
import colors from "@/styles/color";
import styled from "styled-components";

const Test = () => {
  return (
    <FullPageModal
      imgSrc="/asset/full_page_modal/thumbs_up.svg"
      title="Snap your Scale"
      detail="Take a picture of your scale
        everyday to prove your weight.
        Remind to have your both feet shown!"
      buttonText="Complete Mission"
      onClickHandler={() => {}}
    />
  );
};

export default Test;
