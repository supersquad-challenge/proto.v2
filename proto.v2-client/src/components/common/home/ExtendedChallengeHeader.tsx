import colors from "@/styles/color";
import styled from "styled-components";
import Image from "next/image";
import ChallengeHeader from "./ChallengeHeader";

type Props = {
  challengeHeader: string;
  margin: string;
};

const ExtendedChallengeHeader = ({ challengeHeader, margin }: Props) => {
  return (
    <Container $margin={margin}>
      <ChallengeHeader $fontColor={colors.white}>
        {challengeHeader}
      </ChallengeHeader>
      <MoreWrapper>
        <More>more</More>
        <MoreDetailImg
          width={14}
          height={14}
          alt="more detail"
          src="/asset/right_arrow.svg"
        />
      </MoreWrapper>
    </Container>
  );
};

export default ExtendedChallengeHeader;

const Container = styled.div<{ $margin: string }>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: ${(props) => props.$margin};
  padding-left: 4px;
`;

const MoreWrapper = styled.div`
  display: flex;
  align-items: center;

  z-index: 1;
  &:hover {
    cursor: pointer;
  }
`;

const More = styled.div`
  color: ${colors.white};
  font-size: 14px;
  font-weight: 400;
`;

const MoreDetailImg = styled(Image)`
  margin-left: 4px;
`;
