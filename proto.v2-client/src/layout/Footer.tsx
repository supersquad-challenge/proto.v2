import colors from "@/styles/color";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterImage src="/asset/footer/ic_home_off.svg" />
      <FooterImage src="/asset/footer/ic_explore_off.svg" />
      <FooterImage src="/asset/footer/ic_challenge_off.svg" />
      <FooterImage src="/asset/footer/ic_profile_off.svg" />

      {/* <FooterImage src="/asset/footer/ic_home_on.svg" />
      <FooterImage src="/asset/footer/ic_explore_on.svg" />
      <FooterImage src="/asset/footer/ic_challenge_on.svg" />
      <FooterImage src="/asset/footer/ic_profile_on.svg" /> */}
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
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

  bottom: 36px;
  z-index: 99;
`;

const FooterImage = styled.img`
  position: relative;
  width: 40px;
  height: 40px;
  &:hover {
    cursor: pointer;
  }
`;
