import axios from "axios";

export const login = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        // const res = await axios.get(`http://localhost:8080/auth/login`, {
        withCredentials: true,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
