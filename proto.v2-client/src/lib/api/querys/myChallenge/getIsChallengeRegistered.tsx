type Props = {
  challengeId: string;
  userId: string;
};

export const getIsChallengeRegistered = async ({
  challengeId,
  userId,
}: Props) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/myChallenge/getChallenge/${challengeId}/${userId}`
  );
  const data = res.json();
  return data;
};
