type Props = {
  userChallengeId: string;
};

export const getSingleChallengeByUserChallengeId = async ({
  userChallengeId,
}: Props) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/myChallenge/myStatus/${userChallengeId}`
  );
  const data = res.json();
  return data;
};
