import colors from "@/styles/color";
import styled from "styled-components";

type Props = {
  title: string;
  content: string;
  detail: string;
};

const SingleChallengeInfo = ({ title, content, detail }: Props) => {
  const $isflex = title.length <= 10; //title길이가 짧을 경우 가로로 배치
  return (
    <Container $isflex={$isflex}>
      <Title $isflex={$isflex}>{title}</Title>
      <div>
        <Content $isflex={$isflex}>{content}</Content>
        <Detail $isflex={$isflex}>{detail}</Detail>
      </div>
    </Container>
  );
};

export default SingleChallengeInfo;

const Container = styled.div<{ $isflex: boolean }>`
  width: 100%;
  height: auto;

  display: ${(props) => props.$isflex && "flex"};

  margin-top: 30px;
`;

const Title = styled.div<{ $isflex: boolean }>`
  color: ${colors.black};
  font-size: 18px;
  font-weight: 600;
  width: ${(props) => (props.$isflex ? "103px" : "185px")};
`;

const Content = styled.div<{ $isflex: boolean }>`
  color: ${colors.primary};
  font-size: 18px;
  font-weight: 600;

  margin-top: ${(props) => !props.$isflex && "10px"};
`;

const Detail = styled.div<{ $isflex: boolean }>`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 400;

  margin-top: ${(props) => !props.$isflex && "20px"};

  max-width: 246px;
  word-break: keep-all;
  word-wrap: break-word;
`;
