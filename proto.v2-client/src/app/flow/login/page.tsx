"use client";
import BaseButton from "@/components/base/Button/BaseButton";
import FlowSectionName from "@/components/common/flow/FlowSectionName";
import colors from "@/styles/color";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const LogIn = () => {
  const GOOGLE_LOGIN_URL = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL || "";

  return (
    <Container>
      <FlowSectionName>Login</FlowSectionName>
      <Link href={"http://localhost:8080/auth/google"}>
        <ButtonWrapper>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              src="/asset/Google.svg"
              width={20}
              height={20}
              alt="google login"
            />
            <ContinueWithGoogle>Continue with Google</ContinueWithGoogle>
          </div>
        </ButtonWrapper>
      </Link>
      <SignUpWrapper>
        <div style={{ color: `${colors.gray}` }}>
          {"Don't have account yet"}
        </div>
        <Link href={GOOGLE_LOGIN_URL}>
          <div
            style={{ color: `${colors.darkGray}`, textDecoration: "underline" }}
          >
            Sign up
          </div>
        </Link>
      </SignUpWrapper>
    </Container>
  );
};

export default LogIn;

const Container = styled.main`
  width: 100%;
  height: auto;
  padding: 22px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 60px;

  border-radius: 10px;
  border: 2px solid #ddd;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContinueWithGoogle = styled.div`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.32px;

  margin-left: 9.59px;
`;

const SignUpWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  margin-top: 20px;

  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
`;
