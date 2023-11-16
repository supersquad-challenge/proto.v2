type Props = {
  userId: string;
};

export const getAllChallengeByUserId = async ({ userId }: Props) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/myChallenge/allMyChallenge/${userId}`
  );
  const data = res.json();
  return data;
};
