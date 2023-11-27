"use client";
import {
  getBlueButtonTitleState,
  getBlueButtonVisibilityState,
  getHandleBlueButtonClickState,
  getIsBlueButtonActiveState,
} from "@/redux/slice/layoutSlice";
import {
  IModalState,
  getActiveModalState,
  getModalState,
} from "@/redux/slice/modalSlice";
import colors from "@/styles/color";
import { Modal } from "@/types/Modal";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Footer = () => {
  // variable //
  const pathname = usePathname();
  const activeModal: Modal | undefined = useSelector(getActiveModalState);
  const blueButtonVisibility = useSelector(getBlueButtonVisibilityState);
  const showNaviBar = () => {
    if (
      pathname === "/home" ||
      pathname === "/explore" ||
      pathname === "/mychallenge" ||
      pathname === "/profile"
    ) {
      return true;
    }
    return false;
  };

  const showBlueButton = () => {
    if (
      activeModal === "congrats_otherChallenges" ||
      activeModal === "congrats_status" ||
      activeModal === "nowYouAreIn" ||
      activeModal === "snapYourScale" ||
      pathname === "/flow/login" ||
      blueButtonVisibility === false
    ) {
      return false;
    }
    return true;
  };

  return showNaviBar() ? <NavigationBar /> : showBlueButton() && <BlueButton />;
  // return <BlueButton />;
};

export default Footer;

const NavigationBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <NaviBarContainer>
      <NaviBarImage
        onClick={() => router.push("/home")}
        src={
          pathname === "/home"
            ? "/asset/footer/ic_home_on.svg"
            : "/asset/footer/ic_home_off.svg"
        }
      />
      <NaviBarImage
        onClick={() => router.push("/explore")}
        src={
          pathname === "/explore"
            ? "/asset/footer/ic_explore_on.svg"
            : "/asset/footer/ic_explore_off.svg"
        }
      />
      <NaviBarImage
        onClick={() => router.push("/mychallenge")}
        src={
          pathname === "/mychallenge"
            ? "/asset/footer/ic_mychallenge_on.svg"
            : "/asset/footer/ic_mychallenge_off.svg"
        }
      />
      <NaviBarImage
        onClick={() => router.push("/profile")}
        src={
          pathname === "/profile"
            ? "/asset/footer/ic_profile_on.svg"
            : "/asset/footer/ic_profile_off.svg"
        }
      />
    </NaviBarContainer>
  );
};

const BlueButton = () => {
  const blueButtonTitle = useSelector(getBlueButtonTitleState);
  const handleBlueButtonClick = useSelector(getHandleBlueButtonClickState);
  const isBlueButtonActive = useSelector(getIsBlueButtonActiveState);
  return (
    <BlueButtonContainer
      onClick={() => handleBlueButtonClick()}
      $isBlueButtonActive={isBlueButtonActive}
    >
      {blueButtonTitle}
    </BlueButtonContainer>
  );
};

const NaviBarContainer = styled.footer`
  width: 349px;
  height: 70px;

  padding-left: 23px;
  padding-right: 23px;
  justify-content: space-between;

  display: flex;
  align-items: center;
  position: fixed;

  left: 50%;
  transform: translateX(-50%);

  background-color: ${colors.black};

  border-radius: 20px;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.3);

  box-sizing: border-box;

  bottom: 15px;
  z-index: 99;

  &:hover {
    cursor: pointer;
  }
`;

const NaviBarImage = styled.img`
  position: relative;
  width: 40px;
  height: 40px;
  &:hover {
    cursor: pointer;
  }
`;

const BlueButtonContainer = styled.footer<{ $isBlueButtonActive: boolean }>`
  width: 100%;
  height: 70px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: fixed;

  left: 50%;
  transform: translateX(-50%);

  color: ${colors.white};
  font-size: 18px;
  font-weight: 600;

  background-color: ${(props) =>
    props.$isBlueButtonActive ? colors.primary : colors.gray};
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.3);

  bottom: 0px;
  z-index: 99;

  cursor: ${(props) => (props.$isBlueButtonActive ? "pointer" : undefined)};
`;
