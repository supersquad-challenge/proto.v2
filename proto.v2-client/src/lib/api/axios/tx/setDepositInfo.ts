import axios from "axios";

type Props = {
  userChallengeId: string;
  depositMethod: "cash" | "crypto";
  deposit: number;
};

const setDepositInfo = async ({
  userChallengeId,
  depositMethod,
  deposit,
}: Props) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tx/deposit`,
      {
        userChallengeId: userChallengeId,
        depositMethod: depositMethod,
        deposit: deposit,
      }
    );

    return res;
  } catch (e) {
    console.log(e);
  }
};

export default setDepositInfo;
