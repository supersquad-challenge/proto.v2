import styled from "styled-components";
import Image from "next/image";
import colors from "@/styles/color";

type Props = {
  name: string;
  margin?: string;
};

const SingleCollection = ({ name, margin }: Props) => {
  return (
    <Wrapper $margin={margin}>
      <Image
        src="/asset/badges/purple_badge.svg"
        alt="collectable"
        width={80}
        height={80}
      />
      <Name>{name}</Name>
    </Wrapper>
  );
};

export default SingleCollection;

const Wrapper = styled.div<{ $margin?: string }>`
  width: 80px;
  height: auto;
  margin: ${(props) => props.$margin};
`;

const Name = styled.div`
  width: 100%;
  color: ${colors.black};
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 128.571%;
  letter-spacing: -0.28px;

  margin-top: 10px;

  word-break: keep-all;
  word-wrap: break-word;
`;
