import axios from "axios";

const postPhoto = async (userChallengeId: string, file: File) => {
  const formData = new FormData();

  formData.append("userChallengeId", userChallengeId);

  if (file instanceof File) {
    formData.append("file", file);
  }
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/verify/postPhoto`,
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
  }
};

export default postPhoto;
