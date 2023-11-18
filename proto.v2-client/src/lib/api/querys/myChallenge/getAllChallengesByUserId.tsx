type Props = {
  userId: string;
  queryString: string;
};

export const getAllChallengesByUserId = async ({
  userId,
  queryString,
}: Props) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/myChallenge/allMyChallenge/${userId}?${queryString}`
  );
  const data = res.json();
  return data;
};
