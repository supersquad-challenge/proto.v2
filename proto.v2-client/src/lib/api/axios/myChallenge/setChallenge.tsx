import { SingleRegisteredChallenge } from "@/types/api/Challenge";
import axios, { AxiosResponse } from "axios";
type Props = {
  userId: string;
  challengeId: string;
  timezone: string;
};

const setChallenge = async ({
  userId,
  challengeId,
  timezone,
}: Props): Promise<AxiosResponse<SingleRegisteredChallenge> | undefined> => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/myChallenge/register`,
      {
        userId: userId,
        challengeId: challengeId,
        timezone: timezone,
      }
    );
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return error.response;
    }
    return undefined;
  }
};

export default setChallenge;
