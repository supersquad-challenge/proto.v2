import { getHandleGoBackButtonClickState } from "@/redux/slice/layoutSlice";
import colors from "@/styles/color";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const showServiceTitle = () => {
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
  return showServiceTitle() ? <ServiceTitle /> : <GoBack />;
};

export default Header;

const ServiceTitle = () => {
  return (
    <ServiceTitleContainer>
      <Title>SUPERSQUAD</Title>
    </ServiceTitleContainer>
  );
};

const GoBack = () => {
  const handleGoBackButtonClick = useSelector(getHandleGoBackButtonClickState);

  const router = useRouter();
  return (
    <GoBackContainer>
      <Image
        src="/asset/arrow-left.svg"
        width={32}
        height={32}
        alt="go back"
        onClick={() => handleGoBackButtonClick()}
      />
    </GoBackContainer>
  );
};

const ServiceTitleContainer = styled.header`
  width: 100%;
  height: 70px;
  margin: 0 auto;

  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);

  background-color: ${colors.primary};

  overflow: hidden;

  z-index: 90;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
`;

const Title = styled.div`
  color: #fff;
  font-family: ClashDisplayVariable;
  font-size: 21px;
  font-weight: 700;
`;

const GoBackContainer = styled.header`
  width: 100%;
  height: 70px;
  margin: 0 auto;

  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);

  overflow: hidden;
  z-index: 90;

  background-color: ${colors.white};

  display: flex;
  align-items: center;

  padding-left: 22px;

  box-sizing: border-box;
`;
