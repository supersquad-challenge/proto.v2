import axios from "axios";

export const getAllUserInfo = async() => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/all`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}