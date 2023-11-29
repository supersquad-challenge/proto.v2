import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import colors from "@/styles/color";
import LongBlueButton from "../Button/LongBlueButton";
import { useDispatch } from "react-redux";
import { SET_HEADER_GOBACK } from "@/redux/slice/layoutSlice";

type Props = {
  imgSrc: string;
  title: string;
  detail: string;
  buttonText: string;
  onClickHandler: () => void;
  children?: React.ReactNode;
  goBackButtonClickHandler: () => void;
};

const FullPageModal = ({
  imgSrc,
  title,
  detail,
  buttonText,
  onClickHandler,
  children,
  goBackButtonClickHandler,
}: Props) => {
  // variables //
  const dispatch = useDispatch();

  // useEffect //
  useEffect(() => {
    dispatch(
      SET_HEADER_GOBACK({ handleGoBackButtonClick: goBackButtonClickHandler })
    );
  }, []);

  // 브라우저 높이 값에 맞게 height 값 가변 적용
  const [windowHeight, setWindowHeight] = useState(0);

  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    // 브라우저 환경에서만 실행
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);

      const handleResize = () => {
        setWindowHeight(window.innerHeight);
      };

      const handleResizeContainer = () => {
        setContainerHeight(windowHeight - 70);
      };

      window.addEventListener("resize", handleResize);
      handleResizeContainer();

      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [windowHeight]);

  return (
    <PageContainer>
      <Container $height={containerHeight}>
        <Wrapper>
          <Image
            src={imgSrc}
            width={120}
            height={120}
            alt="Modal Image"
            priority={true}
          />
          <Title>{title}</Title>
          <Detail>{detail}</Detail>
          <LongBlueButton
            margin="30px"
            title={buttonText}
            onClickHandler={onClickHandler}
          >
            {children}
          </LongBlueButton>
        </Wrapper>
      </Container>
    </PageContainer>
  );
};

export default FullPageModal;

const PageContainer = styled.main`
  width: 100%;
  height: auto;
  background-color: ${colors.white};

  padding: 0 22px;
  box-sizing: border-box;
  overflow: auto;
  position: relative;
`;

const Container = styled.div<{ $height: number }>`
  width: 100%;
  height: ${(props) => `${props.$height}px`};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 292px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  color: ${colors.black};
  text-align: center;
  font-size: 24px;
  font-weight: 600;
`;

const Detail = styled.div`
  width: 100%;
  color: ${colors.black};
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 20.8px;
  letter-spacing: -0.32px;
`;
