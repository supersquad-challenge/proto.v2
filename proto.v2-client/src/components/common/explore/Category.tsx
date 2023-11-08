import styled from "styled-components";

const Category = () => {
  return <Container $backgroundColor=""></Container>;
};

const Container = styled.div<{ $backgroundColor: string }>`
  width: calc((var(--width) - 36) / 4);
  height: calc((var(--width) - 36) / 4);
  margin-bottom: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.$backgroundColor};
`;
