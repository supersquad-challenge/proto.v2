<<<<<<< HEAD
import colors from "@/styles/color";
import { usePathname } from "next/navigation";
import styled from "styled-components";

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
=======
const Header = () => {
  return <GoBack />;
>>>>>>> 09511c3 (Add: Header)
};

export default Header;

<<<<<<< HEAD
const ServiceTitle = () => {
  return (
    <ServiceTitleContainer>
      <Title>SUPERSQUAD</Title>
=======
import colors from "@/styles/color";
import styled from "styled-components";

const ServiceTitle = () => {
  return (
    <ServiceTitleContainer>
      <Title>SuperSquad</Title>
>>>>>>> 09511c3 (Add: Header)
    </ServiceTitleContainer>
  );
};

const GoBack = () => {
  return (
    <GoBackContainer>
      <img src="/asset/arrow-left.svg" width={32} height={32} />
    </GoBackContainer>
  );
};

<<<<<<< HEAD
const ServiceTitleContainer = styled.header`
=======
const ServiceTitleContainer = styled.div`
>>>>>>> 09511c3 (Add: Header)
  width: 100%;
  height: 70px;
  margin: 0 auto;

  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);

  background-color: ${colors.primary};

  overflow: hidden;
<<<<<<< HEAD
  z-index: 90;
=======
  z-index: 99;
>>>>>>> 09511c3 (Add: Header)

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

<<<<<<< HEAD
const GoBackContainer = styled.header`
=======
const GoBackContainer = styled.div`
>>>>>>> 09511c3 (Add: Header)
  width: 100%;
  height: 70px;
  margin: 0 auto;

  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);

  overflow: hidden;
<<<<<<< HEAD
  z-index: 90;
=======
  z-index: 99;
>>>>>>> 09511c3 (Add: Header)

  background-color: ${colors.white};

  display: flex;
  align-items: center;

  padding-left: 22px;

  box-sizing: border-box;
`;
