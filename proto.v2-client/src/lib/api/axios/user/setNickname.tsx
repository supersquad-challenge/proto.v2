import axios from "axios";

type Props = {
  userId: string;
  nickname: string;
  file?: File;
};

export const setNickname = async ({ userId, nickname, file }: Props) => {
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("nickname", nickname);
  if (file instanceof File) {
    formData.append("file", file);
  } else {
    return {
      status: 0,
    };
  }
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/nickname`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
