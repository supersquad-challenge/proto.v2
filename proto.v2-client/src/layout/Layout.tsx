"use client";
import { ReactNode, useContext, useEffect, useState } from "react";
// import Header from '@/layout/Header'
import React from "react";
import Footer from "@/layout/Footer";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import Header from "./Header";
import colors from "@/styles/color";
import { Modal } from "@/types/Modal";
import { useSelector } from "react-redux";
import { getActiveModalState } from "@/redux/slice/modalSlice";

const Layout = ({ children }: { children: ReactNode }) => {
  // variable //
  const pathname = usePathname();
  const activeModal: Modal | undefined = useSelector(getActiveModalState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isBackgroundPrimary = () => {
    if (pathname == "/home") {
      return true;
    }
    return false;
  };

  const isBodyContainerTop = () => {
    if (pathname == "/profile") {
      return false;
    }
    return true;
  };
  const isBodyContainerBottom = () => {
    if (
      activeModal == "congrats_otherChallenges" ||
      activeModal == "congrats_status" ||
      activeModal == "nowYouAreIn" ||
      activeModal == "snapYourScale" ||
      pathname == "/home"
    ) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Header />
      <BodyContainer
        $top={isBodyContainerTop() ? 68 : 0}
        $bot={isBodyContainerBottom() ? 85 : 0}
        $backgroundColor={
          isBackgroundPrimary() ? `${colors.primary}` : `${colors.white}`
        }
      >
        {children}
      </BodyContainer>

      <Footer />
    </>
  );
};

const BodyContainer = styled.div<{
  $top: number;
  $bot: number;
  $backgroundColor: string;
}>`
  padding-top: ${(props) => `${props.$top}px`}; //Header 자리
  padding-bottom: ${(props) => `${props.$bot}px`}; //Footer 자리

  background-color: ${(props) => props.$backgroundColor};
`;

export default Layout;
