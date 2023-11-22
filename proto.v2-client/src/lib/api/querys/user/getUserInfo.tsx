type Props = {
  userId: string;
};

export const getUserInfo = async ({ userId }: Props) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/detail/${userId}`
  );
  const data = res.json();
  return data;
};
