"use client";
import { ReactNode, useContext, useEffect, useState } from "react";
// import Header from '@/layout/Header'
import React from "react";
import Footer from "@/layout/Footer";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import Header from "./Header";
import colors from "@/styles/color";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //   const showHeader = () => {
  //     if (pathname.includes("/signup") || pathname.includes("/error"))
  //       return false;
  //     return true;
  //   };
  const showFooter = () => {
    if (
      pathname.includes("/signup") ||
      pathname.includes("/detail") ||
      pathname.includes("/error")
    )
      return false;
    return true;
  };

  const isBackgroundPrimary = () => {
    if (pathname == "/home") {
      return true;
    }
    return false;
  };

  return (
    <>
      {/* {showHeader() && <Header />} */}
      <Header />
      <BodyContainer
        $top={68}
        $bot={70}
        $backgroundColor={
          isBackgroundPrimary() ? `${colors.primary}` : `${colors.white}`
        }
      >
        {children}
      </BodyContainer>

      {/* {showFooter() && <Footer />} */}
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
