"use client";
import { ReactNode, useContext, useEffect, useState } from "react";
// import Header from '@/layout/Header'
import React from "react";
import Footer from "@/layout/Footer";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import Header from "./Header";

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

  return (
    <>
      {/* {showHeader() && <Header />} */}
      <Header />

      {/* <BodyContainer
        top={
          !showHeader() ||
          pathname.includes("/detail") ||
          pathname.includes("/mypage")
            ? 35
            : 48
        }
        bot={showFooter() ? 110 : 40}
      > */}
      <BodyContainer $top={69} $bot={110}>
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
}>`
  margin-top: ${(props) => `${props.$top}px`}; //Header 자리
  margin-bottom: ${(props) => `${props.$bot}px`}; //Footer 자리
`;

export default Layout;
