type Props = {
  queryString: string;
};
export const getAllChallenge = async ({ queryString }: Props) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/challenge?${queryString}`
  );
  const data = res.json();
  return data;
};
