import React, { ReactNode } from "react";
import styled from "styled-components";
import colors from "@/styles/color";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "@/redux/slice/modalSlice";
// import { WindowContext } from '@/context/window';

type Props = {
  title: string;
  deletePath: string | undefined;
  children: ReactNode;
  show: boolean;
};

const BaseModal = ({ title, deletePath, children, show }: Props) => {
  const dispatch = useDispatch();
  return (
    <ModalBackground>
      <ModalContainer $show={show}>
        <X
          onClick={() => {
            dispatch(CLOSE_MODAL());
          }}
          src="/asset/xmark.svg"
          width={35}
          height={35}
          alt="go back"
        />
        <ModalTitle>{title}</ModalTitle>
        {children}
      </ModalContainer>
    </ModalBackground>
  );
};

export default BaseModal;

const ModalBackground = styled.section`
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  z-index: 97;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const ModalContainer = styled.div<{
  $show: boolean;
}>`
  width: 100%;
  /* height: 480px; */
  background-color: ${colors.white};
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 70px 22px 70px 22px;
  border-radius: 22px 22px 0px 0px;
  animation-name: ${(props) => (props.$show ? "moveUp" : "moveDown")};
  animation-duration: 0.3s;
  animation-timing-function: linear;

  @keyframes moveUp {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }

  @keyframes moveDown {
    0% {
      transform: translateY(0%);
      opacity: 1;
    }
    100% {
      transform: translateY(100%);
      opacity: 0;
    }
  }
`;

const X = styled(Image)`
  position: absolute;
  width: 35px;
  height: 35px;
  top: 26px;
  right: 22px;

  &:hover {
    cursor: pointer;
  }
`;

const ModalTitle = styled.div`
  color: ${colors.black};
  font-size: 22px;
  font-weight: 600;
`;
