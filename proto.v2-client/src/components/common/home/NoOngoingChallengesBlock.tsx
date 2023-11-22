import BaseBlock from "@/components/base/Block/BaseBlock";
import LongBlueButton from "@/components/base/Button/LongBlueButton";
import colors from "@/styles/color";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const NoOngoingChallengesBlock = () => {
  const router = useRouter();
  return (
    <BlockWrapper>
      <Title>You have no ongoing challenges</Title>
      <LongBlueButton
        margin="15px 0 0 0"
        title="Explore Challenge"
        onClickHandler={() => router.push("/explore")}
      />
    </BlockWrapper>
  );
};
export default NoOngoingChallengesBlock;

const BlockWrapper = styled.div`
  width: 100%;
  display: flex;
  background-color: ${colors.white};
  padding: 30px 34px;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
`;

const Title = styled.div`
  width: 100&;
  color: ${colors.black};
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 146.25%;
  letter-spacing: -0.32px;
`;
