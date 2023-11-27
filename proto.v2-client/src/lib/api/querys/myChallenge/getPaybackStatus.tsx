type Props = {
  userChallengeId: string;
};

const getPaybackStatus = async ({ userChallengeId }: Props) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/myChallenge/payback/${userChallengeId}`
    );
    const data = res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default getPaybackStatus;
