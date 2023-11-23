import axios from "axios";

type Props = {
  userId: string;
  address: string;
};

export const setAddress = async ({ userId, address }: Props) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/address`,
      {
        userId: userId,
        address: address,
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
