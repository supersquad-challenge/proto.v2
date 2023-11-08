import BaseBlock from "@/components/base/Block/BaseBlock";
import styled from "styled-components";

const ChallengeBlock = () => {
  return (
    <BlockWrapper>
      <BaseBlock backgroundColor={""} borderRadius={0} padding={""}>
        <div></div>
      </BaseBlock>
    </BlockWrapper>
  );
};

export default ChallengeBlock;

const BlockWrapper = styled.div`
  width: 100%;
  height: 198px;
  position: relative;

  ///////////
  margin-top: 10px;
`;
