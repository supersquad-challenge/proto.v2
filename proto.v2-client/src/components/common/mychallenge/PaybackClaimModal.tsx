import colors from "@/styles/color";
import styled from "styled-components";
import Image from "next/image";
import thousandFormat from "@/utils/thousandFormat";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  SET_FOOTER_BLUEBUTTON,
  SET_HEADER_GOBACK,
} from "@/redux/slice/layoutSlice";
import {
  CHANGE_MODAL,
  CLOSE_MODAL,
  OPEN_MODAL,
} from "@/redux/slice/modalSlice";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import getPaybackStatus from "@/lib/api/querys/myChallenge/getPaybackStatus";

type Props = {
  successRate: number;
};

const PaybackClaimModal = ({ successRate }: Props) => {
  // variables //
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const userChallengeId: string = id as string;
  let currency;

  // API //
  const {
    data: paybackStatus,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`payback status-${userChallengeId}`],
    queryFn: async () => {
      const res = await getPaybackStatus({
        userChallengeId: userChallengeId,
      });
      const paybackStatus = res.paybackInfo;
      if (paybackStatus.depositMethod === "crypto") {
        currency = "MATIC";
      } else if (paybackStatus.depositMethod === "cash") {
        currency = "$USD";
      }
      return paybackStatus;
    },
    staleTime: 5000,
    cacheTime: 60 * 60 * 1000,
  });

  // useEffect //
  useEffect(() => {
    dispatch(
      SET_FOOTER_BLUEBUTTON({
        blueButtonTitle: "Claim",
        handleBlueButtonClick: () => {
          dispatch(CHANGE_MODAL({ modal: "congrats_otherChallenges" })); //수정 필요 //tx claim 하는 로직 추가해야 함
        },
      })
    );

    dispatch(
      SET_HEADER_GOBACK({
        handleGoBackButtonClick: () => {
          dispatch(CLOSE_MODAL());
          router.push(`/mychallenge/${userChallengeId}`);
          dispatch(
            SET_FOOTER_BLUEBUTTON({
              blueButtonTitle: "Get Payback",
              handleBlueButtonClick: () => {
                dispatch(OPEN_MODAL({ modal: "paybackClaim" }));
              },
            })
          );
        },
      })
    );
  }, []);

  return (
    <PageContainer>
      <SuccessRateWrapper>
        <Image
          src="/asset/check.svg"
          width={120}
          height={120}
          alt="Modal Image"
        />
        <Detail style={{ margin: "13px 0 15px 0" }}>You have completed</Detail>
        <Percentage>{Math.round(successRate)}%</Percentage>
        <Detail style={{ margin: "15px 0 0 0" }}>of the challenge!</Detail>
      </SuccessRateWrapper>
      <TotalPaybackBlock>
        <OverviewWrapper>
          <OverviewTitle>Total Payback</OverviewTitle>
          <OverviewDetail $fontSize={24}>
            {thousandFormat(paybackStatus?.totalPayback!)} {currency}
          </OverviewDetail>
        </OverviewWrapper>

        <PoolWrapper style={{ marginTop: "20px" }}>
          <Image
            src="/asset/left_bottom_perpendicular.svg"
            width={8}
            height={8}
            alt="ㄴ"
            style={{ margin: "3px 7px 0 0" }}
          />
          <PoolName>My Deposit</PoolName>
          <PoolDetail>
            {thousandFormat(paybackStatus?.deposit!)} {currency}
          </PoolDetail>
        </PoolWrapper>

        <PoolWrapper style={{ marginTop: "8px" }}>
          <Image
            src="/asset/left_bottom_perpendicular.svg"
            width={8}
            height={8}
            alt="ㄴ"
            style={{ margin: "3px 7px 0 0" }}
          />
          <PoolName>Profit / Loss</PoolName>
          <PoolDetail>
            {thousandFormat(paybackStatus?.profit!)} {currency}
          </PoolDetail>
        </PoolWrapper>
      </TotalPaybackBlock>
    </PageContainer>
  );
};
export default PaybackClaimModal;

const PageContainer = styled.main`
  width: 100vw;
  height: calc(100vh - 140px);
  background-color: ${colors.white};

  padding: 25px 22px;
  box-sizing: border-box;
  overflow: auto;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SuccessRateWrapper = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Detail = styled.div`
  width: 100%;
  color: ${colors.black};
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: -0.32px;
`;

const Percentage = styled.div`
  width: 100%;
  color: ${colors.primary};
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: -0.72px;
`;

const TotalPaybackBlock = styled.div`
  width: 100%;
  border-radius: 10px;
  background: rgba(82, 101, 251, 0.1);
  padding: 28px 20px 21px 20px;
`;

const OverviewWrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OverviewTitle = styled.div`
  color: ${colors.black};
  font-size: 18px;
  font-weight: 600;
`;

const OverviewDetail = styled.div<{ $fontSize: number }>`
  color: ${colors.primary};
  font-size: ${(props) => `${props.$fontSize}px`};
  font-weight: 600;
  letter-spacing: -0.36px;
`;

const PoolWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const PoolName = styled.div`
  color: ${colors.black};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.28px;
  flex-grow: 1;
`;

const PoolDetail = styled.div`
  color: ${colors.black};
  text-align: right;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
`;
