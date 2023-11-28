import axios from "axios";

type Props = {
  userInfoId: string;
  nickname: string;
  file?: string;
};

export const setNickname = async ({ userInfoId, nickname, file }: Props) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/nickname`,
      {
        userId: userInfoId,
        nickname: nickname,
        file: file,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
    return {
      status: 0,
    };
  }
};
