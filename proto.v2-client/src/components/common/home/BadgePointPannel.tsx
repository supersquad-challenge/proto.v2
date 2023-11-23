import { POINT } from "@/lib/protoV2Constants";
import colors from "@/styles/color";
import thousandFormat from "@/utils/thousandFormat";
import styled from "styled-components";

const BadgePointPannel = () => {
  return (
    <Container>
      <BadgeImage src="/asset/badges/gold_badge.svg" />
      <div style={{ marginTop: "1px" }}>
        <div
          style={{
            color: `${colors.white}`,
            fontSize: "18px",
            fontWeight: "400",
          }}
        >
          points
        </div>
        <Points>{thousandFormat(POINT)}</Points>
      </div>
    </Container>
  );
};

export default BadgePointPannel;

const Container = styled.div`
  width: auto;
  height: auto;

  box-sizing: border-box;

  display: flex;

  /* margin-top: 118px; */
  margin-top: 40px;
`;

const BadgeImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 15px;
`;

const Points = styled.div`
  color: ${colors.highlight};
  font-size: 28px;
  font-weight: 800;

  margin-top: -3px;
`;
