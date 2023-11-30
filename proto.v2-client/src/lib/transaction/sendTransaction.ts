import { useSendTransaction } from "wagmi";
import { ethers } from "ethers";

type Props = {
  to: string;
  value: number;
};

export const handleSendTransaction = ({ to, value }: Props) => {
  // const { data, isIdle, isLoading, isSuccess, sendTransaction } =
  //   useSendTransaction({
  //     to: to,
  //     value: ethers.parseUnits(value.toString(), 18),
  //   });
  // sendTransaction();
  // console.log(data);
  // console.log(isIdle);
  // console.log(isLoading);
  // console.log(isSuccess);
};
