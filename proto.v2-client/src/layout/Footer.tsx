"use client";
import colors from "@/styles/color";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const Footer = () => {
<<<<<<< HEAD
  const pathname = usePathname();

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
  return showNaviBar() ? <NavigationBar /> : <BlueButton />;
=======
  return <BlueButton />;
>>>>>>> 00eae61 (Add: modals)
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
          pathname == "/home"
            ? "/asset/footer/ic_home_on.svg"
            : "/asset/footer/ic_home_off.svg"
        }
      />
      <NaviBarImage
        onClick={() => router.push("/explore")}
        src={
          pathname == "/explore"
            ? "/asset/footer/ic_explore_on.svg"
            : "/asset/footer/ic_explore_off.svg"
        }
      />
      <NaviBarImage
        onClick={() => router.push("/mychallenge")}
        src={
          pathname == "/mychallenge"
            ? "/asset/footer/ic_mychallenge_on.svg"
            : "/asset/footer/ic_mychallenge_off.svg"
        }
      />
      <NaviBarImage
        onClick={() => router.push("/profile")}
        src={
          pathname == "/profile"
            ? "/asset/footer/ic_profile_on.svg"
            : "/asset/footer/ic_profile_off.svg"
        }
      />

      {/* <NaviBarImage src="/asset/footer/ic_home_on.svg" />
      <NaviBarImage src="/asset/footer/ic_explore_on.svg" />
      <NaviBarImage src="/asset/footer/ic_mychallenge_on.svg" />
      <NaviBarImage src="/asset/footer/ic_profile_on.svg" /> */}
    </NaviBarContainer>
  );
};

const BlueButton = () => {
  return <BlueButtonContainer>I am in!</BlueButtonContainer>;
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
`;

const NaviBarImage = styled.img`
  position: relative;
  width: 40px;
  height: 40px;
  &:hover {
    cursor: pointer;
  }
`;

const BlueButtonContainer = styled.footer`
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

  background-color: ${colors.primary};
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.3);

  bottom: 0px;
  z-index: 99;
`;
