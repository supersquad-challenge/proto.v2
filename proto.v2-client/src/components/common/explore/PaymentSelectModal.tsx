import styled from "styled-components";
import BaseModal from "../../base/Modal/BaseModal";
import BaseBlock from "../../base/Block/BaseBlock";
import colors from "@/styles/color";
import { useState } from "react";

const PaymentSelectModal = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  return (
    <BaseModal title="You are paying with" deletePath={undefined} show={true}>
      <PaymentBlockWrapper style={{ marginTop: "30px" }}>
        <BaseBlock
          backgroundColor={colors.white}
          borderRadius={20}
          padding="26px 25px"
          border={
            paymentMethod == "crypto"
              ? `2px solid ${colors.primary}`
              : "2px solid #dddddd"
          }
          onClickHandler={() => {
            setPaymentMethod("crypto");
          }}
        >
          <PaymentMethod $isclicked={paymentMethod === "crypto"}>
            a crypto wallet
          </PaymentMethod>
          <Detail>Deposit $USDC to enforce your goals</Detail>
        </BaseBlock>
      </PaymentBlockWrapper>

      <PaymentBlockWrapper style={{ marginTop: "20px", marginBottom: "30px" }}>
        <BaseBlock
          backgroundColor={colors.white}
          borderRadius={20}
          padding="26px 25px"
          border={
            paymentMethod == "cash"
              ? `2px solid ${colors.primary}`
              : "2px solid #dddddd"
          }
          onClickHandler={() => {
            setPaymentMethod("cash");
          }}
        >
          <PaymentMethod $isclicked={paymentMethod === "cash"}>
            a cash account
          </PaymentMethod>
          <Detail>Move on</Detail>
        </BaseBlock>
      </PaymentBlockWrapper>
    </BaseModal>
  );
};

export default PaymentSelectModal;

const PaymentBlockWrapper = styled.div`
  width: 100%;
  height: 120px;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 30px;
`;

const PaymentMethod = styled.div<{ $isclicked: boolean }>`
  color: ${(props) =>
    props.$isclicked ? `${colors.primary}` : `${colors.darkGray}`};
  font-size: 18px;
  font-weight: 600;
`;

const Detail = styled.div`
  color: ${colors.gray};
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
`;