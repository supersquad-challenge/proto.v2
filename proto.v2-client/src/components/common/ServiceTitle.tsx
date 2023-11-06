import styled from "styled-components";

const ServiceTitle = () => {
  return (
    <Container>
      <Title>SuperSquad</Title>
    </Container>
  );
};

export default ServiceTitle;

const Container = styled.div`
  width: 100%;
  height: 70px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
`;

const Title = styled.div`
  color: #fff;
  font-family: ClashDisplayVariable;
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
