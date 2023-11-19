type Props = {
  challengeId: string;
};

export const getSingleChallenge = async ({ challengeId }: Props) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/challenge/${challengeId}`
  );
  const data = res.json();
  return data;
};
